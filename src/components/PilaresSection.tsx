"use client";

import { motion } from "framer-motion";
import { TrendingUp, Briefcase, MapPin, Shield } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const PILARES = [
  {
    icon: TrendingUp,
    title: "Valor para Sinaloa",
    description:
      "Promovemos inversiones que fortalezcan la economía local, impulsen a empresas sinaloenses y generen beneficios que permanezcan en la región.",
    color: "from-teal-500 to-teal-700",
    accent: "bg-teal-500/10 border-teal-500/20",
    textColor: "text-teal-400",
  },
  {
    icon: Briefcase,
    title: "Empleo Digno",
    description:
      "Trabajo formal, mejores salarios y oportunidades reales para jóvenes que estudian, se preparan y quieren construir su futuro en Sinaloa.",
    color: "from-gold-500 to-gold-700",
    accent: "bg-gold-500/10 border-gold-500/20",
    textColor: "text-gold-400",
  },
  {
    icon: MapPin,
    title: "Desarrollo Regional",
    description:
      "Que las oportunidades lleguen a más municipios, comunidades y familias. El desarrollo también debe sentirse en la vida diaria de quienes viven y trabajan en Sinaloa.",
    color: "from-navy-400 to-navy-600",
    accent: "bg-navy-400/10 border-navy-400/20",
    textColor: "text-navy-300",
  },
  {
    icon: Shield,
    title: "Seguridad y Certeza",
    description:
      "Cuando hay empleo y oportunidades, también hay más caminos para que las y los jóvenes construyan un futuro lejos de la ilegalidad.",
    color: "from-teal-600 to-navy-700",
    accent: "bg-teal-600/10 border-teal-600/20",
    textColor: "text-teal-300",
  },
];

export default function PilaresSection() {
  return (
    <section id="pilares" className="section-padding bg-navy-900">
      <div className="container-max">
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold mb-4">
            Nuestros Pilares
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            El Sinaloa que{" "}
            <span className="text-gold-400">construimos juntos</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Más inversión. Más oportunidades. Mejor futuro. Estos son los cuatro ejes
            sobre los que trabajamos cada día.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILARES.map((pilar, i) => {
            const Icon = pilar.icon;
            return (
              <AnimateOnScroll key={pilar.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className={`relative overflow-hidden rounded-2xl border ${pilar.accent} p-8 group cursor-default`}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${pilar.color} mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Number */}
                  <span className="absolute top-6 right-8 text-6xl font-bold text-white/[0.04] leading-none select-none">
                    0{i + 1}
                  </span>

                  <h3 className={`text-xl font-bold mb-3 ${pilar.textColor}`}>
                    {pilar.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {pilar.description}
                  </p>
                </motion.div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll delay={0.4} className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-8 py-6">
            <p className="text-white/70 text-sm">
              <span className="text-gold-400 font-bold">Más inversión.</span>{" "}
              <span className="text-teal-400 font-bold">Más oportunidades.</span>{" "}
              <span className="text-white font-bold">Mejor futuro.</span>
            </p>
            <a
              href="#voces"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("voces")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-shrink-0 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-900 text-sm font-bold rounded-xl transition-colors shadow-md"
            >
              Únete al frente
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
