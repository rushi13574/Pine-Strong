import { type FormEvent, type ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { 
  ArrowLeft,
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft,
  ChevronRight, 
  Download, 
  Check, 
  FileText, 
  Flame, 
  Instagram, 
  Leaf, 
  Layers, 
  Mail, 
  MapPin, 
  Menu, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  X 
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { media } from '@/lib/media';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

export type Collection = {
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  longDescription: string;
  tone: string;
  image: string;
  application: string;
  formats: string;
  thickness: string;
  relief: string;
  absorption: string;
  fireRating: string;
  patterns: string[];
};

export const collections: Collection[] = [
  {
    slug: 'groove',
    name: 'Groove Collection',
    kicker: 'Engraved architectural rhythm',
    tagline: 'Acoustic panels with engraved continuous patterns',
    description: 'A harmonious relationship between architectural expressiveness and natural texture.',
    longDescription: 'Groove collection is a family of rectangular engraved panels. Graphic linear and geometric elements connect seamlessly across panels to create a continuous architectural pattern. Spruce and pine needles serve as a natural porous core that minimizes echo and reverberation.',
    tone: 'groove',
    image: media.colGroove,
    application: 'Wall · Accent Feature · Commercial & Residential',
    formats: '600 × 1200 mm · 600 × 600 mm',
    thickness: '18–25 mm thickness',
    relief: '8–18 mm depth relief',
    absorption: 'NRC 0.85 (Class B sound absorption)',
    fireRating: 'Class B-s1, d0 (EN 13501-1)',
    patterns: [
      'Linear 01', 'Linear 02', 'Diagonal 01', 'Diagonal 02', 
      'Hatch 01', 'Hatch 02', 'Checkered 01', 'Checkered 02', 
      'Arc 01', 'Arc 02', 'Track 01', 'Polka Dot', 'Lego', 'Berry'
    ],
  },
  {
    slug: 'mosaic',
    name: 'Mosaic Collection',
    kicker: 'Modular geometric system',
    tagline: 'Modular system of geometric shapes and textures',
    description: 'Small modular pieces composed into a vibrant acoustic surface with human pulse.',
    longDescription: 'Mosaic brings geometric precision into focus. Its modular composition can be laid as a calm monochromatic field or a more expressive constellation. Combining triangles, squares, and angled reliefs, it creates a tactile acoustic surface with the sensibility of a three-dimensional textile.',
    tone: 'mosaic',
    image: media.colMosaic,
    application: 'Wall · Partition · Feature Columns',
    formats: '300 × 300 mm · 600 × 600 mm modular tiles',
    thickness: '15–22 mm thickness',
    relief: 'Multi-plane 12 mm relief',
    absorption: 'NRC 0.80 (Class B sound absorption)',
    fireRating: 'Class B-s1, d0 (EN 13501-1)',
    patterns: [
      'Square Grid', 'Triangle Chevron', 'Diamond Rhythms', 'Hexagon Pulse',
      'Staggered Brick', 'Diagonal Fold', 'Rhombus Mosaic', 'Asymmetric Float'
    ],
  },
  {
    slug: 'base',
    name: 'The Base Collection',
    kicker: 'Blank sheet architectural material',
    tagline: 'Essential blank sheet material for broad gestures',
    description: 'The honest, softly textured starting point for a considered, quiet interior.',
    longDescription: 'The Base Collection lets the natural PINE STRONG needle material speak in its most direct, unfiltered form. A lightly felted, porous surface made for broad architectural gestures, discreet acoustic ceilings, and continuous wall planes where quiet should feel effortless.',
    tone: 'base',
    image: media.colBase,
    application: 'Wall · Ceiling · Continuous Cladding',
    formats: '600 × 1200 mm · 1200 × 2400 mm sheets',
    thickness: '12 mm · 18 mm · 25 mm',
    relief: 'Smooth natural felted grain',
    absorption: 'NRC 0.90 (Class A/B sound absorption)',
    fireRating: 'Class B-s1, d0 (EN 13501-1)',
    patterns: [
      'Standard Smooth Sheet', 'Beveled Edge Grid', 'Seamless Butt Joint', 'Micro-perforated Core'
    ],
  },
  {
    slug: 'island',
    name: 'Island Wall Collection',
    kicker: 'Composition with spaces',
    tagline: 'Soft-edged islands that organise sound without closing a room in',
    description: 'Sculptural, floating organic forms that bring acoustic comfort to open volumes.',
    longDescription: 'Island Wall Collection is a family of generous, sculptural forms. Float single elements as focal points or build expansive compositions across walls and high ceilings. Every rounded radius is precision-machined to make spacious rooms feel calmer, warmer, and acoustically balanced.',
    tone: 'island',
    image: media.colIsland,
    application: 'Wall · Ceiling Clouds · Suspended Echo Absorbers',
    formats: 'Custom formats up to 1400 × 1400 mm',
    thickness: '25 mm · 35 mm acoustic core',
    relief: 'Curved organic radius edges',
    absorption: 'NRC 0.92 (Class A sound absorption)',
    fireRating: 'Class B-s1, d0 (EN 13501-1)',
    patterns: [
      'Pebble Cloud', 'Soft Ellipse', 'Rounded Rectangle', 'Circular Disk', 'Asymmetric Pod'
    ],
  },
];

export const colorPalette = [
  { name: 'Natural Olive', hex: '#5A624E', desc: 'The pure, original shade of harvested dry conifer needles.' },
  { name: 'Light Brown', hex: '#8C775D', desc: 'Sun-dried bark and warm earthy forest tones.' },
  { name: 'Terracotta', hex: '#8F5743', desc: 'Rich mineral clay tones with organic warmth.' },
  { name: 'Rich Brown', hex: '#544234', desc: 'Deep conifer wood and aged forest floor pigment.' },
  { name: 'Pure Olive', hex: '#4B533E', desc: 'Deep needle hue with rich tactile depth.' },
  { name: 'Dark Brown', hex: '#3E342B', desc: 'Subdued charcoal brown for dramatic architectural accents.' },
  { name: 'Olive Black', hex: '#2A2C27', desc: 'Sophisticated dark graphite with subtle green undertones.' },
  { name: 'Olive Yellow', hex: '#7D764A', desc: 'Sunlit canopy green-gold with natural brightness.' },
];

export const features = [
  {
    icon: Leaf,
    title: 'Eco & Harmless to Nature',
    desc: 'Made from renewable conifer needles gathered after seasonal forest maintenance. Bound with a 100% biodegradable binder without toxic formaldehydes.',
  },
  {
    icon: Volume2,
    title: 'High Sound Absorbency',
    desc: 'The porous natural needle-fiber matrix traps and diffuses sound waves, dramatically dampening echo, reverberation, and ambient speech noise.',
  },
  {
    icon: Sparkles,
    title: 'Authentic Nature Texture',
    desc: 'Every panel displays real fibrous needle grain and natural variations. Never hidden behind faux photographs or synthetic veneers.',
  },
  {
    icon: Layers,
    title: 'Healthy Microclimate',
    desc: 'Conifer needles naturally emit beneficial phytoncides that refresh indoor air quality, evoking the calm sensation of a pine forest.',
  },
  {
    icon: Flame,
    title: 'Fire Resistant & Safe',
    desc: 'Tested and certified to Class B-s1, d0 building standards, meeting stringent hygienic and fire safety requirements for public and commercial spaces.',
  },
  {
    icon: ShieldCheck,
    title: 'Thoughtful Design & Modularity',
    desc: 'Engineered for seamless architectural installation, flexible modular scaling, and simple maintenance across diverse interior applications.',
  },
];

export const applicationsList = [
  {
    id: '01',
    title: 'Bar & Restaurant',
    desc: 'Absorbs conversational noise and glassware clatter.',
    image: media.appRestaurant,
  },
  {
    id: '02',
    title: 'Showroom & Store',
    desc: 'Intimate acoustic clarity for retail spaces.',
    image: media.appShowroom,
  },
  {
    id: '03',
    title: 'Fitness & SPA',
    desc: 'Echo-free sanctuary with natural pine aroma.',
    image: media.appSpa,
  },
  {
    id: '04',
    title: 'Public Space',
    desc: 'Monumental reverberation control for high atriums.',
    image: media.appPublic,
  },
  {
    id: '05',
    title: 'Lobby & Reception',
    desc: 'Calm, prestigious presence for arrival halls.',
    image: media.appLobby,
  },
  {
    id: '06',
    title: 'Private Space',
    desc: 'Restful silence for luxury residences and studios.',
    image: media.appPrivate,
  },
];

export const possibilitiesList = [
  {
    number: '01',
    title: 'Wall Cladding',
    desc: 'Decoration and acoustic treatment of vertical planes in any format, from floor-to-ceiling to accent panels.',
  },
  {
    number: '02',
    title: 'Micro Architecture',
    desc: 'Mobile meeting pods, phone booths, and freestanding acoustic pavilions within open-plan offices.',
  },
  {
    number: '03',
    title: 'Zoning Partitions',
    desc: 'Freestanding space dividers that visually separate areas while capturing directional sound.',
  },
  {
    number: '04',
    title: 'Ceiling Flags & Baffles',
    desc: 'Suspended vertical baffles engineered to intercept rising sound waves in high-ceiling volumes.',
  },
  {
    number: '05',
    title: 'Custom Architectural Items',
    desc: 'Integrated into bespoke cabinetry, headboards, door panels, and decorative interior millwork.',
  },
  {
    number: '06',
    title: 'Ceiling Clouds',
    desc: 'Suspended horizontal sound-absorbing clouds that float above meeting tables and collaborative hubs.',
  },
];

export function scrollToProductRange(event?: React.MouseEvent, navigate?: (path: string) => void) {
  if (event) event.preventDefault();
  const el = document.getElementById('product-range') || document.getElementById('collections');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else if (navigate) {
    navigate('/');
    setTimeout(() => {
      const target = document.getElementById('product-range') || document.getElementById('collections');
      target?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  } else {
    window.location.href = '/#product-range';
  }
}

const navItems = [
  { href: '#product-range', label: 'Collections' },
  { href: '/pattern-inspiration', label: 'Pattern inspiration' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '/about', label: 'About us' },
];

function Header() {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href === '#product-range') {
      e.preventDefault();
      closeMenu();
      scrollToProductRange(undefined, setLocation);
    } else {
      closeMenu();
    }
  };

  return (
    <>
      <header className="site-header">
        <Link href="/" className="wordmark" data-testid="link-home">
          PINE STRONG<span>acoustic materials</span>
        </Link>
        <nav className="header-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            item.href.startsWith('#') ? (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={item.href} 
                href={item.href} 
                aria-current={location.startsWith(item.href) ? 'page' : undefined} 
                data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>
        <Link href="/contact" className="header-action" data-testid="link-header-contact">
          Assistance for projects
        </Link>
        <button 
          className="mobile-toggle" 
          onClick={() => setOpen(!open)} 
          aria-label={open ? 'Close menu' : 'Open menu'} 
          data-testid="button-mobile-menu"
        >
          {open ? <X size={21} strokeWidth={1.4} /> : <Menu size={21} strokeWidth={1.4} />}
        </button>
      </header>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          <Link href="/" onClick={closeMenu} data-testid="link-mobile-home">Home</Link>
          <a 
            href="#product-range" 
            onClick={(e) => handleNavClick(e, '#product-range')} 
            data-testid="link-mobile-collections"
          >
            Product Range / Collections
          </a>
          {navItems.filter((i) => !i.href.startsWith('#')).map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" onClick={closeMenu} className="btn-primary" data-testid="link-mobile-contact">
            Assistance for projects
          </Link>
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
            <h3>Stay in touch with material innovation.</h3>
            <p>New collection releases, acoustic research papers, and architectural completed spaces. A few times a season.</p>
          </div>
          {sent ? (
            <div className="form-success" data-testid="status-newsletter-success">
              Thank you! You are on our architectural notes list.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={submitNewsletter}>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="What's your email?" 
                aria-label="Your email address" 
                data-testid="input-newsletter-email" 
              />
              <button type="submit" data-testid="button-newsletter-submit">
                Subscribe <ArrowUpRight size={14} />
              </button>
            </form>
          )}
        </div>
      </section>
      <footer className="footer">
        <div className="container footer-minimal">
          <div className="footer-brand">
            <Link href="/" className="wordmark" data-testid="link-footer-home">
              PINE STRONG<span>acoustic materials</span>
            </Link>
            <p>Natural conifer needle acoustic wall & ceiling panels.</p>
          </div>
          <div className="footer-links-simple">
            <a href="#product-range" onClick={(e) => scrollToProductRange(e)} data-testid="link-footer-collections">Collections</a>
            <Link href="/pattern-inspiration" data-testid="link-footer-patterns">Pattern inspiration</Link>
            <Link href="/sustainability" data-testid="link-footer-sustainability">Sustainability</Link>
            <Link href="/about" data-testid="link-footer-about">About us</Link>
            <Link href="/contact" data-testid="link-footer-contact">Assistance for projects</Link>
            <a href="mailto:studio@pinestrong.com" data-testid="link-footer-email">studio@pinestrong.com</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 PINE STRONG® / Natural Acoustic Materials. All rights reserved.</span>
          <span>Navi Mumbai, India</span>
        </div>
      </footer>
    </>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

const heroSlides = [
  {
    id: 'architectural-residence',
    tag: 'Architectural Residence',
    title: 'Precision-Engraved Rhythm',
    subtitle: 'Geometric linear reliefs creating continuous acoustic warmth and diffuse natural light in modern living spaces.',
    image: media.heroPanel,
  },
  {
    id: 'spatial-interior',
    tag: 'Spatial Acoustics',
    title: 'Serene Acoustic Sanctuary',
    subtitle: 'Natural sound-absorbing wall planes engineered for calm conversation and architectural clarity.',
    image: media.architecturalInterior,
  },
  {
    id: 'tactile-study',
    tag: 'Natural Materiality',
    title: 'Woven from Conifer Fibers',
    subtitle: 'Authentic fibrous conifer needle textures creating a soothing forest atmosphere in contemporary interiors.',
    image: media.firMaterialStudy,
  },
  {
    id: 'material-intelligence',
    tag: 'Bio-Circular Core',
    title: '100% Bio-Bound Composition',
    subtitle: 'Fallen forest needles bonded with biodegradable resins for zero-waste, high-performance acoustic surfaces.',
    image: media.materialCloseup,
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = heroSlides[currentSlide];

  return (
    <section 
      className="hero-cinematic"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Edge-to-Edge Full-Bleed Background Slides */}
      <div className="hero-cinematic-bg">
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            className={`hero-cinematic-slide ${currentSlide === index ? 'active' : ''}`}
            style={{ backgroundImage: `url(${item.image})` }}
            aria-hidden={currentSlide !== index}
          />
        ))}
        <div className="hero-cinematic-gradient" />
      </div>

      {/* Minimal Elegant Overlay Content */}
      <div className="container hero-cinematic-content">
        <div className="hero-cinematic-text reveal">
          <div className="hero-cinematic-eyebrow">
            <span>PINE STRONG®</span>
            <span className="sep">/</span>
            <span>{slide.tag}</span>
          </div>

          <h1 className="hero-cinematic-title">
            Sound, shaped <em>by nature.</em>
          </h1>

          <p className="hero-cinematic-lead">
            {slide.subtitle}
          </p>

          <div className="hero-cinematic-actions">
            <a 
              href="#product-range" 
              onClick={(e) => scrollToProductRange(e)} 
              className="btn-cinematic-primary" 
              data-testid="link-hero-collection"
            >
              Explore Collections <ArrowUpRight size={15} />
            </a>
            <Link href="/contact" className="btn-cinematic-secondary" data-testid="link-hero-contact">
              Assistance for Projects
            </Link>
          </div>
        </div>

        {/* Minimal Bottom Bar with Slide Indicators & Controls */}
        <div className="hero-cinematic-footer">
          <div className="hero-slide-indicators">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                className={`hero-indicator-btn ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}: ${item.tag}`}
                type="button"
              >
                <span className="indicator-num">0{index + 1}</span>
                <span className="indicator-label">{item.tag}</span>
                <div className="indicator-line">
                  {currentSlide === index && !isPaused && <div className="indicator-fill" />}
                </div>
              </button>
            ))}
          </div>

          <div className="hero-cinematic-arrows">
            <button 
              className="cinematic-arrow-btn"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              aria-label="Previous slide"
              type="button"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="cinematic-counter">
              0{currentSlide + 1} <i>/</i> 0{heroSlides.length}
            </span>
            <button 
              className="cinematic-arrow-btn"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              aria-label="Next slide"
              type="button"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <Shell>
      <Hero />
      
      {/* Introduction */}
      <section className="section">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow">A new material language</div>
            <h2 className="display">Quiet is a <em>spatial</em> quality.</h2>
          </div>
          <div className="intro-text">
            <p>PINE STRONG® is the world&apos;s first decorative sound-absorbing panel based on conifer needles.</p>
            <p className="body-copy">
              We have unlocked the potential of conifer needles harmless to nature—turning an abundant natural forestry by-product into an expressive, high-performing acoustic material for modern architecture.
            </p>
            <Link href="/about" className="link-arrow" data-testid="link-intro-story">
              Read our story <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="marquee">
        <div>
          FIR BRANCH <b>·</b> DRIED FIR NEEDLE <b>·</b> FIR NEEDLE PANELS <b>·</b> PINE STRONG MATERIAL <b>·</b> ECOLOGICAL ACOUSTICS <b>·</b> NATURAL POROSITY <b>·</b>
        </div>
      </div>

      {/* The Stage of Panels Creation */}
      <section className="section dark-section">
        <div className="container">
          <div className="process-head">
            <div>
              <div className="eyebrow light">The stage of panels creation</div>
              <h2 className="display">From forest floor to <em>finished room.</em></h2>
            </div>
            <p className="body-copy">A short, considered journey. Nothing added that the material does not need.</p>
          </div>
          <div className="process-grid-cards">
            {[
              {
                number: '01',
                title: 'Fir branch',
                copy: 'A renewable source, gathered after the forest has done its work through seasonal pruning.',
                image: media.stageBranch,
              },
              {
                number: '02',
                title: 'Dried fir needle',
                copy: 'Sorted, air-dried and naturally prepared without harsh chemistry or synthetic additives.',
                image: media.stageNeedles,
              },
              {
                number: '03',
                title: 'Fir needle panels',
                copy: 'Pressed with a natural biodegradable binder into a dense, durable sound-absorbing body.',
                image: media.stagePressed,
              },
              {
                number: '04',
                title: 'PINE STRONG material',
                copy: 'A tactile architectural surface with high acoustic sound absorption and forest texture.',
                image: media.stageMaterial,
              },
            ].map((step) => (
              <article className="process-card" key={step.number}>
                <div className="process-card-image" style={{ backgroundImage: `url(${step.image})` }}>
                  <span className="process-number-badge">{step.number}</span>
                </div>
                <div className="process-card-content">
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Material Introduction */}
      <section className="section">
        <div className="container quote-section">
          <div>
            <div className="eyebrow">Material intelligence</div>
            <h2 className="display">Composite material from <em>fir needles.</em></h2>
            <p className="body-copy" style={{ marginTop: 24 }}>
              PINE STRONG focuses on sustainable material usage without harming the environment. The sound-absorbing fiber material is based on conifer needles and a biodegradable binder.
            </p>
            <p className="body-copy" style={{ marginTop: 16 }}>
              The natural color and tactile texture create a serene forest atmosphere in every interior while delivering lab-certified acoustic absorption.
            </p>
            <div style={{ marginTop: 30 }}>
              <Link href="/sustainability" className="btn-primary">
                Understand the forest cycle <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
          <div className="material-showcase-image" style={{ backgroundImage: `url(${media.stageMaterial})` }}>
            <div className="showcase-caption">TACTILE ACOUSTIC POROSITY</div>
          </div>
        </div>
      </section>

      {/* Applications / Use Cases */}
      <section className="section applications-section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow">Full customization of your space</div>
            <h2 className="display">Nature solutions for <em>acoustic challenges.</em></h2>
            <p className="body-copy">
              Our panels are committed to leaving people in a truly natural, comfortable acoustic environment—better equipped for creating a cozy, productive atmosphere.
            </p>
          </div>

          <div className="applications-grid">
            {applicationsList.map((app) => (
              <div className="app-card" key={app.id} data-testid={`card-app-${app.id}`}>
                <div className="app-card-bg" style={{ backgroundImage: `url(${app.image})` }} />
                <div className="app-card-overlay" />
                <div className="app-card-details">
                  <span className="app-card-num">{app.id}</span>
                  <h3>{app.title}</h3>
                  <p>{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Collections */}
      <section className="section" id="product-range">
        <div className="container">
          <div className="range-head">
            <div>
              <div className="eyebrow">Product range</div>
              <h2 className="display">The choice is <em>yours.</em></h2>
            </div>
            <p className="body-copy">Explore our four distinct collections, get inspired, and specify your own custom shape, groove pattern, and natural colorway.</p>
          </div>

          <div className="collection-grid-cards">
            {collections.map((col, index) => (
              <Link href={`/collections/${col.slug}`} className="collection-feature-card" key={col.slug} data-testid={`card-col-${col.slug}`}>
                <div className="collection-feature-image" style={{ backgroundImage: `url(${col.image})` }} />
                <div className="collection-feature-content">
                  <div className="collection-feature-top">
                    <small>0{index + 1} / 04 · {col.kicker}</small>
                    <h3>{col.name}</h3>
                    <p className="tagline">{col.tagline}</p>
                  </div>
                  <div className="collection-feature-bottom">
                    <span className="specs-pill">{col.formats}</span>
                    <span className="btn-explore">Explore collection <ArrowUpRight size={16} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Application Possibilities */}
      <section className="section dark-section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow light">Architectural versatility</div>
            <h2 className="display">Realise your acoustic requirements with <em>unlimited application.</em></h2>
            <p className="body-copy">Six versatile structural possibilities designed for architects, acousticians, and interior designers.</p>
          </div>

          <div className="possibilities-grid">
            {possibilitiesList.map((item) => (
              <div className="possibility-card" key={item.number}>
                <span className="possibility-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow">Why choose us</div>
            <h2 className="display">Features of PINE STRONG <em>wall panels.</em></h2>
          </div>

          <div className="features-grid">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div className="feature-box" key={feat.title}>
                  <div className="feature-icon-wrap">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <div className="eyebrow light">For architects & interior designers</div>
            <h2 className="display">Assistance for projects.</h2>
            <p className="body-copy" style={{ marginTop: 12 }}>
              Are you an interior designer or a professional and require support in using the material in your project? We are at your disposal with technical data and samples.
            </p>
          </div>
          <Link href="/contact" className="btn-primary" data-testid="link-home-cta">
            Contact our studio <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </Shell>
  );
}

function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find((item) => item.slug === slug) ?? collections[0];
  const related = collections.filter((item) => item.slug !== collection.slug);
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);

  return (
    <Shell>
      <section className="page-hero collection-hero">
        <div className="container">
          <div className="back-nav-bar">
            <Link href="/" className="back-nav-link">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <span className="back-nav-sep">/</span>
            <a href="#product-range" onClick={(e) => scrollToProductRange(e)} className="back-nav-link">
              Collections
            </a>
            <span className="back-nav-sep">/</span>
            <span className="back-nav-current">{collection.name}</span>
          </div>
          <div className="eyebrow">{collection.kicker} · PINE STRONG Collection</div>
          <h1 className="display">{collection.name}</h1>
          <p className="body-copy">{collection.tagline}</p>
        </div>
      </section>

      {/* Hero Visual Showcase */}
      <div className="container">
        <div className="collection-hero-image" style={{ backgroundImage: `url(${collection.image})` }} aria-label={collection.name} />
      </div>

      {/* Description & Overview */}
      <section className="section">
        <div className="container collection-intro">
          <div>
            <div className="eyebrow">The Collection Concept</div>
            <h2 className="display">A surface that <em>changes the room.</em></h2>
          </div>
          <div>
            <p>{collection.longDescription}</p>
            <div style={{ marginTop: 30 }}>
              <Link href="/contact" className="btn-primary" data-testid={`link-collection-contact-${collection.slug}`}>
                Request material samples <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="container spec-grid-4">
          <div className="spec">
            <b>Primary application</b>
            <span>{collection.application}</span>
          </div>
          <div className="spec">
            <b>Standard formats</b>
            <span>{collection.formats}</span>
          </div>
          <div className="spec">
            <b>Thickness & Relief</b>
            <span>{collection.thickness} ({collection.relief})</span>
          </div>
          <div className="spec">
            <b>Acoustic Performance</b>
            <span>{collection.absorption}</span>
          </div>
        </div>
      </section>

      {/* Pattern System / Options */}
      <section className="section dark-section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow light">Creative freedom</div>
            <h2 className="display">Available <em>patterns & configurations.</em></h2>
            <p className="body-copy">Choose from our curated architectural patterns or design a bespoke rhythmic relief for your project.</p>
          </div>

          <div className="pattern-tags-grid">
            {collection.patterns.map((pattern, idx) => (
              <div className="pattern-pill-card" key={pattern}>
                <span className="pattern-pill-num">0{idx + 1}</span>
                <span className="pattern-pill-title">{pattern}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Natural Color Palette Section */}
      <section className="section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow">Natural palette</div>
            <h2 className="display">Preserving the <em>noble shades of nature.</em></h2>
            <p className="body-copy">
              The natural color of dry pine needles is Olive—the baseline of our palette. We use careful gentle toning to preserve the authentic needle texture while offering rich architectural tones.
            </p>
          </div>

          <div className="palette-grid">
            {colorPalette.map((col) => (
              <button 
                key={col.name} 
                className={`palette-swatch-card ${selectedColor.name === col.name ? 'active' : ''}`}
                onClick={() => setSelectedColor(col)}
              >
                <div className="swatch-color" style={{ backgroundColor: col.hex }} />
                <h4>{col.name}</h4>
                <small>{col.desc}</small>
              </button>
            ))}
          </div>

          <div className="palette-selected-banner">
            <div>
              <b>Selected Tonal Finish: {selectedColor.name}</b>
              <p>{selectedColor.desc}</p>
            </div>
            <Link href="/contact" className="btn-quiet">
              Order {selectedColor.name} Sample <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section dark-section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow light">Core advantages</div>
            <h2 className="display">Engineered for <em>performance and longevity.</em></h2>
          </div>

          <div className="features-grid">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div className="feature-box" key={feat.title}>
                  <div className="feature-icon-wrap">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Collections */}
      <section className="section related">
        <div className="container">
          <div className="eyebrow">Continue exploring</div>
          <h2 className="display">More ways to <em>shape sound.</em></h2>
          <div className="related-grid">
            {related.map((item) => (
              <Link href={`/collections/${item.slug}`} className="related-link" key={item.slug} data-testid={`link-related-${item.slug}`}>
                <div className="mini-art" style={{ backgroundImage: `url(${item.image})` }} />
                <small>{item.kicker}</small>
                <h3>{item.name}</h3>
                <p className="body-copy" style={{ fontSize: 13, marginTop: 8 }}>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <div className="eyebrow light">Specify with confidence</div>
            <h2 className="display">Let&apos;s talk about your project.</h2>
          </div>
          <Link href="/contact" className="btn-primary" data-testid={`link-collection-cta-${collection.slug}`}>
            Assistance for projects <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </Shell>
  );
}

function Downloads() {
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const downloadFiles = [
    {
      id: 'catalog-2026',
      title: 'PINE STRONG 2026 Product Catalog',
      category: 'Catalog & Lookbook',
      format: 'PDF · 18 MB',
      desc: 'Complete overview of all collections, high-resolution photography, installation examples, and material dimensions.',
    },
    {
      id: 'acoustic-reports',
      title: 'Acoustic Sound Absorption Test Reports',
      category: 'Technical Certification',
      format: 'PDF · 4.2 MB',
      desc: 'Laboratory test certificates according to ISO 354 with sound absorption coefficients (NRC) across frequency octaves.',
    },
    {
      id: 'cad-bim',
      title: 'BIM & CAD Architecture Library',
      category: 'CAD / Revit / SketchUp',
      format: 'ZIP · 45 MB',
      desc: '2D & 3D models, textures, seamless hatch patterns, and Revit families (.rfa, .dwg, .skp) for architectural modeling.',
    },
    {
      id: 'material-epd',
      title: 'Environmental Product Declaration (EPD)',
      category: 'Sustainability',
      format: 'PDF · 2.1 MB',
      desc: 'Certified life cycle assessment (LCA) documenting carbon footprint, bio-binder breakdown, and circular recycling process.',
    },
    {
      id: 'install-guide',
      title: 'Installation & Maintenance Manual',
      category: 'Specification Guide',
      format: 'PDF · 3.5 MB',
      desc: 'Step-by-step instructions for wall and ceiling mounting, adhesive specifications, cutting instructions, and routine care.',
    },
  ];

  const handleDownload = (id: string) => {
    setDownloaded(id);
    setTimeout(() => setDownloaded(null), 4000);
  };

  return (
    <Shell>
      <section className="page-hero">
        <div className="container">
          <div className="back-nav-bar">
            <Link href="/" className="back-nav-link">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
          <div className="eyebrow light">Architectural resources</div>
          <h1 className="display">Technical data & <em>downloads.</em></h1>
          <p className="body-copy">Access CAD drawings, acoustic test reports, BIM models, and specification manuals for your projects.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {downloaded && (
            <div className="download-alert">
              <Check size={18} />
              <span>Download package prepared successfully. Check your browser downloads folder.</span>
            </div>
          )}

          <div className="downloads-list">
            {downloadFiles.map((item) => (
              <div className="download-item-card" key={item.id}>
                <div className="download-item-icon">
                  <FileText size={28} strokeWidth={1.4} />
                </div>
                <div className="download-item-info">
                  <small>{item.category} · {item.format}</small>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <button 
                  className="btn-primary" 
                  onClick={() => handleDownload(item.id)}
                  data-testid={`btn-download-${item.id}`}
                >
                  <Download size={15} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <div className="eyebrow light">Need custom engineering?</div>
            <h2 className="display">Speak directly with our technical team.</h2>
          </div>
          <Link href="/contact" className="btn-primary">
            Request custom specifications <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </Shell>
  );
}

function Sustainability() {
  return (
    <Shell>
      <section className="page-hero">
        <div className="container">
          <div className="back-nav-bar">
            <Link href="/" className="back-nav-link">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
          <div className="eyebrow light">The material, honestly</div>
          <h1 className="display">Nothing wasted.<br /><em>Nothing hidden.</em></h1>
          <p className="body-copy">
            We have unlocked the potential of conifer needles harmless to nature. The result is a high-performing composite material from fir needles, made for a longer life indoors.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container sustain-grid">
          <div>
            <div className="eyebrow">A forest by-product</div>
            <h2 className="display">The needle is not <em>the waste.</em></h2>
            <div className="sustain-card">
              <h3>PINE STRONG® material</h3>
              <p>
                Fir needles are collected after seasonal pruning and forest maintenance. We dry, refine and bind them into panels without turning their origin into a marketing finish.
              </p>
            </div>
          </div>
          <div className="material-loop">
            {[
              ['01', 'Collected with restraint', 'We work with existing forestry cycles, never asking a forest to produce more than it naturally gives.'],
              ['02', 'Dried by air and time', 'Preparation preserves the needle fibre and keeps the process low-energy.'],
              ['03', 'Bound for a long life', 'A biodegradable binder gives the panel its form, strength and acoustic porosity.'],
              ['04', 'Returned to the cycle', 'At end of life, the material is designed to be separated and responsibly processed.'],
            ].map(([number, title, copy]) => (
              <article className="loop-item" key={number}>
                <b>{number}</b>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section manifesto">
        <div className="container">
          <div className="eyebrow">A different standard</div>
          <h2 className="display">Responsible can be <em>beautiful, useful and specific.</em></h2>
          <div className="manifesto-list">
            {[
              ['01', 'Origin is a feature', 'Small changes in tone and texture are not inconsistencies. They are a material record of natural pine needles.'],
              ['02', 'Performance has a feeling', 'Acoustic comfort is not invisible. It is the relief you notice when a room finally settles.'],
              ['03', 'Better is a practice', 'We keep testing, learning and refining the relationship between nature and architecture.'],
            ].map(([number, title, copy]) => (
              <article key={number}>
                <b>{number}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <div className="eyebrow light">Material samples</div>
            <h2 className="display">Feel the difference first-hand.</h2>
          </div>
          <Link href="/contact" className="btn-primary" data-testid="link-sustainability-samples">
            Request a sample box <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </Shell>
  );
}

function About() {
  return (
    <Shell>
      <section className="page-hero">
        <div className="container">
          <div className="back-nav-bar">
            <Link href="/" className="back-nav-link">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
          <div className="eyebrow light">About PINE STRONG</div>
          <h1 className="display">A quieter way<br />to make <em>space.</em></h1>
          <p className="body-copy">We are a material studio working where forestry, acoustics and architecture meet.</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div 
            className="large-art" 
            style={{ backgroundImage: `url(${media.stageMaterial})` }} 
            aria-label="Textured natural pine fiber material" 
          />
          <div className="about-copy">
            <div className="eyebrow">Our point of view</div>
            <h2 className="display">Architecture begins with <em>attention.</em></h2>
            <p>
              PINE STRONG started with a simple question: what if a material could improve the way a room sounds and deepen the way it feels?
            </p>
            <p className="body-copy">
              Our answer is a new kind of architectural surface—one that keeps its natural origin close, performs with purpose and leaves room for the work of the architect. We collaborate with designers, makers and thoughtful manufacturers to put material intelligence back at the centre of a project.
            </p>
            <Link href="/contact" className="link-arrow" data-testid="link-about-contact">
              Meet us in a project <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section manifesto">
        <div className="container">
          <div className="eyebrow">How we work</div>
          <h2 className="display">Make less noise.<br /><em>Notice more.</em></h2>
          <div className="manifesto-list">
            <article>
              <b>01</b>
              <h3>Stay close to the source</h3>
              <p>We keep the story of the material visible from fir branch to finished panel.</p>
            </article>
            <article>
              <b>02</b>
              <h3>Design for the whole room</h3>
              <p>Performance is only useful when it belongs to the atmosphere of a place.</p>
            </article>
            <article>
              <b>03</b>
              <h3>Be generous with knowledge</h3>
              <p>We help professionals specify the right surface, scale and application for their work.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <div className="eyebrow light">A material conversation</div>
            <h2 className="display">Tell us what you&apos;re making.</h2>
          </div>
          <Link href="/contact" className="btn-primary" data-testid="link-about-cta">
            Start a conversation <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </Shell>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Shell>
      <section className="page-hero">
        <div className="container">
          <div className="back-nav-bar">
            <Link href="/" className="back-nav-link">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
          <div className="eyebrow light">Assistance for projects</div>
          <h1 className="display">Let&apos;s make room<br />for <em>quiet.</em></h1>
          <p className="body-copy">Tell us a little about the space, the feeling and the practical acoustic question you are working through.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow">Project enquiry</div>
            <h2 className="display">The useful<br /><em>details.</em></h2>
            <p className="body-copy">
              Our studio can help with physical sample boxes, technical data sheets, custom geometric designs and acoustic guidance for projects at any stage.
            </p>
            <div style={{ marginTop: 35, color: '#666666', font: '11px var(--mono)', lineHeight: 2 }}>
              <div>
                <MapPin size={14} style={{ verticalAlign: 'middle', marginRight: 8 }} /> Navi Mumbai, India
              </div>
              <div>
                <Mail size={14} style={{ verticalAlign: 'middle', marginRight: 8 }} /> studio@pinestrong.com
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="contact-success" data-testid="status-contact-success">
                Thank you. Your note is with our studio team. We&apos;ll be in touch with sample boxes and technical details within two working days.
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="field">
                  <label htmlFor="contact-name">Your name</label>
                  <input id="contact-name" required placeholder="Architect or Designer name" data-testid="input-contact-name" />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email address</label>
                  <input id="contact-email" required type="email" placeholder="you@studio.com" data-testid="input-contact-email" />
                </div>
                <div className="field">
                  <label htmlFor="contact-type">Project type</label>
                  <select id="contact-type" defaultValue="" required data-testid="select-contact-project">
                    <option value="" disabled>Select project typology</option>
                    <option>Bar & Restaurant</option>
                    <option>Showroom & Retail Store</option>
                    <option>Fitness & Wellness SPA</option>
                    <option>Public Space & Museum Atrium</option>
                    <option>Corporate Lobby & Workplace</option>
                    <option>Private Residence & Audio Lounge</option>
                    <option>Custom Installation / Other</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="contact-collection">Collection of interest</label>
                  <select id="contact-collection" defaultValue="All Collections">
                    <option>All Collections</option>
                    <option>Groove Collection</option>
                    <option>Mosaic Collection</option>
                    <option>The Base Collection</option>
                    <option>Island Wall Collection</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="contact-message">Your project details</label>
                  <textarea id="contact-message" required placeholder="Tell us about the space, room dimensions, or required acoustic relief..." data-testid="textarea-contact-message" />
                </div>
                <div className="contact-actions">
                  <span className="eyebrow">We read every note</span>
                  <button type="submit" className="btn-primary" data-testid="button-contact-submit">
                    Send enquiry <ArrowUpRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <div className="container contact-aside" style={{ marginBottom: 90 }}>
        <h3>“The best acoustic solution is the one that belongs there.”</h3>
        <div>
          <p>For custom dimensions, technical CAD/BIM downloads, and physical sample boxes, our team is at your disposal.</p>
          <a href="mailto:studio@pinestrong.com" data-testid="link-contact-email">
            studio@pinestrong.com <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </Shell>
  );
}

function PatternInspiration() {
  const [selected, setSelected] = useState<number[]>([1, 4, 7, 10, 14, 17]);
  const toggle = (index: number) => setSelected((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);

  return (
    <Shell>
      <section className="page-hero">
        <div className="container">
          <div className="back-nav-bar">
            <Link href="/" className="back-nav-link">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
          <div className="eyebrow light">Pattern inspiration & constructor</div>
          <h1 className="display">Compose a little<br /><em>quiet.</em></h1>
          <p className="body-copy">Explore the relationship between rhythm, repetition and acoustic comfort. Select tiles to build a custom pattern that fits your architectural intent.</p>
        </div>
      </section>

      <section className="section">
        <div className="container inspiration-grid">
          <div>
            <div className="eyebrow">A visual study</div>
            <h2 className="display">Material is never <em>just a surface.</em></h2>
            <p className="body-copy">
              Every composition changes the way a wall holds light and interacts with sound. Start with an instinct, then bring your arrangement to our studio for fabrication.
            </p>
            <div className="pattern-controls">
              <button className="btn-primary" onClick={() => setSelected([])} data-testid="button-pattern-clear">
                Clear board
              </button>
              <button className="btn-quiet" onClick={() => setSelected([0, 2, 5, 8, 13, 16, 19, 23])} data-testid="button-pattern-curate">
                Curate rhythm 01
              </button>
              <button className="btn-quiet" onClick={() => setSelected([1, 3, 6, 9, 11, 14, 17, 20, 22])} data-testid="button-pattern-curate-2">
                Curate rhythm 02
              </button>
            </div>
            <div className="pattern-status" data-testid="status-pattern-selection">
              {selected.length} modular tiles selected / an architectural starting point for your space
            </div>
          </div>
          <div>
            <div className="pattern-board" aria-label="Interactive pattern board">
              {Array.from({ length: 24 }, (_, index) => (
                <button 
                  key={index} 
                  className={`pattern-tile ${selected.includes(index) ? 'selected' : ''}`} 
                  onClick={() => toggle(index)} 
                  aria-label={`Pattern tile ${index + 1}`} 
                  data-testid={`button-pattern-tile-${index + 1}`} 
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 21, color: '#666666', font: '10px var(--mono)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
              <span>Natural / tactile / modular</span>
              <span>24 × 24 study grid</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <div className="eyebrow light">Custom design</div>
            <h2 className="display">Your wall can be a one-off.</h2>
          </div>
          <Link href="/contact" className="btn-primary" data-testid="link-pattern-contact">
            Discuss a custom pattern <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </Shell>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/collections/:slug" component={CollectionPage} />
        <Route path="/downloads" component={Downloads} />
        <Route path="/sustainability" component={Sustainability} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/pattern-inspiration" component={PatternInspiration} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useLayoutEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location]);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToTop />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;