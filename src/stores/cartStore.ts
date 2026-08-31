import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartItemVariant, CartSummary } from '../types/cart';
import type { Product } from '../types/product';

export const FREE_SHIPPING_THRESHOLD = 300000; // $300,000 COP para envío gratis
export const STANDARD_SHIPPING_COST = 15000;   // $15,000 COP tarifa base de envío

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Acciones de gestión de items
  addItem: (
    product: Product,
    quantity?: number,
    variant?: CartItemVariant,
    autoOpen?: boolean
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;

  // Acciones de control visual (Drawer / Carrito lateral)
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Cálculos derivados
  getSummary: () => CartSummary;
}

/**
 * Genera un identificador único por item considerando sus variantes seleccionadas
 * (ej: si el usuario añade el mismo cuadro pero con marco Roble y otro con marco Aluminio,
 * se guardan como items independientes en el carrito).
 */
function generateCartItemId(productId: string, variant?: CartItemVariant): string {
  const framePart = variant?.frameMaterial ? `frame-${variant.frameMaterial}` : '';
  const vinylPart = variant?.vinylFormat ? `format-${variant.vinylFormat}` : '';
  const variantSlug = [framePart, vinylPart].filter(Boolean).join('_');
  return variantSlug ? `${productId}_${variantSlug}` : productId;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, variant, autoOpen = true) => {
        const cartItemId = generateCartItemId(product.id, variant);
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex((item) => item.id === cartItemId);

        let updatedItems: CartItem[];

        if (existingItemIndex > -1) {
          // Si ya existe, incrementamos la cantidad respetando el stock disponible
          const existingItem = currentItems[existingItemIndex];
          const newQuantity = Math.min(
            existingItem.quantity + quantity,
            product.stock
          );

          updatedItems = currentItems.map((item, index) =>
            index === existingItemIndex
              ? {
                  ...item,
                  quantity: newQuantity,
                  totalPrice: item.unitPrice * newQuantity
                }
              : item
          );
        } else {
          // Si es un producto nuevo en el carrito
          const initialQuantity = Math.min(quantity, product.stock);
          const newItem: CartItem = {
            id: cartItemId,
            product,
            quantity: initialQuantity,
            variant,
            unitPrice: product.price,
            totalPrice: product.price * initialQuantity
          };

          updatedItems = [...currentItems, newItem];
        }

        set({
          items: updatedItems,
          isOpen: autoOpen ? true : get().isOpen
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== cartItemId)
        }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === cartItemId) {
              const clampedQty = Math.min(quantity, item.product.stock);
              return {
                ...item,
                quantity: clampedQty,
                totalPrice: item.unitPrice * clampedQty
              };
            }
            return item;
          })
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getSummary: () => {
        const items = get().items;
        const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
        const qualifiesForFreeShipping =
          subtotal >= FREE_SHIPPING_THRESHOLD && totalQuantity > 0;
        const shippingCost =
          totalQuantity === 0 ? 0 : qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_COST;
        const discount = 0;
        const total = subtotal + shippingCost - discount;

        return {
          items,
          totalQuantity,
          subtotal,
          shippingCost,
          discount,
          total,
          freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
          qualifiesForFreeShipping
        };
      }
    }),
    {
      name: 'tonica_cart_storage', // Clave en localStorage
      // Solo persistimos la lista de items, no el estado del Drawer (isOpen)
      partialize: (state) => ({ items: state.items })
    }
  )
);
