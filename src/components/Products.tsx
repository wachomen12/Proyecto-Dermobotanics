"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

// Marcas disponibles (tu cliente puede editarlas desde el admin)
const brands = [
  { id: "todas", name: "Todas las Marcas", color: "#c9a962" },
  { id: "bassa", name: "Bassa", description: "Cuidado profesional", color: "#d4b886" },
  { id: "natu", name: "Natú", description: "100% naturales", color: "#c9a962" },
  { id: "amorenature", name: "Amorenature", description: "Rutinas completas", color: "#b8954d" },
  { id: "naturalcenter", name: "Natural Center", description: "Soluciones Cosméticas", color: "#c9a962", icon: "🕊️" },
];

// Categorías de productos
const categories = [
  { id: "todos", name: "Todos", icon: "✨" },
  { id: "facial", name: "Cuidado Facial", icon: "🧴" },
  { id: "corporal", name: "Cuidado Corporal", icon: "🌿" },
  { id: "capilar", name: "Cuidado Capilar", icon: "💇‍♀️" },
  { id: "suplementos", name: "Suplementos", icon: "💊" },
];

export default function Products() {
  const [activeBrand, setActiveBrand] = useState("todas");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [showPromoOnly, setShowPromoOnly] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

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
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#c9a962] mb-3">
            Catálogo de Productos
          </h2>
          <p className="text-base md:text-lg text-[#4a4a4a] max-w-2xl mx-auto leading-relaxed px-4 mb-2">
            Trabajamos con las mejores marcas del mercado para ofrecerte
            productos de alta calidad
          </p>
        </div>

        {/* Badge NUESTRAS MARCAS y Cards de Marcas Fijas */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-[#faf6ed] to-[#f5f0e8] rounded-full mb-6 shadow border border-[#c9a962]/20">
            <span className="text-xs font-semibold text-[#c9a962] tracking-wider uppercase">
              Nuestras Marcas
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Bassa */}
            <div className="bg-[#faf6ed] rounded-3xl p-8 flex flex-col items-center text-center shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow">
                <span className="text-4xl">🧴</span>
              </div>
              <h3 className="text-xl font-bold text-[#2a6b4a] mb-2">Bassa</h3>
              <p className="text-sm text-[#2a2a2a] mb-3">
                Cuidado profesional de la piel con fórmulas avanzadas
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-[#e6ede6] text-[#2a6b4a] px-3 py-1 rounded-full text-xs font-medium">
                  Facial
                </span>
                <span className="bg-[#e6ede6] text-[#2a6b4a] px-3 py-1 rounded-full text-xs font-medium">
                  Profesional
                </span>
                <span className="bg-[#e6ede6] text-[#2a6b4a] px-3 py-1 rounded-full text-xs font-medium">
                  Tratamientos
                </span>
              </div>
            </div>
            {/* Natu */}
            <div className="bg-[#faf6ed] rounded-3xl p-8 flex flex-col items-center text-center shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow">
                <span className="text-4xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold text-[#2a6b4a] mb-2">Natú</h3>
              <p className="text-sm text-[#2a2a2a] mb-3">
                Productos 100% naturales para el cuidado de tu piel
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-[#e6ede6] text-[#2a6b4a] px-3 py-1 rounded-full text-xs font-medium">
                  Natural
                </span>
                <span className="bg-[#e6ede6] text-[#2a6b4a] px-3 py-1 rounded-full text-xs font-medium">
                  Corporal
                </span>
                <span className="bg-[#e6ede6] text-[#2a6b4a] px-3 py-1 rounded-full text-xs font-medium">
                  Orgánico
                </span>
              </div>
            </div>
            {/* Amorenature */}
            <div className="bg-[#faf6ed] rounded-3xl p-8 flex flex-col items-center text-center shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-[#b8954d] mb-2">
                Amorenature
              </h3>
              <p className="text-sm text-[#2a2a2a] mb-3">
                Rutinas skincare completas para una piel radiante
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-[#f5f0e8] text-[#b8954d] px-3 py-1 rounded-full text-xs font-medium">
                  Skincare
                </span>
                <span className="bg-[#f5f0e8] text-[#b8954d] px-3 py-1 rounded-full text-xs font-medium">
                  Rutinas
                </span>
                <span className="bg-[#f5f0e8] text-[#b8954d] px-3 py-1 rounded-full text-xs font-medium">
                  Facial
                </span>
              </div>
            </div>
            {/* Natural Center */}
            <div className="bg-[#faf6ed] rounded-3xl p-8 flex flex-col items-center text-center shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow">
                <span className="text-4xl">🕊️</span>
              </div>
              <h3 className="text-xl font-bold text-[#c9a962] mb-2">Natural Center</h3>
              <p className="text-sm text-[#2a2a2a] mb-3">
                Soluciones cosméticas para el cuidado de tu piel
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-[#f5f0e8] text-[#c9a962] px-3 py-1 rounded-full text-xs font-medium">
                  Cosmética
                </span>
                <span className="bg-[#f5f0e8] text-[#c9a962] px-3 py-1 rounded-full text-xs font-medium">
                  Natural
                </span>
                <span className="bg-[#f5f0e8] text-[#c9a962] px-3 py-1 rounded-full text-xs font-medium">
                  Profesional
                </span>
              </div>
            </div>
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
                  onClick={() => setActiveBrand(brand.id)}
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
                onClick={() => setActiveCategory(category.id)}
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
              onClick={() => setShowPromoOnly(!showPromoOnly)}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {[...filteredProducts].sort((a, b) => (a.orden || 0) - (b.orden || 0)).map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl border-2 border-transparent hover:border-[#c9a962]/30"
              style={{
                boxShadow: '0 4px 20px rgba(201, 169, 98, 0.08)',
              }}
            >
              {/* Efecto shimmer premium en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962]/10 via-transparent to-[#d4b886]/10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>

              {/* Product Image con overlay gradiente */}
              <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8]">
                {typeof product.image === 'string' && product.image ? (
                  <>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={256}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    />
                    {/* Overlay sutil en la imagen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d4b886]/20 to-[#c9a962]/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                      <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                        <span className="text-5xl md:text-6xl">🛍️</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Badge de marca con estilo premium */}
                {/* Eliminado badge de marca y promo para mostrar solo la imagen */}

                {/* Badge de categoría con icono */}
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <span className="text-2xl">
                      {categories.find((c) => normalize(c.name).includes(normalize(product.categoria)))?.icon || '✨'}
                    </span>
                  </div>
                </div>

                {/* Indicador de disponibilidad */}
                {/* Eliminado indicador de disponibilidad para mostrar solo la imagen */}
              </div>

              {/* Content mejorado */}
              <div className="p-6 relative z-10">
                {/* Categoría */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ 
                      color: getBrandColor(product.marca),
                      backgroundColor: `${getBrandColor(product.marca)}15`,
                    }}
                  >
                    {categories.find((c) => normalize(c.name).includes(normalize(product.categoria)))?.name || product.categoria}
                  </span>
                </div>

                {/* Nombre del producto */}
                <h3 className="text-lg md:text-xl font-bold text-[#2a2a2a] mb-3 line-clamp-2 min-h-[56px] group-hover:text-[#c9a962] transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Descripción mejorada */}
                <p className="text-sm text-[#4a4a4a] mb-4 line-clamp-2 min-h-[40px] leading-relaxed">
                  {product.description || "Producto premium de alta calidad para el cuidado de tu piel"}
                </p>

                {/* Separador elegante */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent mb-4"></div>

                {/* Price & CTA mejorados */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#4a4a4a] font-medium mb-1">Precio</span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#d4b886] via-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                  </div>
                  
                  <a
                    href={`https://wa.me/593987901837?text=Hola%20👋%20Me%20interesa%20el%20producto:%20${encodeURIComponent(product.name)}%20-%20Precio:%20$${product.price}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative p-4 rounded-2xl bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    style={{
                      boxShadow: '0 8px 25px rgba(37, 211, 102, 0.3)',
                    }}
                  >
                    {/* Efecto de onda en el botón */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover/btn:scale-100 transition-transform duration-500"></div>
                    
                    <svg
                      className="w-6 h-6 relative z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
                {/* Modal de imagen ampliada con descripción */}
                {selectedProduct && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
                    <div className="relative max-w-3xl w-full mx-4 bg-white rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-8" onClick={e => e.stopPropagation()}>
                      <button
                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-200 transition"
                        onClick={() => setSelectedProduct(null)}
                        aria-label="Cerrar"
                      >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex-1 flex items-center justify-center">
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-auto max-h-[60vh] object-contain rounded-xl" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-4 text-[#c9a962]">{selectedProduct.name}</h2>
                        <p className="text-base text-[#4a4a4a] whitespace-pre-line mb-4">{selectedProduct.description}</p>
                        <div className="mt-2">
                          <span className="text-lg font-semibold text-[#b8954d]">Precio: ${selectedProduct.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Texto adicional del botón */}
                <div className="mt-4 text-center">
                  <span className="text-xs text-[#4a4a4a] font-medium">
                    Click en <span className="text-green-600 font-bold">WhatsApp</span> para consultar
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

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
    </section>
  );
}