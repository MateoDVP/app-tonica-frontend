import type { CartItem, CartSummary } from './cart';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  department: string;
  address: string;
  neighborhood?: string;
  deliveryNotes?: string;
}

export type PaymentMethod =
  | 'whatsapp_transfer'
  | 'cash_on_delivery'
  | 'card_online';

export type OrderStatus = 'draft' | 'pending_whatsapp' | 'confirmed' | 'cancelled';

export interface Order {
  orderId: string;
  customer: CustomerInfo;
  items: CartItem[];
  summary: CartSummary;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  whatsappUrl?: string;
}
