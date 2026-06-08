---
title: "MyCraft"
summary: "Minecraft tourne sur un seul cœur depuis 2009. J'ai voulu savoir ce que ça donnerait de reconstruire un moteur voxel from scratch, en Java, avec une architecture ECS et le parallélisme comme contrainte de départ."
cover: "/mycraft.webp"
date: 2026-06-01
translationKey: "mycraft"
featured: true
draft: false
role: "Ingénieur solo"
timeline: "2026 · en cours"
tools: ["Java 26", "LWJGL 3", "OpenGL", "JOML"]
tags: ["Moteur de jeu", "ECS", "Voxel"]
---
# Et si on réécrivait Minecraft aujourd'hui ?

Tout est parti d'une question un peu bête que je me suis posée l'autre soir : pourquoi Minecraft n'exploite-t-il pas mieux nos processeurs modernes ?

On a tous des machines avec 8, 12, parfois 16 cœurs. Et pourtant, quand tu lances Minecraft, tu vois encore un cœur ramer tout seul pendant que les autres se tournent les pouces. Réflexe classique de dev : « il suffit de répartir le boulot sur plusieurs threads, non ? »

Dit comme ça, ça paraît évident. Le jeu gère un monde immense, des milliers de blocs, des centaines d'entités, de la génération procédurale, de l'IA, de la physique… typiquement le genre de truc qu'on a envie de découper en morceaux pour les faire tourner en parallèle.

Alors j'ai creusé. Je pensais tomber sur deux-trois vieux choix techniques, me convaincre qu'une réécriture moderne réglerait l'affaire, et passer à autre chose. Évidemment, c'était plus compliqué que ça.

Parce qu'avant de parler de threads ou de perfs, il faut comprendre comment le jeu est construit. Et là, un détail prend tout son sens : Minecraft est né en 2009. Pas les mêmes machines, pas les mêmes contraintes, pas les mêmes attentes. Le jeu a grandi autour d'une énorme boucle de simulation qui met à jour le monde en continu : à chaque tick, il repasse sur les blocs, les entités, les fluides, et recommence.

Plus je regardais cette boucle, plus je comprenais pourquoi le multithreading n'avait rien d'une solution miracle. Le problème n'est pas de lancer plusieurs threads. C'est de savoir ce qu'on va leur faire faire.

## Le mauvais problème

C'est à peu près là que j'ai compris que je m'attaquais au mauvais problème.

Mon premier réflexe, comme tout le monde, ça avait été de chercher où caser des threads. Quand un truc est lent, on regarde les ressources dispo et on se dit qu'il suffit de mieux les utiliser. Sauf qu'un thread, ce n'est pas une solution d'architecture. C'est un accélérateur. Et accélérer un système mal rangé, c'est surtout une bonne façon d'atteindre le mur plus vite.

Le fonctionnement de Minecraft repose sur cette grosse boucle qui revient en permanence sur les mêmes données, parfois dans un ordre bien précis. Rajouter des threads là-dedans, ça ne simplifie rien, ça empile juste de la complexité sur un truc qui en a déjà pas mal.

Et c'est là que je retombe sur l'ECS (Entity Component System).

Le concept, je le connaissais déjà. J'avais lu les articles qui expliquent que c'est « la bonne manière » de faire un moteur moderne, et j'avais sûrement hoché la tête en faisant semblant de comprendre avant de passer à autre chose. Cette fois, ça revenait sous un autre angle.

L'intérêt de l'ECS, ce n'est pas d'être à la mode. C'est qu'il t'oblige à organiser le moteur autour des données plutôt qu'autour des objets.

Pour bien visualiser le changement de paradigme, prenons l'exemple d'un Creeper. Dans une approche Orientée Objet classique (comme celle de 2009), on aurait un gros objet fourre-tout qui ressemble à ça :

```java
// L'approche "Minecraft 2009" : La classe géante
public class Creeper extends Monster {
    private float x, y, z;
    private int health;
    private boolean isExploding;

    public void update() {
        // Gérer la gravité
        // Chercher le joueur
        // Se déplacer
        // Gérer le compte à rebours d'explosion
        // Calculer les collisions
    }
}
```

Dans ce modèle, si on veut paralléliser l'appel à `update()`, on s'expose instantanément à des *race conditions* infernales sur l'état du monde.

Avec l'ECS, on casse tout. Une entité n'est plus un gros objet qui trimballe son état et sa logique : c'est juste un identifiant. Les données vivent dans des composants (qui sont de la donnée pure, par exemple des `record` en Java), et la logique vit dans des systèmes.

```java
// L'approche ECS : De la donnée pure
record Position(float x, float y, float z) {}
record Velocity(float dx, float dy, float dz) {}
record Explosive(int fuseTimer, float radius) {}
record AIChase(int targetEntityId, float speed) {}
```

D'un coup, l'architecture de notre jeu ressemble plutôt à cette matrice :

| Entité | Composants attachés (Données) | Systèmes applicables (Logique) |
| --- | --- | --- |
| **Creeper** (ID: 42) | `Position`, `Velocity`, `AIChase`, `Explosive` | `MovementSystem`, `AISystem`, `ExplosionSystem` |
| **Flèche** (ID: 43) | `Position`, `Velocity`, `Projectile` | `MovementSystem`, `CollisionSystem` |
| **Joueur** (ID: 44) | `Position`, `Velocity`, `PlayerInput` | `MovementSystem`, `InputSystem` |

