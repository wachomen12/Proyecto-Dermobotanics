"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const MOBILE_RESULTS_COUNT = 3;

export default function ResultadosGaleria() {
  const [resultados, setResultados] = useState<Array<{ id: string, before: string, after: string, message?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [showAllResults, setShowAllResults] = useState(false);

  useEffect(() => {
    fetch("/api/resultados")
      .then(res => res.json())
      .then(data => {
        setResultados(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="experiencias" className="py-20 md:py-32 bg-gradient-to-b from-white via-[#faf8f5] to-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full mb-6 shadow-sm border border-[#e7dbc2]/40">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a962] animate-pulse"></div>
          <span className="text-xs font-medium text-[#4a4a4a] tracking-[0.15em] uppercase">Resultados</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-[#3a3a3a] mb-2">
          Experiencias reales, <span className="font-semibold bg-gradient-to-r from-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">resultados visibles</span>
        </h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-[#c9a962]/60"></div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent"></div>
        </div>
        <p className="text-sm md:text-base text-[#5a5a5a] mb-8">Mira los resultados de nuestros clientes después de sus sesiones.</p>
        {loading ? (
          <div className="text-gold-600 font-medium">Cargando resultados...</div>
        ) : resultados.length === 0 ? (
          <div className="text-gray-400 font-medium">Aún no hay experiencias publicadas.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {resultados.map(r => (
              <div key={r.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 border border-[#e7dbc2]/30 flex flex-col items-center">
                <div className="flex gap-2 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-[#c9a962] mb-1 font-medium">Antes</span>
                    <Image src={r.before} alt="Antes" width={220} height={220} className="rounded-xl object-cover shadow-md border border-[#e7dbc2]/30" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-[#b8954d] mb-1 font-medium">Después</span>
                    <Image src={r.after} alt="Después" width={220} height={220} className="rounded-xl object-cover shadow-md border border-[#e7dbc2]/30" />
                  </div>
                </div>
                {r.message && <div className="text-[#5a5a5a] text-sm italic mt-2">“{r.message}”</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
