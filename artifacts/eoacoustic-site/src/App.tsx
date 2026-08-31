import { type FormEvent, type ReactNode, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronRight, Instagram, Mail, MapPin, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { media } from '@/lib/media';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Collection = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  longDescription: string;
  tone: string;
  application: string;
  specs: [string, string, string];
};

const collections: Collection[] = [
  {
    slug: 'groove',
    name: 'Groove',
    kicker: 'Structured rhythm',
    description: 'A quiet cadence for walls that need a little more presence.',
    longDescription: 'Groove translates the linear grain of the forest into an architectural rhythm. Repeated reliefs catch and soften the light, while the porous needle-fibre body quietly absorbs the room around it.',
    tone: 'groove',
    application: 'Wall',
    specs: ['600 × 1200 mm', '18 mm relief', 'Natural / tinted'],
  },
  {
    slug: 'mosaic',
    name: 'Mosaic',
    kicker: 'Organic geometry',
    description: 'Small pieces, composed into a surface with a human pulse.',
    longDescription: 'Mosaic brings irregularity into focus. Its modular composition can be laid as a calm field or a more expressive constellation—an acoustic surface with the sensibility of a textile.',
    tone: 'mosaic',
    application: 'Wall · Partition',
    specs: ['600 × 600 mm', '12 mm relief', '8 colourways'],
  },
  {
    slug: 'base',
    name: 'The Base Collection',
    kicker: 'The essential surface',
    description: 'The honest, softly textured starting point for a considered interior.',
    longDescription: 'The Base Collection lets the EOACOUSTIC material speak in its most direct form. A lightly felted surface, made for broad architectural gestures, discreet ceilings and spaces where quiet should feel effortless.',
    tone: 'base',
    application: 'Wall · Ceiling',
    specs: ['600 × 1200 mm', '25 mm thickness', 'Natural finish'],
  },
  {
    slug: 'island',
    name: 'Island Wall Collection',
    kicker: 'A shape within space',
    description: 'Soft-edged islands that organise sound without closing a room in.',
    longDescription: 'Island Wall Collection is a family of generous, sculptural forms. Float one as a focal point or build a composition across a wall; every edge is considered to make the room feel calmer, not more contained.',
    tone: 'island',
    application: 'Wall · Micro architecture',
    specs: ['Custom formats', '25 mm thickness', 'Made to order'],
  },
];

const navItems = [
  { href: '/collections/groove', label: 'Collections' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '/about', label: 'About' },
  { href: '/pattern-inspiration', label: 'Pattern inspiration' },
];

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="wordmark" data-testid="link-home">
          EOACOUSTIC<span>acoustic materials</span>
        </Link>
        <nav className="header-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={location.startsWith(item.href) ? 'page' : undefined} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="header-action" data-testid="link-header-contact">Assistance for projects</Link>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
          {open ? <X size={21} strokeWidth={1.4} /> : <Menu size={21} strokeWidth={1.4} />}
        </button>
      </header>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>
          ))}
          <Link href="/contact" onClick={closeMenu} data-testid="link-mobile-contact">Assistance for projects</Link>
        </nav>
      )}
    </>
  );
}

