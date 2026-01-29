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
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md flex flex-col gap-4 relative">
        <button type="button" className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 text-xl" onClick={onClose}>&times;</button>
        <h3 className="text-lg font-bold text-[#b8954d] mb-2">Editar resultado</h3>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col items-center">
            <label className="font-medium text-slate-700 mb-1">Antes</label>
            <Image src={before} alt="Antes" width={100} height={100} className="rounded-lg object-cover mb-2" />
            <input type="file" accept="image/*" onChange={handleBeforeChange} />
          </div>
          <div className="flex-1 flex flex-col items-center">
            <label className="font-medium text-slate-700 mb-1">Después</label>
            <Image src={after} alt="Después" width={100} height={100} className="rounded-lg object-cover mb-2" />
            <input type="file" accept="image/*" onChange={handleAfterChange} />
          </div>
        </div>
        <textarea
          className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white resize-none"
          placeholder="Comentario del cliente (opcional)"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={2}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-full font-semibold shadow hover:from-gold-700 hover:to-gold-600 transition-all duration-300 disabled:opacity-50"
          disabled={saving}
        >{saving ? "Guardando..." : "Guardar cambios"}</button>
      </form>
    </div>
  );
}
