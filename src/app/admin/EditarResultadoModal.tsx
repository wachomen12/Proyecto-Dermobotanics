"use client";
import { useState } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

export default function EditarResultadoModal({ resultado, onClose, onSave }: {
  resultado: { id: string, before: string, after: string, message?: string },
  onClose: () => void,
  onSave: (data: { id: string, before: string, after: string, message?: string }) => void
}) {
  const [before, setBefore] = useState<string>(resultado.before);
  const [after, setAfter] = useState<string>(resultado.after);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>(resultado.message || "");
  const [saving, setSaving] = useState(false);

  const handleBeforeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBeforeFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBefore(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleAfterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAfterFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAfter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    let beforeUrl = before;
    let afterUrl = after;
    if (beforeFile) beforeUrl = await uploadToCloudinary(beforeFile);
    if (afterFile) afterUrl = await uploadToCloudinary(afterFile);
    await fetch("/api/resultados", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: resultado.id, before: beforeUrl, after: afterUrl, message })
    });
    onSave({ id: resultado.id, before: beforeUrl, after: afterUrl, message });
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl flex flex-col gap-6 relative border border-gold-100">
        <button type="button" className="absolute top-3 right-4 text-slate-400 hover:text-slate-700 text-2xl" onClick={onClose}>&times;</button>
        <h3 className="text-2xl font-bold text-[#b8954d] mb-2 text-center">Editar resultado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center bg-gradient-to-br from-[#faf8f5] to-white rounded-xl p-4 shadow">
            <label className="font-semibold text-slate-700 mb-2 text-lg">Antes</label>
            <Image src={before} alt="Antes" width={120} height={120} className="rounded-xl object-cover mb-3 border border-gold-200 shadow" />
            <input type="file" accept="image/*" onChange={handleBeforeChange} aria-label="Foto antes" className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100" />
          </div>
          <div className="flex flex-col items-center bg-gradient-to-br from-[#faf8f5] to-white rounded-xl p-4 shadow">
            <label className="font-semibold text-slate-700 mb-2 text-lg">Después</label>
            <Image src={after} alt="Después" width={120} height={120} className="rounded-xl object-cover mb-3 border border-gold-200 shadow" />
            <input type="file" accept="image/*" onChange={handleAfterChange} aria-label="Foto después" className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100" />
          </div>
        </div>
        <textarea
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white resize-none text-base shadow"
          placeholder="Comentario del cliente (opcional)"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-full font-bold text-lg shadow-xl hover:from-gold-700 hover:to-gold-600 transition-all duration-300 disabled:opacity-50"
          disabled={saving}
        >{saving ? "Guardando..." : "Guardar cambios"}</button>
      </form>
    </div>
  );
}
