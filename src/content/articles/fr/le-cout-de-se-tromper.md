---
title: "Optimisez pour le coût de l'erreur"
summary: "La plupart des conseils du type « soyez plus prudent » sont un piège. Le meilleur levier, c'est de rendre les erreurs faciles à annuler."
date: 2026-03-15
translationKey: "the-cost-of-being-wrong"
---

Il existe deux façons de gérer le risque d'une erreur. Vous pouvez réduire la probabilité d'avoir tort, ou vous pouvez réduire le coût d'avoir tort. Instinctivement, on saisit la première, et c'est presque toujours le moins bon levier.

Réduire la probabilité d'erreur a un plafond difficile — vous ne pouvez pas atteindre zéro — et plus vous poussez vers ce plafond, plus cela coûte. Revues supplémentaires, validations supplémentaires, prudence supplémentaire. Chacune ralentit tout, y compris les changements qui n'allaient jamais être erronés.

Réduire le *coût* de l'erreur n'a pas ce plafond. Si annuler une erreur est instantané, la probabilité de l'erreur cesse d'être effrayante. Vous êtes libre d'avancer rapidement, parce que rapidement-et-réversible bat lentement-et-prudent presque à chaque fois.

## On le voit partout

- **Déploiements.** Un rollback rapide et automatique rend la taille du déploiement hors sujet. Un rollback lent fait de chaque release une négociation.
- **Données.** Une migration que vous pouvez annuler, c'est un mardi ordinaire. Une que vous ne pouvez pas, c'est un week-end de crise.
- **Décisions.** Les portes à sens unique vs. à double sens de Jeff Bezos, c'est la même idée : les choix réversibles méritent de la vitesse, pas des comités.

## La limite

La réversibilité à faible coût n'est pas gratuite à construire. Des releases immuables, des feature flags, des sauvegardes que vous testez vraiment — c'est du vrai travail, fait avant d'en avoir besoin. La discipline, c'est d'investir dans la réversibilité *quand les choses sont calmes*, pour que lorsque vous avez tort — et vous l'aurez — avoir tort soit ennuyeux.

La prudence semble responsable. Mais les systèmes les plus sereins sur lesquels j'ai travaillé n'étaient pas ceux qui s'efforçaient le plus d'éviter les erreurs. C'étaient ceux où une erreur ne coûtait tout simplement pas grand-chose.