function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submitNewsletter = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <>
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <h3>Notes from the quiet side.</h3>
            <p>New collections, completed spaces and material observations. A few times a season.</p>
          </div>
          {sent ? (
            <div className="form-success" data-testid="status-newsletter-success">Thank you. You’re on the list.</div>
          ) : (
            <form className="newsletter-form" onSubmit={submitNewsletter}>
              <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-label="Your email address" data-testid="input-newsletter-email" />
              <button type="submit" data-testid="button-newsletter-submit">Subscribe <ArrowUpRight size={14} /></button>
            </form>
          )}
        </div>
      </section>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Link href="/" className="wordmark" data-testid="link-footer-home">EOACOUSTIC<span>acoustic materials</span></Link>
            <p>Decorative sound-absorbing panels made from what the forest leaves behind.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/collections/groove" data-testid="link-footer-groove">Groove</Link>
            <Link href="/collections/mosaic" data-testid="link-footer-mosaic">Mosaic</Link>
            <Link href="/collections/base" data-testid="link-footer-base">The Base Collection</Link>
            <Link href="/collections/island" data-testid="link-footer-island">Island Wall Collection</Link>
          </div>
          <div>
            <h4>Material</h4>
            <Link href="/sustainability" data-testid="link-footer-sustainability">The forest, considered</Link>
            <Link href="/about" data-testid="link-footer-about">Our story</Link>
            <Link href="/pattern-inspiration" data-testid="link-footer-patterns">Pattern inspiration</Link>
          </div>
          <div>
            <h4>Talk to us</h4>
            <Link href="/contact" data-testid="link-footer-contact">Assistance for projects</Link>
            <a href="mailto:studio@eoacoustic.com" data-testid="link-footer-email">studio@eoacoustic.com</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" data-testid="link-footer-instagram"><Instagram size={14} /> Instagram</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2024 EOACOUSTIC® / Made with material intelligence</span>
          <span>Natural acoustic solution</span>
        </div>
      </footer>
    </>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site-shell"><Header />{children}<Footer /></div>;
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy reveal">
        <div className="eyebrow">Natural acoustic solution / 01</div>
        <h1 className="display">Sound, shaped <em>by nature.</em></h1>
        <p className="hero-lede">Decorative sound-absorbing panels made from conifer needles and a biodegradable binder. For rooms with something to say.</p>
        <div className="hero-buttons">
          <Link href="/collections/groove" className="btn-primary" data-testid="link-hero-collection">Explore the collection <ArrowUpRight size={15} /></Link>
          <Link href="/contact" className="btn-quiet" data-testid="link-hero-contact">Talk to a specialist</Link>
        </div>
        <div className="hero-note"><span /> EOACOUSTIC® / the world's first decorative sound-absorbing panels based on conifer needles</div>
      </div>
      <div className="hero-visual reveal-delay" style={{ backgroundImage: `linear-gradient(145deg,rgba(39,63,49,.3),rgba(91,108,93,.7)),url(${media.materialCloseup})` }} aria-label="A textured EOACOUSTIC panel">
        <div className="hero-panel" />
        <div className="hero-stamp">FROM<br />THE<br />FOREST</div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <Shell>
      <Hero />
      <section className="section">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow">A new material language</div>
            <h2 className="display">Quiet is a <em>spatial</em> quality.</h2>
          </div>
          <div className="intro-text">
            <p>EOACOUSTIC® is the world&apos;s first decorative sound-absorbing panel based on conifer needles.</p>
            <p className="body-copy">We have unlocked the potential of conifer needles harmless to nature—turning a natural by-product into an expressive, high-performing material for architecture.</p>
            <Link href="/about" className="link-arrow" data-testid="link-intro-story">Read our story <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
      <div className="marquee"><div>FIR BRANCH <b>·</b> DRIED FIR NEEDLE <b>·</b> FIR NEEDLE PANELS <b>·</b> EOACOUSTIC MATERIAL <b>·</b> FIR BRANCH <b>·</b> DRIED FIR NEEDLE <b>·</b></div></div>
      <section className="section dark-section">
        <div className="container">
          <div className="process-head">
            <div><div className="eyebrow light">The stage of panels creation</div><h2 className="display">From forest floor to <em>finished room.</em></h2></div>
            <p className="body-copy">A short, considered journey. Nothing added that the material does not need.</p>
          </div>
          <div className="process-grid">
            {[
              ['01', 'Fir branch', 'A renewable source, gathered after the forest has done its work.'],
              ['02', 'Dried fir needle', 'Sorted, dried and prepared without harsh chemistry.'],
              ['03', 'Fir needle panels', 'Pressed with a biodegradable binder into a durable acoustic body.'],
              ['04', 'EOACOUSTIC material', 'A tactile architectural surface with quiet performance inside.'],
            ].map(([number, title, copy], index) => (
              <article className="process-item" key={title}>
                <span className="process-number">{number}</span>
                <div className={`process-art ${['branch', 'needles', 'panel', 'material'][index]}`} />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="range-head">
            <div><div className="eyebrow">Product range</div><h2 className="display">The choice is <em>yours.</em></h2></div>
            <p className="body-copy">One material. Four distinct ways to give a room its own acoustic character.</p>
          </div>
          <div className="collection-grid">
            <CollectionCard collection={collections[0]} tall />
            <div style={{ display: 'grid', gap: 18 }}>
              <CollectionCard collection={collections[1]} />
              <CollectionCard collection={collections[2]} />
            </div>
          </div>
          <div style={{ marginTop: 18 }}><CollectionCard collection={collections[3]} /></div>
        </div>
      </section>
      <section className="section applications">
        <div className="container app-layout">
          <div>
            <div className="eyebrow">Where quiet belongs</div>
            <h2 className="display">Nature solutions for acoustic challenges.</h2>
            <p className="body-copy">A good acoustic surface does more than reduce reverberation. It lets the purpose of a place come through.</p>
          </div>
          <div className="app-list">
            {['Bar & Restaurant', 'Showroom & Store', 'Fitness & SPA', 'Public Space', 'Lobby & Reception', 'Private Space', 'Ceiling flag', 'Ceiling clouds'].map((item, index) => (
              <Link href="/contact" className="app-row" key={item} data-testid={`link-application-${index}`}>
                <span>0{index + 1}</span>{item}<ChevronRight size={18} strokeWidth={1.2} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container quote-section">
          <div><div className="quote-mark">“</div><p className="quote">We wanted to create a material that felt as good to touch as it felt to specify.</p><div className="quote-credit">EOACOUSTIC studio / material research</div></div>
          <div className="material-note"><h3>Composite material from fir needles.</h3><p className="body-copy">The surface is never hidden behind a photograph or a printed finish. Its small variations are the point: evidence of origin, proof that responsible materials can be deeply desirable.</p><Link href="/sustainability" className="link-arrow" data-testid="link-quote-sustainability">Understand the material <ArrowRight size={15} /></Link></div>
        </div>
      </section>
      <section className="cta-band">
        <div className="container cta-band-inner">
          <div><div className="eyebrow light">For interior designers & professionals</div><h2 className="display">Have a room in mind?</h2></div>
          <Link href="/contact" className="btn-primary" data-testid="link-home-cta">Assistance for projects <ArrowUpRight size={15} /></Link>
        </div>
      </section>
    </Shell>
  );
}

function CollectionCard({ collection, tall = false }: { collection: Collection; tall?: boolean }) {
  return (
    <Link href={`/collections/${collection.slug}`} className={`collection-card ${tall ? 'tall' : ''}`} data-testid={`card-collection-${collection.slug}`}>
      <div className={`card-art ${collection.tone}`} />
      <span className="card-number">0{collections.findIndex((item) => item.slug === collection.slug) + 1} / 04</span>
      <div className="card-label"><div><small>{collection.kicker}</small><h3>{collection.name}</h3></div><ArrowUpRight size={21} strokeWidth={1.2} /></div>
    </Link>
  );
}

function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find((item) => item.slug === slug) ?? collections[0];
  const related = collections.filter((item) => item.slug !== collection.slug).slice(0, 3);

  return (
    <Shell>
      <section className="page-hero collection-page">
        <div className="container">
          <div className="eyebrow">{collection.kicker} / EOACOUSTIC collection</div>
          <h1 className="display">{collection.name}</h1>
          <p className="body-copy">{collection.description}</p>
        </div>
      </section>
      <section className="section">
        <div className="container collection-intro">
          <div><div className="eyebrow">The collection</div><h2 className="display">A surface that <em>changes the room.</em></h2></div>
          <div><p>{collection.longDescription}</p><Link href="/contact" className="link-arrow" data-testid={`link-collection-contact-${collection.slug}`}>Request samples <ArrowRight size={15} /></Link></div>
        </div>
        <div className={`container collection-visual ${collection.tone}`} style={{ marginTop: 78 }} aria-label={`${collection.name} material visual`} />
        <div className="container spec-grid">
          <div className="spec"><b>Primary application</b><span>{collection.application}</span></div>
          <div className="spec"><b>Format</b><span>{collection.specs[0]}</span></div>
          <div className="spec"><b>Material detail</b><span>{collection.specs[1]}</span></div>
        </div>
      </section>
      <section className="section related">
        <div className="container"><div className="eyebrow">Continue exploring</div><h2 className="display">More ways to <em>shape sound.</em></h2><div className="related-grid">
          {related.map((item) => <Link href={`/collections/${item.slug}`} className="related-link" key={item.slug} data-testid={`link-related-${item.slug}`}><div className={`mini-art card-art ${item.tone}`} /><small>{item.kicker}</small><h3>{item.name}</h3></Link>)}
        </div></div>
      </section>
      <section className="cta-band"><div className="container cta-band-inner"><div><div className="eyebrow light">Specify with confidence</div><h2 className="display">Let&apos;s talk about your project.</h2></div><Link href="/contact" className="btn-primary" data-testid={`link-collection-cta-${collection.slug}`}>Assistance for projects <ArrowUpRight size={15} /></Link></div></section>
    </Shell>
  );
}

function Sustainability() {
  return (
    <Shell>
      <section className="page-hero"><div className="container"><div className="eyebrow light">The material, honestly</div><h1 className="display">Nothing wasted.<br /><em>Nothing hidden.</em></h1><p className="body-copy">We have unlocked the potential of conifer needles harmless to nature. The result is a high-performing composite material from fir needles, made for a longer life indoors.</p></div></section>
      <section className="section"><div className="container sustain-grid"><div><div className="eyebrow">A forest by-product</div><h2 className="display">The needle is not <em>the waste.</em></h2><div className="sustain-card"><h3>EOACOUSTIC® material</h3><p>Fir needles are collected after seasonal pruning and forest maintenance. We dry, refine and bind them into panels without turning their origin into a marketing finish.</p></div></div><div className="material-loop">{[['01', 'Collected with restraint', 'We work with existing forestry cycles, never asking a forest to produce more than it naturally gives.'], ['02', 'Dried by air and time', 'Preparation preserves the needle fibre and keeps the process low-energy.'], ['03', 'Bound for a long life', 'A biodegradable binder gives the panel its form, strength and acoustic porosity.'], ['04', 'Returned to the cycle', 'At end of life, the material is designed to be separated and responsibly processed.']].map(([number, title, copy]) => <article className="loop-item" key={number}><b>{number}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>
      <section className="section manifesto"><div className="container"><div className="eyebrow">A different standard</div><h2 className="display">Responsible can be <em>beautiful, useful and specific.</em></h2><div className="manifesto-list">{[['01', 'Origin is a feature', 'Small changes in tone and texture are not inconsistencies. They are a material record.'], ['02', 'Performance has a feeling', 'Acoustic comfort is not invisible. It is the relief you notice when a room finally settles.'], ['03', 'Better is a practice', 'We keep testing, learning and refining the relationship between nature and architecture.']].map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="cta-band"><div className="container cta-band-inner"><div><div className="eyebrow light">Material samples</div><h2 className="display">Feel the difference first-hand.</h2></div><Link href="/contact" className="btn-primary" data-testid="link-sustainability-samples">Request a sample <ArrowUpRight size={15} /></Link></div></section>
    </Shell>
  );
}

function About() {
  return (
    <Shell>
      <section className="page-hero"><div className="container"><div className="eyebrow light">About EOACOUSTIC</div><h1 className="display">A quieter way<br />to make <em>space.</em></h1><p className="body-copy">We are a material studio working where forestry, acoustics and architecture meet.</p></div></section>
      <section className="section"><div className="container about-grid"><div className="large-art" style={{ backgroundImage: `linear-gradient(135deg,rgba(58,81,65,.2),rgba(57,79,67,.72)),url(${media.firMaterialStudy})` }} aria-label="Textured natural fibre material" /><div className="about-copy"><div className="eyebrow">Our point of view</div><h2 className="display">Architecture begins with <em>attention.</em></h2><p>EOACOUSTIC started with a simple question: what if a material could improve the way a room sounds and deepen the way it feels?</p><p className="body-copy">Our answer is a new kind of architectural surface—one that keeps its natural origin close, performs with purpose and leaves room for the work of the architect. We collaborate with designers, makers and thoughtful manufacturers to put material intelligence back at the centre of a project.</p><Link href="/contact" className="link-arrow" data-testid="link-about-contact">Meet us in a project <ArrowRight size={15} /></Link></div></div></section>
      <section className="section manifesto"><div className="container"><div className="eyebrow">How we work</div><h2 className="display">Make less noise.<br /><em>Notice more.</em></h2><div className="manifesto-list"><article><b>01</b><h3>Stay close to the source</h3><p>We keep the story of the material visible from fir branch to finished panel.</p></article><article><b>02</b><h3>Design for the whole room</h3><p>Performance is only useful when it belongs to the atmosphere of a place.</p></article><article><b>03</b><h3>Be generous with knowledge</h3><p>We help professionals specify the right surface, scale and application for their work.</p></article></div></div></section>
      <section className="cta-band"><div className="container cta-band-inner"><div><div className="eyebrow light">A material conversation</div><h2 className="display">Tell us what you&apos;re making.</h2></div><Link href="/contact" className="btn-primary" data-testid="link-about-cta">Start a conversation <ArrowUpRight size={15} /></Link></div></section>
    </Shell>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return (
    <Shell>
      <section className="page-hero"><div className="container"><div className="eyebrow light">Assistance for projects</div><h1 className="display">Let&apos;s make room<br />for <em>quiet.</em></h1><p className="body-copy">Tell us a little about the space, the feeling and the practical question you are working through.</p></div></section>
      <section className="section"><div className="container contact-grid"><div><div className="eyebrow">Project enquiry</div><h2 className="display">The useful<br /><em>details.</em></h2><p className="body-copy">Our studio can help with samples, technical information, custom design and acoustic guidance for a project at any stage.</p><div style={{ marginTop: 35, color: 'var(--moss)', font: '11px var(--mono)', lineHeight: 2 }}><div><MapPin size={14} style={{ verticalAlign: 'middle', marginRight: 8 }} /> Tallinn · Helsinki · Europe</div><div><Mail size={14} style={{ verticalAlign: 'middle', marginRight: 8 }} /> studio@eoacoustic.com</div></div></div><div>{submitted ? <div className="contact-success" data-testid="status-contact-success">Thank you. Your note is with our studio. We&apos;ll be in touch within two working days.</div> : <form className="contact-form" onSubmit={submit}><div className="field"><label htmlFor="contact-name">Name</label><input id="contact-name" required placeholder="Your name" data-testid="input-contact-name" /></div><div className="field"><label htmlFor="contact-email">Email</label><input id="contact-email" required type="email" placeholder="you@studio.com" data-testid="input-contact-email" /></div><div className="field"><label htmlFor="contact-type">Project type</label><select id="contact-type" defaultValue="" required data-testid="select-contact-project"><option value="" disabled>Select one</option><option>Hospitality</option><option>Workplace</option><option>Residential</option><option>Public space</option><option>Other</option></select></div><div className="field"><label htmlFor="contact-message">Your project</label><textarea id="contact-message" required placeholder="What are you working on?" data-testid="textarea-contact-message" /></div><div className="contact-actions"><span className="eyebrow">We read every note</span><button type="submit" className="btn-primary" data-testid="button-contact-submit">Send enquiry <ArrowUpRight size={15} /></button></div></form>}</div></div></section>
      <div className="container contact-aside"><h3>“The best acoustic solution is the one that belongs there.”</h3><div><p>For specifications, availability and custom design enquiries, our small team is here.</p><a href="mailto:studio@eoacoustic.com" data-testid="link-contact-email">studio@eoacoustic.com <ArrowUpRight size={14} /></a></div></div>
    </Shell>
  );
}

function PatternInspiration() {
  const [selected, setSelected] = useState<number[]>([1, 4, 7, 10, 14, 17]);
  const toggle = (index: number) => setSelected((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  return (
    <Shell>
      <section className="page-hero"><div className="container"><div className="eyebrow light">Pattern inspiration</div><h1 className="display">Compose a little<br /><em>quiet.</em></h1><p className="body-copy">Explore the relationship between rhythm, repetition and acoustic comfort. Select tiles to build a pattern that feels like yours.</p></div></section>
      <section className="section"><div className="container inspiration-grid"><div><div className="eyebrow">A visual study</div><h2 className="display">Material is never <em>just a surface.</em></h2><p className="body-copy">Every composition changes the way a wall holds light. Start with an instinct, then bring the conversation to our studio.</p><div className="pattern-controls"><button className="btn-primary" onClick={() => setSelected([])} data-testid="button-pattern-clear">Clear board</button><button className="btn-quiet" onClick={() => setSelected([0, 2, 5, 8, 13, 16, 19, 23])} data-testid="button-pattern-curate">Curate a rhythm</button></div><div className="pattern-status" data-testid="status-pattern-selection">{selected.length} tiles selected / a starting point for your wall</div></div><div><div className="pattern-board" aria-label="Interactive pattern board">{Array.from({ length: 24 }, (_, index) => <button key={index} className={`pattern-tile ${selected.includes(index) ? 'selected' : ''}`} onClick={() => toggle(index)} aria-label={`Pattern tile ${index + 1}`} data-testid={`button-pattern-tile-${index + 1}`} />)}</div><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 21, color: 'var(--moss)', font: '10px var(--mono)', letterSpacing: '.08em', textTransform: 'uppercase' }}><span>Natural / tactile / modular</span><span>24 × 24 study</span></div></div></div></section>
      <section className="cta-band"><div className="container cta-band-inner"><div><div className="eyebrow light">Custom design</div><h2 className="display">Your wall can be a one-off.</h2></div><Link href="/contact" className="btn-primary" data-testid="link-pattern-contact">Discuss a custom pattern <ArrowUpRight size={15} /></Link></div></section>
    </Shell>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/collections/:slug" component={CollectionPage} />
        <Route path="/sustainability" component={Sustainability} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/pattern-inspiration" component={PatternInspiration} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;