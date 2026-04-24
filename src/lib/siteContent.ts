export type WorkProject = {
  title: string;
  category: string;
  status: string;
  code: string;
  niche: string;
  homepage: boolean;
  demoHref: string;
  summary: string;
  weakness: string;
  changed: string;
  result: string;
  whyItWorks: string;
};

export const workProjects: WorkProject[] = [
  {
    title: 'Harrow & Calloway',
    category: 'Legal Services',
    status: 'CASEFLOW READY',
    code: 'AX-041',
    niche: 'LEGAL',
    homepage: false,
    demoHref: '/work#harrow-calloway',
    summary: 'A proof-forward legal presence built around clear case paths and consultation intent.',
    weakness: 'Dense copy, buried trust signals, and no clear intake path.',
    changed: 'A sharper case-type structure, proof-forward pages, and a focused consultation path.',
    result: 'A firm presence that feels established before the first call.',
    whyItWorks: 'Buyers can identify the right case path, see proof early, and reach the consultation action without reading through a wall of firm copy.',
  },
  {
    title: 'Aurelia Dental Studio',
    category: 'Healthcare & Medical',
    status: 'TRUST SYSTEM',
    code: 'AX-031',
    niche: 'HEALTH',
    homepage: true,
    demoHref: '/work#aurelia-dental-studio',
    summary: 'A calmer healthcare interface that makes quality, procedures, and appointments easier to trust.',
    weakness: 'Generic healthcare layout with slow trust-building and weak mobile scanning.',
    changed: 'Procedure pages, proof placement, and a calmer appointment path.',
    result: 'Patients understand care quality faster and can act without hunting.',
    whyItWorks: 'The hierarchy reduces anxiety: procedure clarity, trust signals, and appointment flow are visible before the visitor has to make a decision.',
  },
  {
    title: 'Blackline Barber Co.',
    category: 'Personal Services & Grooming',
    status: 'BOOKING PATH',
    code: 'AX-027',
    niche: 'GROOMING',
    homepage: true,
    demoHref: '/work#blackline-barber-co',
    summary: 'A sharper grooming brand surface that keeps the path to booking short.',
    weakness: 'Strong local service, but the site did not communicate polish or booking confidence.',
    changed: 'A tighter brand system, service menu hierarchy, and direct booking route.',
    result: 'The shop reads premium while keeping the path to a chair short.',
    whyItWorks: 'The page gives the shop a more established first impression while making service selection and booking feel immediate.',
  },
  {
    title: 'Lacquer Nail Studio',
    category: 'Salon & Beauty',
    status: 'LIVE DEMO',
    code: 'AX-014',
    niche: 'BEAUTY',
    homepage: true,
    demoHref: '/work#lacquer-nail-studio',
    summary: 'A polished beauty booking surface that turns social proof into a real web presence.',
    weakness: 'Visual quality lived on social channels, while the website felt thin.',
    changed: 'A high-trust service experience with booking cues, service proof, and mobile-first flow.',
    result: 'A studio presence that feels booked, polished, and easy to choose.',
    whyItWorks: 'The site turns taste into structure: services, proof, and booking cues are ordered for fast mobile decisions.',
  },
  {
    title: 'Ember & Oak Kitchen',
    category: 'Restaurant & Hospitality',
    status: 'MENU FLOW',
    code: 'AX-052',
    niche: 'HOSPITALITY',
    homepage: false,
    demoHref: '/work#ember-oak-kitchen',
    summary: 'A hospitality interface that makes menu, location, and reservation intent immediate.',
    weakness: 'Menu, hours, and reservation intent were split across too many paths.',
    changed: 'A tighter hospitality surface with menu rhythm, location clarity, and reservation priority.',
    result: 'Guests get the essentials fast without losing the atmosphere.',
    whyItWorks: 'The experience keeps the restaurant feeling premium while letting visitors answer practical questions quickly.',
  },
  {
    title: 'Summit Grounds Co.',
    category: 'Landscaping & Outdoor Services',
    status: 'QUOTE SYSTEM',
    code: 'AX-063',
    niche: 'OUTDOOR',
    homepage: false,
    demoHref: '/work#summit-grounds-co',
    summary: 'A seasonal service surface built to qualify quote intent and show local proof.',
    weakness: 'The offer was seasonal, scattered, and hard to quote from.',
    changed: 'Service-area proof, quote routing, and package framing for local buyers.',
    result: 'More qualified quote intent with less explanation required.',
    whyItWorks: 'Visitors can understand what is offered, where the company works, and what to request before starting a quote.',
  },
  {
    title: 'Ridge & Crown Roofing',
    category: 'Roofing & Exteriors',
    status: 'LEAD ROUTE',
    code: 'AX-071',
    niche: 'EXTERIORS',
    homepage: false,
    demoHref: '/work#ridge-crown-roofing',
    summary: 'An urgency-aware exterior services system for emergency and replacement buyers.',
    weakness: 'Emergency and replacement buyers could not quickly separate services.',
    changed: 'Urgency-based pathways, proof placement, and conversion-focused service pages.',
    result: 'The site routes higher-intent visitors before they bounce to competitors.',
    whyItWorks: 'The structure separates urgent repairs from planned replacements, which helps buyers self-route quickly.',
  },
];

