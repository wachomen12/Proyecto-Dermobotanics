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

const MOBILE_INITIAL_COUNT = 3;

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'todos' | 'populares' | 'promo'>('todos');
  const [showAll, setShowAll] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full mb-8 shadow-sm border border-[#e7dbc2]/40">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a962] animate-pulse"></div>
            <span className="text-xs font-medium text-[#4a4a4a] tracking-[0.15em] uppercase">
              Centro Estético & Spa
            </span>
          </div>
          
          {/* Título con gradiente dorado mejorado */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#3a3a3a] mb-6">
            Nuestros{" "}
            <span className="font-semibold bg-gradient-to-r from-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          
          {/* Línea decorativa dorada */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-[#c9a962]/60"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent"></div>
          </div>
          
          <p className="text-sm md:text-base text-[#5a5a5a] max-w-2xl mx-auto leading-relaxed px-4">
            Procedimientos faciales y corporales diseñados para brindarte 
            una experiencia única de bienestar y renovación total.
          </p>

          {/* Filtros Premium */}
          <div className="flex justify-center gap-3 mt-10">
            <button
              onClick={() => { setActiveFilter('todos'); setShowAll(false); }}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeFilter === 'todos'
                  ? 'bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white shadow-lg shadow-[#c9a962]/30'
                  : 'bg-white/80 text-[#4a4a4a] border border-[#c9a962]/20 hover:border-[#c9a962]/50'
              }`}
            >
              Todos ({services.length})
            </button>
            <button
              onClick={() => { setActiveFilter('populares'); setShowAll(false); }}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeFilter === 'populares'
                  ? 'bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white shadow-lg shadow-[#c9a962]/30'
                  : 'bg-white/80 text-[#4a4a4a] border border-[#c9a962]/20 hover:border-[#c9a962]/50'
              }`}
            >
              ⭐ Populares
            </button>
            <button
              onClick={() => { setActiveFilter('promo'); setShowAll(false); }}
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
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
          <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {(showAll ? filteredServices : filteredServices.slice(0, MOBILE_INITIAL_COUNT)).map((service, index) => (
              <div
                key={index}
                className="group relative animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedService(service)}
              >
                {/* Badges */}
                <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 z-20 flex flex-col gap-1">
                  {service.popular && (
                    <div className="px-2 py-1 md:px-4 md:py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg shadow-amber-500/40">
                      ⭐ Popular
                    </div>
                  )}
                  {service.promo && (
                    <div className="px-2 py-1 md:px-4 md:py-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg shadow-pink-500/40">
                      🎁 Promo
                    </div>
                  )}
                </div>

                {/* Card */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 h-full transition-all duration-500 border border-[#e7dbc2]/30 hover:border-[#c9a962]/40 hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 overflow-hidden group-hover:bg-white">
                  {/* Icon or Image */}
                  <div className="relative mb-3 md:mb-5 flex items-center justify-center">
                    {service.image ? (
                      <div className="relative w-16 h-16 md:w-24 md:h-24 group-hover:scale-105 transition-all duration-500">
                        <div className="relative w-full h-full bg-white rounded-xl md:rounded-2xl border border-[#e7dbc2]/60 shadow-md overflow-hidden">
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
                        <div className="relative w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#f5ecd4] to-[#ebdab0] rounded-xl md:rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-md group-hover:scale-105 transition-all duration-500">
                          {service.icon || '✨'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-sm md:text-xl font-bold text-[#2a2a2a] mb-1 md:mb-2 tracking-tight group-hover:text-[#b8954d] transition-colors duration-300 line-clamp-2">
                      {service.title}
                    </h3>
                    
                    {/* Línea decorativa */}
                    <div className="h-0.5 w-8 md:w-10 bg-gradient-to-r from-[#d4b886] to-[#c9a962] rounded-full mb-2 md:mb-3 group-hover:w-12 md:group-hover:w-16 transition-all duration-500"></div>
                    
                    {/* Descripción - oculta en móvil */}
                    <p className="hidden md:block text-sm text-[#5a5a5a] mb-4 leading-relaxed line-clamp-2 min-h-[40px]">
                      {service.description}
                    </p>

                    {/* Duration badge */}
                    {service.duration && (
                      <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#faf6ed] rounded-full mb-3 border border-[#e7dbc2]/60">
                        <svg className="w-3.5 h-3.5 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-medium text-[#b8954d]">{service.duration}</span>
                      </div>
                    )}

                    {/* Separador */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#e7dbc2]/50 to-transparent my-2 md:my-4"></div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] text-[#5a5a5a] font-medium mb-0.5 uppercase tracking-wider">Desde</span>
                        <span className="text-base md:text-2xl font-bold bg-gradient-to-r from-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">
                          ${service.price}
                        </span>
                      </div>
                      
                      {/* Botón Reservar - visible en móvil y desktop */}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleReservar(service.title); }}
                        className="group/btn relative flex items-center gap-1 md:gap-2 px-3 py-2 md:px-6 md:py-3 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white font-bold rounded-lg md:rounded-xl shadow-md md:shadow-lg hover:shadow-xl hover:from-[#c9a962] hover:to-[#b8954d] transition-all duration-300 overflow-hidden hover:scale-105 text-[10px] md:text-sm"
                      >
                        <svg className="w-3 h-3 md:w-4 md:h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="relative z-10">Reservar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón Ver más / Ver menos */}
          {filteredServices.length > MOBILE_INITIAL_COUNT && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-xl rounded-full font-semibold text-[#c9a962] border-2 border-[#c9a962]/30 shadow-lg hover:shadow-xl hover:border-[#c9a962]/60 hover:bg-[#faf6ed] transition-all duration-300"
              >
                <span>{showAll ? 'Ver menos' : `Ver todos los servicios (${filteredServices.length})`}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
          </>
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

        {/* CTA Premium */}
        <div className="text-center mt-14 md:mt-20">
          <div className="relative inline-flex flex-col items-center gap-4 md:gap-6 px-6 py-8 md:p-12 bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-[#c9a962]/20 shadow-xl md:shadow-2xl max-w-sm md:max-w-none mx-auto">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-gradient-to-br from-[#d4b886]/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-xl md:text-3xl font-bold text-[#2a2a2a] mb-2 md:mb-3">
                ¿Listo para tu{" "}
                <span className="bg-gradient-to-r from-[#d4b886] to-[#c9a962] bg-clip-text text-transparent">
                  Transformación?
                </span>
              </h3>
              <p className="text-[#4a4a4a] text-sm md:text-lg mb-4 md:mb-6">Agenda tu cita y comienza tu viaje hacia el bienestar</p>
              
              <button
                type="button"
                onClick={() => {
                  const contacto = document.getElementById('contacto');
                  if (contacto) contacto.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-[#d4b886] via-[#c9a962] to-[#b8954d] text-white rounded-full font-bold text-sm md:text-lg shadow-lg hover:shadow-[#c9a962]/50 hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                {/* Efecto shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agendar Cita
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>

            {/* Trust badges - compactos en móvil */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-3 md:mt-4 w-full">
              <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/80 rounded-full border border-[#c9a962]/15 text-sm">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#d4b886] to-[#c9a962] flex items-center justify-center text-white text-xs md:text-sm font-bold shadow">
                  ✓
                </div>
                <span className="font-medium text-[#3a3a3a] text-xs md:text-sm">100% Natural</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/80 rounded-full border border-[#c9a962]/15 text-sm">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#d4b886] to-[#c9a962] flex items-center justify-center shadow text-xs md:text-sm">
                  🏆
                </div>
                <span className="font-medium text-[#3a3a3a] text-xs md:text-sm">Profesionales Certificados</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/80 rounded-full border border-[#c9a962]/15 text-sm">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#d4b886] to-[#c9a962] flex items-center justify-center shadow text-xs md:text-sm">
                  ⭐
                </div>
                <span className="font-medium text-[#3a3a3a] text-xs md:text-sm">5 Estrellas</span>
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

      {/* Modal detalle del servicio */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition z-20"
              onClick={() => setSelectedService(null)}
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5 text-[#3a3a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen del servicio */}
            {selectedService.image && (
              <div className="relative h-56 md:h-72 overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8]">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            )}

            {/* Icono si no tiene imagen */}
            {!selectedService.image && (
              <div className="flex justify-center pt-8 pb-2">
                <div className="w-24 h-24 bg-gradient-to-br from-[#f5ecd4] to-[#ebdab0] rounded-2xl flex items-center justify-center text-5xl shadow-lg">
                  {selectedService.icon || '✨'}
                </div>
              </div>
            )}

            {/* Contenido */}
            <div className="p-6 md:p-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedService.popular && (
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full">⭐ Popular</span>
                )}
                {selectedService.promo && (
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs font-bold rounded-full">🎁 Promo</span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#2a2a2a] mb-3">
                {selectedService.title}
              </h2>

              <div className="h-0.5 w-12 bg-gradient-to-r from-[#d4b886] to-[#c9a962] rounded-full mb-4"></div>

              <p className="text-sm md:text-base text-[#5a5a5a] leading-relaxed mb-6">
                {selectedService.description}
              </p>

              {/* Duración */}
              {selectedService.duration && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#faf6ed] rounded-full mb-5 border border-[#e7dbc2]/60">
                  <svg className="w-4 h-4 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-[#b8954d]">Duración: {selectedService.duration}</span>
                </div>
              )}

              {/* Separador */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#e7dbc2]/50 to-transparent mb-5"></div>

              {/* Precio */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs text-[#5a5a5a] font-medium uppercase tracking-wider">Desde</span>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">
                    ${selectedService.price}
                  </div>
                </div>
              </div>

              {/* Botón Reservar */}
              <button
                onClick={() => { setSelectedService(null); handleReservar(selectedService.title); }}
                className="w-full py-4 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-[#c9a962] hover:to-[#b8954d] transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Reservar Cita
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}