Le système de déplacement (`MovementSystem`) ne fait que du déplacement : il prend toutes les entités qui ont une position et une vélocité, et fait son calcul. Le système d'explosion ne gère que les comptes à rebours. C'est presque du principe SOLID poussé à l'extrême, appliqué au jeu vidéo.

Chaque pièce devient plus simple à comprendre, à faire évoluer, et, accessoirement, à faire tourner en parallèle le jour où on en aura vraiment besoin. Paralléliser un `MovementSystem` qui ne fait que lire des vitesses pour écrire des positions devient infiniment plus sain. L'ECS ne règle pas le multithreading par magie. Il règle la question d'avant : comment éviter que chaque système dépende en douce de tout le reste.

À ce stade, j'ai aussi commencé à rigoler tout seul. L'idée de départ, c'était « je vais optimiser Minecraft avec des threads ». Et quelques heures plus tard, me voilà à me dire que je vais refaire un moteur voxel complet. Pas franchement la solution la plus rentable si le but était juste de gratter quelques FPS.

## Bon, et maintenant ?

C'est en général le moment où le dev fait ce qu'il adore faire : ouvrir un projet vide et se convaincre que cette fois, ce sera bien fait. Je n'y ai pas coupé.

Pas avec l'idée de concurrencer Minecraft, hein, soyons sérieux. Plutôt de me monter un petit labo perso pour tester ces concepts et voir jusqu'où ils tiennent une fois confrontés à la réalité.

Je l'ai appelé « mycraft ». Pas le nom le plus original du monde, je sais, mais au moins il est honnête. Le monde n'avait clairement pas besoin d'un nouveau clone de Minecraft : il y a déjà Minecraft, et des dizaines de projets du genre portés par des gens bien plus patients que moi. Mais ce n'est pas le sujet. Le but, ce n'est pas de sortir un jeu. C'est de gratter cette curiosité très particulière qu'on a tous : « et si je le refaisais moi-même, juste pour comprendre ? »

## Une fenêtre noire pour commencer

Plutôt que de foncer dans les fonctionnalités, j'ai pris le truc de façon très incrémentale. Une règle simple : chaque étape devait produire quelque chose de compilable, testable et visible à l'écran. Pas question de passer trois semaines sur une belle architecture théorique sans rien voir bouger.

La première étape était presque symbolique : afficher une fenêtre OpenGL. Vu de l'extérieur, c'est ridicule. Mais voir cette fenêtre noire apparaître, c'est souvent le moment où le projet commence à exister pour de vrai.

Ensuite, le cœur du moteur : un ECS minimaliste. Pas d'héritage, pas d'objets fourre-tout. Une entité est un identifiant, les composants portent les données, les systèmes portent la logique. Rien de magique, mais une base saine.

Puis tout s'est enchaîné : les composants, la boucle de jeu, la caméra, un rendu OpenGL minimal, un contrôleur FPS. D'abord un cube. Puis une caméra. Puis un joueur qui se balade librement. Et à un moment, sans trop t'en rendre compte, tu ne fais plus du rendu 3D, tu commences à faire un monde.

J'ai ajouté les voxels, un premier chunk, puis un système de meshing pour virer les faces qu'on ne voit pas. Ensuite une génération procédurale à base de bruit pour donner un peu de relief au terrain. Et là il se passe un truc bizarre : tu te mets à marcher dans un monde qui n'existait pas une seconde plus tôt.

C'est franchement satisfaisant. Le genre de satisfaction qui efface d'un coup les trois soirées précédentes passées à fixer un écran noir parce qu'une matrice de projection était multipliée dans le mauvais sens. Quiconque a déjà touché à de la 3D connaît le fameux syndrome du "Où est passé mon foutu triangle ?". Tu as juste inversé un axe Z sans faire exprès, ta caméra regarde en arrière, et ton monde se génère intégralement dans ton dos pendant que tu scrutes le vide. Mais quand tout s'aligne et que ton premier paysage de blocs s'affiche correctement, l'effort en vaut la peine.

La suite s'est imposée toute seule : la gravité, les collisions, le saut. Et là, j'avais enfin un truc qui ressemblait à un vrai prototype jouable : un perso qui marche, qui saute, et qui interagit avec un monde généré.

## Et le multithreading, alors ?

Le plus drôle dans l'histoire, c'est que le multithreading, la question de départ, n'est toujours pas là. Ou plutôt, il est volontairement absent.

Parce qu'en avançant, j'ai réalisé un truc tout bête : paralléliser un système mal structuré, c'est surtout un excellent moyen de rendre ses bugs plus rapides. Avant de penser virtual threads, génération asynchrone ou meshing en arrière-plan, je voulais d'abord être sûr que la base tenait debout. Que l'ECS était sain. Que les responsabilités étaient claires. Que le monde avait une structure qui se comprend.

## C'est quoi la suite ?

Du coup, les prochaines étapes, c'est justement ce que j'avais en tête au départ sans vraiment le savoir : charger les chunks dynamiquement autour du joueur, les générer en arrière-plan avec les virtual threads de Java 26, et construire le mesh sans bloquer le thread principal.

Et là, seulement là, la vraie question revient : est-ce qu'on peut construire un Minecraft moderne pensé pour le parallélisme dès le départ ?

Je n'ai toujours pas la réponse. Mais au moins, maintenant, j'ai quelque chose de concret pour aller la chercher.

Et si tu veux voir ce que ça donne, c'est ici que ça se passe : https://github.com/LofoWalker/MyCraft