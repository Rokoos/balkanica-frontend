import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CalendarDays,
  Clock,
  Users,
  Mail,
  Phone,
  User,
  MapPin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { t } from "../data/content";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const DEMO_MODE = !SERVICE_ID || SERVICE_ID.startsWith("YOUR_");

const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 12; h <= 21; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 21) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
})();

const TODAY = new Date().toISOString().split("T")[0];

const inputClass =
  "w-full border border-[#D5D1C8] bg-white px-4 py-2.5 text-sm text-[#2D2A26] focus:outline-none focus:border-[#BA4A2B] transition-colors placeholder-[#B0AB9F]";

const Field = ({ icon: Icon, label, required, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#5C5852] mb-1.5 font-medium">
      {Icon && <Icon size={12} strokeWidth={2} className="text-[#BA4A2B]" />}
      {label}
      {required && <span className="text-[#BA4A2B]">*</span>}
    </label>
    {children}
  </div>
);

const BG =
  "https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function ReservationSection({ lang }) {
  const tr = t[lang].reservation;
  const contactTr = t[lang].contact;
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [status, setStatus] = useState("idle");
  const [refNumber, setRefNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const ref = `KB-${Date.now().toString().slice(-6)}`;
    setRefNumber(ref);

    if (DEMO_MODE) {
      await new Promise((r) => setTimeout(r, 1400));
      setStatus("success");
      return;
    }

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          guest_name: form.name,
          guest_surname: form.surname,
          guest_email: form.email,
          guest_phone: form.phone,
          reservation_date: form.date,
          reservation_time: form.time,
          number_of_guests: form.guests,
          notes: form.notes || "—",
          reservation_reference: ref,
        },
        PUBLIC_KEY,
      );
      if (result.status === 200) setStatus("success");
      else {
        setErrorMsg(tr.error_msg);
        setStatus("error");
      }
    } catch {
      setErrorMsg(tr.error_msg);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setForm({
      name: "",
      surname: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
      notes: "",
    });
  };

  return (
    <section
      id="reservation"
      className="relative"
      data-testid="reservation-section"
    >
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left: atmospheric panel */}
        <div className="relative flex flex-col justify-center px-8 md:px-16 py-16 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BG})` }}
          />
          <div className="absolute inset-0 bg-[#1a1512]/75" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#f5c6a0] mb-4">
              {lang === "pl" ? "Zarezerwuj miejsce" : "Book your table"}
            </p>
            <h2
              className="font-heading text-4xl sm:text-5xl text-white font-semibold leading-tight mb-6"
              data-testid="reservation-section-title"
            >
              {lang === "pl" ? "Zarezerwuj\nStolik" : "Reserve\nYour Table"}
            </h2>
            <div className="w-10 h-0.5 bg-[#BA4A2B] mb-8" />
            <p className="text-white/70 text-sm leading-relaxed mb-10 max-w-sm">
              {lang === "pl"
                ? "Zadzwonimy do Ciebie, aby potwierdzić rezerwację. Czekamy na spotkanie z Tobą!"
                : "We'll call you to confirm your reservation. We look forward to welcoming you!"}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin
                  size={16}
                  className="text-[#BA4A2B] flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-white/70 text-sm">
                  {contactTr.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  size={16}
                  className="text-[#BA4A2B] flex-shrink-0"
                  strokeWidth={1.5}
                />
                <a
                  href="tel:507073263"
                  className="text-white/70 text-sm hover:text-white transition-colors"
                >
                  507 073 263
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock
                  size={16}
                  className="text-[#BA4A2B] flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-white/70 text-sm">
                  {lang === "pl" ? "Wt–Nd: od 12:00" : "Tue–Sun: from 12:00"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form panel */}
        <div className="bg-[#F2EFE9] flex items-center justify-center px-8 md:px-12 py-16">
          <div className="w-full max-w-md">
            {status === "success" ? (
              <div
                className="text-center py-4"
                data-testid="section-reservation-success"
              >
                <div className="w-16 h-16 bg-[#5B6C55]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle
                    size={32}
                    className="text-[#5B6C55]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#2D2A26] mb-2">
                  {tr.success_title}
                </h3>
                <p className="text-sm text-[#5C5852] leading-relaxed mb-4">
                  {tr.success_msg}
                </p>
                <div className="inline-block border border-[#D5D1C8] bg-[#F9F8F6] px-6 py-3 text-sm mb-6">
                  <span className="font-medium text-[#2D2A26]">
                    {tr.ref_label}:
                  </span>{" "}
                  <span className="font-mono text-[#BA4A2B] font-semibold">
                    {refNumber}
                  </span>
                </div>
                {DEMO_MODE && (
                  <p className="text-xs text-[#5C5852]/60 italic mb-6">
                    {tr.demo_note}
                  </p>
                )}
                <button
                  onClick={reset}
                  className="px-8 py-3 bg-[#BA4A2B] text-white text-sm font-medium uppercase tracking-widest hover:bg-[#9C3C21] transition-colors"
                  data-testid="section-new-reservation"
                >
                  {lang === "pl" ? "Nowa Rezerwacja" : "New Reservation"}
                </button>
              </div>
            ) : status === "error" ? (
              <div
                className="text-center py-4"
                data-testid="section-reservation-error"
              >
                <AlertCircle
                  size={32}
                  className="text-red-400 mx-auto mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-heading text-xl font-semibold text-[#2D2A26] mb-2">
                  {tr.error_title}
                </h3>
                <p className="text-sm text-[#5C5852] mb-6">{errorMsg}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 bg-[#BA4A2B] text-white text-sm font-medium uppercase tracking-widest hover:bg-[#9C3C21] transition-colors"
                >
                  {tr.retry}
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-semibold text-[#2D2A26]">
                    {tr.title}
                  </h3>
                  <p className="text-sm text-[#5C5852] mt-1">{tr.subtitle}</p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-testid="section-reservation-form"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <Field icon={User} label={tr.name} required>
                      <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={tr.name_placeholder}
                        className={inputClass}
                        data-testid="section-input-name"
                      />
                    </Field>
                    <Field icon={User} label={tr.surname} required>
                      <input
                        name="surname"
                        type="text"
                        required
                        value={form.surname}
                        onChange={handleChange}
                        placeholder={tr.surname_placeholder}
                        className={inputClass}
                        data-testid="section-input-surname"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field icon={Mail} label={tr.email} required>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className={inputClass}
                        data-testid="section-input-email"
                      />
                    </Field>
                    <Field icon={Phone} label={tr.phone} required>
                      <input
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+48 000 000 000"
                        className={inputClass}
                        data-testid="section-input-phone"
                      />
                    </Field>
                  </div>

                  {/* <div className="grid grid-cols-2 gap-3">
                   
                    <Field icon={CalendarDays} label={tr.date} required>
                      <div className="relative w-full h-full flex items-center">
                        {!form.date && (
                          <span className="absolute left-1/2 -translate-x-1/2 text-[#A3A3A3] font-body text-[13px] pointer-events-none z-10 whitespace-nowrap">
                            dd / mm / yyyy
                          </span>
                        )}

                        <input
                          name="date"
                          type="date"
                          required
                          value={form.date}
                          min={TODAY}
                          onChange={handleChange}
                          onClick={(e) => e.currentTarget.showPicker()}
                          className={`${inputClass} w-full ${!form.date ? "text-transparent" : "text-inherit"}`}
                          data-testid="section-input-date"
                        />
                      </div>
                    </Field>
                    <Field icon={Clock} label={tr.time} required>
                      <select
                        name="time"
                        required
                        value={form.time}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer`}
                        data-testid="section-select-time"
                      >
                        <option value="" disabled>
                          {tr.select_time}
                        </option>
                        {TIME_SLOTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div> */}
                  <div className="grid grid-cols-2 gap-3 items-stretch">
                    {/* Date Field */}
                    <Field icon={CalendarDays} label={tr.date} required>
                      <div className="relative w-full h-10 flex items-center">
                        {!form.date && (
                          <span className="absolute left-1/2 -translate-x-1/2 text-[#A3A3A3] font-body text-[13px] pointer-events-none z-10 whitespace-nowrap">
                            dd / mm / yyyy
                          </span>
                        )}
                        <input
                          name="date"
                          type="date"
                          required
                          value={form.date}
                          min={TODAY}
                          onChange={handleChange}
                          onClick={(e) => e.currentTarget.showPicker()}
                          className={`${inputClass} w-full h-full text-center ${!form.date ? "text-transparent" : "text-inherit"}`}
                          data-testid="section-input-date"
                        />
                      </div>
                    </Field>

                    {/* Time Field - Updated with same wrapper as Date */}
                    <Field icon={Clock} label={tr.time} required>
                      <div className="relative w-full h-10 flex items-center">
                        <select
                          name="time"
                          required
                          value={form.time}
                          onChange={handleChange}
                          /* Added h-full and removed any external margins */
                          className={`${inputClass} w-full h-full cursor-pointer appearance-none`}
                          data-testid="section-select-time"
                        >
                          <option value="" disabled>
                            {tr.select_time}
                          </option>
                          {TIME_SLOTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Field>
                  </div>

                  <Field icon={Users} label={tr.guests} required>
                    <select
                      name="guests"
                      data-no-edit
                      required
                      value={form.guests}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                      data-testid="section-select-guests"
                    >
                      {/* {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={String(n)}>
                           {lang === "pl"
                            ? n === 1
                              ? "1 osoba"
                              : n < 5
                                ? `${n} osoby`
                                : `${n} osób`
                            : `${n} ${n === 1 ? "Guest" : "Guests"}`} 
                            
                        </option>
                      ))}
                       <option value="13">
                        13+ {lang === "pl" ? "osób" : "Guests"}
                      </option>  */}
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
                        // 1. Calculate the string first
                        const label =
                          lang === "pl"
                            ? n === 1
                              ? "1 osoba"
                              : n < 5
                                ? `${n} osoby`
                                : `${n} osób`
                            : `${n} ${n === 1 ? "Guest" : "Guests"}`;

                        // 2. Pass the plain string to the option
                        return (
                          <option key={n} value={String(n)}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </Field>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#5C5852] mb-1.5 font-medium block">
                      {tr.notes}
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder={tr.notes_placeholder}
                      rows={2}
                      className={`${inputClass} resize-none`}
                      data-testid="section-input-notes"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#5C5852] mb-1.5 font-medium block">
                      {tr.note1}
                      <span className="text-black font-bold">{`507 073 263`}</span>

                      {tr.note2}
                    </label>
                  </div>

                  {/* {DEMO_MODE && (
                    <p className="text-xs text-[#5C5852]/60 italic border border-[#D5D1C8] px-3 py-2">
                      {tr.demo_note}
                    </p>
                  )} */}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 bg-[#BA4A2B] text-white text-sm font-medium uppercase tracking-widest hover:bg-[#9C3C21] disabled:opacity-60 transition-colors flex items-center justify-center gap-3"
                    data-testid="section-reservation-submit"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        {tr.submitting}
                      </>
                    ) : (
                      tr.submit
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
