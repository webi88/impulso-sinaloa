"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";
import WaveOverlay from "@/components/WaveOverlay";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import { posts as libPosts } from "@/lib/posts";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug?: string;
}

const fallbackPosts: BlogPost[] = libPosts.map((p) => ({ ...p }));

const categoryColors: Record<string, string> = {
  Juventud: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
  Inversión: "bg-gold-500/20 text-gold-300 border border-gold-500/30",
  Seguridad: "bg-navy-400/20 text-navy-200 border border-navy-400/30",
  Educación: "bg-teal-600/20 text-teal-200 border border-teal-600/30",
  Desarrollo: "bg-gold-600/20 text-gold-200 border border-gold-600/30",
};

const CARD_W = 300;
const CARD_GAP = 24;

export default function BlogCarousel() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);

    fetch("/api/articles")
      .then((r) => r.json())
      .then((dynamic: BlogPost[]) => {
        if (!Array.isArray(dynamic) || dynamic.length === 0) return;
        const dynamicSlugs = new Set(dynamic.map((p) => p.slug));
        const merged = [
          ...dynamic,
          ...fallbackPosts.filter((p) => !dynamicSlugs.has(p.slug ?? "")),
        ];
        setPosts(merged);
      })
      .catch(() => {});

    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop ? (
    <StickyCarousel posts={posts} router={router} />
  ) : (
    <MobileCarousel posts={posts} router={router} />
  );
}

function StickyCarousel({
  posts,
  router,
}: {
  posts: BlogPost[];
  router: ReturnType<typeof useRouter>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewportW, setViewportW] = useState(1280);

  useEffect(() => {
    const update = () => setViewportW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalCards = posts.length + 1;
  const totalTrackWidth = totalCards * CARD_W + (totalCards - 1) * CARD_GAP;
  const leftPad = 32;
  const maxTranslate = Math.max(0, totalTrackWidth - (viewportW - leftPad));
  const scrollHeight = maxTranslate + viewportW + 200;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  return (
    <section
      id="noticias"
      ref={sectionRef}
      style={{ height: scrollHeight }}
      className="relative bg-navy-900"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="container-max pt-24 pb-8 px-8">
          <AnimateOnScroll className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold mb-3">
                  Noticias
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Análisis y{" "}
                  <span className="text-gold-400">perspectivas</span>
                </h2>
              </div>
              <Link
                href="/noticias"
                className="flex-shrink-0 mt-1 flex items-center gap-2 px-5 py-2.5 border-2 border-teal-500/40 text-teal-400 hover:bg-teal-500 hover:text-white rounded-xl text-sm font-bold transition-all"
              >
                Todas las noticias <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-white/50 text-base max-w-2xl">
              Información, datos y evidencia sobre el presente y futuro de Sinaloa.
            </p>
          </AnimateOnScroll>
        </div>

        <div className="flex-1 flex items-center overflow-visible pl-8">
          <motion.div style={{ x }} className="flex gap-6 will-change-transform">
            {posts.map((post, i) => (
              <PostCard key={i} post={post} router={router} />
            ))}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={() => router.push("/noticias")}
              className="min-w-[300px] max-w-[300px] h-[380px] rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer bg-gradient-to-br from-navy-800 to-teal-900 border border-teal-500/20 flex flex-col items-center justify-center gap-5 shadow-xl group"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                <Newspaper className="w-7 h-7 text-teal-400" />
              </div>
              <div className="text-center px-6">
                <p className="text-white font-bold text-xl mb-2">Ver todas las noticias</p>
                <p className="text-white/50 text-sm">
                  Explora el archivo completo de análisis
                </p>
              </div>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 group-hover:bg-teal-400 text-white rounded-xl text-sm font-bold transition-colors">
                Ir a noticias <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="pb-6 px-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/30">Desplázate para ver más →</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </section>
  );
}

function MobileCarousel({
  posts,
  router,
}: {
  posts: BlogPost[];
  router: ReturnType<typeof useRouter>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, [posts]);

  return (
    <section id="noticias" className="section-padding bg-navy-900">
      <div className="container-max mb-10">
        <AnimateOnScroll className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold mb-4">
            Noticias
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Análisis y <span className="text-gold-400">perspectivas</span>
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto mb-6">
            Información, datos y evidencia sobre el presente y futuro de Sinaloa.
          </p>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white rounded-xl text-sm font-bold transition-colors"
          >
            Todas las noticias <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimateOnScroll>
      </div>

      <motion.div ref={containerRef} className="cursor-grab overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-5 px-4 sm:px-6"
        >
          {posts.map((post, i) => (
            <PostCard key={i} post={post} router={router} />
          ))}
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/noticias")}
            className="min-w-[240px] max-w-[240px] h-[340px] rounded-2xl flex-shrink-0 cursor-pointer bg-gradient-to-br from-navy-800 to-teal-900 border border-teal-500/20 flex flex-col items-center justify-center gap-4"
          >
            <Newspaper className="w-8 h-8 text-teal-400" />
            <p className="text-white font-bold text-base text-center px-4">
              Ver todas las noticias
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PostCard({
  post,
  router,
}: {
  post: BlogPost;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <motion.article
      className="min-w-[300px] max-w-[300px] h-[380px] bg-navy-800 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group cursor-pointer flex flex-col hover:border-teal-500/40 transition-colors"
      whileHover={{ y: -6 }}
      onClick={() => {
        if (post.slug) router.push(`/noticias/${post.slug}`);
      }}
    >
      <div className="h-44 relative overflow-hidden bg-navy-700 flex-shrink-0">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-700 to-teal-900 flex items-center justify-center">
            <span className="text-teal-500 text-4xl font-bold opacity-20">IS</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
        <WaveOverlay />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || "bg-white/10 text-white/70"}`}>
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <h3 className="font-bold text-white text-sm mb-2 group-hover:text-teal-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-3">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-1 text-teal-400 text-xs font-bold group-hover:gap-2 transition-all mt-auto pointer-events-none">
          Leer más <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.article>
  );
}
