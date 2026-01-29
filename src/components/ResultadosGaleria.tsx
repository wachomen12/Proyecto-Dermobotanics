"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ResultadosGaleria() {
  const [resultados, setResultados] = useState<Array<{ id: string, before: string, after: string, message?: string }>>([]);
  const [loading, setLoading] = useState(true);

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
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#b8954d] mb-2">Experiencias reales, resultados visibles</h2>
        <p className="text-gray-600 mb-8">Mira los resultados de nuestros clientes después de sus sesiones.</p>
        {loading ? (
          <div className="text-gold-600 font-medium">Cargando resultados...</div>
        ) : resultados.length === 0 ? (
          <div className="text-gray-400 font-medium">Aún no hay experiencias publicadas.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {resultados.map(r => (
              <div key={r.id} className="bg-white rounded-2xl shadow-lg p-4 border border-slate-100 flex flex-col items-center">
                <div className="flex gap-2 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-1">Antes</span>
                    <Image src={r.before} alt="Antes" width={220} height={220} className="rounded-xl object-cover shadow-md" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-1">Después</span>
                    <Image src={r.after} alt="Después" width={220} height={220} className="rounded-xl object-cover shadow-md" />
                  </div>
                </div>
                {r.message && <div className="text-gray-700 text-sm italic">“{r.message}”</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
