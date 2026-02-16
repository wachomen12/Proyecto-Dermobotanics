"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

// Marcas disponibles (tu cliente puede editarlas desde el admin)
const brands = [
  { id: "todas", name: "Todas las Marcas", color: "#c9a962" },
  { id: "natu", name: "Natú", description: "100% naturales", color: "#c9a962" },
  { id: "amorenature", name: "Amorenature", description: "Rutinas completas", color: "#b8954d" },
  { id: "naturalcenter", name: "Natural Center", description: "Cosmetología natural", color: "#c9a962", icon: "🕊️" },
  { id: "bassa", name: "Bassa", description: "Dermocosmética profesional", color: "#d4b886" },
];

// Categorías de productos
const categories = [
  { id: "todos", name: "Todos", icon: "✨" },
  { id: "facial", name: "Cuidado Facial", icon: "🧴" },
  { id: "corporal", name: "Cuidado Corporal", icon: "🌿" },
  { id: "capilar", name: "Cuidado Capilar", icon: "💇‍♀️" },
  { id: "suplementos", name: "Suplementos", icon: "💊" },
];

const MOBILE_PRODUCTS_COUNT = 4;

export default function Products() {
  const [activeBrand, setActiveBrand] = useState("todas");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [showPromoOnly, setShowPromoOnly] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{src: string, alt: string} | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  // Función para normalizar marcas (sin tildes, minúsculas)
  function normalize(str: string | undefined | null) {
    if (!str) return "";
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  const filteredProducts = products.filter((product) => {
    // Buscar el nombre visible de la marca seleccionada
    const selectedBrand = brands.find((b) => b.id === activeBrand)?.name || "";
    const brandMatch =
      activeBrand === "todas" ||
      (product.marca && normalize(product.marca) === normalize(selectedBrand));
    const categoryMatch =
      activeCategory === "todos" ||
      (product.categoria &&
        normalize(product.categoria).includes(normalize(activeCategory)));
    const promoMatch = !showPromoOnly || product.promo === true;
    
    return brandMatch && categoryMatch && promoMatch;
  });

  const getBrandColor = (marca: string) => {
    // Busca el color de la marca usando el nombre normalizado
    const brand = brands.find((b) => normalize(b.name) === normalize(marca));
    return brand?.color || "#c9a962";
  };

  return (
    <section
      id="productos"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#faf8f5] via-white to-[#f5f0e8]"
    >
      {/* Background decorativo dorado */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-to-br from-[#d4b886]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-[500px] h-[500px] bg-gradient-to-tr from-[#c9a962]/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#ebdab0]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full mb-6 shadow-sm border border-[#e7dbc2]/40">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a962] animate-pulse"></div>
            <span className="text-xs font-medium text-[#4a4a4a] tracking-[0.15em] uppercase">Productos Premium</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#3a3a3a] mb-3">
            Catálogo de <span className="font-semibold bg-gradient-to-r from-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">Productos</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-[#c9a962]/60"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent"></div>
          </div>
          <p className="text-sm md:text-base text-[#5a5a5a] max-w-2xl mx-auto leading-relaxed px-4">
            Trabajamos con las mejores marcas del mercado para ofrecerte
            productos de alta calidad
          </p>
        </div>

        {/* Cards de Marcas compactas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-10">
          {/* Natú */}
          <div className="text-center p-4 md:p-5 rounded-2xl bg-[#faf8f5] hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#e7dbc2]/40">
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#d4b886]/20 to-[#c9a962]/20 flex items-center justify-center text-2xl md:text-3xl shadow-md">
              🌿
            </div>
            <h4 className="font-bold text-[#4a4a4a] mb-1 text-sm md:text-base">Natú</h4>
            <p className="text-xs md:text-sm text-[#5a5a5a] leading-relaxed">Productos 100% naturales para el cuidado de tu piel.</p>
          </div>
          {/* Amorenature */}
          <div className="text-center p-4 md:p-5 rounded-2xl bg-[#faf8f5] hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#e7dbc2]/40">
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#d4b886]/20 to-[#c9a962]/20 flex items-center justify-center text-2xl md:text-3xl shadow-md">
              ✨
            </div>
            <h4 className="font-bold text-[#4a4a4a] mb-1 text-sm md:text-base">Amorenature</h4>
            <p className="text-xs md:text-sm text-[#5a5a5a] leading-relaxed">Rutinas skincare completas para una piel radiante.</p>
          </div>
          {/* Natural Center */}
          <div className="text-center p-4 md:p-5 rounded-2xl bg-[#faf8f5] hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#e7dbc2]/40">
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#d4b886]/20 to-[#c9a962]/20 flex items-center justify-center text-2xl md:text-3xl shadow-md">
              🕊️
            </div>
            <h4 className="font-bold text-[#4a4a4a] mb-1 text-sm md:text-base">Natural Center</h4>
            <p className="text-xs md:text-sm text-[#5a5a5a] leading-relaxed">Cosmetología natural avanzada en la comodidad de tu hogar.</p>
          </div>
          {/* Bassa */}
          <div className="text-center p-4 md:p-5 rounded-2xl bg-[#faf8f5] hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#e7dbc2]/40">
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#d4b886]/20 to-[#c9a962]/20 flex items-center justify-center text-2xl md:text-3xl shadow-md">
              🧴
            </div>
            <h4 className="font-bold text-[#4a4a4a] mb-1 text-sm md:text-base">Bassa</h4>
            <p className="text-xs md:text-sm text-[#5a5a5a] leading-relaxed">Dermocosmética profesional basada en ciencia y activos de alta eficacia.</p>
          </div>
        </div>

        <div className="mb-8 md:mb-10">
          <h3 className="text-sm font-medium text-[#4a4a4a] mb-4 text-center tracking-wider uppercase">
            Filtrar por Marca
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand) => {
              const isActive = activeBrand === brand.id;
              return (
                <button
                  key={brand.id}
                  onClick={() => { setActiveBrand(brand.id); setShowAllProducts(false); }}
                  className={`relative px-7 py-3 rounded-full font-semibold transition-all duration-300 text-base overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#c9a962]/40 shadow-md
                    ${isActive
                      ? "scale-105 text-white border-0"
                      : "bg-white/90 text-[#4a4a4a] hover:shadow-lg border border-[#c9a962]/20 hover:border-[#c9a962]/40"}
                  `}
                  style={isActive ? {
                    background: `linear-gradient(90deg, ${brand.color} 60%, #fffbe6 100%)`,
                    color: '#fff',
                    boxShadow: `0 4px 24px ${brand.color}33`,
                  } : {}}
                >
                  {/* Animación de brillo */}
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-80 animate-pulse pointer-events-none rounded-full"></span>
                  )}
                  <span className="relative z-10 drop-shadow-md" style={isActive ? {color: '#fff'} : {}}>{brand.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Premium */}
        <div className="mb-10 md:mb-12">
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide snap-x snap-mandatory">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => { setActiveCategory(category.id); setShowAllProducts(false); }}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm whitespace-nowrap flex items-center gap-2 snap-center ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white shadow-xl shadow-[#c9a962]/30 scale-105"
                    : "bg-white/80 backdrop-blur-sm text-[#4a4a4a] hover:shadow-lg border border-[#c9a962]/20 hover:border-[#c9a962]/40"
                }`}
                style={{ minWidth: 120 }}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Filtro de Promociones */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => { setShowPromoOnly(!showPromoOnly); setShowAllProducts(false); }}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                showPromoOnly
                  ? "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white shadow-xl shadow-pink-500/40 scale-105"
                  : "bg-white/90 backdrop-blur-sm text-[#4a4a4a] border-2 border-pink-300 hover:border-pink-400 hover:shadow-lg"
              }`}
            >
              <span className="text-lg">🎁</span>
              {showPromoOnly ? "Mostrando Promociones" : "Ver Solo Promociones"}
              {showPromoOnly && (
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {filteredProducts.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Products Grid Premium - MEJORADO */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {(showAllProducts
            ? [...filteredProducts].sort((a, b) => (a.orden || 0) - (b.orden || 0))
            : [...filteredProducts].sort((a, b) => (a.orden || 0) - (b.orden || 0)).slice(0, MOBILE_PRODUCTS_COUNT)
          ).map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-xl border border-[#e7dbc2]/30 hover:border-[#c9a962]/30 cursor-pointer"
              style={{
                boxShadow: '0 2px 12px rgba(201, 169, 98, 0.06)',
              }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Image */}
              <div
                className="relative h-36 sm:h-44 md:h-56 overflow-hidden bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8]"
              >
                {typeof product.image === 'string' && product.image ? (
                  <>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={256}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Icono de zoom */}
                    <div
                      className="absolute bottom-2 right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow cursor-pointer hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (typeof product.image === 'string' && product.image) {
                          setLightboxImage({ src: product.image, alt: product.name });
                        }
                      }}
                    >
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#b8954d]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <span className="text-3xl md:text-5xl">🛍️</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 md:p-5 relative z-10">
                {/* Categoría y Marca */}
                <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2">
                  <span
                    className="text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 md:px-3 py-0.5 md:py-1 rounded-full"
                    style={{ 
                      color: getBrandColor(product.marca),
                      backgroundColor: `${getBrandColor(product.marca)}15`,
                    }}
                  >
                    {categories.find((c) => normalize(c.name).includes(normalize(product.categoria)))?.name || product.categoria}
                  </span>
                  {product.marca && (
                    <span className="text-[10px] md:text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full px-2 md:px-3 py-0.5 md:py-1">
                      {product.marca}
                    </span>
                  )}
                </div>

                {/* Nombre */}
                <h3 className="text-sm md:text-lg font-bold text-[#2a2a2a] mb-1 md:mb-2 line-clamp-2 min-h-[36px] md:min-h-[48px] group-hover:text-[#b8954d] transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Descripción - oculta en móvil para compactar */}
                <p className="hidden md:block text-xs text-[#5a5a5a] mb-3 line-clamp-2 min-h-[32px] leading-relaxed">
                  {product.description || "Producto premium de alta calidad para el cuidado de tu piel"}
                </p>

                {/* Separador */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#e7dbc2]/50 to-transparent mb-2 md:mb-3"></div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] md:text-[10px] text-[#5a5a5a] font-medium mb-0.5 uppercase tracking-wider">Precio</span>
                    <span className="text-base md:text-2xl font-bold bg-gradient-to-r from-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                  </div>
                  
                  {/* Indicador de ver más */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d4b886]/20 to-[#c9a962]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Botón Pedir por WhatsApp en cada tarjeta */}
                <a
                  href={`https://wa.me/593987901837?text=${encodeURIComponent(`Hola 👋 Me interesa el producto: ${product.name} - Precio: $${product.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full mt-3 py-2 md:py-2.5 bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white font-bold rounded-lg md:rounded-xl shadow-md hover:shadow-lg hover:from-[#0e7a6e] hover:to-[#20c45e] transition-all duration-300 flex items-center justify-center gap-1.5 text-[11px] md:text-sm"
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Pedir por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Ver más / Ver menos productos */}
        {filteredProducts.length > MOBILE_PRODUCTS_COUNT && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-xl rounded-full font-semibold text-[#c9a962] border-2 border-[#c9a962]/30 shadow-lg hover:shadow-xl hover:border-[#c9a962]/60 hover:bg-[#faf6ed] transition-all duration-300"
            >
              <span>{showAllProducts ? 'Ver menos' : `Ver todos los productos (${filteredProducts.length})`}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${showAllProducts ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Empty State Premium */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4b886]/20 to-[#c9a962]/20 mb-6">
              <span className="text-4xl">🛍️</span>
            </div>
            <h3 className="text-2xl font-bold text-[#3a3a3a] mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-[#4a4a4a] mb-8">
              Próximamente agregaremos productos en esta categoría
            </p>
            <a
              href="https://wa.me/593987901837"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white rounded-full font-semibold hover:shadow-xl hover:shadow-[#c9a962]/30 transition-all"
            >
              Contáctanos por WhatsApp
            </a>
          </div>
        )}

        {/* CTA Premium */}
        <div className="mt-16 md:mt-20 relative">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-[#c9a962]/20 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d4b886]/10 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2a2a2a] mb-4">
                ¿Necesitas{" "}
                <span className="bg-gradient-to-r from-[#d4b886] to-[#c9a962] bg-clip-text text-transparent">
                  asesoría personalizada?
                </span>
              </h3>
              <p className="text-base md:text-lg text-[#4a4a4a] mb-8 max-w-2xl mx-auto">
                Te ayudamos a encontrar los productos ideales para tu tipo de
                piel y necesidades específicas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/593987901837?text=Hola%20👋%20Quisiera%20asesoría%20sobre%20productos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white rounded-full font-semibold shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Consulta Gratuita</span>
                </a>

                <a
                  href="https://www.instagram.com/dermobotanics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-full font-semibold shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Ver en Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal detalle del producto */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition z-20"
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5 text-[#3a3a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen del producto */}
            {typeof selectedProduct.image === 'string' && selectedProduct.image ? (
              <div
                className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8] cursor-pointer"
                onClick={() => {
                  setLightboxImage({ src: selectedProduct.image, alt: selectedProduct.name });
                }}
              >
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                {/* Zoom hint */}
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-[#b8954d]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </div>
              </div>
            ) : (
              <div className="flex justify-center pt-8 pb-2">
                <div className="w-24 h-24 bg-gradient-to-br from-[#f5ecd4] to-[#ebdab0] rounded-2xl flex items-center justify-center text-5xl shadow-lg">
                  🛍️
                </div>
              </div>
            )}

            {/* Contenido */}
            <div className="p-6 md:p-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedProduct.promo && (
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs font-bold rounded-full">🎁 Promoción</span>
                )}
                {selectedProduct.marca && (
                  <span
                    className="px-3 py-1 text-xs font-bold rounded-full"
                    style={{
                      color: getBrandColor(selectedProduct.marca),
                      backgroundColor: `${getBrandColor(selectedProduct.marca)}15`,
                    }}
                  >
                    {selectedProduct.marca}
                  </span>
                )}
                {selectedProduct.categoria && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                    {categories.find((c) => normalize(c.name).includes(normalize(selectedProduct.categoria)))?.icon}{' '}
                    {categories.find((c) => normalize(c.name).includes(normalize(selectedProduct.categoria)))?.name || selectedProduct.categoria}
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#2a2a2a] mb-3">
                {selectedProduct.name}
              </h2>

              <div className="h-0.5 w-12 bg-gradient-to-r from-[#d4b886] to-[#c9a962] rounded-full mb-4"></div>

              <p className="text-sm md:text-base text-[#5a5a5a] leading-relaxed mb-6">
                {selectedProduct.description || 'Producto premium de alta calidad para el cuidado de tu piel.'}
              </p>

              {/* Separador */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#e7dbc2]/50 to-transparent mb-5"></div>

              {/* Precio */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs text-[#5a5a5a] font-medium uppercase tracking-wider">Precio</span>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">
                    ${selectedProduct.price}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Lightbox - Imagen completa del producto */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition z-10"
            onClick={() => setLightboxImage(null)}
            aria-label="Cerrar imagen"
          >
            <svg className="w-6 h-6 text-[#3a3a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}