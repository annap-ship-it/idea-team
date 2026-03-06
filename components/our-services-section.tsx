"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useLocale } from "@/lib/locale-context"

interface Service {
  id: string
  titleEn: string
  titleUk: string
  icon: React.ReactNode
  image: string
  link: string
  imagePosition: { row: string; col: string }
}

const services: Service[] = [
  {
    id: "custom-web",
    titleEn: "Custom web solutions",
    titleUk: "Спеціалізовані веб-рішення",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.5 8.5L21 12L17.5 15.5"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 8.5L3 12L6.5 15.5"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13.5 6L10 18.5" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    image: "/images/2204c945d90f1a3407139dd94b7ebcaa4ba9cadb.jpg",
    link: "/services/custom-web",
    imagePosition: { row: "1", col: "3" },
  },
  {
    id: "ux-ui-design",
    titleEn: "UX/UI and Graphic Design",
    titleUk: "UX/UI та графічний дизайн",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.99805 20.501H18.9982"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.498 5V19.002"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.9984 19.002H19V22.0004H21.9984V19.002Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.9984 2H2V4.9984H4.9984V2Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 4.99805V19"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.9984 19H2V21.9984H4.9984V19Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.9961 15.002L7.99609 8.00195L14.9961 11.002L11.9981 12.0009L10.9961 15.002Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 12.002L14.998 15.002L12 12.002Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.99805 3.50098H18.9982"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.9984 2.00195H19V5.00035H21.9984V2.00195Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeMiterlimit="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: "/images/213432fc8fbf61b5ea543d6c172ebac71c9a9a20.jpg",
    link: "/services/ux-ui-design",
    imagePosition: { row: "1", col: "3 / 5" },
  },
  {
    id: "mobile-apps",
    titleEn: "Mobile Applications",
    titleUk: "Мобільні застосунки",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 19.01L12.01 18.9989"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 18V21.4C18 21.7314 17.7314 22 17.4 22H6.6C6.26863 22 6 21.7314 6 21.4V18"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15.5 8.5L19 12L15.5 15.5"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 8.5L5 12L8.5 15.5"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 6V2.6C18 2.26863 17.7314 2 17.4 2H6.6C6.26863 2 6 2.26863 6 2.6V6"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    image: "/images/ac4a09720223d67a185bfba73f852b33a006b2ab.jpg",
    link: "/services/mobile-apps",
    imagePosition: { row: "1", col: "4 / 6" },
  },
  {
    id: "qa-automation",
    titleEn: "Manual and Automation QA",
    titleUk: "Ручне тестування та автоматизація QA",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V15"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M16 20L18 22L22 18" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 7L22 7" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M11 5.01L11.01 4.99889"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 5.01L8.01 4.99889"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 5.01L5.01 4.99889"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: "/images/3a8ceacf9a599490d7b40d1ec06dca37f1ea0d31.jpg",
    link: "/services/qa-automation",
    imagePosition: { row: "2", col: "1" },
  },
  {
    id: "devops",
    titleEn: "DevOps",
    titleUk: "DevOps",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 3"
        />
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
          stroke="#FF6200"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: "/images/b06cb8ec9ff2a325546732d42fb1b3b01127a90b.jpg",
    link: "/services/devops",
    imagePosition: { row: "1 / 3", col: "4" },
  },
  {
    id: "data-analytics",
    titleEn: "Data Analytics",
    titleUk: "Аналітика даних",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 21H15M9 21V16M9 21H3.6C3.26863 21 3 20.7314 3 20.4V16.6C3 16.2686 3.26863 16 3.6 16H9M15 21V9M15 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H15.6C15.2686 3 15 3.26863 15 3.6V9M15 9H9.6C9.26863 9 9 9.26863 9 9.6V16"
          stroke="#FF6200"
          strokeWidth="1.5"
        />
      </svg>
    ),
    image: "/images/a0ec971489a8dee7cdfcd858853644d722e28dc9.jpg",
    link: "/services/data-analytics",
    imagePosition: { row: "2", col: "6" },
  },
]

