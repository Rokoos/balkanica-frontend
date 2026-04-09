import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import ReservationSection from "./components/ReservationSection";
import Footer from "./components/Footer";
import "./App.css";
import QRCode from "./components/QRCode";

const scrollToReservation = () => {
  const el = document.querySelector("#reservation");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

function App() {
  const [lang, setLang] = useState("pl");

  return (
    <div
      style={{
        backgroundColor: "#F9F8F6",
        color: "#2D2A26",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <Navbar lang={lang} setLang={setLang} onReserve={scrollToReservation} />
      <main>
        <Hero lang={lang} onReserve={scrollToReservation} />
        <About lang={lang} />
        <Menu lang={lang} />
        <Gallery lang={lang} />
        <Contact lang={lang} onReserve={scrollToReservation} />
        <ReservationSection lang={lang} />
        <QRCode />
      </main>
      <Footer lang={lang} onReserve={scrollToReservation} />
    </div>
  );
}

export default App;
