"use client";

import Link from "next/link";

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    const formSection = document.getElementById('formulario-contacto');
    
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      if (formSection) {
        setTimeout(() => {
          formSection.classList.add('ring-4', 'ring-gold-400/50');
          setTimeout(() => {
            formSection.classList.remove('ring-4', 'ring-gold-400/50');
          }, 2000);
        }, 800);
      }
    }
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-elegant-cream via-white to-elegant-champagne pt-16 md:pt-20"
    >
      {/* Background Pattern - Dorado */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-elegant-pearl via-white to-gold-100"></div>
        <div className="absolute top-10 left-5 md:top-20 md:left-20 w-48 md:w-96 h-48 md:h-96 bg-gold-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-5 md:bottom-20 md:right-20 w-40 md:w-80 h-40 md:h-80 bg-gold-500/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-bronze-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-16 md:py-32 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Imagen - Primero en móvil */}
          <div className="relative flex items-center justify-center order-1 lg:order-2">
            {/* Outer glow dorado */}
            <div className="absolute w-[280px] md:w-[400px] h-[280px] md:h-[400px] bg-gradient-to-br from-gold-400/30 via-gold-300/20 to-transparent rounded-full blur-3xl"></div>
            
            {/* Imagen circular con borde dorado */}
            <div className="relative w-[300px] md:w-[400px] h-[300px] md:h-[400px]">
              {/* Borde dorado animado */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-bronze-500 p-1 shadow-2xl shadow-gold-500/30">
                <div className="w-full h-full rounded-full overflow-hidden bg-elegant-charcoal flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center relative">
                    <img
                      src="/hero-main.jpg"
                      alt="Cuidado natural de la piel"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gold-900/40 via-transparent to-gold-400/10 rounded-full pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative dots dorados */}
            <div className="hidden md:block absolute top-8 right-16 w-3 h-3 bg-gold-500 rounded-full opacity-80 animate-float shadow-lg shadow-gold-500/50"></div>
            <div className="hidden md:block absolute bottom-12 left-12 w-4 h-4 bg-gold-400 rounded-full opacity-70 animate-float shadow-lg shadow-gold-400/50" style={{ animationDelay: "2s" }}></div>
            <div className="hidden md:block absolute top-1/2 right-4 w-2 h-2 bg-bronze-400 rounded-full opacity-60 animate-float" style={{ animationDelay: "1s" }}></div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge elegante dorado */}
            <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-gold-50 to-white backdrop-blur-sm rounded-full mb-6 shadow-md border border-gold-300/40">
              <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 animate-pulse shadow-sm shadow-gold-500/50"></span>
              <span className="text-xs md:text-sm text-elegant-charcoal font-medium tracking-wide">Cuidado consciente de la piel</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-elegant-charcoal leading-tight mb-4 md:mb-6">
              Ciencia y
              <span className="block font-semibold bg-gradient-to-r from-gold-600 via-gold-500 to-bronze-500 bg-clip-text text-transparent">Naturaleza</span>
              <span className="block text-2xl md:text-3xl font-normal text-gold-500 mt-2">en Perfecta Armonía</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed px-2">
              Tratamientos estéticos y experiencias de spa, acompañado de productos para mantener tus resultados en casa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start px-4 sm:px-0 mt-2">
              <Link
                href="#productos"
                className="group px-5 py-2 bg-white/80 border border-gold-300 text-gold-700 rounded-full font-normal hover:bg-gold-50 hover:text-gold-800 transition-all duration-200 text-sm md:text-base shadow-none hover:shadow-none"
              >
                Ver Productos
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <button
                type="button"
                onClick={scrollToContact}
                className="group px-7 py-3 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:from-gold-600 hover:to-gold-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 animate-pulse focus:outline-none focus:ring-4 focus:ring-gold-300/40"
              >
                <span className="drop-shadow-lg">Agendar Cita Ahora</span>
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform text-xl">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats - Dorado elegante */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-12 md:mt-20">
          <div className="text-center group">
            <p className="text-3xl md:text-5xl font-light bg-gradient-to-r from-gold-600 to-gold-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">100%</p>
            <p className="text-xs md:text-sm text-gray-600 mt-2 uppercase tracking-widest">Natural</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gold-300 to-transparent"></div>
          <div className="text-center group">
            <p className="text-3xl md:text-5xl font-light bg-gradient-to-r from-bronze-500 to-gold-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">Estética</p>
            <p className="text-xs md:text-sm text-gray-600 mt-2 uppercase tracking-widest">& Spa</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Dorado */}
      <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gold-400/60 rounded-full flex justify-center shadow-lg shadow-gold-400/20">
          <div className="w-1 h-2 bg-gold-500 rounded-full mt-2 animate-bounce shadow-sm shadow-gold-500/50"></div>
        </div>
      </div>
    </section>
  );
}