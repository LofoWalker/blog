---
title: 'Writing a case study is thinking twice'
summary: 'Why I write up projects after they ship — and what the writing keeps catching that the work missed.'
date: 2026-05-02
translationKey: 'writing-is-thinking'
---

The first time I wrote up a project properly, I found a bug. Not in the code
— the code had been in production for months. The bug was in my
understanding of why the project had worked.

I'd attributed a performance win to one change when, writing it out in
order, it was obviously a different one. The story I'd been telling people
was wrong. Nobody had noticed, because nobody had been forced to lay the
reasoning end to end.

That's the quiet value of a case study. Code review checks whether the work
is correct. Writing checks whether your *understanding* of the work is
correct, and those are not the same thing.

## The structure does the work

I write every project the same way: problem, context, process, result,
reflection. It feels rigid until you notice the structure is interrogating
you.

"Context" asks why the problem existed at all, which is where you discover
you solved a symptom. "Reflection" asks what you'd do differently, which is
where you admit the thing you've been avoiding admitting. The headings are
just questions a good colleague would ask, asked reliably.

## Write for the version of you in two years

The audience for a case study isn't really other people. It's you, later,
having forgotten everything, trying to remember whether this approach worked
and why. Write so that person trusts you. Be honest about the tradeoffs and
the parts that got lucky.

If the writing is good, the design disappears behind it — and so does the
self-congratulation. What's left is the reasoning, which is the only part
worth keeping.
