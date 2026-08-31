import type { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-vinyl-dark-side-moon',
    slug: 'pink-floyd-the-dark-side-of-the-moon',
    type: 'vinyl',
    name: 'The Dark Side of the Moon (50th Anniversary Edition)',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    description:
      'Edición conmemorativa por el 50 aniversario prensada en vinilo de 180 gramos audiófilo. Masterización analógica directa de las cintas maestras originales de Abbey Road Studios. Una obra cumbre de la historia musical.',
    price: 185000,
    compareAtPrice: 210000,
    coverImage:
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=1000&q=80'
    ],
    genre: 'rock',
    stock: 12,
    isFeatured: true,
    isBestSeller: true,
    tags: ['Rock Progresivo', '180g', 'Edición Especial', 'Clásicos'],
    createdAt: '2026-01-15T10:00:00Z',
    details: {
      speed: '33 RPM',
      format: 'LP',
      weight: '180g Audiophile',
      color: 'Negro Clásico',
      releaseYear: 1973,
      recordLabel: 'Harvest / Pink Floyd Records'
    }
  },
  {
    id: 'prod-vinyl-kind-of-blue',
    slug: 'miles-davis-kind-of-blue',
    type: 'vinyl',
    name: 'Kind of Blue (Master Mono Edition)',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    description:
      'El álbum de jazz más influyente y vendido de todos los tiempos. Grabado con John Coltrane, Bill Evans y Cannonball Adderley. Edición especial en vinilo translúcido azul de alta densidad.',
    price: 165000,
    coverImage:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    genre: 'jazz',
    stock: 8,
    isFeatured: true,
    isBestSeller: false,
    tags: ['Jazz', 'Columbia Records', 'Audiophile'],
    createdAt: '2026-01-20T12:00:00Z',
    details: {
      speed: '33 RPM',
      format: 'LP',
      weight: '180g Audiophile',
      color: 'Azul Translúcido Deep Blue',
      releaseYear: 1959,
      recordLabel: 'Columbia Records'
    }
  },
  {
    id: 'prod-vinyl-random-access-memories',
    slug: 'daft-punk-random-access-memories',
    type: 'vinyl',
    name: 'Random Access Memories (10th Anniversary Double LP)',
    artist: 'Daft Punk',
    album: 'Random Access Memories',
    description:
      'Doble LP en carpeta desplegable de lujo. El disco que revitalizó el funk y la música electrónica con colaboraciones de Giorgio Moroder, Nile Rodgers y Julian Casablancas.',
    price: 215000,
    compareAtPrice: 240000,
    coverImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    genre: 'electronic',
    stock: 15,
    isFeatured: true,
    isBestSeller: true,
    tags: ['Electrónica', 'Funk', 'Doble Vinilo', 'Coleccionistas'],
    createdAt: '2026-02-01T15:30:00Z',
    details: {
      speed: '33 RPM',
      format: '2xLP',
      weight: '180g Audiophile',
      color: 'Negro Clásico',
      releaseYear: 2013,
      recordLabel: 'Columbia / Daft Life'
    }
  },
  {
    id: 'prod-vinyl-fleetwood-mac-rumours',
    slug: 'fleetwood-mac-rumours',
    type: 'vinyl',
    name: 'Rumours (Special Textured Gatefold)',
    artist: 'Fleetwood Mac',
    album: 'Rumours',
    description:
      'Uno de los discos fundamentales de los años 70, con temas legendarios como Dreams, Go Your Own Way y The Chain. Edición fiel a la portada original texturada.',
    price: 155000,
    coverImage:
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1000&q=80',
    genre: 'rock',
    stock: 10,
    isFeatured: false,
    isBestSeller: true,
    tags: ['Rock 70s', 'Folk Rock', 'Clásicos'],
    createdAt: '2026-01-10T09:00:00Z',
    details: {
      speed: '33 RPM',
      format: 'LP',
      weight: '140g',
      color: 'Negro Clásico',
      releaseYear: 1977,
      recordLabel: 'Warner Records'
    }
  },
  {
    id: 'prod-frame-dark-side-moon',
    slug: 'cuadro-exhibidor-pink-floyd-dark-side',
    type: 'frame',
    name: 'Cuadro Exhibidor: The Dark Side of the Moon (Doble Vitrina)',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    description:
      'Cuadro artesanal diseñado para exhibir la carátula icónica del prisma junto a un vinilo decorativo de 12 pulgadas en acabado flotante magnético. Marco en madera noble de roble y cristal de museo antirreflejante.',
    price: 245000,
    compareAtPrice: 280000,
    coverImage:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80'
    ],
    genre: 'rock',
    stock: 6,
    isFeatured: true,
    isBestSeller: true,
    tags: ['Cuadros Expositores', 'Madera Roble', 'Decoración Acústica'],
    createdAt: '2026-02-10T14:00:00Z',
    details: {
      dimensions: '70 x 40 cm (Doble Exhibición)',
      frameMaterial: 'Madera Roble Natural',
      glassType: 'Vidrio Museo Antirreflejo',
      includesVinylDisplay: true
    }
  },
  {
    id: 'prod-frame-daft-punk-gold',
    slug: 'cuadro-galeria-daft-punk-gold',
    type: 'frame',
    name: 'Cuadro Galería: Daft Punk - Chrome & Gold Edition',
    artist: 'Daft Punk',
    album: 'Random Access Memories',
    description:
      'Lámina Fine Art de alta resolución en papel de algodón de 310g enmarcada en perfil de aluminio minimalista dorado cepillado con cristal con filtro UV.',
    price: 195000,
    coverImage:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    genre: 'electronic',
    stock: 7,
    isFeatured: true,
    isBestSeller: false,
    tags: ['Fine Art', 'Aluminio Dorado', 'Electrónica'],
    createdAt: '2026-02-12T11:00:00Z',
    details: {
      dimensions: '40 x 40 cm',
      frameMaterial: 'Aluminio Dorado Cepillado',
      glassType: 'Acrílico con Protección UV',
      includesVinylDisplay: false
    }
  },
  {
    id: 'prod-frame-miles-sessions',
    slug: 'cuadro-vintage-miles-davis-sessions',
    type: 'frame',
    name: 'Cuadro Vintage: Miles Davis - 30th Street Studio 1959',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    description:
      'Fotografía histórica restaurada de la sesión de grabación original de Kind of Blue en Nueva York. Enmarcado en madera de nogal con acabado en cera natural y paspartú marfil.',
    price: 220000,
    coverImage:
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80',
    genre: 'jazz',
    stock: 5,
    isFeatured: false,
    isBestSeller: true,
    tags: ['Fotografía de Archivo', 'Madera Nogal', 'Jazz Sessions'],
    createdAt: '2026-01-25T16:00:00Z',
    details: {
      dimensions: '50 x 50 cm',
      frameMaterial: 'Madera Nogal',
      glassType: 'Vidrio Museo Antirreflejo',
      includesVinylDisplay: false
    }
  },
  {
    id: 'prod-vinyl-radiohead-ok-computer',
    slug: 'radiohead-ok-computer-oknotok',
    type: 'vinyl',
    name: 'OK Computer OKNOTOK (Triple Vinyl Edition)',
    artist: 'Radiohead',
    album: 'OK Computer',
    description:
      'Edición de 3 vinilos de 180 gramos con el álbum original remasterizado y 8 caras B más 3 canciones inéditas. Una de las piezas cumbres del rock alternativo de los 90.',
    price: 235000,
    coverImage:
      'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=1000&q=80',
    genre: 'indie',
    stock: 9,
    isFeatured: true,
    isBestSeller: false,
    tags: ['Rock Alternativo', 'Triple Vinilo', '90s'],
    createdAt: '2026-01-18T14:30:00Z',
    details: {
      speed: '33 RPM',
      format: 'Box Set',
      weight: '180g Audiophile',
      color: 'Negro Clásico',
      releaseYear: 1997,
      recordLabel: 'XL Recordings'
    }
  }
];
