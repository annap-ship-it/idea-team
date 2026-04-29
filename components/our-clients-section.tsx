"use client"

import { useLocale } from "@/lib/locale-context"

const partnerNames = [
  "Viso",
  "Sloboda Studio",
  "Beetroot",
  "IT Svit",
  "Appexoft",
  "Acropolium",
  "InAppo",
  "Talents Today",
  "1GameChanger",
  "Equinox",
  "Abto Software",
  "Yotewo",
  "DreamX",
  "Grade",
  "Sonomics",
  "Powercode",
]

export function OurClientsSection() {
  const { t } = useLocale()

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="rounded-[24px] border border-black/10 bg-card px-4 py-10 sm:px-8 md:px-12 md:py-14 dark:border-white/15">
          <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary md:text-sm">
              {t.ourClientsEyebrow}
            </p>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              <span className="bg-gradient-to-r from-[#FF6200] to-foreground bg-clip-text text-transparent">
                {t.ourClientsTitle}
              </span>
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-20 rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB36B]" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerNames.map((name) => (
              <article
                key={name}
                className="flex min-h-24 items-center justify-center rounded-2xl border border-black/10 bg-background px-4 py-6 transition-colors duration-300 hover:border-primary/60 dark:border-white/15"
                aria-label={name}
              >
                <span className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{name}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
