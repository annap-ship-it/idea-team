"use client"

import { useTheme } from "@/lib/theme-context"
import { useLocale } from "@/lib/locale-context"
import { useState } from "react"

import LiquidEther from "./liquid-ether"
import ConsultationModal from "./consultation-modal"   // ← Новый модальный компонент
import CalculatorModal from "./calculator-modal"

export function HeroBanner() {
  const { theme } = useTheme()
  const { locale } = useLocale()

  const [contactFormOpen, setContactFormOpen] = useState(false)
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
    },
    uk: {
      mainTitle: "Перетворюємо вашу ідею на",
      mainTitleGradient: "технічне рішення",
      subtitle1: "Вам не потрібні кращі розробники.",
      subtitle2: "Вам потрібні правильні розробники у правильний час.",
      buttonText: "Тест-драйв розробника",
      buttonDescription1: "Отримайте 10 годин безкоштовної технічної експертизи.",
      buttonDescription2: "Перевірте відповідність з першого дня.",
    },
  }

  const t = content[locale]

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
              onClick={() => setContactFormOpen(true)}   // ← Открывает форму
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
        </div>
      </section>

      {/* Модальное окно с формой консультации */}
      <ConsultationModal
        isOpen={contactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />

      {/* Калькулятор (оставлен на случай) */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </>
  )
}
