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
    summary: 'A sharper trust-first site for a modern law firm.',
    weakness: 'Legal sites often bury trust under generic copy.',
    changed: 'We put credibility, practice areas, and consultation paths up front.',
    result: 'A firm presence that feels established before the first call.',
    whyItWorks: 'Visitors understand the firm faster and know where to act.',
  },
  {
    title: 'Aurelia Dental Studio',
    category: 'Healthcare / Dental',
    status: 'TRUST SYSTEM',
    code: 'AX-031',
    niche: 'HEALTH',
    homepage: true,
    demoHref: '/work#aurelia-dental-studio',
    summary: 'A calm, trust-first site for patient inquiries.',
    weakness: 'Dental sites often feel cluttered or overly clinical.',
    changed: 'We simplified the path from trust to appointment.',
    result: 'Patients understand care quality faster and can act without hunting.',
    whyItWorks: 'Patients can understand services and book without friction.',
  },
  {
    title: 'Blackline Barber Co.',
    category: 'Grooming',
    status: 'BOOKING PATH',
    code: 'AX-027',
    niche: 'GROOMING',
    homepage: true,
    demoHref: '/work#blackline-barber-co',
    summary: 'A sharper web presence for a serious barber brand.',
    weakness: 'Barber sites often rely only on Instagram.',
    changed: 'We gave the brand a clear booking and service system.',
    result: 'The shop reads premium while keeping the path to a chair short.',
    whyItWorks: 'The business looks established before the customer walks in.',
  },
  {
    title: 'Lacquer Nail Studio',
    category: 'Salon / Beauty',
    status: 'LIVE DEMO',
    code: 'AX-014',
    niche: 'BEAUTY',
    homepage: true,
    demoHref: '/work#lacquer-nail-studio',
    summary: 'A premium booking path for a modern nail studio.',
    weakness: 'Salon sites often feel soft, cluttered, or hard to book from.',
    changed: 'We made services, pricing, and booking easier to understand.',
    result: 'A studio presence that feels booked, polished, and easy to choose.',
    whyItWorks: 'The site feels premium without slowing down the customer.',
  },
  {
    title: 'Ember & Oak Kitchen',
    category: 'Restaurant / Hospitality',
    status: 'MENU FLOW',
    code: 'AX-052',
    niche: 'HOSPITALITY',
    homepage: false,
    demoHref: '/work#ember-oak-kitchen',
    summary: 'A restaurant site built around reservations, menu clarity, and location.',
    weakness: 'Restaurant sites often hide hours, menus, or booking paths.',
    changed: 'We made the essentials immediate.',
    result: 'Guests get the essentials fast without losing the atmosphere.',
    whyItWorks: 'Guests can decide and act faster.',
  },
  {
    title: 'Summit Grounds Co.',
    category: 'Landscaping',
    status: 'QUOTE SYSTEM',
    code: 'AX-063',
    niche: 'OUTDOOR',
    homepage: false,
    demoHref: '/work#summit-grounds-co',
    summary: 'A cleaner quote path for a high-end outdoor services company.',
    weakness: 'Landscaping sites often show work without guiding inquiries.',
    changed: 'We structured services, proof, and quote flow clearly.',
    result: 'More qualified quote intent with less explanation required.',
    whyItWorks: 'The site turns interest into a real lead path.',
  },
  {
    title: 'Ridge & Crown Roofing',
    category: 'Roofing / Exteriors',
    status: 'LEAD ROUTE',
    code: 'AX-071',
    niche: 'EXTERIORS',
    homepage: false,
    demoHref: '/work#ridge-crown-roofing',
    summary: 'A direct site for inspections, estimates, and urgent exterior work.',
    weakness: 'Roofing sites often feel generic and hard to trust.',
    changed: 'We made phone, estimate, and service-area paths obvious.',
    result: 'The site routes higher-intent visitors before they bounce to competitors.',
    whyItWorks: 'Homeowners can act quickly without digging.',
  },
];

