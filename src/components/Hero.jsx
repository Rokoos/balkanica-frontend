import { ChevronDown } from "lucide-react";
import { t } from "../data/content";

const HERO_IMAGE =
  // "https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?auto=compress&cs=tinysrgb&w=1920";
  "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepxEEMhbE_TRTrGKbfcRTK5RdGLmS3ozSWtG5lws3pFV_4SWRGT_czZv2PZ2Q1iLubdrFDF8Zk2Zt3TitqA4MvIXN9K4tCH4_vCpefvZL6vGADX3ocm5IiJWMlx_H25VsumG-huTZ0nxNM6=s680-w680-h510";

export default function Hero({ lang, onReserve }) {
  console.log("lang", lang);
  const tr = t[lang].hero;

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className="text-xs uppercase tracking-[0.3em] text-[#f5c6a0] mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          {`${lang === "pl" ? "Warszawa" : "Warsaw "}· Aleja Wilanowska 43B`}
        </p>

        <h1
          className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white font-semibold tracking-tight leading-none mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          data-testid="hero-title"
        >
          Karczma
          <br />
          <span className="italic font-light text-[#f5c6a0]">Bałkanica</span>
        </h1>

        <p
          className="text-base sm:text-lg text-white/80 font-body max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          data-testid="hero-tagline"
        >
          {tr.tagline}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
        >
          <button
            onClick={onReserve}
            className="px-8 py-3 bg-[#BA4A2B] text-white text-sm font-medium uppercase tracking-widest hover:bg-[#9C3C21] transition-colors duration-300 text-center"
            data-testid="hero-reserve-button"
          >
            {tr.cta_reserve}
          </button>
          <button
            onClick={() => scrollTo("#menu")}
            className="px-8 py-3 bg-transparent text-white border border-white/60 text-sm font-medium uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
            data-testid="hero-menu-button"
          >
            {tr.cta_menu}
          </button>
        </div>

        <div
          className="flex items-center justify-center gap-3 mt-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-[#f5c6a0] fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-white/70 text-sm ml-1">
            4.7/5 · 193 {lang === "pl" ? "opinii" : "reviews"}
          </span>
        </div>
      </div>

      <button
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        data-testid="hero-scroll-indicator"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
