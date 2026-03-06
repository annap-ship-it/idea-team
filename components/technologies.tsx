"use client"

import Image from "next/image"
import { useState } from "react"
import { useLocale } from "@/lib/locale-context"

const technologies = [
  { name: "Express", logo: "/images/express.svg", label: "Express" },
  { name: "Flutter", logo: "/images/flutter.svg", label: "Flutter" },
  { name: "React.js", logo: "/images/react.svg", label: "React.js" },
  { name: "Vue.js", logo: "/images/vue.svg", label: "Vue.js" },
  { name: "Nest.js", logo: "/images/nest.svg", label: "Nest.js" },
  { name: "Node.js", logo: "/images/node.svg", label: "Node.js" },
  { name: "GCP", logo: "/images/gcp.svg", label: "GCP" },
  { name: "AWS", logo: "/images/aws.svg", label: "AWS" },
  { name: "JS", logo: "/images/js.svg", label: "JS" },
]

const rows = [technologies.slice(0, 3), technologies.slice(3, 6), technologies.slice(6, 9)]

export function TechnologiesSection() {
  const [hovered, setHovered] = useState<string | null>(null)
  const { locale } = useLocale()

  const content = {
    en: {
      title: "Technologies",
      description:
        "Our technological proficiency gives us the opportunity to create strategic solutions that are both robust and scalable across all products.",
    },
    uk: {
      title: "Технології",
      description:
        "Наша технологічна компетентність дає нам можливість створювати стратегічні рішення, які є як надійними, так і масштабованими на всі продукти.",
    },
  }

  const t = content[locale as "en" | "uk"] || content.en

  return (
    <section className="py-16 px-4 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-start">
          {/* Текст слева */}
          <div className="space-y-6 max-w-sm lg:max-w-md xl:max-w-lg">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">{t.title}</h2>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80">{t.description}</p>
          </div>

          {/* Десктоп */}
          <div className="hidden lg:flex flex-col items-end gap-[22px]">
            <div className="flex gap-[22px]">
              {rows[0].map((tech) => (
                <TechCard key={tech.name} tech={tech} isHovered={hovered === tech.name} onHover={setHovered} />
              ))}
            </div>

            {/* Второй ряд сдвинут влево */}
            <div className="flex gap-[22px] mr-12 xl:mr-20">
              {rows[1].map((tech) => (
                <TechCard key={tech.name} tech={tech} isHovered={hovered === tech.name} onHover={setHovered} />
              ))}
            </div>

            <div className="flex gap-[22px]">
              {rows[2].map((tech) => (
                <TechCard key={tech.name} tech={tech} isHovered={hovered === tech.name} onHover={setHovered} />
              ))}
            </div>
          </div>

          {/* Мобильная */}
          <div className="lg:hidden grid grid-cols-3 gap-4 auto-rows-fr">
            {technologies.map((tech) => (
              <MobileTechCard key={tech.name} tech={tech} isHovered={hovered === tech.name} onHover={setHovered} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TechCard({
  tech,
  isHovered,
  onHover,
}: { tech: any; isHovered: boolean; onHover: (name: string | null) => void }) {
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark")

  return (
    <div
      onMouseEnter={() => onHover(tech.name)}
      onMouseLeave={() => onHover(null)}
      style={
        isHovered
          ? {
              background: `linear-gradient(180deg, ${isDark ? "#161515" : "#FAF9F8"} 0%, #FF6200 150%)`,
            }
          : undefined
      }
      className={`
        flex items-center gap-5 px-5 py-4 rounded-2xl
        w-[170px] h-[88px]
        transition-all duration-300 cursor-pointer
        bg-[var(--tech-card)]
        border border-[var(--tech-card-border)]
      `}
    >
      <div
        className="w-16 h-16 bg-white rounded-lg flex items-start justify-start flex-shrink-0"
        style={{ padding: "2px" }}
      >
        <Image
          src={tech.logo || "/placeholder.svg"}
          alt={tech.label}
          width={60}
          height={60}
          className="object-contain w-full h-full"
        />
      </div>
      <span className="text-base font-medium text-foreground">{tech.label}</span>
    </div>
  )
}

function MobileTechCard({
  tech,
  isHovered,
  onHover,
}: { tech: any; isHovered: boolean; onHover: (name: string | null) => void }) {
  return (
    <div
      onMouseEnter={() => onHover(tech.name)}
      onMouseLeave={() => onHover(null)}
      style={
        isHovered
          ? {
              background: `linear-gradient(180deg, ${document.documentElement.classList.contains("dark") ? "#161515" : "#FAF9F8"} 0%, #FF6200 150%)`,
            }
          : undefined
      }
      className={`
        flex flex-row items-center justify-center gap-2 py-4 rounded-2xl transition-all duration-300 cursor-pointer
        bg-[var(--tech-card)]
        border border-[var(--tech-card-border)]
        dark:hover:[background:linear-gradient(180deg,#161515_0%,#FF6200_150%)]
        hover:[background:linear-gradient(180deg,#FAF9F8_0%,#FF6200_150%)]
      `}
    >
      <div className="w-5 h-5 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
        <Image
          src={tech.logo || "/placeholder.svg"}
          alt={tech.label}
          width={48}
          height={48}
          className="object-contain w-10 h-10 sm:w-12 sm:h-12"
        />
      </div>
      <span className="text-sm font-semibold text-foreground px-2 text-center">{tech.label}</span>
    </div>
  )
}