export const processSteps = [
  {
    title: 'Review',
    body: 'We audit the current site, offer, proof, and points where visitors lose trust.',
    signal: 'TRUST LOSS MAP',
    client: 'Current site access, business goals, service details, and any existing proof.',
    axiom: 'Offer clarity audit, trust map, speed review, and conversion-path diagnosis.',
  },
  {
    title: 'Scope',
    body: 'We lock the pages, conversion paths, structure, and priorities before design starts.',
    signal: 'PATH LOCKED',
    client: 'Approval on page list, primary calls to action, and priority services.',
    axiom: 'Sitemap, content structure, conversion paths, and project sequence.',
  },
  {
    title: 'Build',
    body: 'We design, write, develop, and test the site in production-ready form.',
    signal: 'SYSTEM ASSEMBLY',
    client: 'Fast feedback during checkpoints and any missing business details.',
    axiom: 'Interface design, copy refinement, React development, responsive QA, and performance checks.',
  },
  {
    title: 'Launch',
    body: 'We connect the domain, verify performance, and hand over a live system.',
    signal: 'LIVE CHECKS',
    client: 'Domain access and final approval to publish.',
    axiom: 'Domain connection, launch checklist, analytics basics, post-launch support path, and clean handoff.',
  },
];

export const pricingPlans = [
  {
    name: 'Subscription',
    tag: 'Preferred Path',
    price: 'Starts at $150/mo',
    description: 'Low upfront cost with hosting, support, and ongoing edits included.',
    features: [
      'Up to 5 pages',
      'Hosting included',
      'Ongoing edits and support',
      'Month-to-month after launch',
      'Full ownership available at month 12',
      '3 rounds of revisions',
    ],
  },
  {
    name: 'Ownership Build',
    price: 'Starts at $3,500',
    description: 'One payment. Full code ownership at launch.',
    features: [
      'Up to 5 pages',
      'Full code ownership at launch',
      'Launch support included',
      'Hosting scoped separately',
      'SEO foundation',
      '3 rounds of revisions',
    ],
  },
  {
    name: 'E-commerce / Rebuilds',
    price: 'Custom',
    description: 'Scoped builds for stores, migrations, and larger systems.',
    features: [
      'Store setup or rebuild',
      'Migration support',
      'Integrations as needed',
      'Launch support included',
      'Scoped pricing',
      'Scoped revisions',
    ],
  },
];

export const pricingComparison = [
  ['Upfront cost', 'Low', '$3,500+', 'Scoped'],
  ['Hosting', 'Included', 'Scoped separately', 'Scoped'],
  ['Ongoing edits', 'Included', 'Optional support', 'Scoped'],
  ['Code ownership', 'Available at month 12', 'Included at launch', 'Included by scope'],
  ['Best fit', 'Local service businesses', 'Ownership-focused teams', 'Stores and larger rebuilds'],
];

export const pricingFaq = [
  ['How long does a typical launch take?', 'Most focused business sites launch in 2-4 weeks depending on scope, feedback speed, and content readiness.'],
  ['Can I move from monthly to ownership later?', 'Yes. Subscription clients can move to full ownership at month 12.'],
  ['Are edits included?', 'Monthly clients keep ongoing support and edits included. Ownership builds include launch support and can add support separately.'],
  ['Do you build e-commerce?', 'Yes. Stores, migrations, and larger rebuilds are scoped separately so the price matches the actual system.'],
];

export const whyAxiomPoints = [
  ['No unclear offer.', 'If a visitor cannot understand what you do in seconds, the page is not finished.'],
  ['No buried proof.', 'Reviews, past work, and trust signals belong where buyers actually look.'],
  ['No slow first load.', 'Performance is not a bonus. It is part of the sale.'],
  ['No dead-end handoff.', 'Monthly clients keep support. Ownership clients get a clean exit.'],
];

export const aboutPrinciples = [
  ['Clear offer first', 'The first screen should make the business, service, and next action obvious.'],
  ['Proof where buyers look', 'Trust signals belong near decisions, not hidden in a footer or separate page.'],
  ['Performance as sales infrastructure', 'Speed, mobile scanning, and accessibility are part of conversion quality.'],
  ['Support after launch', 'A finished site should either have ongoing support or a clean ownership handoff.'],
];

export const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'Axiom Infrastructure collects only the information needed to respond to inquiries, prepare project scopes, and operate the website.',
      'Contact form and email information may include your name, email address, business name, website URL, phone number, project details, and budget context.',
      'We do not sell personal information. Information may be used to communicate with you, provide requested services, improve the website, and maintain basic records.',
      'For privacy questions, contact contact@getaxiom.ca.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    body: [
      'This website provides general information about Axiom Infrastructure services. Project terms, scope, timelines, payment structure, ownership, and support are defined in written project agreements.',
      'Website content, layouts, and visuals may not be copied or reused without permission.',
      'Demo work shown on this site represents concept systems and design direction unless otherwise stated.',
      'For terms questions, contact contact@getaxiom.ca.',
    ],
  },
};
