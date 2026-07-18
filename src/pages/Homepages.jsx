import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrTarget } from "react-icons/gr";
import { GrMoney } from "react-icons/gr";
import { GrAnalytics } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";


const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
`;

const slides = [
  {
    icon: FaWallet,
    label: "CATAT",
    title: "Catat tiap pengeluaran dalam hitungan detik",
    desc: "Dari jajan seblak sampai bayar kos, semua masuk satu catatan rapi tanpa ribet buka Excel.",
    amount: "-Rp 15.000",
    item: "Es Teh & Gorengan",
  },
  {
    icon: BsRobot,
    label: "ANALISIS",
    title: "AI bantu lo baca pola keuangan sendiri",
    desc: "Dana Cermat kasih tau ke mana aja uang bulanan lo lari, sebelum tanggal tua bikin panik.",
    amount: "32%",
    item: "dari Uang Bulanan buat Jajan",
  },
  {
    icon: GrTarget,
    label: "TARGET",
    title: "Nabung buat laptop baru? Bisa dipantau",
    desc: "Bikin target tabungan, Dana Cermat yang ingetin progressnya tiap minggu.",
    amount: "Rp 850.000",
    item: "Menuju Target Rp 3.000.000",
  },
];

export default function DanaCermatLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setActive(i);
  };
  const next = () => goTo((active + 1) % slides.length);
  const prev = () => goTo((active - 1 + slides.length) % slides.length);

  const navLinks = ["Home", "About", "Services"];

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: "#FBF7EE",
        color: "#1F2420",
        minHeight: "100vh",
      }}
    >
      <style>{FONT_IMPORT}</style>

      {/* NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "rgba(251,247,238,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid #E4DBC6" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "#3F47F4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Rp
              </span>
            </div>
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                fontSize: 21,
                letterSpacing: "-0.01em",
                color: "#3F47F4",
              }}
            >
              Dana-Cermat
            </span>
          </div>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#3E463F",
                }}
                className="hover:opacity-70 transition-opacity"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Auth buttons desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#10352B",
                padding: "9px 18px",
              }}
              className="hover:opacity-70 transition-opacity"
            >
              Login
            </button>
            <button
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#FBF7EE",
                background: "#3F47F4",
                padding: "10px 20px",
                borderRadius: 7,
              }}
              className="hover:brightness-110 transition-all"
            >
              Register
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ color: "#10352B" }}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-4"
            style={{ borderTop: "1px solid #E4DBC6" }}
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                style={{ fontSize: 15, fontWeight: 500, color: "#3E463F", paddingTop: 14 }}
              >
                {link}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#10352B",
                  border: "1.5px solid #10352B",
                  padding: "10px 0",
                  borderRadius: 7,
                }}
              >
                Login
              </button>
              <button
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FBF7EE",
                  background: "#10352B",
                  padding: "10px 0",
                  borderRadius: 7,
                }}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <main className="max-w-6xl mx-auto px-6 pt-14 pb-24 grid md:grid-cols-2 gap-14 items-center">
        {/* Left: headline */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "#6B8F71",
              border: "1px solid #C7DAC9",
              background: "#F1F6F1",
              padding: "5px 12px",
              borderRadius: 20,
              marginBottom: 22,
            }}
          >
            ● UNTUK MAHASISWA
          </div>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              lineHeight: 1.08,
              color: "#3F47F4",
              letterSpacing: "-0.02em",
              marginBottom: 22,
            }}
          >
            Uang bulanan habis sebelum tanggal tua?
          </h1>
          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.65,
              color: "#4B5349",
              maxWidth: 460,
              marginBottom: 32,
            }}
          >
            Dana-Cermat bantu mahasiswa catat pengeluaran, pahami pola belanja
            lewat analisis pintar, dan capai target nabung — semua dari satu
            aplikasi simpel.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#FBF7EE",
                background: "#3F47F4",
                padding: "13px 26px",
                borderRadius: 8,
              }}
              className="hover:brightness-110 transition-all"
            >
              Mulai Gratis
            </button>
            <button
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#10352B",
                border: "1.5px solid #10352B",
                padding: "13px 26px",
                borderRadius: 8,
              }}
              className="hover:bg-[#10352B0d] transition-all"
            >
              Lihat Cara Kerja
            </button>
          </div>
        </div>

        {/* Right: carousel styled as receipt */}
        <div className="relative">
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 4,
              boxShadow: "0 20px 50px -20px rgba(16,53,43,0.28)",
              padding: "34px 30px 30px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* torn top edge */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 10,
                backgroundImage:
                  "radial-gradient(circle at 8px 0, transparent 8px, #FBF7EE 9px)",
                backgroundSize: "16px 16px",
                backgroundPosition: "0 -4px",
              }}
            />

            {slides.map((s, i) => {
              const Icon = s.icon;
              if (i !== active) return null;
              return (
                <div key={i} style={{ minHeight: 300 }}>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 9,
                        background: "#F1F6F1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} color="#10352B" />
                    </div>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        color: "#C89B3C",
                        fontWeight: 600,
                      }}
                    >
                      {s.label}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 600,
                      fontSize: 22,
                      lineHeight: 1.25,
                      color: "#10352B",
                      marginBottom: 12,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      color: "#5C6459",
                      marginBottom: 24,
                    }}
                  >
                    {s.desc}
                  </p>

                  <div
                    style={{
                      borderTop: "1.5px dashed #D8CFB6",
                      paddingTop: 16,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#7A8172" }}>{s.item}</span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 600,
                        fontSize: 17,
                        color: "#10352B",
                      }}
                    >
                      {s.amount}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* dots + arrows */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    style={{
                      width: i === active ? 20 : 7,
                      height: 7,
                      borderRadius: 4,
                      background: i === active ? "#10352B" : "#E4DBC6",
                      transition: "all 0.25s ease",
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Sebelumnya"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    border: "1px solid #E4DBC6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="hover:bg-[#F1F6F1] transition-colors"
                >
                  <FaChevronLeft size={12} color="#10352B" />
                </button>
                <button
                  onClick={next}
                  aria-label="Berikutnya"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    border: "1px solid #E4DBC6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="hover:bg-[#F1F6F1] transition-colors"
                >
                  <FaChevronRight size={12} color="#10352B" />
                </button>
              </div>
            </div>
          </div>

          {/* small accent tag behind card */}
          <div
            style={{
              position: "absolute",
              bottom: -14,
              right: 18,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#6B8F71",
              background: "#F1F6F1",
              border: "1px solid #C7DAC9",
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            #dicatatdanacermat
          </div>
        </div>
      </main>
    </div>
  );
}
