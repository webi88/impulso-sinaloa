"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Briefcase, Shield } from "lucide-react";
import Link from "next/link";

const STATS = [
  { value: 3.1, suffix: "M", label: "Sinaloenses que merecen futuro" },
  { value: 40, suffix: "%", label: "de egresados buscan trabajo fuera" },
  { value: 1, suffix: "er", label: "productor agroindustrial del país" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current * 10) / 10);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count % 1 === 0 ? count.toFixed(0) : count.toFixed(1)}
      {suffix}
    </span>
  );
}

const HERO_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=85",
    alt: "Graduados sinaloenses",
    cls: "col-span-2 h-56",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=85",
    alt: "Estudiantes universitarios",
    cls: "h-44",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=85",
    alt: "Joven profesional sinaloense",
    cls: "h-44",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-navy-900">
      {/* Background image — mobile only */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
          alt="Jóvenes de Sinaloa"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-800/85 to-navy-800/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
      </div>

      {/* Desktop: dark gradient base */}
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-gold-500 to-teal-500 opacity-60" />

      {/* Gold accent blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-gold-500 blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute top-10 right-1/3 w-96 h-96 rounded-full bg-teal-500 blur-3xl pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container-max pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Left: text ── */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-400/40 bg-teal-500/10 text-teal-300 text-sm font-medium mb-6"
            >
              <TrendingUp className="w-4 h-4" />
              Frente ciudadano empresarial
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-3"
            >
              Sinaloa
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            >
              <span className="text-gold-400">merece</span>{" "}
              <span className="text-teal-400">CRECER.</span>
            </motion.h1>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-16 h-1 bg-gold-500 mb-6 origin-left"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-white/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Trabajo digno, inversión responsable y futuro para nuestras comunidades.
              Construyamos juntos el Sinaloa que merecemos.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-900/30 hover:shadow-teal-500/30 hover:-translate-y-0.5"
              >
                Ver noticias <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#pilares"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("pilares")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white hover:border-gold-500 hover:text-gold-400 font-bold rounded-xl transition-all"
              >
                Nuestros pilares
              </a>
            </motion.div>
          </div>

          {/* ── Right: photo collage — desktop only ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden lg:grid grid-cols-2 gap-3"
          >
            {HERO_PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.85 + i * 0.15 }}
                className={`${photo.cls} rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
            {/* Caption strip under collage */}
            <div className="col-span-2 flex items-center justify-center gap-6 pt-1">
              {["Talento", "Inversión", "Futuro"].map((word, i) => (
                <span key={word} className="flex items-center gap-2 text-xs font-semibold text-white/40">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-gold-500/60" />}
                  {word}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-0 border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 py-5 flex flex-col gap-1 ${
                i < STATS.length - 1 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""
              }`}
            >
              <p className="text-3xl font-bold text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/55 text-xs leading-snug">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom pillar icons strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-10 bg-navy-900/80 backdrop-blur-sm border-t border-white/10"
      >
        <div className="container-max py-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-10">
            {[
              { icon: TrendingUp, label: "Inversión Responsable" },
              { icon: Briefcase, label: "Empleo Digno" },
              { icon: Users, label: "Desarrollo Regional" },
              { icon: Shield, label: "Seguridad" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-xs font-medium">
                <Icon className="w-4 h-4 text-teal-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
