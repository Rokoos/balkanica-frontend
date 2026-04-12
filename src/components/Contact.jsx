import { MapPin, Phone, Clock, CheckCircle } from "lucide-react";
import { t } from "../data/content";

export default function Contact({ lang, onReserve }) {
  const tr = t[lang].contact;

  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-[#F2EFE9]"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#BA4A2B] mb-3 font-medium">
            {lang === "pl" ? "Gdzie nas znajdziesz" : "Where to find us"}
          </p>
          <h2
            className="font-heading text-4xl sm:text-5xl text-[#2D2A26] font-semibold mb-4"
            data-testid="contact-title"
          >
            {tr.title}
          </h2>
          <p className="text-base text-[#5C5852]">{tr.subtitle}</p>
          <div className="w-12 h-0.5 bg-[#BA4A2B] mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="space-y-8">
            <div
              className="bg-[#F9F8F6] border border-[#D5D1C8] p-6 md:p-8"
              data-testid="contact-hours"
            >
              <div className="flex items-center gap-3 mb-5">
                <Clock size={18} className="text-[#BA4A2B]" strokeWidth={1.5} />
                <h3 className="font-heading text-xl text-[#2D2A26] font-semibold">
                  {tr.hours_title}
                </h3>
              </div>
              {tr.hours.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-[#E8E4DA] last:border-0"
                >
                  <span className="text-sm text-[#5C5852]">{h.day}</span>
                  <span
                    className={`text-sm font-medium ${h.time === "Nieczynne" || h.time === "Closed" ? "text-[#5C5852]" : "text-[#2D2A26]"}`}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
              <p className="text-xs text-[#5C5852]/70 mt-4 italic leading-snug">
                {tr.hours_note}
              </p>
            </div>

            <div
              className="bg-[#F9F8F6] border border-[#D5D1C8] p-6 md:p-8"
              data-testid="contact-features"
            >
              <h3 className="font-heading text-xl text-[#2D2A26] font-semibold mb-5">
                {lang === "pl" ? "Udogodnienia" : "Amenities"}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tr.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle
                      size={14}
                      className="text-[#5B6C55] flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span className="text-sm text-[#5C5852]">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className="bg-[#F9F8F6] border border-[#D5D1C8] p-6 md:p-8"
              data-testid="contact-address"
            >
              <div className="flex items-start gap-4 mb-6">
                <MapPin
                  size={20}
                  className="text-[#BA4A2B] mt-1 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#5C5852] mb-1">
                    {tr.address_title}
                  </p>
                  <p className="text-[#2D2A26] font-medium">{tr.address}</p>
                  <a
                    href={tr.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#BA4A2B] hover:text-[#9C3C21] transition-colors mt-1 inline-block border-b border-[#BA4A2B]/40 hover:border-[#9C3C21]"
                    data-testid="map-link"
                  >
                    {lang === "pl" ? "Zobacz na mapie" : "View on map"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone
                  size={20}
                  className="text-[#BA4A2B] mt-1 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#5C5852] mb-1">
                    {tr.phone_title}
                  </p>
                  <a
                    href="tel:507073263"
                    className="text-[#2D2A26] font-medium text-lg hover:text-[#BA4A2B] transition-colors"
                    data-testid="contact-phone-link"
                  >
                    507 073 263
                  </a>
                </div>
              </div>
            </div>

            <div
              className="aspect-video bg-[#E8E4DA] overflow-hidden relative"
              data-testid="contact-map"
            >
              <iframe
                title="Karczma Bałkanica location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.847019617097!2d21.0402!3d52.1648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471934d5a5a4a4a5%3A0x1!2sAleja%20Wilanowska%2043B%2C%20Warsaw!5e0!3m2!1sen!2spl!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-500"
              />
            </div>

            {/* <button
              onClick={onReserve}
              className="block w-full text-center py-4 bg-[#BA4A2B] text-white text-sm font-medium uppercase tracking-widest hover:bg-[#9C3C21] transition-colors duration-300"
              data-testid="reserve-button-contact"
            >
              {tr.reserve_cta}
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
