// components/hero-banner.tsx

"use client"

import { useTheme } from "@/lib/theme-context"
import { useLocale } from "@/lib/locale-context"
import { useState } from "react"

import LiquidEther from "./liquid-ether"
import ConsultationModal from "./consultation-modal"
import RateCalculatorPopout from "./rate-calculator-popout"
import CalculatorModal from "./calculator-modal"

export function HeroBanner() {
  const { theme } = useTheme()
  const { locale } = useLocale()

  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [isPopoutOpen, setIsPopoutOpen] = useState(false)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  const content = {
    en: {
      mainTitle: "Turning your idea into",
      mainTitleGradient: "a tech solution",
      subtitle1: "You don't need better developers.",
      subtitle2: "You need the right ones at the right time.",
      buttonText: "Developer Test Drive",
      buttonDescription1: "Get 10 hours of free tech expertise.",
      buttonDescription2: "Test the fit from day one.",
      estimations: "Estimations",
      totalProjects: "Total Projects",
      successfulClients: "Successful Clients",
      professionals: "Professionals",
    },
    uk: {
      mainTitle: "Перетворюємо вашу ідею на",
      mainTitleGradient: "технічне рішення",
      subtitle1: "Вам не потрібні кращі розробники.",
      subtitle2: "Вам потрібні правильні розробники у правильний час.",
      buttonText: "Тест-драйв розробника",
      buttonDescription1: "Отримайте 10 годин безкоштовної технічної експертизи.",
      buttonDescription2: "Перевірте відповідність з першого дня.",
      estimations: "Оцінок",
      totalProjects: "Всього проектів",
      successfulClients: "Успішних клієнтів",
      professionals: "Професіоналів",
    },
  }

  const t = content[locale]

  const handleCalculateClick = () => {
    setIsPopoutOpen(false)
    setTimeout(() => {
      setIsCalculatorOpen(true)
    }, 100)
  }

  return (
    <>
      <section className="hero-banner relative w-full mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <LiquidEther
            colors={theme === "dark" ? ["#FF6200", "#FFFFFF", "#FFB43F"] : ["#FF6200", "#000000", "#FFA57D"]}
            autoIntensity={2.4}
            autoDemo={true}
            autoSpeed={0.5}
          />
        </div>

        <div className="hero-content relative z-10 w-full max-w-[1200px] mx-auto px-4 lg:px-6 text-center md:px-[15px] flex flex-col justify-center py-8 md:py-12 items-center h-max">
          <h1
            className="hero-title font-extrabold text-center mb-6 md:mb-8 md:w-[738px] md:mx-auto lg:mt-20 xl:mt-24 leading-4 mt-40 px-2"
            style={{
              fontSize: "64px",
              lineHeight: "110%",
              letterSpacing: "-3%",
              fontWeight: 800,
              color: theme === "light" ? "#000000" : "#FFFFFF",
              marginTop: "160px",
              marginBottom: "20px",
            }}
          >
            {t.mainTitle}
            <br />
            <span
              style={{
                backgroundImage:
                  theme === "light"
                    ? "linear-gradient(90deg, #FF6200 51.44%, #212121 100%)"
                    : "linear-gradient(90deg, #FF6200 51.44%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.mainTitleGradient}
            </span>
          </h1>

          <p
            className="text-white text-center mb-4 md:w-[408px] md:mx-auto md:mt-4"
            style={{
              fontSize: "20px",
              lineHeight: "100%",
              letterSpacing: "2%",
              fontWeight: 500,
              color: theme === "light" ? "#000000" : "#FFFFFF",
              marginBottom: "40px",
              marginTop: "8px",
            }}
          >
            {t.subtitle1}
            <br />
            {t.subtitle2}
          </p>

          <div className="flex flex-col items-center gap-4 mt-12 md:mt-14">
            <button
              className="h-10 rounded-full px-7 font-normal transition-all duration-300 ease-out disabled:cursor-not-allowed md:w-[200px] md:h-[40px]"
              style={{
                width: "200px",
                height: "40px",
                borderRadius: "50px",
                padding: "4px 14px",
                fontSize: "16px",
                lineHeight: "100%",
                fontFamily: "Onest",
                fontWeight: 400,
                letterSpacing: "0%",
                background: "#FF6200",
                color: "#FFFFFF",
              }}
              onClick={() => setContactFormOpen(true)}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = "#FF6200"
                }
              }}
              onMouseDown={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = "linear-gradient(93.96deg, #FF6200 -62.56%, #000000 61.87%)"
                }
              }}
              onMouseUp={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
                }
              }}
            >
              {t.buttonText}
            </button>

            <p
              className="text-white/80 text-center md:w-[272px] md:h-[40px] md:mt-[15px] opacity-60"
              style={{
                fontSize: "16px",
                lineHeight: "100%",
                fontWeight: 400,
                marginTop: "8px",
                color: theme === "light" ? "#000000" : "#FFFFFF",
              }}
            >
              {t.buttonDescription1}
              <br />
              {t.buttonDescription2}
            </p>
          </div>

          <div
            className="stats-section grid grid-cols-2 gap-6 w-full md:flex md:flex-row md:gap-12 md:justify-center items-center mt-16 md:mt-20"
            style={{
              maxWidth: "1116px",
              height: "auto",
              margin: "96px auto 0",
              padding: "0 16px",
            }}
          >
            <div className="flex flex-col stat-item text-center cursor-pointer">
              <span className="block font-bold stat-number" style={{ fontSize: "28px", lineHeight: "1.2" }}>
                50+
              </span>
              <span className="block stat-label" style={{ fontSize: "14px", marginTop: "4px" }}>
                {t.estimations}
              </span>
            </div>

            <div className="flex flex-col stat-item text-center cursor-pointer">
              <span className="block font-bold stat-number" style={{ fontSize: "28px", lineHeight: "1.2" }}>
                30+
              </span>
              <span className="block stat-label" style={{ fontSize: "14px", marginTop: "4px" }}>
                {t.totalProjects}
              </span>
            </div>

            <div className="flex flex-col stat-item text-center cursor-pointer">
              <span className="block font-bold stat-number" style={{ fontSize: "28px", lineHeight: "1.2" }}>
                20+
              </span>
              <span className="block stat-label" style={{ fontSize: "14px", marginTop: "4px" }}>
                {t.successfulClients}
              </span>
            </div>

            <div className="flex flex-col stat-item text-center cursor-pointer">
              <span className="block font-bold stat-number" style={{ fontSize: "28px", lineHeight: "1.2" }}>
                40+
              </span>
              <span className="block stat-label" style={{ fontSize: "14px", marginTop: "4px" }}>
                {t.professionals}
              </span>
            </div>
          </div>

          <style jsx>{`
            @media (max-width: 479px) {
              .hero-banner {
                height: auto !important;
                min-height: 100vh !important;
                max-height: none !important;
                overflow: visible !important;
                padding-bottom: 60px !important;
              }
              
              .hero-content {
                padding: 0 20px 0 !important;
                height: auto !important;
                min-height: auto !important;
              }
              
              .hero-title {
                margin-top: 200px !important;
                font-size: 36px !important;
                line-height: 110% !important;
                width: 100% !important;
                max-width: 100% !important;
                margin-left: auto !important;
                margin-right: auto !important;
                margin-bottom: 24px !important;
              }

              .stats-section {
                margin-top: 56px !important;
                gap: 16px !important;
                padding-left: 8px !important;
                padding-right: 8px !important;
              }

              .stats-section > div {
                width: 100% !important;
                justify-content: space-between !important;
                gap: 8px !important;
              }

              .stat-item {
                min-width: 0 !important;
                flex: 1 1 0 !important;
                justify-content: center !important;
              }

              .stat-label {
                padding-left: 4px !important;
                padding-right: 4px !important;
                font-size: 14px !important;
                text-align: left !important;
              }
            }
            
            @media (min-width: 480px) and (max-width: 767px) {
              .hero-banner {
                height: auto !important;
                min-height: 100vh !important;
                max-height: none !important;
                overflow: visible !important;
                padding-bottom: 60px !important;
              }
              
              .hero-content {
                padding: 0 28px 0 !important;
                height: auto !important;
                min-height: auto !important;
              }
              
              .hero-title {
                margin-top: 166px !important;
                font-size: 40px !important;
                line-height: 110% !important;
                width: 100% !important;
                max-width: 423px !important;
                margin-left: auto !important;
                margin-right: auto !important;
                margin-bottom: 24px !important;
              }

              .stats-section {
                margin-top: 64px !important;
                gap: 20px !important;
              }

              .stats-section > div {
                width: 100% !important;
                justify-content: space-between !important;
                gap: 16px !important;
              }

              .stat-item {
                min-width: 0 !important;
                flex: 1 1 0 !important;
                justify-content: center !important;
              }
            }

            @media (min-width: 768px) and (max-width: 1023px) {
              .hero-banner {
                min-height: 100vh !important;
              }
              
              .hero-content {
                padding: 0 40px !important;
              }
              
              .hero-title {
                margin-top: 180px !important;
                font-size: 52px !important;
              }
            }
            
            @media (min-width: 1024px) and (max-width: 1279px) {
              .hero-banner {
                min-height: 100vh !important;
              }
              
              .hero-title {
                margin-top: 140px !important;
                font-size: 56px !important;
              }
            }
            
            @media (min-width: 1280px) and (max-width: 1439px) {
              .hero-banner {
                max-height: 100vh !important;
              }
              
              .hero-title {
                margin-top: 120px !important;
                font-size: 60px !important;
              }
            }
            
            @media (min-width: 1440px) {
              .hero-banner {
                max-height: 100vh !important;
              }
              
              .hero-title {
                margin-top: 160px !important;
                font-size: 64px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Форма консультации */}
      <ConsultationModal
        isOpen={contactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />

      {/* Старый попап-калькулятор (оставлен на всякий случай) */}
      <RateCalculatorPopout
        isOpen={isPopoutOpen}
        onClose={() => setIsPopoutOpen(false)}
        onCalculateClick={handleCalculateClick}
      />

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>
  )
}
