import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5">
      <div className="container-max py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/logo-impulso-sinaloa-blanco.png"
                alt="Impulso Sinaloa"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">
              Frente ciudadano empresarial por el desarrollo y la seguridad de Sinaloa.
              Trabajo, Inversión y Futuro.
            </p>
            <div className="flex gap-3 mt-5">
              {["X", "FB", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-500/30 flex items-center justify-center text-white/40 hover:text-teal-400 text-xs font-bold transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Navegación</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Inicio", href: "/" },
                { label: "Noticias", href: "/noticias" },
                { label: "Pilares", href: "/#pilares" },
                { label: "Quiénes somos", href: "/#nosotros" },
                { label: "Únete", href: "/#voces" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-teal-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Contacto</h4>
            <p className="text-white/40 text-sm leading-relaxed mb-3">
              ¿Quieres sumarte al frente o tienes una propuesta?
            </p>
            <a
              href="mailto:contacto@impulsosinaloa.com"
              className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
            >
              contacto@impulsosinaloa.com
            </a>

            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-gold-400 font-bold text-xs mb-1">Más inversión.</p>
              <p className="text-teal-400 font-bold text-xs mb-1">Más oportunidades.</p>
              <p className="text-white font-bold text-xs">Mejor futuro.</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Impulso Sinaloa. Todos los derechos reservados.
          </p>
          <p className="text-white/25 text-xs">
            Desarrollado por{" "}
            <a
              href="https://webi.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 transition-colors no-underline"
            >
              webi.mx
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
