"use client";
import { useState } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

export default function ResultadosPanel({ onUpload }: { onUpload?: () => void }) {
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBeforeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBeforeFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBeforePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setBeforePreview(null);
    }
  };
  const handleAfterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAfterFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAfterPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setAfterPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeFile || !afterFile) return;
    setSubmitting(true);
    let beforeUrl = "";
    let afterUrl = "";
    try {
      beforeUrl = await uploadToCloudinary(beforeFile);
      afterUrl = await uploadToCloudinary(afterFile);
      await fetch("/api/resultados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ before: beforeUrl, after: afterUrl, message })
      });
      setSuccess(true);
      setBeforeFile(null);
      setAfterFile(null);
      setBeforePreview(null);
      setAfterPreview(null);
      setMessage("");
      if (onUpload) onUpload();
    } catch {
      // Manejo de error
    }
    setSubmitting(false);
  };

  return (
    <section className="py-8">
      <h3 className="text-xl font-bold mb-4 text-[#b8954d]">Subir resultado de cliente</h3>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 border border-slate-200 flex flex-col items-center gap-4 max-w-md">
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <div className="flex-1 flex flex-col items-center">
            <label className="font-medium text-slate-700 mb-1">Foto ANTES</label>
            <input type="file" accept="image/*" onChange={handleBeforeChange} className="w-full" />
            {beforePreview && (
              <Image src={beforePreview} alt="Antes" width={120} height={120} className="rounded-lg object-cover mt-2" />
            )}
          </div>
          <div className="flex-1 flex flex-col items-center">
            <label className="font-medium text-slate-700 mb-1">Foto DESPUÉS</label>
            <input type="file" accept="image/*" onChange={handleAfterChange} className="w-full" />
            {afterPreview && (
              <Image src={afterPreview} alt="Después" width={120} height={120} className="rounded-lg object-cover mt-2" />
            )}
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
          disabled={submitting || !beforeFile || !afterFile}
        >
          {submitting ? "Subiendo..." : "Subir resultado"}
        </button>
        {success && <div className="text-green-600 font-medium mt-2">¡Resultado subido!</div>}
      </form>
    </section>
  );
}