export function OurServicesSection() {
  const { locale } = useLocale()
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)

  const content = {
    en: {
      title: "Our Services",
      description:
        "Our team provides end-to-end expertise to help you design, build, and optimize digital products that drive real impact. Learn more about what we can do for your business and how we work",
      readMore: "Read more",
    },
    uk: {
      title: "Наші послуги",
      description:
        "Наша команда надає комплексну експертизу, щоб допомогти вам розробити, побудувати та оптимізувати цифрові продукти, які приносять реальний результат. Дізнайтеся більше про те, що ми можемо зробити для вашого бізнесу і як ми працюємо",
      readMore: "Читати далі",
    },
  }

  const currentContent = content[locale as keyof typeof content] || content.en

  useEffect(() => {
    const html = document.documentElement
    const checkDark = () => setIsDark(html.classList.contains("dark"))

    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(html, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  const mobileBackground = isDark
    ? { background: "linear-gradient(180deg, #161515 0%, #212121 50.6%)" }
    : { background: "linear-gradient(180deg, #FFFFFF 0%, #FAF9F8 97.02%)" }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">{currentContent.title}</h2>
        <p className="text-base md:text-lg text-center text-foreground/80 max-w-4xl mx-auto mb-16 leading-relaxed">
          {currentContent.description}
        </p>

        {/* Mobile version */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="group h-[180px] md:h-[200px] rounded-2xl p-6 flex flex-col justify-between border border-border border-gray-200 dark:border-[#4E4037] hover:border-primary/60 dark:hover:border-primary/60 transition-all"
              style={mobileBackground}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="text-primary w-8 h-8">{service.icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground leading-tight">
                  {locale === "uk" ? service.titleUk : service.titleEn}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60 active:text-orange-500">
                  <span>{currentContent.readMore}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Desktop version */}
        <div className="hidden lg:grid grid-cols-6 grid-rows-2 gap-4">
          {services.map((service) => {
            const baseStyle: React.CSSProperties = {
              gridColumn:
                service.id === "custom-web"
                  ? "1"
                  : service.id === "ux-ui-design"
                    ? "2"
                    : service.id === "mobile-apps"
                      ? "6"
                      : service.id === "qa-automation"
                        ? "2"
                        : service.id === "devops"
                          ? "3"
                          : service.id === "data-analytics"
                            ? "5"
                            : "1",
              gridRow:
                service.id === "qa-automation" || service.id === "devops" || service.id === "data-analytics"
                  ? "2"
                  : "1",
            }

            const backgroundStyle = isDark
              ? { background: "linear-gradient(180deg, #161515 0%, #212121 50.6%)" }
              : { background: "linear-gradient(180deg, #FFFFFF 0%, #FAF9F8 97.02%)" }

            return (
              <a
                key={service.id}
                href={service.link}
                className="group rounded-2xl p-6 flex flex-col justify-between border border-border dark:border-[#4E4037] hover:border-primary/60 dark:hover:border-primary/60 transition-all"
                style={{ ...baseStyle, ...backgroundStyle }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="text-primary w-8 h-8">{service.icon}</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground leading-tight">
                    {locale === "uk" ? service.titleUk : service.titleEn}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-foreground/60 active:text-orange-500">
                    <span>{currentContent.readMore}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            )
          })}

          {/* Hover images */}
          {hoveredService &&
            (() => {
              const service = services.find((s) => s.id === hoveredService)
              if (!service) return null

              const { row, col } = service.imagePosition

              return (
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl z-10 pointer-events-none relative"
                  style={{
                    gridColumn: col,
                    gridRow: row,
                  }}
                >
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={locale === "uk" ? service.titleUk : service.titleEn}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0vw, 400px"
                  />
                </div>
              )
            })()}
        </div>
      </div>
    </section>
  )
}
