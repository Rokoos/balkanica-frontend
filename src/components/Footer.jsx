import { MapPin, Phone } from 'lucide-react';
import { t } from '../data/content';

export default function Footer({ lang, onReserve }) {
  const tr = t[lang].footer;
  const nav = t[lang].nav;
  const contact = t[lang].contact;

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { label: nav.about, href: '#about' },
    { label: nav.menu, href: '#menu' },
    { label: nav.gallery, href: '#gallery' },
    { label: nav.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-[#2D2A26] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          <div>
            <h3 className="font-heading text-2xl font-semibold text-white mb-2">Karczma Bałkanica</h3>
            <div className="w-10 h-0.5 bg-[#BA4A2B] mb-4" />
            <p className="text-sm text-white/60 leading-relaxed">{tr.tagline}</p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">{tr.links_title}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                    data-testid={`footer-link-${link.href.replace('#', '')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
              {lang === 'pl' ? 'Kontakt' : 'Contact'}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#BA4A2B] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-sm text-white/70 leading-snug">{contact.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#BA4A2B] flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:507073263" className="text-sm text-white/70 hover:text-white transition-colors" data-testid="footer-phone">
                  507 073 263
                </a>
              </div>
            </div>

            <button
              onClick={onReserve}
              className="mt-6 inline-block px-6 py-2.5 border border-[#BA4A2B] text-[#BA4A2B] text-xs font-medium uppercase tracking-widest hover:bg-[#BA4A2B] hover:text-white transition-colors duration-300"
              data-testid="footer-reserve-button"
            >
              {nav.reserve}
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-xs text-white/40">{tr.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
