import { useState } from 'react';
import { t, menuCategories } from '../data/content';

function MenuItem({ item, lang, priceOnRequest }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[#E8E4DA] last:border-0 group" data-testid="menu-item">
      <div className="flex-1 min-w-0">
        <p className="text-[#2D2A26] font-medium text-sm leading-tight group-hover:text-[#BA4A2B] transition-colors">
          {item[lang]}
        </p>
        {(item.descPl || item.descEn) && (
          <p className="text-xs text-[#5C5852] mt-0.5 leading-snug italic">
            {lang === 'pl' ? item.descPl : item.descEn}
          </p>
        )}
      </div>
      <span className="text-sm font-semibold text-[#BA4A2B] whitespace-nowrap flex-shrink-0">
        {item.price ? `${item.price} zł` : priceOnRequest}
      </span>
    </div>
  );
}

export default function Menu({ lang }) {
  const tr = t[lang].menu;
  const [activeTab, setActiveTab] = useState('appetizers');

  const activeCategory = menuCategories.find(c => c.id === activeTab);

  return (
    <section
      id="menu"
      className="py-20 md:py-32 bg-[#F2EFE9]"
      data-testid="menu-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#BA4A2B] mb-3 font-medium">
            {lang === 'pl' ? 'Odkryj nasze dania' : 'Discover our dishes'}
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#2D2A26] font-semibold mb-4" data-testid="menu-title">
            {tr.title}
          </h2>
          <p className="text-base text-[#5C5852] max-w-xl mx-auto">{tr.subtitle}</p>
          <div className="w-12 h-0.5 bg-[#BA4A2B] mx-auto mt-6" />
        </div>

        <div className="overflow-x-auto pb-2 mb-8 -mx-2 px-2" data-testid="menu-tabs-container">
          <div className="flex gap-2 min-w-max">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors duration-200 border ${
                  activeTab === cat.id
                    ? 'bg-[#BA4A2B] text-white border-[#BA4A2B]'
                    : 'bg-transparent text-[#5C5852] border-[#D5D1C8] hover:border-[#BA4A2B] hover:text-[#BA4A2B]'
                }`}
                data-testid={`menu-tab-${cat.id}`}
              >
                {cat[lang]}
              </button>
            ))}
          </div>
        </div>

        {activeCategory && (
          <div className="bg-[#F9F8F6] border border-[#D5D1C8] p-6 md:p-10" data-testid="menu-content">
            <h3 className="font-heading text-2xl sm:text-3xl text-[#2D2A26] font-semibold mb-6 pb-4 border-b border-[#D5D1C8]">
              {activeCategory[lang]}
            </h3>
            <div className="grid md:grid-cols-2 gap-x-10">
              {activeCategory.items.map((item, idx) => (
                <MenuItem
                  key={idx}
                  item={item}
                  lang={lang}
                  priceOnRequest={tr.price_on_request}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
