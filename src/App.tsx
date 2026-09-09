import { type FormEvent, type ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { 
  ArrowLeft,
  ArrowRight, 
  ArrowUpRight, 
  ChevronDown,
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

export type ProductShape = {
  name: string;
  dimensions?: string;
  description?: string;
  area?: string;
  thickness?: string;
  absorptionNRC?: string;
  edgeDetail?: string;
};

export type PatternItem = {
  name: string;
  tagline: string;
  layoutDescription: string;
};

export type InteriorProject = {
  title: string;
  category: string;
  image: string;
  acousticNote: string;
  description: string;
};

export type Collection = {
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  longDescription: string;
  tone: string;
  image: string;
  heroImage: string;
  materialImage: string;
  compositePlate?: string;
  application: string;
  formats: string;
  thickness: string;
  relief: string;
  absorption: string;
  fireRating: string;
  systemTitle: string;
  systemDescription: string;
  shapes: ProductShape[];
  patternTitle: string;
  patternSubtitle?: string;
  patterns: PatternItem[];
  interiors: InteriorProject[];
};

export const collections: Collection[] = [
  {
    slug: 'mosaic',
    name: 'Mosaic Collection',
    kicker: 'Modular geometric system',
    tagline: 'System of geometric shapes combined into expressive ornamental compositions',
    description: 'Small modular pieces composed into a vibrant acoustic surface with human pulse and geometric freedom.',
    longDescription: 'PINE STRONG Mosaic collection creates expressive and bright ornamental compositions in the interior. Mosaic is a system of geometric shapes that are combined with each other and create lots of variations of patterns and compositions. Different versions of the edges of the panels give a flat or embossed character of the surface. The panels are presented in multiple variations of sizes, which allows you to find the desired scale of the pattern, and also allows you to combine large and small figures, if necessary. Fallen pine needles serve as a natural porous core that minimizes echo and reverberation.',
    tone: 'mosaic',
    image: media.colMosaic,
    heroImage: media.mosaicHero,
    materialImage: media.mosaicMaterial,
    compositePlate: media.mosaicShapesComposite,
    application: 'Wall · Accent Feature · Partitions · Columns',
    formats: '300 × 300 mm · 600 × 600 mm modular units',
    thickness: '15–22 mm thickness',
    relief: 'Multi-plane 12 mm bevel relief',
    absorption: 'NRC 0.85 (Class B sound absorption)',
    fireRating: 'Class B-s1, d0 (EN 13501-1)',
    systemTitle: 'Twelve shapes of collection',
    systemDescription: 'Twelve precisely engineered geometric figures allowing limitless tessellation, spatial rhythm, and compositional scaling.',
    shapes: [
      { name: 'Rhombus', dimensions: '300 × 300 mm', description: 'Angled diamond tile', area: '0.09 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.85', edgeDetail: '45° Micro-bevel' },
      { name: 'Triangle A', dimensions: '300 × 300 mm', description: 'Equilateral geometry', area: '0.04 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.85', edgeDetail: '45° Micro-bevel' },
      { name: 'Triangle B', dimensions: '300 × 300 mm', description: 'Right-angle triangle', area: '0.045 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.85', edgeDetail: '45° Micro-bevel' },
      { name: 'Trapeze', dimensions: '300 × 600 mm', description: 'Symmetrical trapezoid', area: '0.135 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.88', edgeDetail: '45° Micro-bevel' },
      { name: 'Rectangle C', dimensions: '150 × 600 mm', description: 'Narrow plank tile', area: '0.09 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.85', edgeDetail: 'Seamless / Beveled' },
      { name: 'Rectangle B', dimensions: '300 × 600 mm', description: 'Standard rectangle', area: '0.18 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.88', edgeDetail: 'Seamless / Beveled' },
      { name: 'Hexahedron', dimensions: '300 × 300 mm', description: 'Six-sided polygon', area: '0.08 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.85', edgeDetail: '45° Micro-bevel' },
      { name: 'Rectangle A', dimensions: '300 × 450 mm', description: 'Medium aspect block', area: '0.135 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.88', edgeDetail: 'Seamless / Beveled' },
      { name: 'Square', dimensions: '300 × 300 mm', description: 'Square foundational base', area: '0.09 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.85', edgeDetail: 'Seamless / Beveled' },
      { name: 'Triangle C', dimensions: '150 × 300 mm', description: 'Inverted scalene', area: '0.023 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.82', edgeDetail: '45° Micro-bevel' },
      { name: 'Parallelogram A', dimensions: '300 × 600 mm', description: 'Right-slanted angle', area: '0.18 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.88', edgeDetail: '45° Micro-bevel' },
      { name: 'Parallelogram B', dimensions: '300 × 600 mm', description: 'Left-slanted angle', area: '0.18 m²', thickness: '15 / 18 / 22 mm', absorptionNRC: '0.88', edgeDetail: '45° Micro-bevel' },
    ],
    patternTitle: 'Creative freedom with many patterns',
    patternSubtitle: 'Explore our curated architectural pattern configurations or compose a bespoke rhythmic relief tailored specifically to your project dimensions.',
    patterns: [
      { name: 'Hexagonal Honeycomb', tagline: 'Continuous bio-cellular matrix', layoutDescription: 'Seamless interlocking Hexahedron units creating an organic sound-diffusing mesh for double-height atriums.' },
      { name: 'Diamond Pulse', tagline: 'Dynamic radial tessellation', layoutDescription: 'Rhombus diamond clusters arranged in an alternating radial expansion that guides natural interior lighting.' },
      { name: 'Trapeze Weave', tagline: 'Staggered directional rhythm', layoutDescription: 'Alternating Trapeze modules creating an undulating horizontal movement that breaks up flutter echoes.' },
      { name: 'Triangle Chevron', tagline: 'Symmetrical acoustic wave', layoutDescription: 'Pairing Triangle A & Triangle B in sharp directional chevrons for focused executive boardrooms.' },
      { name: 'Rhombus Constellation', tagline: 'Multi-point geometric starburst', layoutDescription: 'Symmetrical star arrays providing multi-angle sound scattering across expansive reception walls.' },
      { name: 'Parallelogram Flow', tagline: 'Slanted rhythmic linear plane', layoutDescription: 'Right and left slanted Parallelograms flowing continuously along long corridors to tame reverberation.' },
      { name: 'Asymmetric Tessellation', tagline: 'Complex architectural collage', layoutDescription: 'A balanced interplay of Squares, Rectangles, and Triangles tailored to irregular room boundaries.' },
      { name: 'Modular Prism', tagline: 'Isometric 3D optical relief', layoutDescription: 'Three-rhombus clusters creating an optical illusion of depth while providing enhanced surface area.' },
      { name: 'Dynamic Diagonal', tagline: 'Directional angular lines', layoutDescription: '45-degree angled steps leading the eye through transitions between spatial volumes.' },
      { name: 'Staggered Geo', tagline: 'Offset ashlar geometric bond', layoutDescription: 'Running bond rectangles anchored by foundational squares for timeless architectural presence.' },
      { name: 'Monochromatic Relief', tagline: 'Subtle stepped shadow plane', layoutDescription: 'Alternating 15 mm and 22 mm thickness levels to create subtle natural shadow rhythms without color contrast.' },
      { name: 'Contrast Mosaic', tagline: 'Dual-orientation interplay', layoutDescription: 'Mixing contrasting needle fiber orientations to catch daylight and provide tactile visual rhythm.' },
    ],
    interiors: [
      {
        title: 'Metropolitan Atrium & Lobby',
        category: 'Commercial Lobby',
        image: media.mosaicHero,
        acousticNote: 'Reverberation reduced from 2.2s to 0.65s',
        description: 'Continuous tessellated Rhombus and Hexahedron panels creating a monumental sound-absorbing welcome feature.',
      },
      {
        title: 'Architectural Material Atelier',
        category: 'Studio Showroom',
        image: media.mosaicProjectAtelier,
        acousticNote: 'Echo flutter eliminated across 250–4000 Hz',
        description: 'Dual-scale Triangle A & Trapeze panels configured as an acoustic accent wall for focused design critique.',
      },
      {
        title: 'Executive Boardroom Feature',
        category: 'Corporate Suite',
        image: media.mosaicProjectBoardroom,
        acousticNote: 'STI speech intelligibility improved to 0.82',
        description: 'Angled Parallelogram geometry providing acoustic diffusion while controlling reflective speech noise.',
      },
      {
        title: 'Contemporary Private Residence',
        category: 'Residential',
        image: media.mosaicProjectResidence,
        acousticNote: 'Warm intimate acoustic envelope',
        description: 'Natural pine-needle mosaic wall bringing forest scent, bio-circular materiality, and auditory comfort.',
      },
    ],
  },
  {
    slug: 'groove',
    name: 'Groove Collection',
    kicker: 'Engraved architectural rhythm',
    tagline: 'Rectangular engraved panels with connecting continuous patterns',
    description: 'A harmonious relationship between architectural expressiveness and natural conifer texture.',
    longDescription: 'PINE STRONG Groove collection is a family of rectangular engraved panels. Graphic linear and geometric elements connect seamlessly across panels to create a continuous architectural pattern. GROOVE is a harmonious relationship between the necessary architectural expressiveness and the conciseness of a monochromatic natural texture. Due to the GROOVE principle, it is possible to create large-format complex compositions that combine graphics and color. Fallen pine needles serve as a natural porous acoustic core that minimizes echo and reverberation.',
    tone: 'groove',
    image: media.colGroove,
    heroImage: media.grooveHero,
    materialImage: media.grooveMaterial,
    application: 'Wall · Executive Suites · Lobbies · Feature Planes',
    formats: '600 × 1200 mm · 600 × 600 mm',
    thickness: '18–25 mm thickness',
    relief: '8–18 mm depth V-grooves',
    absorption: 'NRC 0.85 (Class B sound absorption)',
    fireRating: 'Class B-s1, d0 (EN 13501-1)',
    systemTitle: 'More than 20 options of groove system',
    systemDescription: 'A library of precision CNC-carved linear, diagonal, radial, and checkered channels that connect across panel borders.',
    shapes: [
      { name: 'Lego', description: 'Interlocking block pattern', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Interlocking joint' },
      { name: 'Polka dot', description: 'Punctured rhythmic relief', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.88', edgeDetail: 'Micro-bevel' },
      { name: 'Lapky', description: 'Organic soft relief', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Continuous relief' },
      { name: 'Berry', description: 'Textured point matrix', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Micro-bevel' },
      { name: 'Fun', description: 'Dynamic asymmetrical relief', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Beveled joint' },
      { name: 'Plain', description: 'Smooth unengraved baseline', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.82', edgeDetail: 'Seamless butt-joint' },
      { name: 'Diagonal lines 02', description: '45-degree rhythmic spacing', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Connecting groove' },
      { name: 'Hatch 01', description: 'Fine cross-hatch micro texture', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.88', edgeDetail: 'Seamless edge' },
      { name: 'Lines 04', description: 'Dense linear fluting', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.88', edgeDetail: 'Continuous flute' },
      { name: 'Rectangular', description: 'Stepped rectangular channels', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Connecting groove' },
      { name: 'Lines 03', description: 'Medium spaced linear tracks', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Continuous flute' },
      { name: 'Diagonal lines 03', description: 'Wide diagonal relief', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Connecting groove' },
      { name: 'Checkered 01', description: 'Balanced architectural grid', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Seamless grid' },
      { name: 'Checkered 03', description: 'Offset checkered matrix', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Offset relief' },
      { name: 'Diagonal lines 01', description: 'Continuous directional angle', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Connecting groove' },
      { name: 'Hatch 02', description: 'Dense tactile cross grooves', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.88', edgeDetail: 'Micro-relief' },
      { name: 'Lines 02', description: 'Wide linear grooves', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Continuous flute' },
      { name: 'Lines 03 (Alt)', description: 'Alternating linear cadence', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Continuous flute' },
      { name: 'Arc 02', description: 'Concentric radial curves', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.88', edgeDetail: 'Continuous curve' },
      { name: 'Track 01', description: 'Linear raceway channels', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Shadow channel' },
      { name: 'Checkered 02', description: 'Staggered shadow grid', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Connecting grid' },
      { name: 'Arc 01', description: 'Sweeping continuous arc', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.88', edgeDetail: 'Continuous curve' },
      { name: 'Track 02', description: 'Double channel relief', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Double groove' },
      { name: 'Arc 03', description: 'Large quadrant arc', dimensions: '600 × 1200 mm', area: '0.72 m²', thickness: '18 / 25 mm', absorptionNRC: '0.88', edgeDetail: 'Quadrant curve' },
    ],
    patternTitle: 'Creative freedom with many patterns',
    patternSubtitle: 'Explore engraved rhythmic layouts where precision CNC channels connect seamlessly across panel boundaries.',
    patterns: [
      { name: 'Continuous Fluted Wall', tagline: 'Seamless vertical linear rhythm', layoutDescription: 'Parallel vertical grooves aligning precisely from slab to slab for monolithic architectural walls.' },
      { name: 'Geometric Diamond Fold', tagline: 'Concentric diamond relief field', layoutDescription: 'Intersecting 45-degree CNC cuts forming a diamond grid that breaks up audio flutter echoes.' },
      { name: 'Chevron Linear Rhythms', tagline: 'Dynamic acoustic herringbone', layoutDescription: 'Mirrored diagonal angles creating directional energy in corporate reception and executive halls.' },
      { name: 'Radial Wave Composition', tagline: 'Expanding concentric ripples', layoutDescription: 'Quarter-circle arcs spreading across four adjacent panels into an expansive sculptural wave.' },
      { name: 'Checkered Acoustic Canvas', tagline: 'Alternating directional shadow blocks', layoutDescription: 'Square grooved modules alternating between horizontal and vertical lines for maximum acoustic diffusion.' },
      { name: 'Asymmetric Diagonal Track', tagline: 'Staggered dynamic relief channels', layoutDescription: 'Varied-pitch diagonal grooves providing architectural tension and acoustic diffusion.' },
      { name: 'Micro-Hatch Sound Plane', tagline: 'Fine textured diffusion surface', layoutDescription: 'Dense tactile cross-grooves engineered for speech intimacy in confidential conference rooms.' },
      { name: 'Curved Corridor Flow', tagline: 'Sweeping architectural arcs', layoutDescription: 'Long-radius arcs flowing continuously through hospitality corridors to dampen high-frequency footfall.' },
      { name: 'Lego Grid Relief', tagline: 'Modular dimensional block canvas', layoutDescription: 'Stepped rectangular channels and stud accents creating playful tactile depth.' },
      { name: 'Concentric Arc Ripple', tagline: 'Quadrant wave acoustic relief', layoutDescription: 'Nested circular curves focusing sound dampening around collaborative seating areas.' },
      { name: 'Offset Track Cadence', tagline: 'Staggered stadium slot pattern', layoutDescription: 'Rounded racetrack channels creating quiet architectural presence behind executive desks.' },
      { name: 'Dual-Angle Cross Grid', tagline: 'Intersecting 45-degree relief', layoutDescription: 'Precision double-angle engraving combining light play with Class B acoustic absorption.' },
    ],
    interiors: [
      {
        title: 'Executive Council Chambers',
        category: 'Corporate Suite',
        image: media.grooveHero,
        acousticNote: 'Reverberation reduced from 1.9s to 0.58s',
        description: 'Precision CNC-engraved linear fluting providing directional acoustic diffusion and sound absorption.',
      },
      {
        title: 'High-Ceiling Auditorium Cladding',
        category: 'Civic Auditorium',
        image: media.grooveProjectAuditorium,
        acousticNote: 'Balanced frequency absorption NRC 0.85',
        description: 'Full-height continuous diagonal and horizontal grooved paneling controlling low-frequency rumble.',
      },
      {
        title: 'Hospitality Dining & Lounge',
        category: 'Hospitality Lounge',
        image: media.grooveProjectDining,
        acousticNote: 'Speech babble noise dampened by 7.4 dB',
        description: 'Concentric Arc and Lego relief panels preventing acoustic reflection in high-occupancy dining spaces.',
      },
      {
        title: 'Creative Collaborative Hub',
        category: 'Workplace',
        image: media.grooveProjectHub,
        acousticNote: 'Quiet zones created without physical partitions',
        description: 'Hatch and Checkered groove panels lining meeting alcoves for confidential conversation.',
      },
    ],
  },
  {
    slug: 'base',
    name: 'The Base Collection',
    kicker: 'Blank sheet architectural material',
    tagline: 'Concise surfaces with focus on pure pine-needle forest texture',
    description: 'The honest, softly textured starting point for a considered, monumental quiet interior.',
    longDescription: 'The Base collection of acoustic panels allows you to create concise surfaces with a focus on forest texture. Natural texture and unique needles pattern create a decorative and functional coating. The dimensions of the panels make installation easier even on very large surfaces. Fallen pine needles serve as a natural porous core and minimize the echo effect.',
    tone: 'base',
    image: media.colBase,
    heroImage: media.baseHero,
    materialImage: media.baseMaterial,
    application: 'Wall · Ceiling · Monolithic Cladding · Auditoriums',
    formats: 'Standard sheets from 165 × 285 mm to 660 × 1143 mm',
    thickness: '12 mm · 18 mm · 25 mm',
    relief: 'Smooth natural needle grain & beveled options',
    absorption: 'NRC 0.90 (Class A/B sound absorption)',
    fireRating: 'Class B-s1, d0 (EN 13501-1)',
    systemTitle: 'Eight plain sizes of PINE STRONG material',
    systemDescription: 'Modular standard dimensions engineered for efficient coverage, minimal cutting waste, and seamless acoustic continuity.',
    shapes: [
      { name: '165 × 571 mm', dimensions: '165 × 571 mm', description: 'Slim acoustic plank', area: '0.094 m²', thickness: '12 / 18 / 25 mm', absorptionNRC: '0.88', edgeDetail: 'Micro-bevel / Butt' },
      { name: '330 × 571 mm', dimensions: '330 × 571 mm', description: 'Standard rectangular tile', area: '0.188 m²', thickness: '12 / 18 / 25 mm', absorptionNRC: '0.90', edgeDetail: 'Micro-bevel / Butt' },
      { name: '660 × 1143 mm', dimensions: '660 × 1143 mm', description: 'Large acoustic slab', area: '0.754 m²', thickness: '12 / 18 / 25 mm', absorptionNRC: '0.92', edgeDetail: 'Seamless butt-joint' },
      { name: '165 × 285 mm', dimensions: '165 × 285 mm', description: 'Compact accent strip', area: '0.047 m²', thickness: '12 / 18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Micro-bevel' },
      { name: '570 × 1140 mm', dimensions: '570 × 1140 mm', description: 'Architectural wall panel', area: '0.650 m²', thickness: '12 / 18 / 25 mm', absorptionNRC: '0.90', edgeDetail: 'Micro-bevel / Butt' },
      { name: '570 × 570 mm', dimensions: '570 × 570 mm', description: 'Square modular tile', area: '0.325 m²', thickness: '12 / 18 / 25 mm', absorptionNRC: '0.90', edgeDetail: 'Micro-bevel / Butt' },
      { name: '285 × 570 mm', dimensions: '285 × 570 mm', description: 'Half-panel module', area: '0.162 m²', thickness: '12 / 18 / 25 mm', absorptionNRC: '0.88', edgeDetail: 'Micro-bevel / Butt' },
      { name: '285 × 285 mm', dimensions: '285 × 285 mm', description: 'Quarter modular square', area: '0.081 m²', thickness: '12 / 18 / 25 mm', absorptionNRC: '0.85', edgeDetail: 'Micro-bevel / Butt' },
    ],
    patternTitle: 'Creative freedom with modular formats',
    patternSubtitle: 'Combine the 8 plain sheet dimensions into rhythmic architectural bonds, monolithic planes, or suspended acoustic ceiling fields.',
    patterns: [
      { name: 'Monolithic Wall Plane', tagline: 'Seamless continuous butt-joint field', layoutDescription: 'Large 660 × 1143 mm slabs installed with hairline joints for uninterrupted, calm bio-acoustic surfaces.' },
      { name: 'Staggered Ashlar Brick', tagline: 'Running bond modular rhythm', layoutDescription: 'Alternating 570 × 1140 mm and 285 × 570 mm panels in a traditional architectural running bond.' },
      { name: 'Continuous Butt-Joint Ceiling', tagline: 'Large-slab overhead plane', layoutDescription: 'Ceiling mounted plain panels absorbing rising reverberation in high-volume public lobbies.' },
      { name: 'Vertical Plank Rhythm', tagline: 'Slim vertical acoustic slats', layoutDescription: '165 × 571 mm slim modules arranged in vertical columns to accentuate room height.' },
      { name: 'Modular Square Grid', tagline: 'Symmetrical architectural matrix', layoutDescription: '570 × 570 mm and 285 × 285 mm square modules forming a balanced geometric grid.' },
      { name: 'Alternating Block Weave', tagline: 'Interlocking horizontal & vertical units', layoutDescription: 'Woven orientation of rectangular tiles catching incident light at varying angles.' },
      { name: 'Beveled Shadow Reveal', tagline: '45-degree shadow reveal joints', layoutDescription: 'Panels installed with 3 mm shadow reveals to celebrate modular panel boundaries.' },
      { name: 'Micro-Perforated Field', tagline: 'High-frequency sound diffusion field', layoutDescription: 'Plain surface with internal needle porosity tuned for speech clarity in educational rooms.' },
    ],
    interiors: [
      {
        title: 'Symphony Hall & Auditorium',
        category: 'Cultural & Civic',
        image: media.baseHero,
        acousticNote: 'Certified NRC 0.90 across full octave spectrum',
        description: 'Large-format 660 × 1143 mm and 570 × 1140 mm plain conifer needle panels creating an honest, monolithic plane.',
      },
      {
        title: 'Double-Height Public Gallery',
        category: 'Museum & Gallery',
        image: media.appPublic,
        acousticNote: 'Long reverberation tamed without visual distraction',
        description: 'Ashlar running-bond layout using modular 570 × 570 mm tiles with subtle hairline butt joints.',
      },
      {
        title: 'Acoustic Sanctuary & Wellness Retreat',
        category: 'Wellness Spa',
        image: media.appSpa,
        acousticNote: 'Natural conifer phytoncides + sound absorption',
        description: 'Continuous wall-to-ceiling base panels providing soothing tactile warmth and acoustic intimacy.',
      },
      {
        title: 'Minimalist Architecture Studio',
        category: 'Design Studio',
        image: media.baseProjectStudio,
        acousticNote: 'Monolithic wall cladding with 18 mm acoustic core',
        description: 'Concise surfaces with focus on pure pine-needle forest texture and architectural geometry.',
      },
    ],
  },
  {
    slug: 'radius',
    name: 'Radius Collection',
    kicker: 'Rounded geometric system (Island)',
    tagline: 'System of rounded geometric shapes creating sculptural acoustic islands',
    description: 'Sculptural, floating organic forms that bring acoustic comfort to open volumes with soft curved contours.',
    longDescription: 'Radius collection of acoustic panels is a system of rounded geometric shapes surrounded by background. The rounded shape of the panels and the background of the walls create the effect of the collaboration of architecture and decor. Due to the background, the composition of the RADIUS system panels can be combined with different colors and create unusual accents. Fallen pine needles serve as a natural porous core and minimize the echo effect.',
    tone: 'radius',
    image: media.colRadius,
    heroImage: media.radiusHero,
    materialImage: media.radiusMaterial,
    application: 'Wall · Ceiling Clouds · Suspended Echo Absorbers',
    formats: 'Modular elements up to 1200 × 1200 mm',
    thickness: '25 mm · 35 mm acoustic core',
    relief: 'Curved organic radius perimeter',
    absorption: 'NRC 0.92 (Class A sound absorption)',
    fireRating: 'Class B-s1, d0 (EN 13501-1)',
    systemTitle: 'Seven shapes of Radius system',
    systemDescription: 'Volumetric soft-radius acoustic elements that float individually or group into expansive organic constellations.',
    shapes: [
      { name: 'Arko', dimensions: '400 × 800 mm', description: 'Arch with curved top and straight base', area: '0.28 m²', thickness: '25 / 35 mm', absorptionNRC: '0.92', edgeDetail: 'Soft bullnose radius' },
      { name: 'Rhomus', dimensions: '600 × 600 mm', description: 'Soft-cornered rounded diamond', area: '0.32 m²', thickness: '25 / 35 mm', absorptionNRC: '0.90', edgeDetail: 'Soft bullnose radius' },
      { name: 'Rectangle', dimensions: '400 × 800 mm', description: 'Rounded corner rectangular slab', area: '0.32 m²', thickness: '25 / 35 mm', absorptionNRC: '0.92', edgeDetail: 'Soft bullnose radius' },
      { name: 'Delta', dimensions: '600 × 600 mm', description: 'Soft triangular delta form', area: '0.24 m²', thickness: '25 / 35 mm', absorptionNRC: '0.90', edgeDetail: 'Soft bullnose radius' },
      { name: 'Round', dimensions: 'Ø 600 / 800 mm', description: 'Full circular acoustic disc', area: '0.28 / 0.50 m²', thickness: '25 / 35 mm', absorptionNRC: '0.92', edgeDetail: 'Continuous circular radius' },
      { name: 'Square', dimensions: '600 × 600 mm', description: 'Rounded corner square module', area: '0.36 m²', thickness: '25 / 35 mm', absorptionNRC: '0.90', edgeDetail: 'Soft bullnose radius' },
      { name: 'Petal', dimensions: '500 × 750 mm', description: 'Asymmetric organic leaf contour', area: '0.31 m²', thickness: '25 / 35 mm', absorptionNRC: '0.90', edgeDetail: 'Curved organic radius' },
    ],
    patternTitle: 'Creative freedom with many patterns',
    patternSubtitle: 'Create bespoke acoustic constellations where soft-radius figures float against contrasting architectural backgrounds.',
    patterns: [
      { name: 'Floating Wall Island', tagline: 'Central Arko with satellite soft discs', layoutDescription: 'Central Arko arch anchored by peripheral Round and Delta elements with breathing negative space.' },
      { name: 'Ceiling Acoustic Cloud', tagline: 'Suspended horizontal sound baffles', layoutDescription: 'Suspended Round and Rhomus acoustic elements floating over collaborative meeting tables.' },
      { name: 'Constellation Scatter', tagline: 'Dispersed organic Deltas and Petals', layoutDescription: 'Organic distribution across expansive walls creating an art installation with acoustic absorption.' },
      { name: 'Linear Horizon Arcs', tagline: 'Datum-aligned Arko sequence', layoutDescription: 'A rhythmic progression of Arko arches establishing an architectural datum in tall corridors.' },
      { name: 'Organic Wave Cluster', tagline: 'Fluid undulating Petal and Round layout', layoutDescription: 'Asymmetric Petal and Round groupings evoking natural biophilic wave forms.' },
      { name: 'Biophilic Feature Wall', tagline: 'Harmonious composition of all 7 rounded forms', layoutDescription: 'Carefully scaled arrangement of all 7 radius figures bringing human warmth to commercial interiors.' },
      { name: 'Triple Disk Canopy', tagline: 'Three overlapping circular acoustic discs', layoutDescription: 'Three distinct diameter Round discs suspended at staggered heights to absorb multi-frequency sound.' },
      { name: 'Arko Gateway Transition', tagline: 'Monumental portal flanked by Arko forms', layoutDescription: 'Framing portals and entrance halls with Arko acoustic elements to signal spatial transition.' },
      { name: 'Rhomus Radial Burst', tagline: 'Soft diamond cluster with negative space', layoutDescription: 'Four Rhomus diamonds rotated at 90 degrees around a central point of silence.' },
      { name: 'Delta Ascent Pattern', tagline: 'Upward-pointing delta acoustic array', layoutDescription: 'Upward dynamic orientation of Delta panels guiding sound absorption toward high ceilings.' },
      { name: 'Petal Cascade', tagline: 'Gentle falling organic silhouette', layoutDescription: 'Staggered Petal elements cascading along vertical feature walls in stairwells and lobbies.' },
      { name: 'Balanced Acoustic Pod', tagline: 'Central meeting pod acoustic surround', layoutDescription: 'Curved radius panels surrounding phone booths and meeting pods to preserve speech confidentiality.' },
    ],
    interiors: [
      {
        title: 'Open-Plan Innovation Campus',
        category: 'Collaborative Workspace',
        image: media.radiusHero,
        acousticNote: 'Direct speech reflection dampened by 68%',
        description: 'Free-hanging sculptural Arko, Rhomus, and Delta island panels floating against warm architectural backdrops.',
      },
      {
        title: 'Corporate Reception Canopy',
        category: 'Commercial Lobby',
        image: media.radiusProjectLobby,
        acousticNote: 'Reverberant marble floor noise absorbed',
        description: 'Suspended Round and Petal acoustic clouds framing arrival zones with organic biophilic silhouettes.',
      },
      {
        title: 'Design Gallery Atrium',
        category: 'Public Cultural Space',
        image: media.radiusProjectAtrium,
        acousticNote: 'Reverberation reduced from 2.6s to 0.72s',
        description: 'Constellation scatter of soft-radius acoustic elements floating as architectural art.',
      },
      {
        title: 'Private Executive Pod',
        category: 'Private Office',
        image: media.radiusProjectPod,
        acousticNote: 'Focused speech privacy and echo elimination',
        description: 'Wall-mounted Arko and Square radius elements creating a cozy, sound-damped meeting sanctuary.',
      },
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
  { href: '/downloads', label: 'Downloads' },
  { href: '/pattern-inspiration', label: 'Pattern inspiration' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '/about', label: 'About us' },
];

const collectionLinks = [
  { href: '/collections/mosaic', name: 'Mosaic Collection', subtitle: '12 Geometric Shapes & Formats' },
  { href: '/collections/groove', name: 'Groove Collection', subtitle: '24 Precision CNC Engraved Systems' },
  { href: '/collections/base', name: 'The Base Collection', subtitle: '8 Modular Plain Sheet Sizes' },
  { href: '/collections/radius', name: 'Radius Collection', subtitle: '7 Soft-Radius Acoustic Island Shapes' },
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
          {/* Collections Dropdown */}
          <div className="nav-dropdown-wrap">
            <button 
              className="nav-dropdown-trigger" 
              onClick={(e) => handleNavClick(e, '#product-range')}
              aria-haspopup="true"
              data-testid="nav-collections-dropdown"
            >
              Collections <ChevronDown size={12} strokeWidth={2} />
            </button>
            <div className="nav-dropdown-menu" role="menu">
              {collectionLinks.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="nav-dropdown-item" 
                  role="menuitem"
                >
                  <span className="nav-dropdown-item-title">{item.name}</span>
                  <span className="nav-dropdown-item-subtitle">{item.subtitle}</span>
                </Link>
              ))}
              <div className="nav-dropdown-divider" />
              <a 
                href="#product-range" 
                onClick={(e) => handleNavClick(e, '#product-range')} 
                className="nav-dropdown-item"
              >
                <span className="nav-dropdown-item-title">All Collections Overview</span>
                <span className="nav-dropdown-item-subtitle">Compare all four acoustic material families</span>
              </a>
            </div>
          </div>

          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              aria-current={location.startsWith(item.href) ? 'page' : undefined} 
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {item.label}
            </Link>
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
          <div className="mobile-menu-section-label">Collections</div>
          {collectionLinks.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} className="mobile-sublink">
              {item.name}
            </Link>
          ))}
          <a 
            href="#product-range" 
            onClick={(e) => handleNavClick(e, '#product-range')} 
            className="mobile-sublink"
            data-testid="link-mobile-collections"
          >
            All Collections Overview
          </a>
          <div className="mobile-menu-divider" />
          {navItems.map((item) => (
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
    id: 'mosaic-wall',
    tag: 'Mosaic Collection · Wall Cladding',
    title: 'Sound, shaped by nature.',
    subtitle: 'Geometric pine needle acoustic panels clad across contemporary feature walls, dampening echo while transforming light and shadow.',
    image: media.mosaicHero,
    ctaLink: '/collections/mosaic',
    ctaText: 'Explore Mosaic Wall',
  },
  {
    id: 'groove-wall',
    tag: 'Groove Collection · CNC Engraved Wall',
    title: 'Precision-Engraved Rhythm.',
    subtitle: 'Continuous precision CNC channels carved into conifer needle wall slabs, absorbing speech reverberation in executive boardrooms.',
    image: media.grooveHero,
    ctaLink: '/collections/groove',
    ctaText: 'Explore Groove Wall',
  },
  {
    id: 'faceted-wall',
    tag: '3D Faceted Relief · Acoustic Feature Wall',
    title: 'Faceted Forest Sanctuary.',
    subtitle: 'Three-dimensional faceted conifer needle wall modules catching architectural grazing light, eliminating flutter echoes in modern interiors.',
    image: media.pineStrongInterior,
    ctaLink: '/collections/mosaic',
    ctaText: 'Explore Faceted Wall',
  },
  {
    id: 'radius-wall',
    tag: 'Radius Collection · Floating Island Wall',
    title: 'Sculptural Acoustic Islands.',
    subtitle: 'Soft-radius conifer needle panels floating organically across interior walls, delivering Class A sound absorption and architectural warmth.',
    image: media.radiusHero,
    ctaLink: '/collections/radius',
    ctaText: 'Explore Radius Wall',
  },
  {
    id: 'base-wall',
    tag: 'The Base Collection · Modular Plain Slabs',
    title: 'Monolithic Acoustic Planes.',
    subtitle: 'Large modular sheets of raw conifer needle acoustic material installed seamlessly across double-height cultural and auditorium walls.',
    image: media.baseHero,
    ctaLink: '/collections/base',
    ctaText: 'Explore Base Wall',
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
            {slide.title === 'Sound, shaped by nature.' ? (
              <>Sound, shaped <em>by nature.</em></>
            ) : (
              slide.title
            )}
          </h1>

          <p className="hero-cinematic-lead">
            {slide.subtitle}
          </p>

          <div className="hero-cinematic-actions">
            <Link 
              href={slide.ctaLink} 
              className="btn-cinematic-primary" 
              data-testid="link-hero-collection"
            >
              {slide.ctaText} <ArrowUpRight size={15} />
            </Link>
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
          PINE FOREST <b>·</b> FALLEN PINE NEEDLES <b>·</b> COLLECTION & PREPARATION <b>·</b> PINE STRONG PANEL <b>·</b> ECOLOGICAL ACOUSTICS <b>·</b> NATURAL POROSITY <b>·</b>
        </div>
      </div>

      {/* The Stage of Panels Creation / Our Story */}
      <section className="section dark-section">
        <div className="container">
          <div className="process-head">
            <div>
              <div className="eyebrow light">Our Material Story</div>
              <h2 className="display">From forest floor to <em>finished interior.</em></h2>
            </div>
            <p className="body-copy">
              We transform fallen pine needles—once a contributor to forest-fire risk—into sustainable acoustic solutions for modern interiors.
            </p>
          </div>
          <div className="process-grid-cards">
            {[
              {
                number: '01',
                title: 'Pine Forest',
                copy: 'Where the material begins. Fallen pine needles collect naturally beneath the trees across conifer forests.',
                image: media.stagePineForest,
              },
              {
                number: '02',
                title: 'Fallen Pine Needles',
                copy: 'Fallen pine needles are collected from the forest floor, mitigating seasonal wildfire hazards.',
                image: media.stageFallenNeedles,
              },
              {
                number: '03',
                title: 'From Needles to Material',
                copy: 'Prepared pine needles are transformed and bonded with a biodegradable binder into a durable acoustic core.',
                image: media.stagePreparedMaterial,
              },
              {
                number: '04',
                title: 'PINE STRONG',
                copy: 'A sustainable acoustic material that brings the natural character and warmth of pine needles into modern interiors.',
                image: media.stagePineStrongPanel,
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
            <h2 className="display">Composite material from <em>pine needles.</em></h2>
            <p className="body-copy" style={{ marginTop: 24 }}>
              PINE STRONG focuses on sustainable material usage without harming the environment. The sound-absorbing fiber material is based on fallen pine needles and a natural biodegradable binder.
            </p>
            <p className="body-copy" style={{ marginTop: 16 }}>
              The natural earth tones and tactile texture create a serene forest atmosphere in every interior while delivering lab-certified acoustic absorption.
            </p>
            <div style={{ marginTop: 30 }}>
              <Link href="/sustainability" className="btn-primary">
                Understand the forest cycle <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
          <div className="material-showcase-image" style={{ backgroundImage: `url(${media.stagePreparedMaterial})` }}>
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

function PatternTileIcon({ name, collectionSlug }: { name: string; collectionSlug: string }) {
  const n = name.toLowerCase();
  
  if (collectionSlug === 'mosaic') {
    if (n.includes('honeycomb') || n.includes('hex')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="30,8 44,16 44,32 30,40 16,32 16,16" />
          <polygon points="44,32 58,40 58,56 44,64 30,56 30,40" />
          <polygon points="16,32 30,40 30,56 16,64 2,56 2,40" />
        </svg>
      );
    }
    if (n.includes('diamond') || n.includes('pulse')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="30,6 48,24 30,42 12,24" />
          <polygon points="30,22 42,34 30,46 18,34" />
          <polygon points="30,38 38,46 30,54 22,46" />
        </svg>
      );
    }
    if (n.includes('trapeze') || n.includes('weave')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="12,12 48,12 38,28 22,28" />
          <polygon points="22,32 38,32 48,48 12,48" />
        </svg>
      );
    }
    if (n.includes('chevron') || n.includes('triangle')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="8,20 30,34 52,20" />
          <polyline points="8,30 30,44 52,30" />
          <polyline points="8,10 30,24 52,10" />
        </svg>
      );
    }
    if (n.includes('constellation') || n.includes('rhombus')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="30,6 38,22 30,38 22,22" />
          <polygon points="30,22 46,30 30,38 14,30" />
          <polygon points="30,38 38,54 30,46 22,54" />
        </svg>
      );
    }
    if (n.includes('parallelogram') || n.includes('flow')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="16,10 44,10 34,26 6,26" />
          <polygon points="26,30 54,30 44,46 16,46" />
        </svg>
      );
    }
    if (n.includes('prism') || n.includes('modular')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="30,10 48,20 30,30 12,20" />
          <polygon points="12,20 30,30 30,50 12,40" />
          <polygon points="30,30 48,20 48,40 30,50" />
        </svg>
      );
    }
    if (n.includes('diagonal') || n.includes('dynamic')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" stroke="currentColor" strokeWidth="1.8">
          <line x1="10" y1="50" x2="50" y2="10" />
          <line x1="10" y1="36" x2="36" y2="10" />
          <line x1="24" y1="50" x2="50" y2="24" />
        </svg>
      );
    }
    if (n.includes('staggered') || n.includes('geo')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="8" y="10" width="20" height="12" />
          <rect x="32" y="10" width="20" height="12" />
          <rect x="18" y="26" width="24" height="12" />
          <rect x="8" y="42" width="20" height="12" />
          <rect x="32" y="42" width="20" height="12" />
        </svg>
      );
    }
    if (n.includes('monochromatic') || n.includes('relief')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="10" y="10" width="18" height="18" />
          <rect x="32" y="10" width="18" height="18" strokeDasharray="3 3" />
          <rect x="10" y="32" width="18" height="18" strokeDasharray="3 3" />
          <rect x="32" y="32" width="18" height="18" />
        </svg>
      );
    }
    // Contrast Mosaic
    return (
      <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="10,10 30,10 10,30" fill="currentColor" opacity="0.15" />
        <polygon points="30,10 50,10 50,30" />
        <polygon points="10,30 30,50 10,50" />
        <polygon points="30,50 50,30 50,50" fill="currentColor" opacity="0.15" />
      </svg>
    );
  }

  if (collectionSlug === 'groove') {
    if (n.includes('flute') || n.includes('continuous')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" stroke="currentColor" strokeWidth="1.8">
          <line x1="12" y1="8" x2="12" y2="52" />
          <line x1="21" y1="8" x2="21" y2="52" />
          <line x1="30" y1="8" x2="30" y2="52" />
          <line x1="39" y1="8" x2="39" y2="52" />
          <line x1="48" y1="8" x2="48" y2="52" />
        </svg>
      );
    }
    if (n.includes('diamond') || n.includes('fold')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="30,10 50,30 30,50 10,30" />
          <polygon points="30,18 42,30 30,42 18,30" />
          <polygon points="30,24 36,30 30,36 24,30" />
        </svg>
      );
    }
    if (n.includes('chevron')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="10,18 30,30 50,18" />
          <polyline points="10,30 30,42 50,30" />
          <polyline points="10,42 30,54 50,42" />
        </svg>
      );
    }
    if (n.includes('wave') || n.includes('radial') || n.includes('arc')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M10,50 A40,40 0 0,1 50,10" />
          <path d="M18,50 A32,32 0 0,1 50,18" />
          <path d="M26,50 A24,24 0 0,1 50,26" />
          <path d="M34,50 A16,16 0 0,1 50,34" />
        </svg>
      );
    }
    if (n.includes('checkered') || n.includes('canvas')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" stroke="currentColor" strokeWidth="1.8">
          <line x1="8" y1="18" x2="28" y2="18" />
          <line x1="8" y1="24" x2="28" y2="24" />
          <line x1="38" y1="10" x2="38" y2="30" />
          <line x1="44" y1="10" x2="44" y2="30" />
          <line x1="14" y1="34" x2="14" y2="54" />
          <line x1="20" y1="34" x2="20" y2="54" />
          <line x1="36" y1="42" x2="56" y2="42" />
          <line x1="36" y1="48" x2="56" y2="48" />
        </svg>
      );
    }
    if (n.includes('hatch')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" stroke="currentColor" strokeWidth="1.8">
          <line x1="12" y1="12" x2="48" y2="48" />
          <line x1="12" y1="24" x2="36" y2="48" />
          <line x1="24" y1="12" x2="48" y2="36" />
          <line x1="48" y1="12" x2="12" y2="48" />
          <line x1="36" y1="12" x2="12" y2="36" />
        </svg>
      );
    }
    if (n.includes('track')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="10" y="14" width="40" height="14" rx="7" />
          <rect x="10" y="32" width="40" height="14" rx="7" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 60 60" width="56" height="56" stroke="currentColor" strokeWidth="1.8">
        <line x1="10" y1="16" x2="50" y2="16" />
        <line x1="10" y1="28" x2="50" y2="28" />
        <line x1="10" y1="40" x2="50" y2="40" />
      </svg>
    );
  }

  if (collectionSlug === 'base') {
    if (n.includes('monolithic')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="8" y="8" width="44" height="44" />
        </svg>
      );
    }
    if (n.includes('ashlar') || n.includes('brick')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="6" y="10" width="22" height="16" />
          <rect x="32" y="10" width="22" height="16" />
          <rect x="18" y="30" width="24" height="16" />
          <line x1="6" y1="30" x2="14" y2="30" />
          <line x1="46" y1="30" x2="54" y2="30" />
        </svg>
      );
    }
    if (n.includes('plank')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="10" y="8" width="9" height="44" />
          <rect x="23" y="8" width="9" height="44" />
          <rect x="36" y="8" width="9" height="44" />
        </svg>
      );
    }
    if (n.includes('square')) {
      return (
        <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="10" y="10" width="18" height="18" />
          <rect x="32" y="10" width="18" height="18" />
          <rect x="10" y="32" width="18" height="18" />
          <rect x="32" y="32" width="18" height="18" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="8" y="12" width="44" height="20" />
        <rect x="8" y="34" width="44" height="14" />
      </svg>
    );
  }

  // Radius (Island)
  if (n.includes('cloud') || n.includes('ceiling')) {
    return (
      <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="22" cy="30" r="14" />
        <circle cx="38" cy="30" r="14" />
      </svg>
    );
  }
  if (n.includes('island') || n.includes('floating')) {
    return (
      <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16,42 L16,26 A14,14 0 0,1 44,26 L44,42 Z" />
        <circle cx="46" cy="18" r="7" />
      </svg>
    );
  }
  if (n.includes('constellation')) {
    return (
      <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="16" cy="20" r="8" />
        <rect x="30" y="14" width="16" height="16" rx="5" />
        <path d="M22,34 C22,46 38,46 42,36 Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14,44 L14,24 A16,16 0 0,1 46,24 L46,44 Z" />
      <circle cx="30" cy="24" r="8" />
    </svg>
  );
}

function ShapeIcon({ name, collectionSlug }: { name: string; collectionSlug: string }) {
  const n = name.toLowerCase();
  
  if (collectionSlug === 'mosaic') {
    if (n.includes('rhombus') || n.includes('rombus')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polygon points="25,4 46,25 25,46 4,25" />
        </svg>
      );
    }
    if (n.includes('triangle a')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polygon points="25,5 45,43 5,43" />
        </svg>
      );
    }
    if (n.includes('triangle b')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polygon points="6,6 44,44 6,44" />
        </svg>
      );
    }
    if (n.includes('triangle c')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polygon points="6,8 44,8 25,42" />
        </svg>
      );
    }
    if (n.includes('trapeze')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polygon points="14,10 36,10 45,40 5,40" />
        </svg>
      );
    }
    if (n.includes('rectangle c')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="5" y="16" width="40" height="18" rx="1" />
        </svg>
      );
    }
    if (n.includes('rectangle b')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="8" y="10" width="34" height="30" rx="1" />
        </svg>
      );
    }
    if (n.includes('hexahedron') || n.includes('hexagon')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polygon points="25,5 44,15 44,35 25,45 6,35 6,15" />
        </svg>
      );
    }
    if (n.includes('rectangle a')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="13" y="6" width="24" height="38" rx="1" />
        </svg>
      );
    }
    if (n.includes('square')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="8" y="8" width="34" height="34" rx="1" />
        </svg>
      );
    }
    if (n.includes('parallelogram a')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polygon points="16,10 44,10 34,40 6,40" />
        </svg>
      );
    }
    if (n.includes('parallelogram b')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polygon points="6,10 34,10 44,40 16,40" />
        </svg>
      );
    }
  }

  if (collectionSlug === 'radius' || collectionSlug === 'island') {
    if (n.includes('arko')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M10,40 L10,24 A15,15 0 0,1 40,24 L40,40 Z" />
        </svg>
      );
    }
    if (n.includes('rhomus') || n.includes('rhombus')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="13" y="13" width="24" height="24" rx="7" transform="rotate(45 25 25)" />
        </svg>
      );
    }
    if (n.includes('rectangle')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="6" y="14" width="38" height="22" rx="8" />
        </svg>
      );
    }
    if (n.includes('delta')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M25,8 Q43,40 38,41 Q25,38 12,41 Q7,40 25,8 Z" />
        </svg>
      );
    }
    if (n.includes('round')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="25" cy="25" r="18" />
        </svg>
      );
    }
    if (n.includes('square')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="8" y="8" width="34" height="34" rx="9" />
        </svg>
      );
    }
    if (n.includes('petal')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M10,40 C10,14 38,10 40,38 C26,43 14,42 10,40 Z" />
        </svg>
      );
    }
  }

  if (collectionSlug === 'groove') {
    if (n.includes('lego')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="8" y="16" width="34" height="24" rx="2" />
          <rect x="14" y="10" width="8" height="6" fill="currentColor" />
          <rect x="28" y="10" width="8" height="6" fill="currentColor" />
        </svg>
      );
    }
    if (n.includes('dot') || n.includes('polka')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46">
          <circle cx="16" cy="16" r="3.5" fill="currentColor" />
          <circle cx="34" cy="16" r="3.5" fill="currentColor" />
          <circle cx="16" cy="34" r="3.5" fill="currentColor" />
          <circle cx="34" cy="34" r="3.5" fill="currentColor" />
        </svg>
      );
    }
    if (n.includes('lapky')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14,36 C14,24 24,18 25,14 C26,18 36,24 36,36 C32,40 18,40 14,36 Z" />
          <circle cx="20" cy="16" r="2.5" fill="currentColor" />
          <circle cx="30" cy="16" r="2.5" fill="currentColor" />
        </svg>
      );
    }
    if (n.includes('berry')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46">
          <circle cx="25" cy="20" r="2.8" fill="currentColor" />
          <circle cx="18" cy="28" r="2.8" fill="currentColor" />
          <circle cx="32" cy="28" r="2.8" fill="currentColor" />
          <circle cx="22" cy="36" r="2.8" fill="currentColor" />
          <circle cx="28" cy="36" r="2.8" fill="currentColor" />
        </svg>
      );
    }
    if (n.includes('fun')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="12" x2="38" y2="40" />
          <line x1="22" y1="8" x2="44" y2="28" />
          <line x1="10" y1="36" x2="32" y2="44" />
        </svg>
      );
    }
    if (n.includes('plain')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="8" y="10" width="34" height="30" rx="1" />
        </svg>
      );
    }
    if (n.includes('diagonal lines 01')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="38" x2="38" y2="8" />
          <line x1="12" y1="42" x2="42" y2="12" />
        </svg>
      );
    }
    if (n.includes('diagonal lines 02')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="42" x2="42" y2="8" />
          <line x1="8" y1="26" x2="26" y2="8" />
          <line x1="24" y1="42" x2="42" y2="24" />
        </svg>
      );
    }
    if (n.includes('diagonal lines 03')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="2">
          <line x1="6" y1="44" x2="44" y2="6" />
          <line x1="6" y1="22" x2="22" y2="6" />
          <line x1="28" y1="44" x2="44" y2="28" />
          <line x1="6" y1="34" x2="34" y2="6" />
          <line x1="16" y1="44" x2="44" y2="16" />
        </svg>
      );
    }
    if (n.includes('hatch 01')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="1.8">
          <line x1="8" y1="20" x2="42" y2="20" />
          <line x1="8" y1="30" x2="42" y2="30" />
          <line x1="20" y1="8" x2="20" y2="42" />
          <line x1="30" y1="8" x2="30" y2="42" />
        </svg>
      );
    }
    if (n.includes('hatch 02')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="1.6">
          <line x1="8" y1="16" x2="42" y2="16" />
          <line x1="8" y1="25" x2="42" y2="25" />
          <line x1="8" y1="34" x2="42" y2="34" />
          <line x1="16" y1="8" x2="16" y2="42" />
          <line x1="25" y1="8" x2="25" y2="42" />
          <line x1="34" y1="8" x2="34" y2="42" />
        </svg>
      );
    }
    if (n.includes('lines 04')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="1.6">
          <line x1="12" y1="8" x2="12" y2="42" />
          <line x1="18" y1="8" x2="18" y2="42" />
          <line x1="24" y1="8" x2="24" y2="42" />
          <line x1="30" y1="8" x2="30" y2="42" />
          <line x1="36" y1="8" x2="36" y2="42" />
        </svg>
      );
    }
    if (n.includes('rectangular')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="8" y="10" width="34" height="30" rx="1" />
          <rect x="15" y="17" width="20" height="16" rx="1" />
        </svg>
      );
    }
    if (n.includes('lines 03')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="2">
          <line x1="14" y1="8" x2="14" y2="42" />
          <line x1="25" y1="8" x2="25" y2="42" />
          <line x1="36" y1="8" x2="36" y2="42" />
        </svg>
      );
    }
    if (n.includes('lines 02')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="2.2">
          <line x1="18" y1="8" x2="18" y2="42" />
          <line x1="32" y1="8" x2="32" y2="42" />
        </svg>
      );
    }
    if (n.includes('checkered 01')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="25" x2="42" y2="25" />
          <line x1="25" y1="8" x2="25" y2="42" />
        </svg>
      );
    }
    if (n.includes('checkered 02')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="1.8">
          <line x1="8" y1="20" x2="42" y2="20" />
          <line x1="8" y1="32" x2="42" y2="32" />
          <line x1="20" y1="8" x2="20" y2="20" />
          <line x1="30" y1="20" x2="30" y2="32" />
          <line x1="20" y1="32" x2="20" y2="42" />
        </svg>
      );
    }
    if (n.includes('checkered 03')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="1.8">
          <line x1="12" y1="16" x2="22" y2="16" />
          <line x1="12" y1="22" x2="22" y2="22" />
          <line x1="32" y1="12" x2="32" y2="24" />
          <line x1="38" y1="12" x2="38" y2="24" />
          <line x1="16" y1="28" x2="16" y2="40" />
          <line x1="22" y1="28" x2="22" y2="40" />
          <line x1="28" y1="34" x2="38" y2="34" />
          <line x1="28" y1="40" x2="38" y2="40" />
        </svg>
      );
    }
    if (n.includes('arc 01')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M10,40 A24,24 0 0,1 40,10" />
        </svg>
      );
    }
    if (n.includes('arc 02')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10,40 A26,26 0 0,1 40,10" />
          <path d="M18,40 A18,18 0 0,1 40,18" />
        </svg>
      );
    }
    if (n.includes('arc 03')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8,42 A28,28 0 0,1 42,8" />
          <path d="M16,42 A20,20 0 0,1 42,16" />
          <path d="M24,42 A12,12 0 0,1 42,24" />
        </svg>
      );
    }
    if (n.includes('track 01')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="10" y="18" width="30" height="14" rx="7" />
        </svg>
      );
    }
    if (n.includes('track 02')) {
      return (
        <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="8" y="13" width="34" height="10" rx="5" />
          <rect x="8" y="27" width="34" height="10" rx="5" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 50 50" width="46" height="46" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="16" x2="42" y2="16" />
        <line x1="8" y1="25" x2="42" y2="25" />
        <line x1="8" y1="34" x2="42" y2="34" />
      </svg>
    );
  }

  // The Base (8 modular plain sizes with proportional rectangles)
  if (n.includes('165 × 571') || n.includes('165x571')) {
    return (
      <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="18.5" y="3" width="13" height="44" rx="1" />
      </svg>
    );
  }
  if (n.includes('330 × 571') || n.includes('330x571')) {
    return (
      <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="12.5" y="3" width="25" height="44" rx="1" />
      </svg>
    );
  }
  if (n.includes('660 × 1143') || n.includes('660x1143')) {
    return (
      <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="12" y="2.5" width="26" height="45" rx="1" />
      </svg>
    );
  }
  if (n.includes('165 × 285') || n.includes('165x285')) {
    return (
      <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="17" y="11" width="16" height="28" rx="1" />
      </svg>
    );
  }
  if (n.includes('570 × 1140') || n.includes('570x1140')) {
    return (
      <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="14" y="3" width="22" height="44" rx="1" />
      </svg>
    );
  }
  if (n.includes('570 × 570') || n.includes('570x570')) {
    return (
      <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="7" y="7" width="36" height="36" rx="1" />
      </svg>
    );
  }
  if (n.includes('285 × 570') || n.includes('285x570')) {
    return (
      <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="15.5" y="6" width="19" height="38" rx="1" />
      </svg>
    );
  }
  if (n.includes('285 × 285') || n.includes('285x285')) {
    return (
      <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="12" y="12" width="26" height="26" rx="1" />
      </svg>
    );
  }

  // Base fallback
  return (
    <svg viewBox="0 0 50 50" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="13" width="32" height="24" rx="1" />
    </svg>
  );
}

