import { projects } from '../data/portfolio';

export const site = {
  url: 'https://jayasaisrikar.xyz',
  name: 'Jaya Sai Srikar',
  email: 'bjayasaisrikar2004@gmail.com',
  image: '/social-card.png',
};
export const indexedPaths = ['/', '/profile'] as const;
export function getPageMeta(path: string) {
  if (path === '/') return {
    title: 'Jaya Sai Srikar (Jay) | AI Engineer',
    description: 'Jaya Sai Srikar (Jay / Srikar) is an AI engineer and full-stack developer from Vizag, India. Explore FORK, Crosswake, Quoril, AI agents, and production work.',
    canonical: `${site.url}/`, indexed: true,
  };
  if (path === '/profile') return {
    title: 'About Jaya Sai Srikar | AI Engineer & Builder',
    description: 'Meet Jaya Sai Srikar (Jay), an AI engineer based in Vizag, India. Background, technical toolkit, recognition, films, and field notes.',
    canonical: `${site.url}/profile`, indexed: true,
  };
  return { title: 'Page not found | Jaya Sai Srikar', description: 'This page could not be found. Explore Jay’s portfolio and personal notebook.', canonical: '', indexed: false };
}
export function structuredData(path: string) {
  if (!getPageMeta(path).indexed) return null;
  const personId = `${site.url}/#person`;
  const siteId = `${site.url}/#website`;
  const quorilId = 'https://quoril.in/#organization';
  const blocksbridgeId = `${site.url}/#blocksbridge`;
  const person = {
    '@type': 'Person', '@id': personId, name: site.name,
    alternateName: ['Jay', 'Srikar', 'Jaya Sai', 'Jay Srikar', 'Jayasaisrikar'], url: `${site.url}/`,
    description: 'AI engineer and full-stack developer at Blocksbridge Consulting, co-founder of Quoril, based in Visakhapatnam (Vizag), India.',
    jobTitle: ['AI Engineer', 'AI Full-Stack Engineer', 'Co-founder at Quoril'],
    sameAs: ['https://github.com/jayasaisrikar', 'https://x.com/jayasaisrikar'],
    homeLocation: { '@type': 'City', name: 'Visakhapatnam', alternateName: 'Vizag', containedInPlace: { '@type': 'Country', name: 'India' } },
    worksFor: [{ '@id': quorilId }, { '@id': blocksbridgeId }],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Jawaharlal Nehru Technological University Gurajada Vizianagaram', alternateName: 'JNTU-GV' },
    knowsAbout: ['Artificial intelligence engineering', 'AI agent systems', 'LLM applications', 'Full-stack engineering', 'TypeScript', 'Python', 'Next.js', 'MCP', 'PostgreSQL', 'Cloud infrastructure', 'Offline-first software'],
    award: ['ADK-TS Hackathon 2025 — Best Collaboration / MCP Track', 'Smart India Hackathon 2023 — Grand Finalist (Team Lead)'],
  };
  const meta = getPageMeta(path);
  const page = {
    '@type': path === '/profile' ? 'ProfilePage' : 'WebPage',
    '@id': `${meta.canonical}#webpage`, url: meta.canonical, name: meta.title,
    description: meta.description, inLanguage: 'en',
    isPartOf: { '@id': siteId }, about: { '@id': personId }, author: { '@id': personId },
    mainEntity: { '@id': personId },
    ...(path === '/profile' ? { breadcrumb: { '@id': `${meta.canonical}#breadcrumb` } } : {}),
  };
  const graph: Record<string, unknown>[] = [
    { '@type': 'WebSite', '@id': siteId, url: `${site.url}/`, name: 'Jaya Sai Srikar — Personal Portfolio', alternateName: 'Jay’s field notes', inLanguage: 'en', publisher: { '@id': personId } },
    person,
    { '@type': 'Organization', '@id': quorilId, name: 'Quoril', url: 'https://quoril.in', founder: { '@id': personId }, description: 'An offline-first productivity desktop app for macOS and Windows.' },
    { '@type': 'Organization', '@id': blocksbridgeId, name: 'Blocksbridge Consulting' },
    page,
  ];
  if (path === '/') graph.push({
    '@type': 'ItemList', '@id': `${site.url}/#projects`, name: 'Projects by Jaya Sai Srikar',
    itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: {
      '@type': 'SoftwareSourceCode', '@id': `${site.url}/#${p.id}`, name: p.title,
      description: p.description, url: p.demoLink || p.repoLink,
      ...(p.repoLink ? { codeRepository: p.repoLink } : {}),
      ...(p.id === 'quoril' ? { creator: { '@id': quorilId } } : { author: { '@id': personId } }),
    } })),
  });
  if (path === '/profile') graph.push({ '@type': 'BreadcrumbList', '@id': `${meta.canonical}#breadcrumb`, itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
    { '@type': 'ListItem', position: 2, name: 'About Jay', item: meta.canonical },
  ] });
  return { '@context': 'https://schema.org', '@graph': graph };
}
const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function renderHead(path: string) {
  const meta = getPageMeta(path);
  const tag = (name: string, value: string, property = false) => `<meta data-seo ${property ? 'property' : 'name'}="${name}" content="${escape(value)}">`;
  const graph = structuredData(path);
  return [
    `<title data-seo>${escape(meta.title)}</title>`, tag('description', meta.description), tag('author', site.name),
    tag('robots', meta.indexed ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, follow'),
    ...(meta.canonical ? [`<link data-seo rel="canonical" href="${meta.canonical}">`] : []),
    tag('og:type', path === '/profile' ? 'profile' : 'website', true), tag('og:site_name', 'Jaya Sai Srikar', true),
    tag('og:title', meta.title, true), tag('og:description', meta.description, true),
    ...(meta.canonical ? [tag('og:url', meta.canonical, true)] : []),
    tag('og:locale', 'en_US', true), tag('og:image', `${site.url}${site.image}`, true),
    tag('og:image:width', '1200', true), tag('og:image:height', '630', true),
    tag('og:image:type', 'image/png', true), tag('og:image:alt', 'Jaya Sai Srikar — AI Engineer. I build things I wish existed. Engineer by trade, curious by default.', true),
    tag('twitter:card', 'summary_large_image'), tag('twitter:creator', '@jayasaisrikar'),
    tag('twitter:title', meta.title), tag('twitter:description', meta.description), tag('twitter:image', `${site.url}${site.image}`),
    tag('twitter:image:alt', 'Jaya Sai Srikar — AI Engineer. I build things I wish existed.'),
    ...(graph ? [`<script data-seo type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`] : []),
  ].join('\n');
}
