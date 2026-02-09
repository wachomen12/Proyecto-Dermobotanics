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
            <div className="inline-flex items-center px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full mb-8 shadow-sm border border-gold-200/50">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-3 animate-pulse"></span>
              <span className="text-xs text-elegant-charcoal/70 font-medium tracking-[0.15em] uppercase">Centro Estético & Spa</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-elegant-charcoal leading-[1.1] mb-4 md:mb-6">
              Ciencia y
              <span className="block font-semibold bg-gradient-to-r from-gold-600 via-gold-500 to-bronze-500 bg-clip-text text-transparent">Naturaleza</span>
              <span className="block text-xl md:text-2xl font-normal text-gold-600/80 mt-3 tracking-wide">en Perfecta Armonía</span>
            </h1>
            
            <p className="text-sm md:text-base text-gray-500 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Tratamientos estéticos y experiencias de spa, acompañado de productos para mantener tus resultados en casa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start px-4 sm:px-0">
              <a
                href="#servicios"
                className="group px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full font-semibold text-sm md:text-base shadow-lg shadow-gold-500/25 hover:shadow-xl hover:shadow-gold-500/30 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Agendar Cita
                <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
              <Link
                href="#productos"
                className="group px-8 py-3.5 bg-white/80 border border-gold-300/60 text-gold-700 rounded-full font-medium hover:bg-gold-50 hover:border-gold-400/60 transition-all duration-300 text-sm md:text-base text-center"
              >
                Ver Productos
                <span className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats - Dorado elegante */}
        <div className="flex flex-row justify-center items-center gap-8 md:gap-16 mt-16 md:mt-24">
          <div className="text-center group">
            <p className="text-3xl md:text-4xl font-light bg-gradient-to-r from-gold-600 to-gold-500 bg-clip-text text-transparent">100%</p>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1.5 uppercase tracking-[0.2em] font-medium">Natural</p>
          </div>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-gold-300/50 to-transparent"></div>
          <div className="text-center group">
            <p className="text-3xl md:text-4xl font-light bg-gradient-to-r from-bronze-500 to-gold-500 bg-clip-text text-transparent">Estética</p>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1.5 uppercase tracking-[0.2em] font-medium">& Spa Premium</p>
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