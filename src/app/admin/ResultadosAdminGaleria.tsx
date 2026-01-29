"use client";
import { useEffect, useState } from "react";
import EditarResultadoModal from "./EditarResultadoModal";
import Image from "next/image";

export default function ResultadosAdminGaleria() {
  const [resultados, setResultados] = useState<Array<{ id: string, before: string, after: string, message?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/resultados")
      .then(res => res.json())
      .then(data => {
        setResultados(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este resultado?")) return;
    setDeleting(id);
    await fetch(`/api/resultados?id=${id}`, { method: "DELETE" });
    setResultados(resultados => resultados.filter(r => r.id !== id));
    setDeleting(null);
  };

  const handleEditSave = (data: { id: string, before: string, after: string, message?: string }) => {
    setResultados(rs => rs.map(r => r.id === data.id ? { ...r, ...data } : r));
  };

  return (
    <section className="py-8">
      <h3 className="text-lg font-bold mb-4 text-[#b8954d]">Resultados subidos</h3>
      {loading ? (
        <div className="text-gold-600 font-medium">Cargando resultados...</div>
      ) : resultados.length === 0 ? (
        <div className="text-gray-400 font-medium">No hay resultados subidos.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resultados.map(r => (
            <div key={r.id} className="bg-white rounded-xl shadow p-4 border border-slate-200 flex flex-col items-center">
              <div className="flex gap-2 mb-2">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-400 mb-1">Antes</span>
                  <Image src={r.before} alt="Antes" width={80} height={80} className="rounded-lg object-cover" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-400 mb-1">Después</span>
                  <Image src={r.after} alt="Después" width={80} height={80} className="rounded-lg object-cover" />
                </div>
              </div>
              {r.message && <div className="text-gray-700 text-xs italic mb-2">“{r.message}”</div>}
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 text-xs bg-amber-500 text-white rounded hover:bg-amber-600 transition"
                  onClick={() => setEditId(r.id)}
                  disabled={!!deleting}
                >Editar</button>
                <button
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(r.id)}
                  disabled={deleting === r.id}
                >{deleting === r.id ? "Eliminando..." : "Eliminar"}</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editId && (
        <EditarResultadoModal
          resultado={resultados.find(r => r.id === editId)!}
          onClose={() => setEditId(null)}
          onSave={handleEditSave}
        />
      )}
    </section>
  );
}
