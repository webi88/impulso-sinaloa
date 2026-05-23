"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LogoMark({ scrolled }: { scrolled: boolean }) {
  const [error, setError] = useState(false);
  const src = scrolled ? "/logo-impulso-sinaloa.png" : "/logo-impulso-sinaloa-blanco.png";
  if (error) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div className="leading-tight">
          <span className={`block font-heading font-bold text-sm tracking-wide uppercase ${scrolled ? 'text-navy-900' : 'text-white'}`}>Impulso</span>
          <span className="block font-heading font-bold text-teal-500 text-sm tracking-wider uppercase -mt-0.5">Sinaloa</span>
        </div>
      </div>
    );
  }
  return (
    <img
      key={src}
      src={src}
      alt="Impulso Sinaloa"
      className="h-12 w-auto object-contain"
      onError={() => setError(true)}
    />
  );
}

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Pilares", href: "/#pilares" },
  { label: "Noticias", href: "/noticias" },
  { label: "Quiénes somos", href: "/#nosotros" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (window.location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        sessionStorage.setItem("scrollTo", `#${id}`);
        router.push("/");
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container-max flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <LogoMark scrolled={scrolled} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/#") ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${scrolled ? 'text-navy-700 hover:text-teal-600' : 'text-white/80 hover:text-teal-400'}`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${scrolled ? 'text-navy-700 hover:text-teal-600' : 'text-white/80 hover:text-teal-400'}`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="#voces"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("voces")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-navy-900 text-sm font-bold rounded-lg transition-colors shadow-md"
            >
              Únete
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-navy-800 hover:bg-navy-100' : 'text-white hover:bg-white/10'}`}
            aria-label="Menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy-900/98 backdrop-blur-sm flex flex-col pt-20 px-6"
          >
            <nav className="flex flex-col gap-2 mt-6">
              {NAV_LINKS.map((link, i) =>
                link.href.startsWith("/#") ? (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-white/80 hover:text-teal-400 text-xl font-semibold py-3 border-b border-white/10 transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-white/80 hover:text-teal-400 text-xl font-semibold py-3 border-b border-white/10 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07 }}
                href="#voces"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  document.getElementById("voces")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 text-center px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 text-base font-bold rounded-xl transition-colors"
              >
                Únete al movimiento
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
