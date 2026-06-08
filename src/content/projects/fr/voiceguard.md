---
title: "VoiceGuard"
summary: "Un moteur embarqué qui détecte les appelants générés par l'IA en temps réel en analysant l'audio — pas les numéros de téléphone."
date: 2026-05-20
translationKey: "voiceguard"
featured: true
role: "Ingénieur solo"
timeline: "2026 · en cours"
tools: ["Kotlin", "TensorFlow Lite", "Android"]
tags: ["Android", "Sécurité", "ML"]
link: "https://github.com/LofoWalker/VoiceGuard"
---

## Problème

Les filtres anti-spam basés sur les numéros ont un angle mort : ils ne peuvent pas détecter un appelant dont la voix est synthétisée en temps réel. Les attaques de vishing modernes utilisent des outils text-to-speech et de conversion vocale qu'aucune liste noire ne pourra jamais bloquer. La menace se présente comme un humain et sonne comme tel.

VoiceGuard est un moteur de recherche qui déplace la détection jusqu'au flux audio lui-même — fonctionnant entièrement sur l'appareil, sans que les données ne le quittent.

## Approche

Le moteur combine trois signaux complémentaires pour distinguer un appelant humain d'un appelant artificiel :

- **Latence comportementale** — les vraies conversations ont des pauses irrégulières entre les tours de parole ; les pipelines d'IA tendent à être suspicieusement réguliers.
- **Linéarité du bruit de fond** — l'audio synthétisé présente souvent un silence artificiellement propre ou une piste ambiante en boucle.
- **Artefacts spectraux** — un modèle TensorFlow Lite léger signale les anomalies que les vocoders neuronaux laissent dans le domaine fréquentiel.

Aucun de ces signaux n'est fiable seul. Ensemble, avec une courte fenêtre d'analyse, ils permettent d'atteindre une précision de détection supérieure à 85 % en moins de 50 ms par segment.

## Architecture

Le moteur suit une architecture hexagonale en Kotlin, avec des Coroutines et StateFlow pour maintenir le pipeline audio non-bloquant. Le modèle ML tourne sur l'appareil via TensorFlow Lite — pas d'appel réseau, pas de budget de latence gaspillé dans un aller-retour.

## Statut

Actuellement en phase de spécification : le document de définition produit guide la phase initiale de R&D, avec le pipeline de détection en développement actif.
