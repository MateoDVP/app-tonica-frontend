# Tónica Sonora - Frontend E-Commerce

Single Page Application (SPA) para "Tónica Sonora", una plataforma boutique de comercio electrónico orientada a la curaduría y venta de vinilos musicales de alta fidelidad, cuadros expositores y arte decorativo para melómanos y coleccionistas.

---

## Tecnologías Principales & Enfoque Técnico

- **Core:** React 19, TypeScript 5 (Modo Estricto), Vite.
- **UI & Diseño:** Chakra UI v3, Emotion CSS-in-JS.
- **Estado Global:** Zustand con middleware de persistencia en localStorage.
- **Enrutamiento:** React Router DOM 7.
- **Iconografía:** Lucide React.
- **Patrón Arquitectónico:** Arquitectura Hexagonal / Patrón Repositorio (Capa de datos agnóstica preparada para transición plug-and-play hacia Shopify Storefront GraphQL, REST APIs o Supabase).

---

## Resumen del Proyecto

Este proyecto fue diseñado con un enfoque estricto en arquitectura de software escalable, patrones de diseño modernos, desacoplamiento de capas y tipado estricto en TypeScript. Está preparado para operar inicialmente con una capa mock asíncrona y transicionar hacia cualquier proveedor de datos externo modificando un único punto de configuración sin afectar la interfaz de usuario.

---

## Decisiones de Arquitectura y Patrones de Diseño

### 1. Capa de Datos Agnóstica (Arquitectura Hexagonal / Patrón Repositorio)
La interfaz de usuario no consume datos ni conoce la implementación del origen de la información. Toda la comunicación se realiza a través de un contrato de interfaz (`IProductService`).

- **Contrato (`src/services/productService.ts`):** Define los métodos estándar (`getProducts`, `getProductById`, `getProductBySlug`, `getFeaturedProducts`, `getRelatedProducts`, `getProductsByGenre`).
- **Implementación Mock (`MockProductService`):** Procesa filtros avanzados (búsqueda full-text, filtrado por género, tipo de producto, rangos de precio y ordenamiento) con simulación de latencia de red para probar estados de carga reales (skeletons y spinners).
- **Extensibilidad Inmediata:** Para conectar un backend en producción, se implementa una nueva clase (por ejemplo, `ShopifyProductService`) bajo el mismo contrato y se reemplaza la instancia exportada en una sola línea de código.

### 2. Modelado de Dominio Seguro (TypeScript 5+)
- **Uniones Discriminadas:** Modelado formal para diferenciar entidades del catálogo (`type: 'vinyl'` vs `type: 'frame'`), garantizando que atributos específicos (gramaje de vinilo, RPM, formato LP vs material de marco, tipo de vidrio y dimensiones) solo estén disponibles en sus respectivos contextos.
- **Type Guards:** Funciones validadoras (`isVinylProduct`, `isFrameProduct`) que permiten estrechamiento de tipos (*type narrowing*) seguro dentro de componentes de renderizado condicional.
- **Sintaxis de Módulos Estricta:** Configuración bajo `verbatimModuleSyntax`, asegurando importaciones explícitas de tipos (`import type`) y optimización del árbol de dependencias para el empaquetado.

### 3. Estado Global Reactivo y Persistente (Zustand)
- **Gestión Atómica de Carrito:** Almacenamiento centralizado (`cartStore.ts`) para adición, edición de cantidades, validación de stock disponible y eliminación de items.
- **Diferenciación por Variantes:** Generación de identificadores compuestos para permitir que el mismo producto con diferentes opciones (por ejemplo, marco en Roble Natural vs marco en Aluminio Dorado) se gestione como líneas independientes en el pedido.
- **Cálculo Derivado y Lógica de Negocio:** Cálculo en tiempo real de subtotal, costo de envío, umbral para envío gratuito y total acumulado.
- **Persistencia Local:** Sincronización automática con `localStorage` mediante el middleware `persist`, conservando el carrito del usuario ante recargas de página.

### 4. Flujo de Checkout sin Fricción (Guest Checkout & WhatsApp API)
- Flujo de compra directa sin requerir registro previo obligatorio, optimizado para conversión rápida.
- Recopilación estructurada de datos de envío y facturación (`CustomerInfo`).
- Serialización del pedido y generación dinámica de mensajes con formato estructurado hacia la API de WhatsApp Business (`https://wa.me/...`).

---

## Stack Tecnológico Detallado

