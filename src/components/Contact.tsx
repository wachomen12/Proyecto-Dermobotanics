"use client";

import { useState, useEffect } from "react";
import { getServicesList } from "@/utils/getServicesList";

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Teléfono",
    info: "0987901837",
    detail: "Lun - Sáb: 9:00 - 19:00",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    title: "Instagram",
    info: "@dermobotanics",
    detail: "¡Síguenos!",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    title: "WhatsApp",
    info: "0987901837",
    detail: "¡Escríbenos ahora!",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", sexo: "", nacimiento: "",
    direccion: "", ocupacion: "", edad: "", antecedentes: "", antecedentesOtro: "",
    piel: "", pielOtro: "",
  });

  // Servicios dinámicos desde la API
  const [servicesList, setServicesList] = useState<string[]>([]);
  useEffect(() => {
    getServicesList().then(setServicesList);
    // Escuchar cambios en el hash para seleccionar servicio desde URL
    const actualizarServicio = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        const match = hash.match(/servicio=([^&]+)/);
        if (match) {
          const servicio = decodeURIComponent(match[1]);
          setFormData(f => ({ ...f, service: servicio }));
          setTimeout(() => {
            window.history.replaceState(null, '', window.location.pathname + window.location.search + '#contacto');
          }, 200);
        }
      }
    };
    actualizarServicio();
    window.addEventListener('hashchange', actualizarServicio);
    return () => window.removeEventListener('hashchange', actualizarServicio);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = `Hola 👋, quiero agendar una cita.\n\nNombre: ${formData.name}\nTeléfono: ${formData.phone}\nEmail: ${formData.email}\nServicio: ${formData.service}\nSexo: ${formData.sexo}\nNacimiento: ${formData.nacimiento}\nDirección: ${formData.direccion}\nOcupación: ${formData.ocupacion}\nEdad: ${formData.edad}\nAntecedentes: ${formData.antecedentes}${formData.antecedentes === 'Otro' ? ` (${formData.antecedentesOtro})` : ''}\nPiel: ${formData.piel}${formData.piel === 'Otro' ? ` (${formData.pielOtro})` : ''}`;
    window.open(`https://wa.me/593987901837?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <section id="contacto" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[#faf8f5] to-[#f5f0e8]">
      {/* Background Premium */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#d4b886]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-[#c9a962]/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header Premium */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full mb-6 shadow-lg border border-[#c9a962]/20">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#d4b886] to-[#c9a962] animate-pulse"></div>
            <span className="text-sm font-medium text-[#3a3a3a] tracking-wider uppercase">Contáctanos</span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#d4b886] to-[#c9a962] animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3a3a3a] mb-6">
            Reserva tu{" "}
            <span className="font-normal bg-gradient-to-r from-[#d4b886] via-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">Cita</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962] to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-[#c9a962] animate-pulse"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962] to-transparent"></div>
          </div>
          
          <p className="text-lg md:text-xl text-[#4a4a4a] max-w-3xl mx-auto leading-relaxed px-4">
            Contáctanos para agendar tu cita o resolver cualquier duda
          </p>
        </div>



        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Form Premium */}
          <div id="formulario-contacto" className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-[#c9a962]/20">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#d4b886] to-[#c9a962] bg-clip-text text-transparent mb-6">
              Envíanos un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4a4a4a] mb-2">Nombre completo</label>
                  <input type="text" required value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#c9a962]/20 focus:border-[#c9a962] focus:ring-4 focus:ring-[#c9a962]/10 outline-none transition-all bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500" 
                    placeholder="Tu nombre" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-[#4a4a4a] mb-2">Teléfono</label>
                  <input type="tel" value={formData.phone} 
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#c9a962]/20 focus:border-[#c9a962] focus:ring-4 focus:ring-[#c9a962]/10 outline-none transition-all bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                    placeholder="0912345678" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a4a4a] mb-2">Email</label>
                <input type="email" required value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#c9a962]/20 focus:border-[#c9a962] focus:ring-4 focus:ring-[#c9a962]/10 outline-none transition-all bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                  placeholder="tu@email.com" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4a4a4a] mb-2">Servicio de interés</label>
                <select
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#c9a962]/20 focus:border-[#c9a962] focus:ring-4 focus:ring-[#c9a962]/10 outline-none transition-all bg-white/50 backdrop-blur-sm text-gray-800"
                >
                  <option value="">Selecciona un servicio</option>
                  {servicesList.length === 0 ? (
                    <option disabled value="">No hay servicios disponibles</option>
                  ) : (
                    servicesList.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))
                  )}
                </select>
              </div>

              {/* Historia Clínica Premium */}
              <div className="mt-6 p-6 bg-gradient-to-br from-[#faf8f5] to-white rounded-2xl border-2 border-[#c9a962]/20 shadow-lg">
                <h4 className="text-lg font-bold bg-gradient-to-r from-[#d4b886] to-[#c9a962] bg-clip-text text-transparent mb-4 text-center">
                  Historia Clínica Estética
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4a4a4a] mb-1">Sexo</label>
                    <select value={formData.sexo} onChange={e => setFormData({ ...formData, sexo: e.target.value })}
                       className="w-full px-3 py-2 rounded-lg border-2 border-[#c9a962]/20 focus:border-[#c9a962] outline-none bg-white/70 text-sm text-[#2a2a2a]">
                      <option value="">Selecciona</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4a4a4a] mb-1">Fecha Nacimiento</label>
                    <input type="date" value={formData.nacimiento} onChange={e => setFormData({ ...formData, nacimiento: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-[#c9a962]/20 focus:border-[#c9a962] outline-none bg-white/70 text-sm text-[#2a2a2a]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4a4a4a] mb-1">Dirección</label>
                    <input type="text" value={formData.direccion} onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-[#c9a962]/20 focus:border-[#c9a962] outline-none bg-white/70 text-sm text-[#2a2a2a]" placeholder="Tu dirección" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4a4a4a] mb-1">Ocupación</label>
                    <input type="text" value={formData.ocupacion} onChange={e => setFormData({ ...formData, ocupacion: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-[#c9a962]/20 focus:border-[#c9a962] outline-none bg-white/70 text-sm text-[#2a2a2a]" placeholder="Profesión" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4a4a4a] mb-1">Edad</label>
                    <input type="number" min="0" value={formData.edad} onChange={e => setFormData({ ...formData, edad: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-[#c9a962]/20 focus:border-[#c9a962] outline-none bg-white/70 text-sm text-[#2a2a2a]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4a4a4a] mb-1">Antecedentes</label>
                    <select value={formData.antecedentes} onChange={e => setFormData({ ...formData, antecedentes: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-[#c9a962]/20 focus:border-[#c9a962] outline-none bg-white/70 text-sm mb-2 text-[#2a2a2a]">
                      <option value="">Selecciona</option>
                      <option value="Ninguno">Ninguno</option>
                      <option value="Diabetes">Diabetes</option>
                      <option value="Hipertensión">Hipertensión</option>
                      <option value="Alergias">Alergias</option>
                      <option value="Otro">Otro</option>
                    </select>
                    {formData.antecedentes === 'Otro' && (
                      <input type="text" value={formData.antecedentesOtro} onChange={e => setFormData({ ...formData, antecedentesOtro: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border-2 border-[#c9a962]/20 outline-none bg-white/70 text-sm text-[#2a2a2a]" placeholder="Especificar" />
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#4a4a4a] mb-1">Enfermedades piel</label>
                    <select value={formData.piel} onChange={e => setFormData({ ...formData, piel: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-[#c9a962]/20 focus:border-[#c9a962] outline-none bg-white/70 text-sm mb-2 text-[#2a2a2a]">
                      <option value="">Selecciona</option>
                      <option value="Ninguna">Ninguna</option>
                      <option value="Acné">Acné</option>
                      <option value="Rosácea">Rosácea</option>
                      <option value="Otro">Otro</option>
                    </select>
                    {formData.piel === 'Otro' && (
                      <input type="text" value={formData.pielOtro} onChange={e => setFormData({ ...formData, pielOtro: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border-2 border-[#c9a962]/20 outline-none bg-white/70 text-sm text-[#2a2a2a]" placeholder="Especificar" />
                    )}
                  </div>
                </div>
              </div>

              <button type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white rounded-xl font-bold shadow-xl shadow-[#c9a962]/30 hover:shadow-2xl hover:shadow-[#c9a962]/40 hover:-translate-y-1 transition-all text-lg">
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Contact Info Desktop */}
          <div className="hidden lg:block space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-[#c9a962]/20 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#d4b886] to-[#c9a962] rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-[#2a2a2a] mb-1">{item.title}</h4>
                  <p className="text-[#c9a962] font-semibold text-sm">{item.info}</p>
                  <p className="text-xs text-[#4a4a4a]">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-gradient-to-br from-[#c9a962]/10 to-[#d4b886]/20 rounded-2xl h-48 flex items-center justify-center backdrop-blur-sm border border-[#c9a962]/20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#d4b886] to-[#c9a962] rounded-full flex items-center justify-center shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-bold text-[#2a2a2a]">Manta, Ecuador</p>
                <p className="text-sm text-[#4a4a4a]">Centro de la ciudad</p>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-[#c9a962]/20">
              <h4 className="font-bold text-[#2a2a2a] mb-4">Síguenos</h4>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/dermobotanics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#d4b886] to-[#c9a962] text-white shadow-lg hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}