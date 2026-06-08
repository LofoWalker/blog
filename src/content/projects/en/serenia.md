---
title: 'Serenia'
summary: 'An AI chat app built around authenticity — a conversational companion that feels like a friend, not a support bot.'
date: 2025-11-30
translationKey: 'serenia'
featured: true
role: 'Solo engineer'
timeline: '2025 · ongoing'
tools: ['Java', 'Quarkus', 'Angular', 'PostgreSQL']
tags: ['Full-stack', 'AI', 'Product']
link: 'https://serenia.studio'
---

## Problem

Most AI assistants are optimised for usefulness: precise, formal, and slightly exhausting. Serenia started from a different question — what if the goal was to feel like talking to a close friend?

The app gives the AI a distinct personality: casual, occasionally sarcastic, never verbose. Messages are capped at 180 characters. It's closer to an SMS thread than a knowledge base.

## Design decisions

**Tone over features.** The product surface is deliberately small — chat, history, a subscription. The investment went into making the AI's character feel consistent and human. That meant a lot of prompt engineering and a lot of reading responses that felt slightly off.

**Security at the base layer.** Conversations are sensitive. The architecture uses user-derived encryption keys (HKDF) so that message history is encrypted in a way the server cannot read. JWT authentication over RSA, TLS 1.3 throughout.

**Mental health guardrails.** When the model detects distress signals in a conversation, it automatically surfaces the national suicide prevention line (3114). This was non-negotiable from the start — a "friend" app has a duty of care that a general assistant doesn't.

## Stack

- **Backend**: Java 21 + Quarkus 3, Hibernate Panache, Liquibase migrations
- **Frontend**: Angular 21, TailwindCSS 4
- **Database**: PostgreSQL 16
- **Infrastructure**: Docker, Traefik, Nginx
- **External**: OpenAI API, Stripe for subscriptions

## Status

Live at [serenia.studio](https://serenia.studio). Two stars on GitHub, four open issues, and a growing list of things I want to change now that real users are using it.
