"use client";
import { useState } from "react";

export default function Experiencias() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setSubmitting(true);
    // Aquí deberías subir la imagen a tu backend o Cloudinary
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      setSelectedFile(null);
      setPreview(null);
      setMessage("");
    }, 1500);
  };

  return (
    <section id="experiencias" className="py-20 md:py-32 bg-gradient-to-b from-white via-[#faf8f5] to-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#b8954d] mb-2">Experiencias reales, resultados visibles</h2>
        <p className="text-gray-600 mb-8">Comparte tu resultado después de tu sesión. ¡Tu experiencia puede inspirar a otros!</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 flex flex-col items-center gap-6 max-w-xl mx-auto">
          <label className="block w-full text-left font-medium text-slate-700 mb-2">Sube tu foto del resultado</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full mb-2" />
          {preview && (
            <img src={preview} alt="Vista previa" className="w-40 h-40 object-cover rounded-xl shadow mb-2 mx-auto" />
          )}
          <textarea
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white resize-none"
            placeholder="Cuéntanos tu experiencia (opcional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
          />
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-full font-semibold shadow-md hover:from-gold-700 hover:to-gold-600 transition-all duration-300 disabled:opacity-50"
            disabled={submitting || !selectedFile}
          >
            {submitting ? "Enviando..." : "Compartir experiencia"}
          </button>
          {success && <div className="text-green-600 font-medium mt-2">¡Gracias por compartir tu experiencia!</div>}
        </form>
      </div>
    </section>
  );
}
