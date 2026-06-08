---
title: "MyCraft"
summary: "Minecraft has been running on a single core since 2009. I wanted to know what it would be like to rebuild a voxel engine from scratch, in Java, with an ECS architecture and parallelism as a starting constraint."
cover: "/mycraft.webp"
date: 2026-06-01
translationKey: "mycraft"
featured: true
draft: false
role: "Solo engineer"
timeline: "2026 · ongoing"
tools: ["Java 26", "LWJGL 3", "OpenGL", "JOML"]
tags: ["Game engine", "ECS", "Voxel"]
---
# What if we rewrote Minecraft today?

It all started with a slightly dumb question I asked myself one evening: why doesn't Minecraft make better use of modern processors?

We all have machines with 8, 12, sometimes 16 cores. And yet, when you launch Minecraft, you still see one core grinding away on its own while the others twiddle their thumbs. Classic dev reflex: “just spread the work across several threads, right?”

Put like that, it sounds obvious. The game manages a huge world, thousands of blocks, hundreds of entities, procedural generation, AI, physics… exactly the kind of thing you want to split up and run in parallel.

So I dug in. I thought I'd run into two or three old technical choices, convince myself a modern rewrite would fix things, and move on. Obviously, it was more complicated than that.

Because before you talk about threads or performance, you need to understand how the game is built. And there, one detail suddenly takes on its full meaning: Minecraft was born in 2009. Different machines, different constraints, different expectations. The game grew around a huge simulation loop that updates the world continuously: every tick, it goes back over the blocks, the entities, the fluids, and starts again.

The more I looked at that loop, the more I understood why multithreading was no miracle solution. The problem isn't launching several threads. It's knowing what you're going to make them do.

## The wrong problem

That's roughly when I realised I was tackling the wrong problem.

My first reflex, like everyone's, had been to look for a place to slot threads in. When something is slow, you look at the resources you've got and tell yourself you just need to use them better. Except a thread isn't an architectural solution. It's an accelerator. And accelerating a badly organised system is mostly a good way to hit the wall faster.

The way Minecraft works rests on this big loop that keeps coming back to the same data, sometimes in a very specific order. Throwing threads at that doesn't simplify anything; it just piles complexity on top of something that already has plenty.

And that's when I came back to ECS.

I already knew the concept. I'd read the articles explaining that it's “the right way” to build a modern engine, and I'd probably nodded along while pretending to understand before moving on to something else. This time it came back from a different angle.

The point of ECS isn't to be trendy. It's that it forces you to organise the engine around data rather than around objects.

To make the shift in paradigm easier to picture, let's take a Creeper. In a classic object-oriented approach (like the one from 2009), we'd have a big all-in-one object that looks something like this:

```java
// The "Minecraft 2009" approach: the giant class
public class Creeper extends Monster {
	private float x, y, z;
	private int health;
	private boolean isExploding;

	public void update() {
		// Handle gravity
		// Look for the player
		// Move around
		// Handle the explosion countdown
		// Calculate collisions
	}
}
```

In that model, if we want to parallelise `update()`, we instantly expose ourselves to infernal race conditions on the world's state.

With ECS, we break everything apart. An entity is no longer a big object carrying around its state and its logic: it's just an identifier. Data lives in components (pure data, for example Java `record`s), and logic lives in systems.

```java
// The ECS approach: pure data
record Position(float x, float y, float z) {}
record Velocity(float dx, float dy, float dz) {}
record Explosive(int fuseTimer, float radius) {}
record AIChase(int targetEntityId, float speed) {}
```

All of a sudden, our game architecture looks more like this matrix:

| Entity | Attached components (data) | Applicable systems (logic) |
| --- | --- | --- |
| **Creeper** (ID: 42) | `Position`, `Velocity`, `AIChase`, `Explosive` | `MovementSystem`, `AISystem`, `ExplosionSystem` |
| **Arrow** (ID: 43) | `Position`, `Velocity`, `Projectile` | `MovementSystem`, `CollisionSystem` |
| **Player** (ID: 44) | `Position`, `Velocity`, `PlayerInput` | `MovementSystem`, `InputSystem` |

