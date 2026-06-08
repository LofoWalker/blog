export type Lang = 'fr' | 'en';
export const langs: Lang[] = ['fr', 'en'];
export const defaultLang: Lang = 'fr';

const ui = {
  fr: {
    'nav.work': 'Projets',
    'nav.writing': 'Articles',
    'nav.switch': 'EN',
    'nav.switchLang': 'en' as Lang,
    'home.eyebrow': 'Ingénieur logiciel',
    'home.hero': 'Je développe des trucs. Parfois pour moi, souvent pour les autres.',
    'home.lead': "Je m'appelle Tom — un ingénieur qui aime mener ses projets de bout en bout et raconter les décisions qui se cachent derrière.",
    'home.cta': 'Voir mes projets',
    'home.recentWork': 'Projets récents',
    'home.allProjects': 'Tous les projets →',
    'home.writing': 'Articles',
    'home.allArticles': 'Tous les articles →',
    'home.prevProject': 'Projet précédent',
    'home.nextProject': 'Projet suivant',
    'projects.eyebrow': 'Mes projets',
    'projects.description': "Études de cas — les problèmes, les décisions et les résultats derrière chacune de mes réalisations.",
    'projects.back': '← Projets',
    'projects.caseStudy': 'Étude de cas',
    'projects.visit': 'Voir le projet →',
    'projects.facts.published': 'Publié',
    'projects.facts.role': 'Rôle',
    'projects.facts.timeline': 'Durée',
    'projects.facts.tools': 'Outils',
    'articles.eyebrow': 'Articles',
    'articles.title': 'Articles',
    'articles.lead': "Notes et essais sur l'ingénierie, les produits et les idées.",
    'articles.description': "Réflexions sur l'ingénierie, les produits et les idées.",
    'articles.back': '← Articles',
    '404.title': 'Page introuvable',
    '404.message': "Cette page n'existe pas.",
    '404.back': '← Accueil',
  },
  en: {
    'nav.work': 'Work',
    'nav.writing': 'Writing',
    'nav.switch': 'FR',
    'nav.switchLang': 'fr' as Lang,
    'home.eyebrow': 'Software Engineer',
    'home.hero': 'I build stuff. Sometimes for me, mostly for others.',
    'home.lead': "I'm Tom — an engineer who likes shipping things end to end and writing about the decisions behind them.",
    'home.cta': 'View work',
    'home.recentWork': 'Recent work',
    'home.allProjects': 'All projects →',
    'home.writing': 'Writing',
    'home.allArticles': 'All articles →',
    'home.prevProject': 'Previous project',
    'home.nextProject': 'Next project',
    'projects.eyebrow': 'My projects',
    'projects.description': "Case studies — the problems, decisions and outcomes behind the things I've built.",
    'projects.back': '← Work',
    'projects.caseStudy': 'Case study',
    'projects.visit': 'Visit project →',
    'projects.facts.published': 'Published',
    'projects.facts.role': 'Role',
    'projects.facts.timeline': 'Timeline',
    'projects.facts.tools': 'Tools',
    'articles.eyebrow': 'Writing',
    'articles.title': 'Articles',
    'articles.lead': 'Notes and essays on engineering, products and ideas.',
    'articles.description': 'Writing on engineering, products and ideas.',
    'articles.back': '← Writing',
    '404.title': 'Page not found',
    '404.message': "This page doesn't exist.",
    '404.back': '← Home',
  },
} as const;

export type UIKey = keyof typeof ui['fr'];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui['fr'] as Record<string, string>)[key] ?? key;
  };
}
