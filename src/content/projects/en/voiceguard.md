---
title: 'VoiceGuard'
summary: 'An on-device engine that detects AI-generated callers in real time by analysing audio — not phone numbers.'
date: 2026-05-20
translationKey: 'voiceguard'
featured: true
role: 'Solo engineer'
timeline: '2026 · ongoing'
tools: ['Kotlin', 'TensorFlow Lite', 'Android']
tags: ['Android', 'Security', 'ML']
link: 'https://github.com/LofoWalker/VoiceGuard'
---

## Problem

Number-based spam filters have a blind spot: they can't detect a caller whose voice is synthesised on the fly. Modern voice-phishing attacks use text-to-speech and voice-conversion tools that no blocklist will ever catch. The threat arrives looking like a human and sounding like one.

VoiceGuard is a research engine that moves the detection down to the audio stream itself — running entirely on the device, with no data leaving it.

## Approach

The engine combines three complementary signals to distinguish a human caller from an AI one:

- **Behavioural latency** — real conversations have irregular turn-taking gaps; AI pipelines tend to be suspiciously consistent.
- **Background-noise linearity** — synthesised audio often has artificially clean silence or a looped ambient track.
- **Spectral artifacts** — a lightweight TensorFlow Lite model flags the anomalies that neural vocoders leave in the frequency domain.

None of these signals is reliable alone. Together, with a short analysis window, they push detection accuracy above 85% at under 50 ms per chunk.

## Architecture

The engine follows a hexagonal architecture in Kotlin, with Coroutines and StateFlow keeping the audio pipeline non-blocking. The ML model runs on-device via TensorFlow Lite — no network call, no latency budget eaten by a round trip.

## Status

Currently specification-first: the product requirements document is guiding the initial R&D phase, with the detection pipeline under active development.
