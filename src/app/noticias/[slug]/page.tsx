import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import WaveOverlay from "@/components/WaveOverlay";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Impulso Sinaloa`,
    description: post.excerpt,
  };
}

export default function ArticlePage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === params.slug);
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-light">
        {/* Hero image */}
        <div className="relative h-72 sm:h-96 lg:h-[480px] bg-navy-900">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-navy-900/20" />
          <WaveOverlay />
          <div className="absolute bottom-0 left-0 right-0 container-max pb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-semibold mb-3">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="container-max py-10">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 mb-8 pb-6 border-b border-navy-200">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-700 text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Volver a noticias
              </Link>
              <span className="text-navy-400 text-sm flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </span>
              <span className="text-navy-400 text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTime} de lectura
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-navy-700 flex items-center justify-center text-white text-xs font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-navy-900 text-xs font-bold">{post.author}</p>
                  <p className="text-navy-400 text-xs">{post.authorRole}</p>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-navy-700 font-medium leading-relaxed mb-8 border-l-4 border-teal-400 pl-5 italic">
              {post.excerpt}
            </p>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-navy-900 prose-p:text-navy-700 prose-p:leading-relaxed prose-strong:text-navy-900 prose-a:text-teal-600 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-navy-200 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-navy-100 text-navy-600 rounded-full text-xs font-medium">
                #{post.category}
              </span>
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                #ImpulsoSinaloa
              </span>
              <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-medium">
                #TrabajoInversiónYFuturo
              </span>
            </div>

            {/* Prev / Next navigation */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev && (
                <Link
                  href={`/noticias/${prev.slug}`}
                  className="group flex flex-col gap-1 p-4 bg-white rounded-xl border border-navy-100 hover:border-teal-200 hover:shadow-md transition-all"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-navy-400 font-medium">
                    <ArrowLeft className="w-3 h-3" /> Artículo anterior
                  </span>
                  <span className="text-navy-900 text-sm font-bold group-hover:text-teal-600 transition-colors line-clamp-2">
                    {prev.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/noticias/${next.slug}`}
                  className="group flex flex-col gap-1 p-4 bg-white rounded-xl border border-navy-100 hover:border-teal-200 hover:shadow-md transition-all sm:text-right sm:items-end"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-navy-400 font-medium">
                    Siguiente artículo <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-navy-900 text-sm font-bold group-hover:text-teal-600 transition-colors line-clamp-2">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
