import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PilaresSection from "@/components/PilaresSection";
import BlogCarousel from "@/components/BlogCarousel";
import VocesSection from "@/components/VocesSection";
import Footer from "@/components/Footer";
import ScrollToSection from "@/components/ScrollToSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import WaveOverlay from "@/components/WaveOverlay";

export default function Home() {
  return (
    <main>
      <ScrollToSection />
      <Navbar />
      <Hero />
      <PilaresSection />
      <BlogCarousel />

      {/* Nosotros section */}
      <section id="nosotros" className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <AnimateOnScroll>
              <span className="inline-block px-4 py-1.5 rounded-full bg-navy-800/10 border border-navy-800/20 text-navy-800 text-sm font-semibold mb-5">
                Quiénes somos
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                Un frente ciudadano por el{" "}
                <span className="text-teal-500">futuro de Sinaloa</span>
              </h2>
              <p className="text-navy-700/70 text-base leading-relaxed mb-4">
                Impulso Sinaloa es una alianza ciudadana y empresarial que nace del
                convencimiento de que Sinaloa tiene todo el potencial para crecer, pero
                necesita certeza, inversión y oportunidades reales para su gente.
              </p>
              <p className="text-navy-700/70 text-base leading-relaxed mb-4">
                No somos un partido político. Somos empresarios, jóvenes, trabajadores,
                estudiantes y ciudadanos que creemos en el diálogo basado en evidencia y
                en propuestas concretas.
              </p>
              <p className="text-navy-700/70 text-base leading-relaxed">
                Nuestro objetivo es claro: construir el Sinaloa donde nuestros jóvenes
                puedan desarrollarse sin tener que irse.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Diálogo con evidencia", "Propuestas concretas", "Sin colores partidistas"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="left" delay={0.2}>
              <div className="relative pb-4 pl-4">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=85"
                    alt="Impulso Sinaloa"
                    className="w-full object-cover aspect-[4/3]"
                  />
                  <WaveOverlay />
                </div>
                <div className="absolute bottom-0 left-0 bg-navy-900 text-white rounded-xl p-4 shadow-xl border border-white/10 max-w-xs">
                  <p className="text-gold-400 font-bold text-lg">#ImpulsoSinaloa</p>
                  <p className="text-white/60 text-xs mt-0.5">Trabajo, Inversión y Futuro</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <VocesSection />
      <Footer />
    </main>
  );
}
