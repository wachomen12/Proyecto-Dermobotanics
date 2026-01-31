"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export type Service = {
  id?: string;
  icon?: string;
  image?: string;
  title: string;
  description: string;
  price: string;
  duration?: string;
  popular?: boolean;
  promo?: boolean;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'todos' | 'populares' | 'promo'>('todos');

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  const handleReservar = (serviceName: string) => {
    window.location.hash = `contacto?servicio=${encodeURIComponent(serviceName)}`;
    setTimeout(() => {
      const formulario = document.getElementById('formulario-contacto');
      if (formulario) {
        const elementRect = formulario.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
        window.scrollTo({
          top: middle,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const filteredServices = services.filter(service => {
    if (activeFilter === 'populares') return service.popular;
    if (activeFilter === 'promo') return service.promo;
    return true;
  });

  return (
    <section id="servicios" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[#faf8f5] to-white">
      {/* Background Decoration Premium - Dorado */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#d4b886]/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#c9a962]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#ebdab0]/15 rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="particles-container absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${(i + 1) * 12}%`, animationDelay: `${i * 2}s` }}></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header Ultra Premium */}
        <div className="text-center mb-16 md:mb-20">
          {/* Badge elegante con animación */}
          <div className="inline-flex items-center gap-3 px-8 py-3 bg-white/80 backdrop-blur-xl rounded-full mb-8 shadow-xl border border-[#c9a962]/30 hover:scale-105 transition-transform duration-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#d4b886] to-[#c9a962] animate-pulse"></div>
              <span className="text-sm font-semibold text-[#3a3a3a] tracking-wider uppercase">
                Centro Estético & Spa Premium
              </span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#d4b886] to-[#c9a962] animate-pulse"></div>
            </div>
          </div>
          
          {/* Título con gradiente dorado mejorado */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3a3a3a] mb-6 animate-fade-in-up">
            Nuestros{" "}
            <span className="font-semibold bg-gradient-to-r from-[#d4b886] via-[#c9a962] to-[#b8954d] bg-clip-text text-transparent animate-shimmer">
              Servicios Exclusivos
            </span>
          </h2>
          
          {/* Línea decorativa dorada mejorada */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a962] to-transparent"></div>
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#d4b886] to-[#c9a962] shadow-lg shadow-[#c9a962]/50 animate-pulse"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a962] to-transparent"></div>
          </div>
          
          <p className="text-lg md:text-xl text-[#4a4a4a] max-w-3xl mx-auto leading-relaxed px-4">
            Procedimientos faciales y corporales diseñados para brindarte 
            una experiencia única de bienestar y renovación total.
          </p>

          {/* Filtros Premium */}
          <div className="flex justify-center gap-3 mt-10">
            <button
              onClick={() => setActiveFilter('todos')}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeFilter === 'todos'
                  ? 'bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white shadow-lg shadow-[#c9a962]/30'
                  : 'bg-white/80 text-[#4a4a4a] border border-[#c9a962]/20 hover:border-[#c9a962]/50'
              }`}
            >
              Todos ({services.length})
            </button>
            <button
              onClick={() => setActiveFilter('populares')}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeFilter === 'populares'
                  ? 'bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white shadow-lg shadow-[#c9a962]/30'
                  : 'bg-white/80 text-[#4a4a4a] border border-[#c9a962]/20 hover:border-[#c9a962]/50'
              }`}
            >
              ⭐ Populares
            </button>
            <button
              onClick={() => setActiveFilter('promo')}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeFilter === 'promo'
                  ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/80 text-[#4a4a4a] border border-pink-300 hover:border-pink-400'
              }`}
            >
              🎁 Promociones
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/50 rounded-3xl p-8 animate-pulse">
                <div className="w-20 h-20 bg-[#c9a962]/20 rounded-2xl mb-6"></div>
                <div className="h-6 bg-[#c9a962]/20 rounded mb-4"></div>
                <div className="h-4 bg-[#c9a962]/20 rounded mb-2"></div>
                <div className="h-4 bg-[#c9a962]/20 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Services Grid Ultra Premium */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badges Múltiples */}
                <div className="absolute -top-4 -right-4 z-20 flex flex-col gap-2">
                  {service.popular && (
                    <div className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full shadow-xl shadow-amber-500/40 animate-bounce">
                      ⭐ Popular
                    </div>
                  )}
                  {service.promo && (
                    <div className="px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs font-bold rounded-full shadow-xl shadow-pink-500/40">
                      🎁 Promo
                    </div>
                  )}
                </div>

                {/* Card Premium con efectos mejorados */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 h-full transition-all duration-700 border-2 border-transparent hover:border-[#c9a962]/50 hover:shadow-2xl hover:-translate-y-3 overflow-hidden group-hover:bg-white">
                  {/* Efecto shimmer mejorado */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962]/10 via-transparent to-[#d4b886]/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>

                  {/* Icon or Image Container con animación 3D */}
                  <div className="relative mb-6 flex items-center justify-center perspective-1000">
                    {service.image ? (
                      <div className="relative w-28 h-28 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        {/* Glow effect detrás de la imagen */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#d4b886]/40 to-[#c9a962]/40 rounded-3xl blur-2xl scale-110"></div>
                        <div className="relative w-full h-full bg-white rounded-3xl border-2 border-[#e7dbc2] shadow-2xl overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={112}
                            height={112}
                            className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#d4b886]/50 to-[#c9a962]/50 rounded-3xl blur-xl scale-110"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-br from-[#d4b886] to-[#c9a962] rounded-3xl flex items-center justify-center text-5xl shadow-2xl shadow-[#c9a962]/40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                          {service.icon || '✨'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content mejorado */}
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#2a2a2a] mb-3 tracking-tight group-hover:text-[#c9a962] transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Línea decorativa animada */}
                    <div className="h-1 w-12 bg-gradient-to-r from-[#d4b886] to-[#c9a962] rounded-full mb-4 group-hover:w-20 transition-all duration-500"></div>
                    
                    <p className="text-base md:text-lg text-[#4a4a4a] mb-6 leading-relaxed min-h-[80px]">
                      {service.description}
                    </p>

                    {/* Duration badge si existe */}
                    {service.duration && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#faf6ed] rounded-full mb-4 border border-[#e7dbc2]">
                        <svg className="w-4 h-4 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold text-[#b8954d]">{service.duration}</span>
                      </div>
                    )}

                    {/* Separador elegante */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent my-6"></div>

                    {/* Price & CTA mejorados */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-[#4a4a4a] font-medium mb-1">Desde</span>
                        <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#d4b886] via-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">
                          ${service.price}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleReservar(service.title)}
                        className="group/btn relative px-8 py-4 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:from-[#c9a962] hover:to-[#b8954d] transition-all duration-300 overflow-hidden hover:scale-105"
                      >
                        {/* Efecto de onda */}
                        <div className="absolute inset-0 bg-white/20 scale-0 group-hover/btn:scale-100 rounded-2xl transition-transform duration-500"></div>
                        
                        <span className="relative z-10 flex items-center gap-2">
                          Reservar
                          <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state si no hay servicios filtrados */}
        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-[#d4b886]/20 to-[#c9a962]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">✨</span>
            </div>
            <h3 className="text-2xl font-bold text-[#3a3a3a] mb-2">No hay servicios en esta categoría</h3>
            <p className="text-[#4a4a4a]">Prueba con otro filtro</p>
          </div>
        )}

        {/* CTA Premium Ultra Mejorado */}
        <div className="text-center mt-20 md:mt-28">
          <div className="relative inline-flex flex-col items-center gap-6 p-12 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-[#c9a962]/20 shadow-2xl">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d4b886]/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2a2a2a] mb-3">
                ¿Listo para tu{" "}
                <span className="bg-gradient-to-r from-[#d4b886] to-[#c9a962] bg-clip-text text-transparent">
                  Transformación?
                </span>
              </h3>
              <p className="text-[#4a4a4a] text-lg mb-6">Agenda tu cita y comienza tu viaje hacia el bienestar</p>
              
              <button
                type="button"
                onClick={() => {
                  const contacto = document.getElementById('contacto');
                  if (contacto) contacto.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#d4b886] via-[#c9a962] to-[#b8954d] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[#c9a962]/50 hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                {/* Efecto shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agendar Cita Ahora
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>

            {/* Trust badges mejorados */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/80 rounded-full border border-[#c9a962]/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4b886] to-[#c9a962] flex items-center justify-center text-white font-bold shadow-lg">
                  ✓
                </div>
                <span className="font-semibold text-[#2a2a2a]">100% Natural</span>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-white/80 rounded-full border border-[#c9a962]/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4b886] to-[#c9a962] flex items-center justify-center shadow-lg">
                  🏆
                </div>
                <span className="font-semibold text-[#2a2a2a]">Profesionales Certificados</span>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-white/80 rounded-full border border-[#c9a962]/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4b886] to-[#c9a962] flex items-center justify-center shadow-lg">
                  ⭐
                </div>
                <span className="font-semibold text-[#2a2a2a]">5 Estrellas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #c9a962, transparent);
          border-radius: 50%;
          opacity: 0;
          animation: particles 15s linear infinite;
        }
        @keyframes particles {
          0% { 
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% { 
            transform: translateY(-100vh) translateX(50px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}