import type { FrameMaterial, Product, VinylFormat } from './product';

export interface CartItemVariant {
  frameMaterial?: FrameMaterial;
  vinylFormat?: VinylFormat;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: CartItemVariant;
  unitPrice: number;
  totalPrice: number;
}

export interface CartSummary {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  qualifiesForFreeShipping: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number; variant?: CartItemVariant } }
  | { type: 'REMOVE_ITEM'; payload: { cartItemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { cartItemId: string; quantity: number } }
  | { type: 'CLEAR_CART' };
