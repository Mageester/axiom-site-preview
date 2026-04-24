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
              READY?
            </h2>
            <p className="mt-4 text-base text-[rgba(235,235,235,0.72)] font-geist">
              Tell us what the business needs. We’ll point you to the right path.
            </p>
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
        title="Concept builds for serious local businesses."
        copy="We build demo systems to show how different industries can look sharper, load faster, and convert more clearly."
      />

      <section className="ax-section-sm">
        <div className="ax-container ax-stack">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <h2 className="ax-section-heading font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>
              Featured concepts
            </h2>
            <p className="ax-section-copy" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
              Three of the clearest demo systems built for beauty, grooming, and healthcare.
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
                      View demo
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
            <p className="ax-label" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>ALL WORK</p>
            <h2 className="mt-6 ax-section-heading font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>
              Seven business systems.
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
        title="Clear paths. No vague packages."
        copy="Choose the model that fits the business. Monthly lowers the upfront cost. Ownership gives full control. Larger builds get scoped before work starts."
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
          <h2 className="ax-section-heading font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>What changes between paths.</h2>
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
        title="A clean build from first review to launch."
        copy="No guessing halfway through. We define the structure, build the system, and launch with checks."
      />
      <section className="ax-section-sm">
        <div className="ax-container ax-stack">
          {processSteps.map((step, index) => (
            <article key={step.title} className="border-t py-10 md:py-14" style={{ borderColor: 'var(--ax-border)' }}>
              <div className="grid gap-8 lg:grid-cols-[0.45fr_1fr]">
                <div>
                  <p className="ax-label" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>{String(index + 1).padStart(2, '0')} / {step.title.toUpperCase()}</p>
                  <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{step.title}</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                  <p className="text-base leading-7" style={{ color: 'rgba(235,235,235,0.8)', fontFamily: 'Geist, sans-serif' }}>{step.body}</p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="ax-label" style={{ color: 'rgba(235,235,235,0.36)', fontFamily: 'Geist, sans-serif' }}>Client provides / approvals</p>
                      <p className="mt-4 text-sm leading-6" style={{ color: 'rgba(235,235,235,0.64)', fontFamily: 'Geist, sans-serif' }}>{step.client}</p>
                    </div>
                    <div>
                      <p className="ax-label" style={{ color: 'rgba(235,235,235,0.36)', fontFamily: 'Geist, sans-serif' }}>Axiom handles</p>
                      <p className="mt-4 text-sm leading-6" style={{ color: 'rgba(235,235,235,0.64)', fontFamily: 'Geist, sans-serif' }}>{step.axiom}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
          <article className="border-t py-10 md:py-14" style={{ borderColor: 'var(--ax-border)' }}>
            <div className="grid gap-8 lg:grid-cols-[0.45fr_1fr]">
              <div>
                <p className="ax-label" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>05 / SUPPORT</p>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>Support</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <p className="text-base leading-7" style={{ color: 'rgba(235,235,235,0.8)', fontFamily: 'Geist, sans-serif' }}>
                  Monthly clients keep support after launch. Ownership clients get a clean handoff.
                </p>
              </div>
            </div>
          </article>
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
        title="A web infrastructure studio for serious local businesses."
        copy="Axiom builds fast websites, sharp brand systems, and practical tools for companies that need to look established online."
      />
      <section className="ax-section-sm">
        <div className="ax-container ax-stack">
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
    if (!values.name) {
      setError('Please enter your name.');
      return;
    }
    if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (!values.context) {
      setError('Please tell us what needs to be built.');
      return;
    }

    setError('');
    const subject = encodeURIComponent(`Project inquiry - ${values.business || values.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Business: ${values.business || 'N/A'}`,
        `Website: ${values.website || 'N/A'}`,
        `Project path: ${values.path}`,
        `Timeline: ${values.timeline || 'N/A'}`,
        `Budget: ${values.budget || 'N/A'}`,
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
        copy="Answer a few details. We’ll use them to point you to the right path."
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
              <legend className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>Step 1: Business details</legend>
              <FormField label="Name" value={values.name} onChange={(value) => update('name', value)} required />
              <FormField label="Email" value={values.email} onChange={(value) => update('email', value)} type="email" required />
              <FormField label="Business name" value={values.business} onChange={(value) => update('business', value)} />
              <FormField label="Current website" value={values.website} onChange={(value) => update('website', value)} />
            </fieldset>

            <fieldset className="grid gap-4 border p-6 md:grid-cols-4 md:p-8" style={{ borderColor: 'var(--ax-border)' }}>
              <legend className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>Step 2: Project path</legend>
              {['Subscription', 'Ownership Build', 'Custom Build', 'Not sure yet'].map((path) => (
                <label key={path} className="border p-4 text-sm leading-6 cursor-pointer" style={{ borderColor: values.path === path ? 'rgba(200,255,0,0.58)' : 'var(--ax-border)', color: 'rgba(235,235,235,0.72)', fontFamily: 'Geist, sans-serif' }}>
                  <input className="mr-3" type="radio" name="path" value={path} checked={values.path === path} onChange={(event) => update('path', event.target.value)} />
                  {path}
                </label>
              ))}
              <div className="md:col-span-4 mt-2">
                <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
                  Pick the closest option. We can adjust it later.
                </p>
              </div>
            </fieldset>

            <fieldset className="grid gap-6 border p-6 md:grid-cols-2 md:p-8" style={{ borderColor: 'var(--ax-border)' }}>
              <legend className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>Step 3: Timeline and context</legend>
              <FormField label="Timeline" value={values.timeline} onChange={(value) => update('timeline', value)} />
              <FormField label="Budget range" value={values.budget} onChange={(value) => update('budget', value)} />
              <label className="grid gap-3 md:col-span-2" style={{ color: 'rgba(235,235,235,0.66)', fontFamily: 'Geist, sans-serif' }}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">What needs to be built or fixed?</span>
                <textarea value={values.context} onChange={(event) => update('context', event.target.value)} required rows={7} className="border bg-transparent p-4 text-base leading-7 outline-none" style={{ borderColor: 'var(--ax-border)', color: 'var(--ax-text)', borderRadius: 0 }} />
              </label>
            </fieldset>

            <div className="flex flex-col gap-3">
              <button type="submit" className="ax-button w-fit">
                Open email draft
              </button>
              <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
                This opens your email app with the project details filled in.
              </p>
            </div>
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
        title="Start with the problem."
        copy="Send the site, the business, or the thing that needs fixing."
      />
      <section className="ax-section-sm">
        <div className="ax-container grid gap-6 md:grid-cols-3">
          <a className="border p-7" href="mailto:contact@getaxiom.ca" style={{ borderColor: 'var(--ax-border)', color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>contact@getaxiom.ca</a>
          <a className="border p-7" href="tel:+12267531833" style={{ borderColor: 'var(--ax-border)', color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>(226) 753-1833</a>
          <div className="border p-7" style={{ borderColor: 'var(--ax-border)' }}>
            <Link className="text-[14px] font-semibold uppercase tracking-[0.16em]" to="/start-a-project" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>Start a project</Link>
            <p className="mt-4 text-sm leading-6" style={{ color: 'rgba(235,235,235,0.62)', fontFamily: 'Geist, sans-serif' }}>For project requests, use the intake form so we have the details upfront.</p>
          </div>
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
