import { MOCK_PRODUCTS } from '../data/mockProducts';
import type { MusicGenre, Product, ProductFilterState } from '../types/product';

export interface IProductService {
  getProducts(filter?: Partial<ProductFilterState>): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getRelatedProducts(productId: string, limit?: number): Promise<Product[]>;
  getProductsByGenre(genre: MusicGenre, limit?: number): Promise<Product[]>;
}

export class MockProductService implements IProductService {
  private products: Product[] = [...MOCK_PRODUCTS];
  private latencyMs: number;

  constructor(latencyMs: number = 250) {
    this.latencyMs = latencyMs;
  }

  private async simulateNetworkLatency(): Promise<void> {
    if (this.latencyMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.latencyMs));
    }
  }

  async getProducts(filter?: Partial<ProductFilterState>): Promise<Product[]> {
    await this.simulateNetworkLatency();

    let result = [...this.products];

    if (!filter) {
      return result;
    }

    if (filter.type && filter.type !== 'all') {
      result = result.filter((item) => item.type === filter.type);
    }
    if (filter.genre && filter.genre !== 'all') {
      result = result.filter((item) => item.genre === filter.genre);
    }

    if (filter.searchQuery && filter.searchQuery.trim() !== '') {
      const query = filter.searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.artist.toLowerCase().includes(query) ||
          item.album.toLowerCase().includes(query) ||
          (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    if (typeof filter.minPrice === 'number') {
      result = result.filter((item) => item.price >= filter.minPrice!);
    }
    if (typeof filter.maxPrice === 'number') {
      result = result.filter((item) => item.price <= filter.maxPrice!);
    }

    if (filter.inStockOnly) {
      result = result.filter((item) => item.stock > 0);
    }
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'featured':
        default:
          result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    return result;
  }

  async getProductById(id: string): Promise<Product | null> {
    await this.simulateNetworkLatency();
    const product = this.products.find((item) => item.id === id);
    return product ? { ...product } : null;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    await this.simulateNetworkLatency();
    const product = this.products.find((item) => item.slug === slug);
    return product ? { ...product } : null;
  }

  async getFeaturedProducts(limit: number = 4): Promise<Product[]> {
    await this.simulateNetworkLatency();
    return this.products
      .filter((item) => item.isFeatured)
      .slice(0, limit);
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    await this.simulateNetworkLatency();
    const current = this.products.find((item) => item.id === productId);
    if (!current) {
      return this.products.slice(0, limit);
    }

    return this.products
      .filter(
        (item) =>
          item.id !== productId &&
          (item.genre === current.genre || item.type === current.type)
      )
      .slice(0, limit);
  }

  async getProductsByGenre(genre: MusicGenre, limit: number = 6): Promise<Product[]> {
    await this.simulateNetworkLatency();
    return this.products
      .filter((item) => item.genre === genre)
      .slice(0, limit);
  }
}

export const productService: IProductService = new MockProductService();
