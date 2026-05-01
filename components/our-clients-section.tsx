"use client"

import { useTheme } from "@/lib/theme-context"

const clientLogos = [
  { name: "Viso", light: "/icons/tech/viso.svg", dark: "/icons/tech/viso.svg" },
  { name: "Sloboda Studio", light: "/icons/tech/sloboda-light.svg", dark: "/icons/tech/sloboda-dark.svg" },
  { name: "Beetroot", light: "/icons/tech/beetroot-light.svg", dark: "/icons/tech/beetroot-dark.svg" },
  { name: "ITSvit", light: "/icons/tech/ITSvit-light.svg", dark: "/icons/tech/ITSvit-dark.svg" },
  { name: "Appexoft", light: "/icons/tech/appexoft-light.svg", dark: "/icons/tech/appexoft-dark.svg" },
  { name: "Acropolium", light: "/icons/tech/acropolium-light.svg", dark: "/icons/tech/acropolium-dark.svg" },
  { name: "InAppo", light: "/icons/tech/inappo-light.svg", dark: "/icons/tech/inappo-dark.svg" },
  { name: "Talents Today", light: "/icons/tech/talents-today-light.svg", dark: "/icons/tech/talents-today-dark.svg" },
  { name: "1GameChanger", light: "/icons/tech/1gamechanger-light.svg", dark: "/icons/tech/1gamechanger-dark.svg" },
  { name: "Equinox", light: "/icons/tech/Equinox-light.svg", dark: "/icons/tech/Equinox-dark.svg" },
  { name: "ABTO Software", light: "/icons/tech/abto-software-light.svg", dark: "/icons/tech/abtosoftware-dark.svg" },
  { name: "Yotewo", light: "/icons/tech/yotewo-light.svg", dark: "/icons/tech/yotewo-dark.svg" },
  { name: "DreamX", light: "/icons/tech/dreamx-light.svg", dark: "/icons/tech/dreamx-dark.svg" },
  { name: "Grade", light: "/icons/tech/grade-light.svg", dark: "/icons/tech/grade-dark.svg" },
  { name: "Softengi", light: "/icons/tech/softengi-light.svg", dark: "/icons/tech/softengi-dark.svg" },
  { name: "Sonomics", light: "/icons/tech/son-light.svg", dark: "/icons/tech/son-dark.svg" },
  { name: "Powercode", light: "/icons/tech/powercode-light.svg", dark: "/icons/tech/powercode-dark.svg" },
  ]

export function OurClientsSection() {
  const { t, locale } = useLocale()
  const { theme } = useTheme()

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="rounded-[24px] border border-black/10 bg-card px-4 py-10 sm:px-8 md:px-12 md:py-14 dark:border-white/15">
          <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-primary md:text-base">
              {t.ourClientsEyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
              {t.ourClientsTitle}
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
              {locale === "uk"
                ? "Ми пишаємося тим, що працюємо з найкращими партнерами"
                : "We proud to work with the best partners"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clientLogos.map((client) => (
              <article
                key={client.name}
                className="flex min-h-24 items-center justify-center rounded-2xl border border-black/10 bg-background px-4 py-6 transition-colors duration-300 hover:border-primary/60 dark:border-white/15"
                aria-label={client.name}
              >
                <img
                  src={theme === "dark" ? client.dark : client.light}
                  alt={client.name}
                  className="h-9 w-auto max-w-[180px] object-contain md:h-10"
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
