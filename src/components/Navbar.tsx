"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Productos", href: "#productos" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-[#c9a962]/10 py-1" 
          : "bg-gradient-to-b from-white/60 via-white/40 to-transparent backdrop-blur-md py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Premium */}
          <Link href="#inicio" className="flex items-center group">
            <div className={`transition-all duration-500 ${
              isScrolled ? "w-10 h-10" : "w-14 h-14"
            } rounded-full overflow-hidden bg-white shadow-2xl ring-2 ring-[#c9a962]/30 group-hover:ring-[#c9a962]/50 group-hover:scale-105 flex items-center justify-center relative`}>
              {/* Gradiente dorado alrededor */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4b886]/20 via-transparent to-[#c9a962]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src="/logo.png" 
                alt="R&R Dermobotanics" 
                className="w-full h-full object-contain drop-shadow-xl relative z-10"
              />
            </div>
          </Link>

          {/* Desktop Navigation Premium */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[#4a4a4a] hover:text-[#c9a962] transition-all duration-300 text-sm font-medium tracking-wide group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
                {/* Underline dorado animado */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4b886] via-[#c9a962] to-[#b8954d] transition-all duration-300 group-hover:w-full"></span>
                {/* Glow effect */}
                <span className="absolute inset-0 rounded-lg bg-[#c9a962]/0 group-hover:bg-[#c9a962]/5 transition-colors duration-300 -z-10"></span>
              </Link>
            ))}
            
            {/* CTA Button Premium */}
            <Link
              href="#contacto"
              className="relative px-8 py-3 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white text-sm rounded-full font-semibold overflow-hidden group shadow-lg shadow-[#c9a962]/30 hover:shadow-xl hover:shadow-[#c9a962]/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Efecto shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
              <span className="relative z-10">Reservar Cita</span>
            </Link>
          </div>

          {/* Mobile Menu Button Premium */}
          <button
            className="md:hidden p-2.5 rounded-xl hover:bg-[#c9a962]/10 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-gradient-to-r from-[#d4b886] to-[#c9a962] transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gradient-to-r from-[#d4b886] to-[#c9a962] transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gradient-to-r from-[#d4b886] to-[#c9a962] transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Premium */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? "max-h-[600px] mt-6 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 space-y-3 shadow-2xl shadow-[#c9a962]/20 border border-[#c9a962]/20">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-3.5 px-5 text-[#4a4a4a] hover:text-[#c9a962] hover:bg-gradient-to-r hover:from-[#faf6ed] hover:to-[#f5ecd4] rounded-2xl transition-all duration-300 font-medium group"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ 
                  animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <span className="flex items-center justify-between">
                  {link.name}
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
            
            {/* Divider dorado */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent my-4"></div>
            
            {/* Social Buttons Premium */}
            <div className="pt-2 space-y-3">
              <Link
                href="https://wa.me/593987901837"
                target="_blank"
                className="flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white rounded-2xl font-semibold shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Link>
              
              <Link
                href="https://www.instagram.com/dermobotanics"
                target="_blank"
                className="flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-2xl font-semibold shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </Link>

              <Link
                href="#contacto"
                className="flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#d4b886] to-[#c9a962] text-white rounded-2xl font-semibold shadow-lg shadow-[#c9a962]/30 hover:shadow-xl hover:shadow-[#c9a962]/40 hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Reservar Cita
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animación CSS para mobile menu items */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}