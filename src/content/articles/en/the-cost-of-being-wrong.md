---
title: 'Optimise for the cost of being wrong'
summary: 'Most "be more careful" advice is a trap. The better lever is making mistakes cheap to undo.'
date: 2026-03-15
translationKey: 'the-cost-of-being-wrong'
---

There are two ways to deal with the risk of a mistake. You can lower the
chance of being wrong, or you can lower the cost of being wrong. We
instinctively reach for the first, and it's almost always the worse lever.

Lowering the chance of error has a hard ceiling — you cannot get to zero —
and the closer you push, the more it costs. Extra reviews, extra sign-off,
extra caution. Each one slows everything down, including the changes that
were never going to be wrong.

Lowering the *cost* of error has no such ceiling. If undoing a mistake is
instant, the probability of the mistake stops being frightening. You're free
to move quickly, because quickly-and-reversible beats slowly-and-careful
almost every time.

## It shows up everywhere

- **Deploys.** Fast, automatic rollback makes deploy size irrelevant. Slow
  rollback makes every release a negotiation.
- **Data.** A migration you can reverse is a Tuesday. One you can't is a
  weekend.
- **Decisions.** Jeff Bezos's one-way vs. two-way doors are the same idea:
  reversible choices deserve speed, not committees.

## The catch

Cheap reversal isn't free to build. Immutable releases, feature flags,
backups you actually test — these are real work, done before you need them.
The discipline is investing in reversibility *while things are calm*, so that
when you're wrong — and you will be — being wrong is boring.

Caution feels responsible. But the calmest systems I've worked on weren't
the ones that tried hardest to avoid mistakes. They were the ones where a
mistake simply didn't cost much.
