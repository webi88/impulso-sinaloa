"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, LogOut, PlusCircle, Send, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "impulso2024";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseContent(raw: string): string {
  return raw
    .split("\n\n")
    .filter(Boolean)
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) return `<h2>${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("# ")) return `<h1>${trimmed.slice(2)}</h1>`;
      return `<p>${trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`;
    })
    .join("\n");
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Inversión");
  const [date, setDate] = useState("");
  const [readTime, setReadTime] = useState("5 min");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Contraseña incorrecta.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      setError("Título, resumen y contenido son obligatorios.");
      return;
    }
    setSending(true); setError("");
    try {
      const slug = slugify(title);
      const htmlContent = parseContent(content);
      const payload = { slug, title, excerpt, category, date: date || new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }), readTime, image, content: htmlContent, author: "Impulso Sinaloa", authorRole: "Trabajo, Inversión y Futuro" };
      const res = await fetch("/api/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Error al publicar");
      setSuccess(true);
      setTitle(""); setExcerpt(""); setContent(""); setImage(""); setDate("");
    } catch {
      setError("Error al enviar el artículo. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-white font-bold text-2xl">Impulso Sinaloa</h1>
            <p className="text-white/50 text-sm mt-1">Panel de administración</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-teal-500/60 pr-10"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-3 text-white/40 hover:text-white/70">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {authError && <p className="text-red-400 text-xs">{authError}</p>}
            <button type="submit" className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-colors">
              Ingresar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-navy-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-sm">Impulso Sinaloa</span>
            <span className="text-teal-400 text-xs ml-2">Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-white/50 hover:text-white text-xs transition-colors">
            Ver sitio →
          </Link>
          <button onClick={() => setAuthenticated(false)} className="flex items-center gap-1 text-white/50 hover:text-white text-xs transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Salir
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <PlusCircle className="w-6 h-6 text-teal-500" />
          <h1 className="text-navy-900 font-bold text-2xl">Nuevo artículo</h1>
        </div>

        {success && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-xl text-teal-700 text-sm font-medium">
            ✓ Artículo publicado correctamente.
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-navy-100 shadow-sm p-8 flex flex-col gap-6">
          <div>
            <label className="block text-navy-700 text-xs font-bold uppercase tracking-wide mb-1.5">Título *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título del artículo" className="w-full border border-navy-200 rounded-xl px-4 py-3 text-navy-900 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all" />
          </div>
          <div>
            <label className="block text-navy-700 text-xs font-bold uppercase tracking-wide mb-1.5">Resumen *</label>
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Breve descripción del artículo" rows={2} className="w-full border border-navy-200 rounded-xl px-4 py-3 text-navy-900 text-sm outline-none focus:border-teal-500 resize-none transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-navy-700 text-xs font-bold uppercase tracking-wide mb-1.5">Categoría</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-navy-200 rounded-xl px-4 py-3 text-navy-900 text-sm outline-none focus:border-teal-500 bg-white">
                {["Inversión", "Empleo", "Seguridad", "Educación", "Desarrollo", "Juventud", "Campo", "Tecnología"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-navy-700 text-xs font-bold uppercase tracking-wide mb-1.5">Tiempo de lectura</label>
              <input type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="5 min" className="w-full border border-navy-200 rounded-xl px-4 py-3 text-navy-900 text-sm outline-none focus:border-teal-500" />
            </div>
          </div>
          <div>
            <label className="block text-navy-700 text-xs font-bold uppercase tracking-wide mb-1.5">URL de imagen de portada</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full border border-navy-200 rounded-xl px-4 py-3 text-navy-900 text-sm outline-none focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-navy-700 text-xs font-bold uppercase tracking-wide mb-1.5">Contenido * <span className="text-navy-400 font-normal normal-case">(usa ## para subtítulos, **texto** para negrita)</span></label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe el contenido del artículo aquí..." rows={12} className="w-full border border-navy-200 rounded-xl px-4 py-3 text-navy-900 text-sm outline-none focus:border-teal-500 resize-y font-mono transition-all" />
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
          <button type="submit" disabled={sending} className="flex items-center justify-center gap-2 py-3.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-white font-bold rounded-xl transition-colors">
            {sending ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Publicar artículo</>}
          </button>
        </form>
      </div>
    </div>
  );
}
