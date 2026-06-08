---
title: "Serenia"
summary: "Une application de chat IA axée sur l'authenticité — un compagnon conversationnel qui ressemble à un ami, pas à un bot de support."
date: 2025-11-30
translationKey: "serenia"
featured: true
role: "Ingénieur solo"
timeline: "2025 · en cours"
tools: ["Java", "Quarkus", "Angular", "PostgreSQL"]
tags: ["Full-stack", "IA", "Produit"]
link: "https://serenia.studio"
---

## Problème

La plupart des assistants IA sont optimisés pour l'utilité : précis, formels et légèrement épuisants. Serenia est parti d'une question différente — et si l'objectif était de donner l'impression de parler à un ami proche ?

L'application donne à l'IA une personnalité distincte : décontractée, parfois sarcastique, jamais verbeuse. Les messages sont limités à 180 caractères. C'est plus proche d'un fil de SMS que d'une base de connaissances.

## Décisions de conception

**Le ton avant les fonctionnalités.** La surface produit est délibérément restreinte — chat, historique, abonnement. L'investissement a porté sur la cohérence et l'humanité du caractère de l'IA. Cela a nécessité beaucoup de prompt engineering et beaucoup de lecture de réponses qui semblaient légèrement décalées.

**La sécurité en couche de base.** Les conversations sont sensibles. L'architecture utilise des clés de chiffrement dérivées de l'utilisateur (HKDF) pour que l'historique des messages soit chiffré d'une façon que le serveur ne peut pas lire. Authentification JWT sur RSA, TLS 1.3 partout.

**Garde-fous en santé mentale.** Lorsque le modèle détecte des signaux de détresse dans une conversation, il remonte automatiquement le numéro national de prévention du suicide (3114). C'était non-négociable depuis le début — une application « ami » a un devoir de soin qu'un assistant général n'a pas.

## Stack

- **Backend** : Java 21 + Quarkus 3, Hibernate Panache, migrations Liquibase
- **Frontend** : Angular 21, TailwindCSS 4
- **Base de données** : PostgreSQL 16
- **Infrastructure** : Docker, Traefik, Nginx
- **Externe** : API OpenAI, Stripe pour les abonnements

## Statut

En production sur [serenia.studio](https://serenia.studio). Deux étoiles sur GitHub, quatre issues ouvertes, et une liste croissante de choses que je veux changer maintenant que de vrais utilisateurs l'utilisent.