export const processSteps = [
  {
    title: 'Review',
    body: 'We audit the current site, offer, proof, speed, and conversion path.',
    signal: 'TRUST LOSS MAP',
    client: 'Current site access, business goals, service details, and any existing proof.',
    axiom: 'Offer clarity audit, trust map, speed review, and conversion-path diagnosis.',
  },
  {
    title: 'Scope',
    body: 'We define what needs to be built before design starts.',
    signal: 'PATH LOCKED',
    client: 'Approval on page list, primary calls to action, and priority services.',
    axiom: 'Sitemap, content structure, conversion paths, and project sequence.',
  },
  {
    title: 'Build',
    body: 'We design, write, develop, and test the site.',
    signal: 'SYSTEM ASSEMBLY',
    client: 'Fast feedback during checkpoints and any missing business details.',
    axiom: 'Interface design, copy refinement, React development, responsive QA, and performance checks.',
  },
  {
    title: 'Launch',
    body: 'We connect the domain, verify the site, and hand over the system.',
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
    description: 'Low upfront cost with hosting, support, and edits included.',
    features: [
      'Up to 5 pages',
      'Hosting included',
      'Support included',
      'Month-to-month after launch',
      'Ownership available at month 12',
      '3 rounds of revisions',
    ],
  },
  {
    name: 'Ownership Build',
    price: 'Starts at $3,500',
    description: 'One payment. Full code ownership at launch.',
    features: [
      'Up to 5 pages',
      'Full code handoff',
      'Launch support',
      'SEO foundation',
      'Hosting scoped separately',
      '3 rounds of revisions',
    ],
  },
  {
    name: 'Custom Build',
    price: 'Scoped pricing',
    description: 'For e-commerce, rebuilds, migrations, and larger systems.',
    features: [
      'Store or rebuild scope',
      'Migration support',
      'Integrations as needed',
      'Launch support',
      'Scoped revisions',
      'Clean handoff',
    ],
  },
];

export const pricingComparison = [
  ['Upfront cost', 'Low', '$3,500+', 'Scoped'],
  ['Ownership', 'Available at month 12', 'Included at launch', 'Included by scope'],
  ['Hosting', 'Included', 'Scoped separately', 'Scoped'],
  ['Support', 'Included', 'Optional support', 'Scoped'],
  ['Revisions', '3 rounds', '3 rounds', 'Scoped'],
  ['Best for', 'Local service businesses', 'Ownership-focused teams', 'Stores and larger rebuilds'],
];

export const pricingFaq = [
  ['How long does a build take?', 'Most standard sites launch in 2-4 weeks, depending on scope, content, and revisions.'],
  ['Do I own the website?', 'Ownership builds include full code handoff at launch. Subscription builds can move to ownership later.'],
  ['Is hosting included?', 'Hosting is included with subscription plans. Ownership builds can include hosting support if scoped.'],
  ['Can you rebuild an existing site?', 'Yes. Rebuilds are scoped based on size, content, and technical requirements.'],
  ['Do you work with businesses outside Kitchener-Waterloo?', 'Yes. Axiom is based in KW and can work with businesses across Ontario and Canada.'],
];

export const whyAxiomPoints = [
  ['01 No unclear offer.', 'Visitors should know what you do in seconds.'],
  ['02 No buried proof.', 'Trust signals belong where buyers actually look.'],
  ['03 No slow first load.', 'Performance is part of the sale.'],
  ['04 No dead-end handoff.', 'Monthly clients keep support. Ownership clients get a clean exit.'],
];

export const aboutPrinciples = [
  ['What we believe', 'A business should not lose trust because its website feels unclear, slow, or unfinished.'],
  ['Who we serve', 'We work with local service businesses, professional firms, clinics, trades, hospitality brands, and operators who care about first impressions.'],
  ['How we build', 'We focus on clarity, speed, trust, and clean execution. No template sludge. No bloated handoff.'],
  ['Why it matters', 'People judge before they call. The site has to make the business feel serious fast.'],
];

export const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'Axiom Infrastructure only collects information you choose to send through contact forms, email, or project intake.',
      'We use that information to respond to inquiries and provide services.',
      'We do not sell personal information.',
      'For privacy questions, contact contact@getaxiom.ca.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    body: [
      'By working with Axiom Infrastructure, clients agree to project scopes, payment terms, timelines, and deliverables confirmed in writing before work begins.',
      'Website content, layouts, and visuals may not be copied or reused without permission.',
      'Demo work shown on this site represents concept systems and design direction unless otherwise stated.',
      'For terms questions, contact contact@getaxiom.ca.',
    ],
  },
};