| Herramienta / Librería | Versión | Propósito en el Proyecto |
| :--- | :--- | :--- |
| React | 19.x | Biblioteca principal de renderizado declarativo de interfaces. |
| TypeScript | 5.x | Tipado estático estricto, modelado de dominio y contratos. |
| Vite | 6.x / 8.x | Herramienta de compilación, empaquetado y servidor de desarrollo rápido. |
| Chakra UI | v3.x | Sistema de diseño, componentes accesibles y tokens temáticos. |
| Emotion | 11.x | Motor CSS-in-JS para soporte de estilos avanzados y temas. |
| Zustand | 5.x | Gestión de estado global ligera con middleware de persistencia. |
| React Router DOM | 7.x | Enrutamiento declarativo del lado del cliente (SPA). |
| Lucide React | 1.x | Colección de iconografía SVG minimalista y consistente. |
| ESLint | 9.x / 10.x | Análisis estático de código y buenas prácticas. |

---

## Estructura del Proyecto

```text
src/
├── assets/          # Recursos estáticos locales
├── components/      # Componentes UI reutilizables y layout (Header, Navbar, Footer, Drawers)
├── data/            # Fuente de datos inicial / mock fuertemente tipado
│   └── mockProducts.ts
├── features/        # Módulos de negocio divididos por dominio
│   ├── catalog/     # Vista de catálogo, barra de búsqueda, filtros laterales y grids
│   ├── product/     # Detalle de producto, galería de imágenes y selector de variantes
│   ├── cart/        # Drawer deslizable del carrito y resumen de compra
│   └── checkout/    # Formulario de envío y generador de orden
├── hooks/           # Custom hooks para desacoplar lógica de componentes
├── services/        # Capa de abstracción y consumo de datos (patrón repositorio)
│   ├── productService.ts
│   └── index.ts
├── stores/          # Stores de Zustand con sincronización y persistencia
│   ├── cartStore.ts
│   └── index.ts
├── types/           # Definición formal de contratos, interfaces y tipos de TypeScript
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   └── index.ts
├── routes/          # Configuración del árbol de rutas de la aplicación
├── theme/           # Tokens de diseño, tipografía y paleta de colores de Chakra UI
├── App.tsx          # Componente raíz de la aplicación
└── main.tsx         # Punto de entrada y configuración de Providers
```

---

## Ejemplo de Extensibilidad de la Capa de Servicios

Para ilustrar cómo se desacopla la fuente de datos de la interfaz de usuario:

```typescript
// src/services/productService.ts

// 1. Contrato agnóstico que el frontend consume
export interface IProductService {
  getProducts(filter?: Partial<ProductFilterState>): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getRelatedProducts(productId: string, limit?: number): Promise<Product[]>;
}

// 2. Implementación activa (Mock local actual)
export class MockProductService implements IProductService {
  // Manejo interno de filtrado, búsqueda y latencia simulada...
}

// 3. Futura implementación (Shopify Storefront API o REST)
export class ShopifyProductService implements IProductService {
  // Conexión real a endpoints de Shopify vía GraphQL Storefront API...
}

// 4. Único punto de exportación para toda la aplicación:
export const productService: IProductService = new MockProductService();
```

Cualquier vista o componente que ejecute `productService.getProducts()` continuará funcionando de forma transparente sin importar el proveedor que se encuentre detrás.

---

## Instalación y Ejecución Local

### Prerrequisitos
- Node.js 20.x o superior
- npm 10.x o superior

### Pasos

1. Clonar el repositorio:
```bash
git clone https://github.com/MateoDVP/app-tonica-frontend.git
cd app-tonica-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo local:
```bash
npm run dev
```

4. Construir para producción (Typecheck + Vite Build):
```bash
npm run build
```

5. Ejecutar linter:
```bash
npm run lint
```

---

## Hoja de Ruta (Roadmap)

- [x] Arquitectura base, configuración de Vite + TypeScript y limpieza de plantillas por defecto.
- [x] Modelado estricto de tipos de dominio (vinilos, cuadros, variantes, carrito y órdenes).
- [x] Implementación de catálogo mock con datos y carátulas de alta resolución.
- [x] Capa de servicios desacoplada con simulación de latencia de red.
- [x] Store global reactivo de carrito con Zustand y persistencia en localStorage.
- [ ] Configuración de tema personalizado en Chakra UI v3 y enrutamiento con React Router.
- [ ] Construcción de Header, Navigation Bar y Cart Drawer interactivo.
- [ ] Vistas principales: Home, Catálogo con filtros reactivos y Detalle de producto con selector de marcos/formatos.
- [ ] Flujo de Checkout directo con generación de orden formateada para WhatsApp Business.
- [ ] Integración futura con reproductor embebido de preescucha (Spotify API / YouTube Embeds).
- [ ] Conexión con backend de producción / Headless E-commerce.

---

## Licencia y Autoría

Desarrollado por **Mateo De Vivero** como parte de su portafolio profesional de arquitectura frontend y como base técnica de la tienda de vinilos y arte musical **Tónica Sonora**.
