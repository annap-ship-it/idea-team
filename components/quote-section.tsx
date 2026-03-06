"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"

// --- Иконки с fill="currentColor" ---
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none" // Changed to none because this icon uses strokes
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Border */}
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="currentColor"/>

      {/* The Dot of the 'i' */}
      <path d="M7 12.0101L7.01 11.999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* The 'n' and 'i' body */}
      <path d="M11 16V12.75M11 9V12.75M11 12.75C11 9 17 9 17 12.75V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* The stem of the 'i' */}
      <path d="M7 16V12.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="currentColor"/>
      <path d="M19 7L4 12.5L9.52632 13.2333M19 7L17.0263 18L9.52632 13.2333M19 7L9.52632 13.2333M9.52632 13.2333V17.2667L12.0912 14.8634" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  )
}

// --- Соцсети блок ---
function SocialLinks() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
      <Link
        href="https://www.linkedin.com/in/oleksandr-romanov-ideateam/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3 rounded-full border border-foreground/20 dark:border-foreground/50 hover:border-foreground text-foreground dark:text-foreground/60 transition-colors"
      >
        <LinkedInIcon className="w-6 h-6" />
        <span>LinkedIn</span>
      </Link>

      <Link
        href="https://t.me/OleksandrRomanov777"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3 rounded-full border border-foreground/20 dark:border-foreground/50 hover:border-foreground text-foreground dark:text-foreground/60 transition-colors"
      >
        <TelegramIcon className="w-6 h-6" />
        <span>Telegram</span>
      </Link>
    </div>
  )
}

// --- Основной компонент ---
export function QuoteSection() {
  const { locale } = useLocale()

  const content = {
    en: {
      quote:
        "When I started Idea Team, it was more than only about technology, it also was about giving ideas a chance to grow. And I began by giving my own idea that chance. I've seen how the right people, with expertise and persistence, can transform potential into impact. That's why I brought together specialists who don't just execute but challenge and propose, closing the loop by turning our main goal into our mission and positioning Idea Team exists to support ideas in their technical implementation.\n\nWe may not claim to be the key to success, but we strive to be the partner that helps unlock it",
      name: "Oleksandr Romanov",
      title1: "CEO at Idea Team",
      title2: "CEO & Founder, Devea Team",
      buttonText: "Schedule a Call",
    },
    uk: {
      quote:
        "Коли я починав Idea Team, це було більше ніж просто про технологію, це також було про надання ідеям шансу розвиватися. Я почав з того, що дав шанс своїй ідеї. Я бачив, як правильні люди, з експертизою та наполегливістю, можуть трансформувати потенціал в вплив. Саме тому я зібрав фахівців, які не просто виконують, а й кидають виклик та пропонують рішення, замикаючи цикл, перетворюючи нашу головну мету в нашу місію і позиціонуючи Idea Team як помічника в технічній реалізації ідей.\n\nМи не можемо претендувати на те, що ми ключ до успіху, але ми прагнемо бути партнером, який допомагає його розпочаткувати",
      name: "Олександр Романов",
      title1: "CEO компанії Idea Team",
      title2: "CEO та засновник Devea Team",
      buttonText: "Записатися на розмову",
    },
  }

  const t = content[locale as "en" | "uk"] || content.en

  return (
    <section className="py-16 px-4 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Фото */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative rounded-3xl overflow-hidden w-full max-w-md aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/40 via-transparent to-transparent z-0" />
              <Image src="/images/oleksandr-romanov.svg" alt={t.name} fill className="object-cover relative z-10" />
            </div>
          </div>

          {/* Цитата */}
          <div className="order-1 lg:order-2 space-y-2">
            <div className="flex flex-col items-start mb-0">
              <img
                src="/quote.svg"
                alt="quote"
                className="w-16 md:w-10"
              />
              <div className="h-10 md:h-10" /> {/* 40px spacer */}
            </div>

            <blockquote className="mb-[30px] font-['Onest'] font-medium text-[20px] leading-none tracking-[0%] text-foreground whitespace-pre-line">
              {t.quote}
            </blockquote>

            {/* Подпись */}
            <div className="space-y-1">
              <p className="mb-[10px] font-onest font-medium text-[16px] leading-none tracking-[0%] text-foreground">
                {t.name}
              </p>
              <p className="font-onest font-normal text-[14px] leading-[110%] tracking-[0%] text-foreground/60">
                {t.title1}
              </p>
            </div>

            {/* Соцсети */}
            <SocialLinks />

            {/* Кнопка */}
            <Link
              href="https://calendar.app.google/sySAYTvgF8Zi264U7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                type="button"
                className="relative overflow-hidden flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full font-[Onest] font-normal text-base leading-[100%] text-white transition duration-300 ease-out bg-[#FF6200] cursor-pointer pt-4 mt-10"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FF6200";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.background = "linear-gradient(93.96deg, #FF6200 -62.56%, #000000 61.87%)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)";
                }}
              >
                {t.buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
