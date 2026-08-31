export type ProductType = 'vinyl' | 'frame';

export type MusicGenre =
  | 'rock'
  | 'jazz'
  | 'electronic'
  | 'indie'
  | 'hip_hop'
  | 'soul_funk'
  | 'latin';

export type VinylSpeed = '33 RPM' | '45 RPM';
export type VinylFormat = 'LP' | '2xLP' | 'EP' | 'Single' | 'Box Set';

export interface VinylDetails {
  speed: VinylSpeed;
  format: VinylFormat;
  weight?: string; // e.g. "180g Audiophile", "140g"
  color?: string; // e.g. "Negro Clásico", "Azul Translúcido"
  releaseYear?: number;
  recordLabel?: string;
}

export type FrameMaterial =
  | 'Madera Roble Natural'
  | 'Madera Negra Mate'
  | 'Madera Nogal'
  | 'Aluminio Dorado Cepillado'
  | 'Aluminio Negro Anodizado';

export interface FrameDetails {
  dimensions: string; // e.g. "32 x 32 cm", "70 x 40 cm"
  frameMaterial: FrameMaterial;
  glassType?: string; // e.g. "Vidrio Museo Antirreflejo", "Acrílico UV"
  includesVinylDisplay?: boolean; // true si es expositor con vitrina para vinilo
}

export interface BaseProduct {
  id: string;
  slug: string;
  name: string;
  artist: string;
  album: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  coverImage: string;
  galleryImages?: string[];
  genre: MusicGenre;
  stock: number;
  isFeatured?: boolean;   // Para destacar en el Home (hero, selección curada)
  isBestSeller?: boolean; // Para badge de "Más Vendido"
  tags?: string[];
  createdAt: string;
}

export interface VinylProduct extends BaseProduct {
  type: 'vinyl';
  details: VinylDetails;
}

export interface FrameProduct extends BaseProduct {
  type: 'frame';
  details: FrameDetails;
}

export type Product = VinylProduct | FrameProduct;

// Type guards
export function isVinylProduct(product: Product): product is VinylProduct {
  return product.type === 'vinyl';
}

export function isFrameProduct(product: Product): product is FrameProduct {
  return product.type === 'frame';
}

// Filtros y ordenamiento
export type ProductSortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'name-asc';

export interface ProductFilterState {
  searchQuery: string;
  type?: ProductType | 'all';
  genre?: MusicGenre | 'all';
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy: ProductSortOption;
}
