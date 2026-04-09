import { Star, Banknote, Baby, Trees } from 'lucide-react';
import { t } from '../data/content';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1579611960106-a7aef7df6d03?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900';

const statIcons = [Star, Banknote, Baby, Trees];

export default function About({ lang }) {
  const tr = t[lang].about;

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-[#F9F8F6]"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#BA4A2B] mb-3 font-medium">
              {lang === 'pl' ? 'Karczma Bałkanica' : 'Karczma Bałkanica'}
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#2D2A26] font-semibold leading-tight mb-4" data-testid="about-title">
              {tr.title}
            </h2>
            <p className="text-base text-[#5C5852] mb-2 font-body italic">{tr.subtitle}</p>
            <div className="w-12 h-0.5 bg-[#BA4A2B] mb-6 mt-4" />
            <p className="text-base text-[#5C5852] leading-relaxed mb-4">{tr.text1}</p>
            <p className="text-base text-[#5C5852] leading-relaxed mb-8">{tr.text2}</p>

            <a
              href="tel:507073263"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#BA4A2B] hover:text-[#9C3C21] transition-colors border-b border-[#BA4A2B] pb-0.5"
              data-testid="about-phone-link"
            >
              507 073 263
            </a>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={ABOUT_IMAGE}
                alt={lang === 'pl' ? 'Wnętrze restauracji' : 'Restaurant interior'}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                data-testid="about-image"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block bg-[#BA4A2B] text-white p-6 w-36">
              <p className="font-heading text-3xl font-semibold leading-none">4,7</p>
              <p className="text-xs uppercase tracking-wider mt-1 text-white/80">{lang === 'pl' ? 'ocena' : 'rating'}</p>
              <p className="text-xs text-white/60 mt-0.5">193 {lang === 'pl' ? 'opinii' : 'reviews'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-24" data-testid="about-stats">
          {tr.stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <div key={i} className="bg-[#F2EFE9] border border-[#D5D1C8] p-6 text-center" data-testid={`stat-${i}`}>
                <Icon size={20} className="text-[#BA4A2B] mx-auto mb-3" strokeWidth={1.5} />
                <p className="font-heading text-2xl font-semibold text-[#2D2A26] leading-none">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-[#5C5852] mt-2">{stat.label}</p>
                <p className="text-xs text-[#5C5852]/70 mt-1">{stat.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
