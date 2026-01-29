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
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="servicios" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[#faf8f5] to-white">
      {/* Background Decoration - Dorado */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d4b886]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-[#c9a962]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[256px] h-[256px] bg-[#ebdab0]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header Premium */}
        <div className="text-center mb-16 md:mb-20">
          {/* Badge elegante */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full mb-6 shadow-lg border border-[#c9a962]/20">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#d4b886] to-[#c9a962] animate-pulse"></div>
            <span className="text-sm font-medium text-[#3a3a3a] tracking-wider uppercase">
              Centro Estético & Spa
            </span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#d4b886] to-[#c9a962] animate-pulse"></div>
          </div>
          
          {/* Título con gradiente dorado */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3a3a3a] mb-6">
            Nuestros{" "}
            <span className="font-normal bg-gradient-to-r from-[#d4b886] via-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          
          {/* Línea decorativa dorada */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962] to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-[#c9a962] animate-pulse"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962] to-transparent"></div>
          </div>
          
          <p className="text-lg md:text-xl text-[#4a4a4a] max-w-3xl mx-auto leading-relaxed px-4">
            Procedimientos faciales y corporales diseñados para brindarte 
            una experiencia única de bienestar y renovación.
          </p>
        </div>

        {/* Services Grid Premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Badge "Popular" */}
              {service.popular && (
                <div className="absolute -top-3 -right-3 z-20">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white text-xs font-semibold rounded-full shadow-lg shadow-[#c9a962]/30">
                    ⭐ Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 h-full transition-all duration-500 border border-[#c9a962]/20 hover:border-[#c9a962]/40 hover:shadow-2xl hover:shadow-[#c9a962]/20 hover:-translate-y-2 overflow-hidden">
                {/* Brillo al hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#c9a962]/10 via-transparent to-[#ebdab0]/10 rounded-3xl pointer-events-none"></div>

                {/* Icon or Image Container */}
                <div className="relative mb-6 flex items-center justify-center">
                  {service.image ? (
                    <div className="w-24 h-24 bg-white/70 rounded-3xl border border-[#e7dbc2] shadow-lg shadow-[#c9a962]/10 flex items-center justify-center overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full rounded-3xl transition-all duration-500"
                        style={{ background: '#f8f5ee' }}
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-[#d4b886] to-[#c9a962] rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-[#c9a962]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {service.icon}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#b8954d] mb-2 tracking-tight drop-shadow-sm">
                    {service.title}
                  </h3>
                  <div className="h-1 w-10 bg-gradient-to-r from-[#d4b886] to-[#c9a962] rounded-full mb-4"></div>
                  <p className="text-base md:text-lg text-[#3a3a3a] mb-8 leading-relaxed min-h-[80px] font-light">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-[#e5d6b8] mt-4">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#fff9ec] to-[#f3ead2] border border-[#e5d6b8] shadow text-[#b8954d] text-2xl font-bold backdrop-blur-md">
                      <svg className="w-6 h-6 text-[#c9a962]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18"/><path strokeLinecap="round" strokeLinejoin="round" d="M17 7H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7"/></svg>
                      {service.price}
                    </span>
                    <button
                      onClick={() => handleReservar(service.title)}
                      className="px-6 py-2 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white font-semibold rounded-full shadow-md hover:from-[#c9a962] hover:to-[#b8954d] transition-all duration-300 flex items-center gap-2 group/btn text-lg"
                    >
                      Reservar
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Premium con WhatsApp */}
        <div className="text-center mt-16 md:mt-24">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-[#4a4a4a] text-lg mb-2">¿Listo para tu transformación?</p>
            
            <button
              type="button"
              onClick={() => {
                const contacto = document.getElementById('contacto');
                if (contacto) contacto.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const form = document.getElementById('formulario-contacto');
                if (form) {
                  setTimeout(() => {
                    form.classList.add('ring-4', 'ring-gold-400/50');
                    setTimeout(() => {
                      form.classList.remove('ring-4', 'ring-gold-400/50');
                    }, 2000);
                  }, 800);
                }
              }}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white rounded-full font-semibold text-lg shadow-xl shadow-[#c9a962]/30 hover:shadow-2xl hover:shadow-[#c9a962]/40 hover:-translate-y-1 transition-all duration-300"
            >
              Agendar Cita Ahora
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </button>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-[#4a4a4a]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#faf6ed] flex items-center justify-center text-[#c9a962]">✓</div>
                <span>100% Natural</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-[#c9a962]/20"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#faf6ed] flex items-center justify-center">🏆</div>
                <span>Profesionales</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-[#c9a962]/20"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#faf6ed] flex items-center justify-center">⭐</div>
                <span>5 Estrellas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}