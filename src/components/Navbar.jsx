import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { t } from '../data/content';

export default function Navbar({ lang, setLang, onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const tr = t[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: tr.about, href: '#about' },
    { label: tr.menu, href: '#menu' },
    { label: tr.gallery, href: '#gallery' },
    { label: tr.contact, href: '#contact' },
  ];

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#D5D1C8]' : 'bg-transparent'
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
          className="flex flex-col leading-none"
          data-testid="navbar-logo"
        >
          <span className={`font-heading text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#2D2A26]' : 'text-white'}`}>
            Karczma Bałkanica
          </span>
          <span className={`text-xs uppercase tracking-widest transition-colors duration-300 ${scrolled ? 'text-[#BA4A2B]' : 'text-[#f5c6a0]'}`}>
            Restaurant Warsaw
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className={`text-sm uppercase tracking-widest font-medium transition-colors duration-200 hover:text-[#BA4A2B] ${scrolled ? 'text-[#5C5852]' : 'text-white/80'}`}
              data-testid={`nav-link-${link.href.replace('#', '')}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            className={`text-sm font-medium uppercase tracking-widest px-3 py-1 border transition-colors duration-200 ${
              scrolled
                ? 'border-[#D5D1C8] text-[#5C5852] hover:border-[#BA4A2B] hover:text-[#BA4A2B]'
                : 'border-white/50 text-white hover:border-white'
            }`}
            data-testid="language-toggle"
          >
            {lang === 'pl' ? 'EN' : 'PL'}
          </button>
          <button
            onClick={onReserve}
            className="text-sm font-medium uppercase tracking-widest px-5 py-2 bg-[#BA4A2B] text-white hover:bg-[#9C3C21] transition-colors duration-200"
            data-testid="reserve-button-nav"
          >
            {tr.reserve}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            className={`text-xs font-medium uppercase tracking-widest px-2 py-1 border transition-colors duration-200 ${
              scrolled ? 'border-[#D5D1C8] text-[#5C5852]' : 'border-white/50 text-white'
            }`}
            data-testid="language-toggle-mobile"
          >
            {lang === 'pl' ? 'EN' : 'PL'}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`transition-colors duration-200 ${scrolled ? 'text-[#2D2A26]' : 'text-white'}`}
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#F9F8F6] border-t border-[#D5D1C8]" data-testid="mobile-nav">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm uppercase tracking-widest text-[#5C5852] hover:text-[#BA4A2B] font-medium transition-colors py-2 border-b border-[#E8E4DA]"
                data-testid={`mobile-nav-link-${link.href.replace('#', '')}`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onReserve(); }}
              className="mt-2 text-sm font-medium uppercase tracking-widest px-5 py-3 bg-[#BA4A2B] text-white text-center hover:bg-[#9C3C21] transition-colors"
              data-testid="reserve-button-mobile"
            >
              {tr.reserve}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
