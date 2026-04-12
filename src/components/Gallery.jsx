import { t } from "../data/content";

const IMAGES = [
  {
    // url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAG8qZaovkQrjf7oE0IBEVDOlbbzSRWZUQiODpaM_yOwpptbPHwFprU7xosv4jH6qBwI_8leNpOKAAIuvjg1tOQMGrYGCTQ-pWnnFuF0lZd38WI32JZmLISR2S3YL0I7iTVc_KH74MnQGw56=s680-w680-h510",
    altPl: "Pyszne dania bałkańskie",
    altEn: "Delicious Balkan dishes",
  },
  {
    // url: "https://images.unsplash.com/photo-1685040235380-a42a129ade4e?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEQQN0gYeCxD4ew6X-77_G8VsJuLthxmMJ8WG2k92Fl-ew-yf0kxnEGx_T1neoWlWNvK1yvL0MSX95SgrM4LkAAtdvMBemb-vx5pm3nJzSdhVG_QiANhkVMS2U4wPT01j8rWb2u6JKb4gg_=s680-w680-h510",
    altPl: "Wnętrze restauracji",
    altEn: "Restaurant interior",
  },
  {
    // url: "https://images.pexels.com/photos/3590401/pexels-photo-3590401.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHhn7aWJZABh53o5FGZbu-hzGsvXT4_pUXfjKToVUvJL_WnoLAQhzoQI8Ta7s7CuK6NJuT-3kMQyDkz3PDf5ZTEDR3-lUI0uI7RISIO-tLR-9bCv4fXqEfcyz-g7PONYM3Z__8hVsqWmPhs=s680-w680-h510",
    altPl: "Grillowane mięso",
    altEn: "Grilled meats",
  },
  {
    // url: "https://images.unsplash.com/photo-1714733340805-268e89cf861a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqR2DqAIznbvGNx1mysv2j0QsTt1mS_H3Xkh3jK954DOyMEgsyGXRai6ny9EUtTQSH5VtYXgo5HrPzJvGPXffIH9TeF0m0Tag2hEvar7gljYsTIIl_aUWsO8zbN1TT3Fd3qM6OSCcB2j_w7=s680-w680-h510",
    altPl: "Przytulna atmosfera",
    altEn: "Cozy atmosphere",
  },
];

export default function Gallery({ lang }) {
  const tr = t[lang].gallery;

  return (
    <section
      id="gallery"
      className="py-20 md:py-32 bg-[#F9F8F6]"
      data-testid="gallery-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#BA4A2B] mb-3 font-medium">
            {lang === "pl" ? "Nasze zdjęcia" : "Our photos"}
          </p>
          <h2
            className="font-heading text-4xl sm:text-5xl text-[#2D2A26] font-semibold mb-4"
            data-testid="gallery-title"
          >
            {tr.title}
          </h2>
          <p className="text-base text-[#5C5852]">{tr.subtitle}</p>
          <div className="w-12 h-0.5 bg-[#BA4A2B] mx-auto mt-6" />
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          data-testid="gallery-grid"
        >
          <div className="md:col-span-2 md:row-span-2 aspect-square md:aspect-auto overflow-hidden relative group">
            <img
              src={IMAGES[0].url}
              alt={lang === "pl" ? IMAGES[0].altPl : IMAGES[0].altEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              data-testid="gallery-image-0"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="aspect-square overflow-hidden relative group">
            <img
              src={IMAGES[1].url}
              alt={lang === "pl" ? IMAGES[1].altPl : IMAGES[1].altEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              data-testid="gallery-image-1"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="aspect-square overflow-hidden relative group">
            <img
              src={IMAGES[2].url}
              alt={lang === "pl" ? IMAGES[2].altPl : IMAGES[2].altEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              data-testid="gallery-image-2"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="col-span-2 md:col-span-3 aspect-video overflow-hidden relative group">
            <img
              src={IMAGES[3].url}
              alt={lang === "pl" ? IMAGES[3].altPl : IMAGES[3].altEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              data-testid="gallery-image-3"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
