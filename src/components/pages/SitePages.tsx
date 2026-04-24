import { FormEvent, useState } from 'react';
import {
  aboutPrinciples,
  legalPages,
  pricingComparison,
  pricingFaq,
  pricingPlans,
  processSteps,
  workProjects,
} from '../../lib/siteContent';
import { Link } from 'react-router-dom';

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function PageHero({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <header className="ax-section-lg" style={{ paddingTop: 'calc(var(--section-y-lg) + 72px)' }}>
      <div className="ax-container ax-stack-sm">
        <p className="ax-label" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>
          {eyebrow}
        </p>
        <h1 className="ax-page-title" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>
          {title}
        </h1>
        <p className="ax-section-copy" style={{ color: 'rgba(235,235,235,0.62)', fontFamily: 'Geist, sans-serif' }}>
          {copy}
        </p>
      </div>
    </header>
  );
}

function RouteCTA() {
  return (
    <section className="ax-section-sm">
      <div className="ax-container border px-6 py-10 md:px-10 md:py-12" style={{ borderColor: 'var(--ax-border)', background: 'var(--ax-surface)' }}>
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="ax-label" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>START</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>
              Build the system properly.
            </h2>
          </div>
          <Link className="ax-button" to="/start-a-project">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WorkPage() {
  const featured = workProjects.filter((project) => project.homepage);

  return (
    <>
      <PageHero
        eyebrow="WORK"
        title="Concept systems for serious local businesses."
        copy="Seven demo concepts showing how Axiom turns unclear local-business websites into sharper proof, booking, quote, and trust systems."
      />

      <section className="ax-section-sm">
        <div className="ax-container ax-stack">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <h2 className="ax-section-heading font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>
              Featured concepts
            </h2>
            <p className="ax-section-copy" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
              Homepage proof stays focused on the three clearest demo systems: beauty, grooming, and healthcare.
            </p>
          </div>

          <div className="grid gap-8">
            {featured.map((project) => (
              <article key={project.title} className="border p-6 md:p-9" style={{ borderColor: 'var(--ax-border)', background: 'var(--ax-surface)' }}>
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <p className="ax-label" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>{project.code} / {project.niche}</p>
                    <h3 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-6xl" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{project.title}</h3>
                    <p className="mt-4 text-sm uppercase tracking-[0.16em]" style={{ color: 'rgba(235,235,235,0.42)', fontFamily: 'Geist, sans-serif' }}>{project.category}</p>
                  </div>
                  <div className="ax-stack-sm">
                    <p className="text-lg leading-8" style={{ color: 'rgba(235,235,235,0.68)', fontFamily: 'Geist, sans-serif' }}>{project.summary}</p>
                    <a href={project.demoHref} className="w-fit text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>
                      View concept
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ax-section">
        <div className="ax-container ax-stack">
          <div>
            <p className="ax-label" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>FULL INDEX</p>
            <h2 className="mt-6 ax-section-heading font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>
              Seven business systems. No tiny cards.
            </h2>
          </div>

          <div className="grid gap-[var(--content-gap-sm)]">
            {workProjects.map((project, index) => (
              <article id={slug(project.title)} key={project.title} className="scroll-mt-28 border-t py-10 md:py-14" style={{ borderColor: 'var(--ax-border)' }}>
                <div className="grid gap-10 lg:grid-cols-[0.52fr_1fr]">
                  <div>
                    <p className="ax-label" style={{ color: 'rgba(200,255,0,0.68)', fontFamily: 'Geist, sans-serif' }}>
                      {String(index + 1).padStart(2, '0')} / {project.category}
                    </p>
                    <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] md:text-5xl" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>
                      {project.title}
                    </h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      ['Original weakness', project.weakness],
                      ['Axiom changed', project.changed],
                      ['Why it works', project.whyItWorks],
                    ].map(([label, text]) => (
                      <div key={label} className="min-w-0">
                        <p className="ax-label" style={{ color: 'rgba(235,235,235,0.36)', fontFamily: 'Geist, sans-serif' }}>{label}</p>
                        <p className="mt-4 text-base leading-7" style={{ color: 'rgba(235,235,235,0.64)', fontFamily: 'Geist, sans-serif' }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <RouteCTA />
    </>
  );
}

export function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="PRICING"
        title="Real pricing. Clear paths."
        copy="Monthly keeps the upfront cost low. Ownership gives you the keys from day one. Larger rebuilds get scoped cleanly."
      />

      <section className="ax-section-sm">
        <div className="ax-container ax-stack">
          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <article key={plan.name} className="border p-7 md:p-9" style={{ borderColor: index === 0 ? 'rgba(200,255,0,0.48)' : 'var(--ax-border)', background: 'var(--ax-surface)' }}>
                <p className="ax-label" style={{ color: 'rgba(235,235,235,0.36)', fontFamily: 'Geist, sans-serif' }}>PATH / {String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{plan.name}</h2>
                <p className="mt-8 text-4xl font-bold tracking-[-0.055em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{plan.price}</p>
                <p className="mt-5 text-base leading-7" style={{ color: 'rgba(235,235,235,0.62)', fontFamily: 'Geist, sans-serif' }}>{plan.description}</p>
                <ul className="mt-8 grid gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6" style={{ color: 'rgba(235,235,235,0.72)', fontFamily: 'Geist, sans-serif' }}>
                      <span style={{ color: 'var(--ax-lime)' }}>-</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ax-section">
        <div className="ax-container ax-stack">
          <h2 className="ax-section-heading font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>Comparison without the table squeeze.</h2>
          <div className="grid gap-4">
            {pricingComparison.map(([label, subscription, ownership, custom]) => (
              <div key={label} className="grid gap-4 border p-5 md:grid-cols-[0.8fr_1fr_1fr_1fr] md:p-6" style={{ borderColor: 'var(--ax-border)', background: 'rgba(15,15,15,0.72)' }}>
                <p className="font-semibold" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{label}</p>
                {[subscription, ownership, custom].map((value, index) => (
                  <p key={`${label}-${index}`} className="text-sm leading-6" style={{ color: 'rgba(235,235,235,0.62)', fontFamily: 'Geist, sans-serif' }}>{value}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ax-section-sm">
        <div className="ax-container ax-stack">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>FAQ</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {pricingFaq.map(([question, answer]) => (
              <article key={question} className="border p-6 md:p-8" style={{ borderColor: 'var(--ax-border)', background: 'var(--ax-surface)' }}>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{question}</h3>
                <p className="mt-4 text-base leading-7" style={{ color: 'rgba(235,235,235,0.62)', fontFamily: 'Geist, sans-serif' }}>{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <RouteCTA />
    </>
  );
}

export function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="PROCESS"
        title="Review. Scope. Build. Launch."
        copy="Most focused sites launch in 2-4 weeks depending on scope, content readiness, and feedback speed."
      />
      <section className="ax-section-sm">
        <div className="ax-container ax-stack">
          {processSteps.map((step, index) => (
            <article key={step.title} className="border-t py-10 md:py-14" style={{ borderColor: 'var(--ax-border)' }}>
              <div className="grid gap-8 lg:grid-cols-[0.45fr_1fr]">
                <div>
                  <p className="ax-label" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>{String(index + 1).padStart(2, '0')} / {step.signal}</p>
                  <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{step.title}</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    ['Stage', step.body],
                    ['Client provides', step.client],
                    ['Axiom handles', step.axiom],
                  ].map(([label, text]) => (
                    <div key={label}>
                      <p className="ax-label" style={{ color: 'rgba(235,235,235,0.36)', fontFamily: 'Geist, sans-serif' }}>{label}</p>
                      <p className="mt-4 text-base leading-7" style={{ color: 'rgba(235,235,235,0.64)', fontFamily: 'Geist, sans-serif' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <RouteCTA />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="Web infrastructure for serious local businesses."
        copy="Axiom builds high-performance websites, brand systems, and practical AI/business tools that make companies look established before the first call."
      />
      <section className="ax-section-sm">
        <div className="ax-container ax-stack">
          <p className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>
            The site is not decoration. It is the first proof layer customers judge.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {aboutPrinciples.map(([title, body], index) => (
              <article key={title} className="border p-7 md:p-9" style={{ borderColor: 'var(--ax-border)', background: 'var(--ax-surface)' }}>
                <p className="ax-label" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>{String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{title}</h2>
                <p className="mt-5 text-base leading-7" style={{ color: 'rgba(235,235,235,0.62)', fontFamily: 'Geist, sans-serif' }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <RouteCTA />
    </>
  );
}

export function StartProjectPage() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    business: '',
    website: '',
    path: 'Subscription',
    timeline: '',
    budget: '',
    context: '',
  });
  const [error, setError] = useState('');

  const update = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.name || !values.email || !values.business || !values.context) {
      setError('Please add your name, email, business name, and project context.');
      return;
    }

    setError('');
    const subject = encodeURIComponent(`Project inquiry - ${values.business}`);
    const body = encodeURIComponent(
      [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Business: ${values.business}`,
        `Website: ${values.website || 'None provided'}`,
        `Project path: ${values.path}`,
        `Timeline: ${values.timeline || 'Not specified'}`,
        `Budget: ${values.budget || 'Not specified'}`,
        '',
        'What needs to be built or fixed:',
        values.context,
      ].join('\n')
    );
    window.location.href = `mailto:contact@getaxiom.ca?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <PageHero
        eyebrow="START"
        title="Tell us what needs to be built."
        copy="A short intake keeps the first conversation useful. If the path is not obvious, choose Not sure yet."
      />
      <section className="ax-section-sm">
        <div className="ax-container">
          <form onSubmit={submit} className="grid gap-[var(--content-gap)]">
            {error && (
              <p className="border p-4 text-sm" style={{ borderColor: 'rgba(200,255,0,0.45)', color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>
                {error}
              </p>
            )}

            <fieldset className="grid gap-6 border p-6 md:grid-cols-2 md:p-8" style={{ borderColor: 'var(--ax-border)' }}>
              <legend className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>01 / Business</legend>
              <FormField label="Name" value={values.name} onChange={(value) => update('name', value)} required />
              <FormField label="Email" value={values.email} onChange={(value) => update('email', value)} type="email" required />
              <FormField label="Business name" value={values.business} onChange={(value) => update('business', value)} required />
              <FormField label="Website URL if any" value={values.website} onChange={(value) => update('website', value)} />
            </fieldset>

            <fieldset className="grid gap-4 border p-6 md:grid-cols-4 md:p-8" style={{ borderColor: 'var(--ax-border)' }}>
              <legend className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>02 / Project path</legend>
              {['Subscription', 'Ownership Build', 'E-commerce / Rebuild', 'Not sure yet'].map((path) => (
                <label key={path} className="border p-4 text-sm leading-6" style={{ borderColor: values.path === path ? 'rgba(200,255,0,0.58)' : 'var(--ax-border)', color: 'rgba(235,235,235,0.72)', fontFamily: 'Geist, sans-serif' }}>
                  <input className="mr-3" type="radio" name="path" value={path} checked={values.path === path} onChange={(event) => update('path', event.target.value)} />
                  {path}
                </label>
              ))}
            </fieldset>

            <fieldset className="grid gap-6 border p-6 md:grid-cols-2 md:p-8" style={{ borderColor: 'var(--ax-border)' }}>
              <legend className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>03 / Context</legend>
              <FormField label="Timeline" value={values.timeline} onChange={(value) => update('timeline', value)} />
              <FormField label="Budget range" value={values.budget} onChange={(value) => update('budget', value)} />
              <label className="grid gap-3 md:col-span-2" style={{ color: 'rgba(235,235,235,0.66)', fontFamily: 'Geist, sans-serif' }}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">What needs to be built or fixed</span>
                <textarea value={values.context} onChange={(event) => update('context', event.target.value)} required rows={7} className="border bg-transparent p-4 text-base leading-7 outline-none" style={{ borderColor: 'var(--ax-border)', color: 'var(--ax-text)', borderRadius: 0 }} />
              </label>
            </fieldset>

            <button type="submit" className="ax-button w-fit">
              Submit project brief
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-3" style={{ color: 'rgba(235,235,235,0.66)', fontFamily: 'Geist, sans-serif' }}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} type={type} required={required} className="min-h-[48px] border bg-transparent px-4 text-base outline-none" style={{ borderColor: 'var(--ax-border)', color: 'var(--ax-text)', borderRadius: 0 }} />
    </label>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Start with the business problem."
        copy="Send the context, timeline, and path you are considering. We will point you toward monthly, ownership, or a scoped build."
      />
      <section className="ax-section-sm">
        <div className="ax-container grid gap-6 md:grid-cols-3">
          <a className="border p-7" href="mailto:contact@getaxiom.ca" style={{ borderColor: 'var(--ax-border)', color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>contact@getaxiom.ca</a>
          <a className="border p-7" href="tel:+12267531833" style={{ borderColor: 'var(--ax-border)', color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>(226) 753-1833</a>
          <Link className="border p-7" to="/start-a-project" style={{ borderColor: 'rgba(200,255,0,0.44)', color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>Start a project</Link>
        </div>
      </section>
    </>
  );
}

export function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const page = legalPages[type];

  return (
    <>
      <PageHero eyebrow="LEGAL" title={page.title} copy="Plain-language baseline terms for the Axiom website and project inquiries." />
      <section className="ax-section-sm">
        <div className="ax-container ax-stack-sm">
          {page.body.map((paragraph) => (
            <p key={paragraph} className="max-w-3xl text-base leading-8" style={{ color: 'rgba(235,235,235,0.66)', fontFamily: 'Geist, sans-serif' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