function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  // Support both 'radius' and legacy 'island'
  const normalizedSlug = slug === 'island' ? 'radius' : slug;
  const collection = collections.find((item) => item.slug === normalizedSlug) ?? collections[0];
  const related = collections.filter((item) => item.slug !== collection.slug);
  
  const [selectedShape, setSelectedShape] = useState<ProductShape>(collection.shapes[0]);
  const [selectedPattern, setSelectedPattern] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);

  // Keep state updated on slug navigation
  useEffect(() => {
    setSelectedShape(collection.shapes[0]);
    setSelectedPattern(0);
  }, [collection.slug]);

  const currentPattern = collection.patterns[selectedPattern] || collection.patterns[0];

  return (
    <Shell>
      {/* 1. Collection Hero Header */}
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
          <div className="eyebrow">Wall Panels · PINE STRONG Collection</div>
          <h1 className="display">{collection.name}</h1>
          <p className="body-copy">{collection.tagline}</p>
        </div>
      </section>

      {/* Hero Visual Showcase Banner */}
      <div className="container">
        <div 
          className="collection-hero-image" 
          style={{ backgroundImage: `url(${collection.heroImage})` }} 
          aria-label={collection.name} 
        />
      </div>

      {/* Description & Overview */}
      <section className="section">
        <div className="container">
          <div className="collection-intro">
            <div>
              <div className="eyebrow">The Collection Concept</div>
              <h2 className="display">A surface that <em>changes the room.</em></h2>
            </div>
            <div>
              <p>{collection.longDescription}</p>
              <div style={{ marginTop: 28 }}>
                <Link href="/contact" className="btn-primary" data-testid={`link-collection-contact-${collection.slug}`}>
                  Request material samples <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Creative Freedom with Many Patterns */}
      <section className="section dark-section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow light">Creative freedom</div>
            <h2 className="display">{collection.patternTitle}</h2>
            <p className="body-copy">
              {collection.patternSubtitle || 'Explore our curated architectural pattern configurations or compose a bespoke rhythmic relief tailored specifically to your project dimensions.'}
            </p>
          </div>

          <div className="pattern-catalogue-grid">
            {collection.patterns.map((pattern, idx) => (
              <div 
                className={`pattern-visual-card ${selectedPattern === idx ? 'active' : ''}`} 
                key={pattern.name}
                onClick={() => setSelectedPattern(idx)}
                data-testid={`card-pattern-${idx}`}
              >
                <div className="pattern-thumb-wrap">
                  <PatternTileIcon name={pattern.name} collectionSlug={collection.slug} />
                </div>
                <div className="pattern-card-meta">
                  <span className="pattern-card-num">0{idx + 1}</span>
                  <span className="pattern-card-title">{pattern.name}</span>
                </div>
                <div className="pattern-card-desc">{pattern.tagline}</div>
              </div>
            ))}
          </div>

          {/* Pattern Detail Drawer */}
          {currentPattern && (
            <div className="pattern-drawer">
              <div className="pattern-drawer-preview">
                <PatternTileIcon name={currentPattern.name} collectionSlug={collection.slug} />
              </div>
              <div className="pattern-drawer-info">
                <h4>{currentPattern.name} · Architectural Arrangement</h4>
                <p>{currentPattern.layoutDescription}</p>
              </div>
              <Link href={`/contact?collection=${collection.slug}&pattern=${encodeURIComponent(currentPattern.name)}`} className="btn-primary">
                Specify this Pattern <ArrowUpRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 3. The Shape / Format System Section */}
      <section className="section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow">Product System</div>
            <h2 className="display">{collection.systemTitle}</h2>
            <p className="body-copy">{collection.systemDescription}</p>
          </div>

          <div className="shapes-catalogue-grid">
            {collection.shapes.map((s) => (
              <div 
                className={`shape-item-card ${selectedShape.name === s.name ? 'active' : ''}`} 
                key={s.name}
                onClick={() => setSelectedShape(s)}
                data-testid={`card-shape-${s.name.toLowerCase().replaceAll(' ', '-')}`}
              >
                <div className="shape-preview-box">
                  <ShapeIcon name={s.name} collectionSlug={collection.slug} />
                </div>
                <div className="shape-item-name">{s.name}</div>
                {s.dimensions && <div className="shape-item-dim">{s.dimensions}</div>}
                {s.description && (
                  <div style={{ color: '#888888', fontSize: 11, marginTop: 4, lineHeight: 1.3 }}>
                    {s.description}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Shape Inspector Card */}
          {selectedShape && (
            <div className="shape-inspector-card">
              <div className="shape-inspector-grid">
                <div className="shape-inspector-visual">
                  <ShapeIcon name={selectedShape.name} collectionSlug={collection.slug} />
                  <span className="shape-inspector-dim-tag">{selectedShape.dimensions || 'Modular Unit'}</span>
                </div>
                <div>
                  <div className="eyebrow" style={{ color: 'var(--forest)' }}>Shape Inspector · {collection.name}</div>
                  <h3 style={{ fontSize: 24, margin: '4px 0 8px' }}>{selectedShape.name}</h3>
                  <p style={{ color: '#555555', fontSize: 14, margin: 0 }}>
                    {selectedShape.description} — Fabricated from 100% genuine fallen pine needles bonded with formaldehyde-free biodegradable resins.
                  </p>
                  <div className="shape-inspector-specs">
                    <div className="shape-spec-item">
                      <small>Dimensions</small>
                      <span>{selectedShape.dimensions || collection.formats}</span>
                    </div>
                    <div className="shape-spec-item">
                      <small>Unit Area</small>
                      <span>{selectedShape.area || 'Modular'}</span>
                    </div>
                    <div className="shape-spec-item">
                      <small>Core Thickness</small>
                      <span>{selectedShape.thickness || collection.thickness}</span>
                    </div>
                    <div className="shape-spec-item">
                      <small>Absorption NRC</small>
                      <span>NRC {selectedShape.absorptionNRC || '0.85'}</span>
                    </div>
                  </div>
                </div>
                <Link 
                  href={`/contact?collection=${collection.slug}&shape=${encodeURIComponent(selectedShape.name)}`} 
                  className="btn-primary"
                  data-testid="btn-shape-sample"
                >
                  Order {selectedShape.name} Sample <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}

          {/* Featured Catalogue Plate (For Mosaic) */}
          {collection.compositePlate && (
            <div className="featured-plate-wrap">
              <img 
                src={collection.compositePlate} 
                alt="PINE STRONG Mosaic geometric shapes catalog overview" 
                className="featured-plate-img" 
              />
              <div className="featured-plate-caption">
                <span>Catalogue Plate · Geometric Figures Matrix</span>
                <span>PINE STRONG Acoustic Materials</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Variety of panels (Product Details, Relief & Thickness) */}
      <section className="section dark-section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow light">Tactile Materiality</div>
            <h2 className="display">Variety of <em>panels & relief.</em></h2>
            <p className="body-copy">
              Preserving the natural fibrous structure of fallen conifer needles with precision CNC relief, calibrated core thicknesses, and clean architectural edge details.
            </p>
          </div>

          <div className="panel-variety-grid">
            <div className="panel-variety-card">
              <div className="panel-variety-header">
                <div className="panel-variety-icon"><Leaf size={20} /></div>
                <h4>Natural Needle Matrix</h4>
              </div>
              <p>Unbleached fallen conifer needles form a dense, three-dimensional acoustic mesh with porous micro-cavities that absorb airborne sound without synthetic membranes.</p>
              <span className="panel-variety-tag">100% Bio-Bound Core</span>
            </div>

            <div className="panel-variety-card">
              <div className="panel-variety-header">
                <div className="panel-variety-icon"><Layers size={20} /></div>
                <h4>Precision CNC Relief</h4>
              </div>
              <p>CNC-routed channels carved to depths of 8 mm to 18 mm produce directional acoustic diffusion while revealing the contrasting fibrous interior tone.</p>
              <span className="panel-variety-tag">8–18 mm Relief Depth</span>
            </div>

            <div className="panel-variety-card">
              <div className="panel-variety-header">
                <div className="panel-variety-icon"><ShieldCheck size={20} /></div>
                <h4>Engineered Edge Profiles</h4>
              </div>
              <p>Available with 45° micro-bevels to celebrate modular seams, seamless butt-joints for monolithic wall planes, or soft rounded bullnoses for organic islands.</p>
              <span className="panel-variety-tag">Micro-bevel / Seamless</span>
            </div>

            <div className="panel-variety-card">
              <div className="panel-variety-header">
                <div className="panel-variety-icon"><Volume2 size={20} /></div>
                <h4>Calibrated Thickness</h4>
              </div>
              <p>Engineered in 12 mm lightweight wall cladding, 18 mm architectural panels, and 25 mm high-performance acoustic cores achieving up to NRC 0.92.</p>
              <span className="panel-variety-tag">NRC 0.85 – 0.92 Class A/B</span>
            </div>
          </div>

          {/* Material Close-Up Showcase */}
          <div className="material-dual-showcase">
            <div 
              className="material-feature-photo" 
              style={{ backgroundImage: `url(${collection.materialImage})` }}
              aria-label="PINE STRONG natural pine needle acoustic material closeup"
            >
              <div className="material-photo-caption">AUTHENTIC FALLEN PINE NEEDLE TEXTURE</div>
            </div>
            <div className="material-feature-info">
              <div className="eyebrow light">Bio-Material Credentials</div>
              <h3 style={{ color: '#FFFFFF' }}>Porous, bio-bound conifer needles.</h3>
              <p style={{ color: '#BBBBBB' }}>
                Each panel brings the genuine character of conifer needles into the interior. The organic orientation of the needles creates micro-voids that trap sound energy, providing lab-tested acoustic absorption without artificial coatings.
              </p>
              <div className="material-badge-list">
                <span className="material-badge-item" style={{ background: '#222', color: '#FFF', borderColor: '#444' }}>100% Fallen Needles</span>
                <span className="material-badge-item" style={{ background: '#222', color: '#FFF', borderColor: '#444' }}>Bio-degradable Binder</span>
                <span className="material-badge-item" style={{ background: '#222', color: '#FFF', borderColor: '#444' }}>Formaldehyde-Free</span>
                <span className="material-badge-item" style={{ background: '#222', color: '#FFF', borderColor: '#444' }}>Fireproof Class B-s1, d0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Natural Color Palette Section */}
      <section className="section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow">Natural palette</div>
            <h2 className="display">Preserving the <em>noble shades of nature.</em></h2>
            <p className="body-copy">
              The natural color of dry pine needles is Olive—it&apos;s the basic color of our palette. We use careful gentle toning to preserve the natural texture. The noble shades of olive, brown and terracotta give the panels a natural charm just as nature does.
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
            <Link href={`/contact?collection=${collection.slug}&color=${encodeURIComponent(selectedColor.name)}`} className="btn-quiet">
              Order {selectedColor.name} Sample <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Interior Applications Showcase */}
      <section className="section dark-section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow light">Architectural Realization</div>
            <h2 className="display">In situ <em>applications.</em></h2>
            <p className="body-copy">
              Explore real architectural spaces where PINE STRONG {collection.name} panels deliver auditory comfort, spatial intimacy, and biophilic presence.
            </p>
          </div>

          <div className="interior-gallery-grid">
            {collection.interiors.map((proj) => (
              <div className="interior-gallery-card" key={proj.title}>
                <div 
                  className="interior-gallery-image" 
                  style={{ backgroundImage: `url(${proj.image})` }} 
                />
                <div className="interior-gallery-content">
                  <small style={{ font: '600 10px var(--mono)', color: 'var(--forest)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {proj.category} · {proj.acousticNote}
                  </small>
                  <h4 style={{ marginTop: 6 }}>{proj.title}</h4>
                  <p>{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Features of PINE STRONG Wall Panels */}
      <section className="section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow">Why choose us</div>
            <h2 className="display">Features of PINE STRONG <em>wall panels.</em></h2>
            <p className="body-copy">Engineered for acoustic excellence, spatial well-being, and architectural longevity.</p>
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

      {/* 8. Continue Exploring (Related Collections) */}
      <section className="section dark-section related">
        <div className="container">
          <div className="eyebrow light">Continue exploring</div>
          <h2 className="display">More ways to <em>shape sound.</em></h2>
          <div className="related-grid">
            {related.map((item) => (
              <Link href={`/collections/${item.slug}`} className="related-link" key={item.slug} data-testid={`link-related-${item.slug}`}>
                <div className="mini-art" style={{ backgroundImage: `url(${item.heroImage})` }} />
                <small>{item.kicker}</small>
                <h3>{item.name}</h3>
                <p className="body-copy" style={{ fontSize: 13, marginTop: 8 }}>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA Band */}
      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <div className="eyebrow light">Specify with confidence</div>
            <h2 className="display">Let&apos;s talk about your project.</h2>
            <p className="body-copy" style={{ marginTop: 10 }}>
              Need custom relief patterns, CAD/BIM block models, or a physical sample box for your architectural studio?
            </p>
          </div>
          <Link href={`/contact?collection=${collection.slug}`} className="btn-primary" data-testid={`link-collection-cta-${collection.slug}`}>
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
            We have unlocked the potential of conifer needles harmless to nature. The result is a high-performing composite material from fallen pine needles, made for a longer life indoors.
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
                Fallen pine needles are collected from the forest floor, mitigating wildfire risks while preserving living trees. We dry, refine and bind them into panels without turning their origin into a marketing finish.
              </p>
            </div>
          </div>
          <div className="material-loop">
            {[
              ['01', 'Collected with restraint', 'We collect fallen needles from the forest floor, never asking a forest to produce more than it naturally sheds.'],
              ['02', 'Dried by air and time', 'Preparation preserves the natural needle fibre structure and keeps the process low-energy.'],
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
            style={{ backgroundImage: `url(${media.stagePineStrongPanel})` }} 
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
              <p>We keep the story of the material visible from forest floor to finished panel.</p>
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