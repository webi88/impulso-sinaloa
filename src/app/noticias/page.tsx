import Link from "next/link";
import { fetchPosts } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import WaveOverlay from "@/components/WaveOverlay";

export const metadata = {
  title: "Noticias — Impulso Sinaloa",
  description: "Análisis, información y perspectivas sobre el desarrollo y futuro de Sinaloa.",
};


const categoryColors: Record<string, string> = {
  Juventud: "bg-teal-100 text-teal-700",
  Inversión: "bg-gold-100 text-gold-700",
  Seguridad: "bg-navy-100 text-navy-700",
  Educación: "bg-teal-50 text-teal-600",
  Desarrollo: "bg-gold-50 text-gold-600",
};

export const revalidate = 60;

export default async function NoticiasPage() {
  const posts = await fetchPosts();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-light">
        {/* Header */}
        <div className="bg-navy-900 pt-28 pb-16">
          <div className="container-max">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold mb-4">
              Archivo de noticias
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Análisis y <span className="text-gold-400">perspectivas</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Información, datos y evidencia sobre el presente y el futuro de Sinaloa.
            </p>
          </div>
        </div>

        {/* Articles grid */}
        <div className="container-max py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/noticias/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-navy-100 hover:shadow-lg hover:border-teal-200 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden bg-navy-100">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                  <WaveOverlay />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-navy-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-bold text-navy-900 text-base leading-snug mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-navy-600/70 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-teal-600 text-sm font-bold group-hover:gap-2 transition-all">
                    Leer artículo <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