The movement system (`MovementSystem`) only does movement: it takes all entities that have a position and a velocity, and does its calculation. The explosion system only handles countdowns. It's almost SOLID principles pushed to the extreme, applied to video games.

Each piece becomes simpler to understand, easier to evolve, and, incidentally, easier to make run in parallel when you actually need to. ECS doesn't solve multithreading by magic. It solves the question that comes before it: how do you stop every system from quietly depending on everything else?

At that point, I also started laughing at myself. The starting idea was, “I'm going to optimise Minecraft with threads.” And a few hours later, here I was telling myself I was going to rebuild a full voxel engine. Not exactly the most cost-effective solution if the goal was just to squeeze out a few FPS.

## Right, now what?

This is usually the moment where a dev does what devs love doing: opening an empty project and convincing themselves that this time, it'll be done properly. I didn't escape it.

Not with the idea of competing with Minecraft, mind you; let's be serious. More like setting up a small personal lab to test these concepts and see how far they hold up once they're confronted with reality.

I called it “mycraft”. Not the most original name in the world, I know, but at least it's honest. The world clearly didn't need another Minecraft clone: there's already Minecraft, and dozens of similar projects carried by people far more patient than me. But that's not the point. The goal isn't to ship a game. It's to scratch that very particular itch we all have: “what if I rebuilt it myself, just to understand?”

## A black window to start with

Rather than rushing into features, I took it in a very incremental way. One simple rule: every step had to produce something compilable, testable, and visible on screen. No spending three weeks on a beautiful theoretical architecture without seeing anything move.

The first step was almost symbolic: displaying an OpenGL window. From the outside, it's ridiculous. But seeing that black window appear is often the moment the project starts to exist for real.

Then came the heart of the engine: a minimalist ECS. No inheritance, no catch-all objects. An entity is an identifier, components hold the data, systems hold the logic. Nothing magical, but a solid foundation.

Then everything snowballed: the components, the game loop, the camera, a minimal OpenGL render, an FPS controller. First a cube. Then a camera. Then a player freely moving around. And at some point, without really noticing, you're no longer doing 3D rendering: you're starting to build a world.

I added voxels, a first chunk, then a meshing system to remove the faces you can't see. Then procedural generation based on noise to give the terrain a bit of relief. And there, something strange happens: you start walking through a world that didn't exist a second earlier.

It's genuinely satisfying. The kind of satisfaction that wipes out the three previous evenings spent staring at a black screen because a projection matrix was multiplied in the wrong order. Anyone who's ever touched 3D knows the famous “Where the hell did my triangle go?” syndrome. You accidentally flipped the Z axis, your camera is looking backwards, and your world is generating itself entirely behind you while you stare into the void. But when everything lines up and your first landscape of blocks appears correctly, the effort is worth it.

The rest followed naturally: gravity, collisions, jumping. And there, I finally had something that looked like a real playable prototype: a character that walks, jumps, and interacts with a generated world.

## So what about multithreading?

The funniest part of the story is that multithreading, the original question, still isn't there. Or rather, it's deliberately absent.

Because as I went along, I realised something dead simple: parallelising a badly structured system is mostly an excellent way to make its bugs faster. Before thinking about virtual threads, async generation, or background meshing, I wanted to make sure the foundation could stand on its own first. That the ECS was in good shape. That responsibilities were clear. That the world had a structure you can actually understand.

## What's next?

So the next steps are exactly what I had in mind at the start without really knowing it: loading chunks dynamically around the player, generating them in the background with Java 26 virtual threads, and building the mesh without blocking the main thread.

And there, only there, the real question comes back: can you build a modern Minecraft designed for parallelism from the very start?

I still don't have the answer. But at least, now, I've got something concrete to go looking for it.

And if you want to see what it gives, it's here: https://github.com/LofoWalker/MyCraft
