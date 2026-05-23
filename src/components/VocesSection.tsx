"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, MessageSquare, Users } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const TESTIMONIALS = [
  {
    name: "Carlos Lizárraga",
    location: "Culiacán, Sinaloa",
    message:
      "Como empresario local llevo años esperando que alguien organice esta conversación. Sinaloa tiene todo el potencial — solo necesitamos certeza y oportunidades reales.",
  },
  {
    name: "Valeria Ibarra",
    location: "Mazatlán, Sinaloa",
    message:
      "Terminé mi carrera de ingeniería y tuve que ir a Monterrey. Sinaloa me formó pero no tuvo empleo para mí. Espero que esto cambie para los que vienen atrás.",
  },
  {
    name: "Pedro Morales",
    location: "Los Mochis, Sinaloa",
    message:
      "En el campo sinaloense somos los que alimentamos al país pero seguimos siendo los más olvidados. Necesitamos más que buenas intenciones: necesitamos inversión real.",
  },
];

export default function VocesSection() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) { setError("El nombre y mensaje son obligatorios."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, message }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setSent(true);
    } catch {
      setError("Ocurrió un error al enviar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="voces" className="section-padding bg-light">
      <div className="container-max">
        <AnimateOnScroll className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-navy-800/10 border border-navy-800/20 text-navy-800 text-sm font-semibold mb-4">
            Voces de Sinaloa
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-5">
            Tu voz{" "}
            <span className="text-teal-500">importa</span>
          </h2>
          <p className="text-navy-700/60 text-lg max-w-2xl mx-auto leading-relaxed">
            El futuro de Sinaloa se construye con todas las voces. Comparte tu perspectiva
            y forma parte del diálogo.
          </p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Testimonials */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-teal-500" />
              <span className="text-navy-800 font-bold text-sm">Lo que dice nuestra comunidad</span>
            </div>
            {TESTIMONIALS.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-navy-100 relative">
                  <MessageSquare className="w-5 h-5 text-teal-400 mb-3" />
                  <p className="text-navy-700 text-sm leading-relaxed mb-4 italic">
                    &ldquo;{t.message}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-navy-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-navy-900 text-sm font-bold">{t.name}</p>
                      <p className="text-navy-500 text-xs">{t.location}</p>
                    </div>
                  </div>
                  {/* Gold accent bar */}
                  <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-teal-400 to-gold-500 rounded-r-full" />
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Form */}
          <AnimateOnScroll direction="left" className="lg:sticky lg:top-24 self-start">
            <div className="bg-navy-900 rounded-2xl p-8 shadow-xl">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8 gap-4"
                >
                  <CheckCircle className="w-16 h-16 text-teal-400" />
                  <h3 className="text-white font-bold text-2xl">¡Gracias por tu voz!</h3>
                  <p className="text-white/60 text-sm max-w-xs">
                    Tu mensaje es parte del diálogo que Sinaloa necesita. Juntos construimos
                    el futuro.
                  </p>
                  <button
                    onClick={() => { setSent(false); setName(""); setLocation(""); setMessage(""); }}
                    className="mt-2 px-5 py-2.5 border border-white/20 text-white/70 hover:text-white text-sm rounded-xl transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-white font-bold text-2xl mb-1">Comparte tu perspectiva</h3>
                    <p className="text-white/50 text-sm">
                      ¿Qué necesita cambiar en Sinaloa? Cuéntanos.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-teal-500/60 focus:bg-white/8 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                        Ciudad / Municipio
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ej: Culiacán, Mazatlán..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-teal-500/60 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                        Tu mensaje *
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="¿Qué piensas sobre el futuro de Sinaloa?"
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-teal-500/60 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs bg-red-400/10 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-lg"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
