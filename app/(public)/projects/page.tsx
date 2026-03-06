"use client"

import type React from "react"
import { useLocale } from "@/lib/locale-context"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"
import { getRecaptchaSiteKey } from "@/app/actions/recaptcha"
import { ProjectsOverlappingSection } from "@/components/projects-overlapping-section"

interface Project {
  id: string
  title: string | { en: string; uk: string }
  slug: string
  excerpt: string
  featured_image: string
  content: any
  created_at: string
  challenge: string | { en: string; uk: string }
  solution: string | { en: string; uk: string }
  result: string | { en: string; uk: string }
  stack: string[]
}

// Extract project data from content blocks
function extractProjectData(content: any) {
  const data = {
    challenge: "",
    solution: "",
    result: "",
    stack: [] as string[],
  }

  if (!content || !Array.isArray(content)) return data

  content.forEach((block: any) => {
    if (block.type === "paragraph" || block.type === "heading") {
      const text = block.content || ""
      if (text.toLowerCase().startsWith("challenge:")) {
        data.challenge = text.replace(/^challenge:\s*/i, "")
      } else if (text.toLowerCase().startsWith("solution:")) {
        data.solution = text.replace(/^solution:\s*/i, "")
      } else if (text.toLowerCase().startsWith("result:")) {
        data.result = text.replace(/^result:\s*/i, "")
      } else if (text.toLowerCase().startsWith("stack:")) {
        data.stack = text
          .replace(/^stack:\s*/i, "")
          .split(",")
          .map((s: string) => s.trim())
      }
    }
  })

  // Try to extract from metafields if available
  if (content.metafields) {
    if (content.metafields.challenge) data.challenge = content.metafields.challenge
    if (content.metafields.solution) data.solution = content.metafields.solution
    if (content.metafields.result) data.result = content.metafields.result
    if (content.metafields.stack) data.stack = content.metafields.stack.split(",").map((s: string) => s.trim())
  }

  return data
}

// Default projects for display when no posts exist
const defaultProjects = [
  {
    id: "1",
    title: {
      en: "Internal Monitoring System for Symbotic",
      uk: "Система внутрішнього моніторингу для Symbotic",
    },
    slug: "internal-monitoring-system-symbotic",
    featured_image: "/images/3a8ceacf9a599490d7b40d1ec06dca37f1ea0d31.jpg",
    challenge: {
      en: "Develop a scalable internal monitoring tool with real-time data updates.",
      uk: "Розробка масштабованого внутрішнього інструменту моніторингу з оновленням даних у реальному часі.",
    },
    solution: {
      en: "Designed full architecture, implemented GraphQL APIs, and built the admin frontend using Vue.js and Vuex. Integrated Web Push notifications and Apollo Client for real-time updates.",
      uk: "Проектування архітектури, реалізація GraphQL API, фронтенд адмінки на Vue.js/Vuex, інтеграція Web Push та Apollo Client для live-оновлень.",
    },
    result: {
      en: "Efficient, scalable monitoring system with live data delivery.",
      uk: "Ефективна та масштабована система моніторингу з доставкою даних у реальному часі.",
    },
    stack: ["Vue.js", "GraphQL", "MongoDB", "Node.js", "Apollo Client"],
  },
  {
    id: "2",
    title: {
      en: "Intertop Sensor Infobox",
      uk: "Intertop Sensor Infobox",
    },
    slug: "intertop-sensor-infobox",
    featured_image: "/images/a4b670ec7fa05f0d5a4c674af059268a7f9bb862.jpg",
    challenge: {
      en: "Provide real-time product availability across online and offline channels.",
      uk: "Надати актуальну інформацію про наявність товарів онлайн та офлайн.",
    },
    solution: {
      en: "Developed an interactive in-store sensor infobox using Node.js, integrated with offline 1C and MSSQL databases to sync inventory data seamlessly.",
      uk: "Розробка інтерактивного сенсорного інфобоксу, інтеграція з офлайн 1C та MSSQL для синхронізації запасів.",
    },
    result: {
      en: "Improved customer experience with accurate, up-to-date product information in-store.",
      uk: "Покращений клієнтський досвід завдяки точній інформації про товари в магазині.",
    },
    stack: ["Node.js", "PHP", "MySQL", "MSSQL", "jQuery", "Backbone"],
  },
  {
    id: "3",
    title: {
      en: "Multi-brand E-commerce Landing Pages",
      uk: "Багатобрендові лендинги електронної комерції",
    },
    slug: "multi-brand-ecommerce-landing-pages",
    featured_image: "/images/684e917a1465786de030e274e2232ff33cd056fe.png",
    challenge: {
      en: "Create high-performance, SEO-friendly landing pages for major tech brands.",
      uk: "Створення високопродуктивних SEO-оптимізованих лендингів для великих технічних брендів.",
    },
    solution: {
      en: "Developed multiple SPA landing pages (Lenovo, Samsung, Nokia, Panasonic) focusing on SEO, responsive design, and cross-browser compatibility. Optimized performance for high-traffic campaigns.",
      uk: "Розробка SPA лендингів (Lenovo, Samsung, Nokia, Panasonic) з акцентом на SEO, адаптивний дизайн та кросбраузерність. Оптимізація продуктивності для високого трафіку.",
    },
    result: {
      en: "Enhanced user engagement and increased visibility for marketing efforts.",
      uk: "Підвищена взаємодія користувачів та видимість маркетингових кампаній.",
    },
    stack: ["HTML", "CSS", "RequireJS", "Grunt", "jQuery", "Backbone"],
  },
  {
    id: "4",
    title: {
      en: "Testing Expertise for a Sports Social Platform",
      uk: "Тестування експертизи для спортивної соціальної платформи",
    },
    slug: "testing-expertise-sports-social-platform",
    featured_image: "/images/56951b6f749b0c1c24e1b24aab787192b5cc65e2.jpg",
    challenge: {
      en: "Ensure high product quality and stability during rapid development of an NBA-focused sports social platform.",
      uk: "Забезпечити високу якість продукту та стабільність при швидкій розробці соцплатформи для NBA.",
    },
    solution: {
      en: "Provided manual QA support covering 170+ tickets, tested new and existing features, identified critical bugs, collaborated with developers, and recommended Android devices.",
      uk: "Ручне QA-покриття понад 170 задач, тестування нових та існуючих функцій, виявлення критичних багів, співпраця з розробниками, рекомендації Android-пристроїв.",
    },
    result: {
      en: "Improved release stability, higher product quality, and smoother QA processes.",
      uk: "Підвищена стабільність релізів, краща якість продукту, оптимізація QA-процесів.",
    },
    stack: ["Manual Testing", "Team Collaboration Tools"],
  },
]

const techIcons: Record<string, string> = {
  HTML: "/icons/tech/html.svg",
  CSS: "/icons/tech/css.svg",
  RequireJS: "/icons/tech/requirejs.svg",
  Grunt: "/icons/tech/grunt.svg",
  jQuery: "/icons/tech/jquery.svg",
  Backbone: "/icons/tech/backbone.svg",
  "Vue.js": "/icons/tech/vuejs.svg",
  GraphQL: "/icons/tech/graphql.svg",
  MongoDB: "/icons/tech/mongodb.svg",
  "Node.js": "/icons/tech/nodejs.svg",
  "Apollo Client": "/icons/tech/apollo.svg",
  PHP: "/icons/tech/php.svg",
  MySQL: "/icons/tech/mysql.svg",
  MSSQL: "/icons/tech/mssql.svg",
  Vue: "/icons/tech/vuejs.svg",
  Node: "/icons/tech/nodejs.svg",
  NodeJS: "/icons/tech/nodejs.svg",
  Apollo: "/icons/tech/apollo.svg",
  Mongo: "/icons/tech/mongodb.svg",
}

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  )
}

export default function ProjectsPage() {
  const { locale } = useLocale()

  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const [siteKey, setSiteKey] = useState<string>("")

  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        const key = await getRecaptchaSiteKey()
        setSiteKey(key)
      } catch (error) {
        console.error("[v0] Failed to fetch reCAPTCHA site key:", error)
      }
    }
    fetchSiteKey()
  }, [])

  useEffect(() => {
    // Check theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  // ⚠️ IMPORTANT: Scroll to top on page load - DO NOT REMOVE
  // This ensures pages open from header, not footer, as per design requirements
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [locale])

  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [siteKey])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createBrowserClient()

        // Get projects category ID
        const { data: category } = await supabase.from("categories").select("id").eq("slug", "projects").single()

        if (category) {
          const { data: posts } = await supabase
            .from("posts")
            .select("*")
            .eq("category_id", category.id)
            .eq("status", "published")
            .order("created_at", { ascending: false })

          if (posts && posts.length > 0) {
            const mappedProjects = posts.map((post) => {
              const projectData = extractProjectData(post.content)
              return {
                id: post.id,
                title: post.title,
                slug: post.slug,
                featured_image: post.featured_image || "/project-management-team.png",
                ...projectData,
              }
            })
            setProjects(mappedProjects)
          } else {
            setProjects(defaultProjects)
          }
        } else {
          setProjects(defaultProjects)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setProjects(defaultProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleFileAttach = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".doc,.docx,.pdf,.ppt,.pptx,.jpg,.jpeg,.png"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file && file.size <= 3 * 1024 * 1024) {
        setAttachedFile(file)
      } else {
        alert(t.fileSizeError)
      }
    }
    input.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      alert(t.termsRequiredAlert)
      return
    }

    setIsSubmitting(true)

    try {
      // Generate reCAPTCHA token using v3
      if (!window.grecaptcha) {
        alert("reCAPTCHA is not loaded. Please refresh the page.")
        return
      }

      const recaptchaToken = await window.grecaptcha.execute(siteKey, {
        action: "submit"
      })

      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("subject", "Project Consultation Request")
      formDataToSend.append("recaptchaToken", recaptchaToken)
      if (attachedFile) {
        formDataToSend.append("file", attachedFile)
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const translations = {
    en: {
      title: "Projects",
      subtitle: "Find out how we have turned our clients' inspiring ideas into high-end products",
      consultationTitle: "Request Free Consultation",
      processTitle: "What's the process?",
      processStep1: "Our specialist will reach out after reviewing your message",
      processStep2: "If needed we'll sign an NDA to ensure trust, after what you provide us with the project details",
      processStep3: "You'll receive a detailed proposal including estimates, timelines, and expert profiles",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      attachLabel: "Attach File (optional)",
      termsLabel: "I agree to the",
      submitButton: "Send Request",
      successMessage: "Thank you! We'll be in touch soon.",
      errorMessage: "Error submitting form. Please try again.",
      challengeLabel: "Challenge:",
      solutionLabel: "Solution:",
      resultLabel: "Result:",
      stackLabel: "Stack:",
      fileSizeError: "File must be less than 3MB",
      termsRequiredAlert: "Please accept Terms and Conditions",
      recaptchaRequiredAlert: "Please complete the reCAPTCHA",
      receivedMessage: "We've received your message and will get back to you soon.",
      fileAttachInfo: "No more than 3 files may be attached up to 3MB each. Formats: doc, docx, pdf, ppt, pptx.",
      sendingButton: "Sending...",
      termsAndConditions: "Terms and Conditions",
      emailDisclaimer:
        "By submitting your email, you accept terms and conditions. We may send you occasionally marketing emails.",
    },
    uk: {
      title: "Проекти",
      subtitle: "Дізнайтеся, як ми перетворили натхненні ідеї наших клієнтів на високоякісні продукти",
      consultationTitle: "Запитати безкоштовну консультацію",
      processTitle: "Як це працює?",
      processStep1: "Наш фахівець зв'яжеться з вами після розгляду вашого повідомлення",
      processStep2: "Якщо потрібно ми підпишемо NDA щоб забезпечити довіру, після чого деталі проекту",
      processStep3: "Ви отримаєте детальну пропозицію з оцінкою, таймлайном та експертним профайлом",
      nameLabel: "Ваше ім'я",
      emailLabel: "Ваша електронна пошта",
      messageLabel: "Ваше повідомлення",
      attachLabel: "Додати файл (опціонально)",
      termsLabel: "Я згоден з",
      submitButton: "Надіслати запит",
      successMessage: "Дякуємо! Ми скоро з вами зв'яжемося.",
      errorMessage: "Помилка при відправленні форми. Спробуйте ще раз.",
      challengeLabel: "Завдання:",
      solutionLabel: "Рішення:",
      resultLabel: "Результат:",
      stackLabel: "Стек:",
      fileSizeError: "Файл повинен бути менше за 3 МБ",
      termsRequiredAlert: "Будь ласка, прийміть Умови та положення",
      recaptchaRequiredAlert: "Будь ласка, завершіть reCAPTCHA",
      receivedMessage: "Ми отримали ваше повідомлення і скоро з вами зв'яжемося.",
      fileAttachInfo: "Можна додати не більше 3 файлів розміром до 3 МБ кожен. Формати: doc, docx, pdf, ppt, pptx.",
      sendingButton: "Надсилання...",
      termsAndConditions: "Умовами та положеннями",
      emailDisclaimer:
        "Надсилаючи свою електронну пошту, ви приймаєте умови та положення. Ми можемо периодично надсилати вам маркетингові листи.",
    },
  }

  const t = translations[locale as keyof typeof translations] || translations.en

  const titleGradient = isDark
    ? "linear-gradient(90.39deg, #FF6200 34.5%, #FFFFFF 66.76%)"
    : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6200]"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Header Section */}
      <section className="pt-20 pb-10 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <AnimatedCard>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-24 pb-2"
              style={{
                backgroundImage: titleGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "1.2",
              }}
            >
              {typeof t.title === "string" ? t.title : t.title[locale]}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </AnimatedCard>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-10 px-6">
        <div className="max-w-[1280px] mx-auto space-y-8">
          {projects.map((project, index) => {
            const isReverse = index % 2 === 1

            return (
              <AnimatedCard key={project.id} delay={index * 100}>
                <Link href={`/projects/${project.slug}`} className="block group">
                  <div
                    className="rounded-[14px] overflow-hidden transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: isDark
                        ? isReverse
                          ? "linear-gradient(70.46deg, #212121 57.09%, #FF6200 125.28%)"
                          : "linear-gradient(292.61deg, #212121 56.12%, #FF6200 111.19%)"
                        : isReverse
                          ? "linear-gradient(73.52deg, #FAF9F8 33.1%, #FFFFFF 75.27%, #FF6200 120.85%)"
                          : "linear-gradient(283.85deg, #FAF9F8 45%, #FFFFFF 77.04%, #FF6200 110.33%)",
                      boxShadow: isDark ? "none" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 ${isReverse ? "lg:flex-row-reverse" : ""}`}
                    >
                      {/* Image */}
                      <div className={`${isReverse ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="relative w-full aspect-[16/10] rounded-[14px] overflow-hidden">
                          <Image
                            src={project.featured_image || "/placeholder.svg"}
                            alt={typeof project.title === "string" ? project.title : project.title[locale]}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`${isReverse ? "lg:order-1" : "lg:order-2"} flex flex-col justify-center`}>
                        <h2
                          className="text-xl md:text-2xl font-bold mb-4"
                          style={{ color: isDark ? "#FFFFFF" : "#000000" }}
                        >
                          {typeof project.title === "string" ? project.title : project.title[locale]}
                        </h2>

                        <div className="space-y-3 text-sm">
                          {typeof project.challenge === "string" ? (
                            <div className="flex gap-3">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">{t.challengeLabel}</span>
                              <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.challenge}</span>
                            </div>
                          ) : (
                            <div className="flex gap-3">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">{t.challengeLabel}</span>
                              <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.challenge[locale]}</span>
                            </div>
                          )}
                          {typeof project.solution === "string" ? (
                            <div className="flex gap-3">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">{t.solutionLabel}</span>
                              <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.solution}</span>
                            </div>
                          ) : (
                            <div className="flex gap-3">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">{t.solutionLabel}</span>
                              <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.solution[locale]}</span>
                            </div>
                          )}
                          {typeof project.result === "string" ? (
                            <div className="flex gap-3">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">{t.resultLabel}</span>
                              <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.result}</span>
                            </div>
                          ) : (
                            <div className="flex gap-3">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">{t.resultLabel}</span>
                              <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.result[locale]}</span>
                            </div>
                          )}

                          {/* Stack */}
                          {project.stack && project.stack.length > 0 && (
                            <div className="flex gap-3 items-start pt-2">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">{t.stackLabel}</span>
                              <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech: string, i: number) => {
                                  const iconPath = techIcons[tech]
                                  return (
                                    <span
                                      key={i}
                                      className="px-3 py-1.5 rounded-[4px] text-xs font-medium flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                                      style={{
                                        backgroundColor: isDark ? "#323130" : "#FFFFFF",
                                        color: isDark ? "#FFFFFF" : "#000000",
                                        border: isDark ? "none" : "1px solid #E0E0E0",
                                      }}
                                    >
                                      {iconPath && (
                                        <span
                                          className="flex items-center justify-center rounded-[2px] flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                          style={{
                                            backgroundColor: "#FFFFFF",
                                            padding: "2px",
                                            width: "20px",
                                            height: "20px",
                                          }}
                                        >
                                          <Image
                                            src={iconPath || "/placeholder.svg"}
                                            alt={tech}
                                            width={16}
                                            height={16}
                                          />
                                        </span>
                                      )}
                                      {tech}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedCard>
            )
          })}
        </div>
      </section>

      {/* Request Free Consultation Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedCard>
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={{ color: isDark ? "#FFFFFF" : "#000000" }}
            >
              {t.consultationTitle}
            </h2>
          </AnimatedCard>

          {/* Process Steps */}
          <AnimatedCard delay={100}>
            <div className="rounded-[4px] p-6 md:p-8 lg:p-12 mb-12" style={{ backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5" }}>
            <div className="text-center md:text-left mb-10">
                  <h3
                    className="font-semibold mb-2 md:mb-4 text-xl"
                    style={{
                      color: isDark ? "#FFFFFF" : "#000000",
                      fontFamily: "Onest, sans-serif",
                      fontWeight: 400,
                      lineHeight: "100%",
                      letterSpacing: "-2%"
                    }}
                  >
                    {t.processTitle}
                  </h3>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <div className="flex items-start gap-3 md:gap-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <path d="M9 9L13.5 12L18 9" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 13.5H5" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 10.5H5" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 7.5V7C5 5.89543 5.89543 5 7 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H7C5.89543 19 5 18.1046 5 17V16.5" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p
                    className="leading-none text-xl"
                    style={{
                      color: isDark ? "#FFFFFF" : "#000000",
                      fontFamily: "Onest, sans-serif",
                      fontWeight: 400,
                      lineHeight: "100%",
                      letterSpacing: "-2%"
                    }}
                  >
                    {t.processStep1}
                  </p>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 10H16M8 6H12M8 14H11" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.3056 17.1133L17.2147 15.1856C17.3314 14.9381 17.6686 14.9381 17.7853 15.1856L18.6944 17.1133L20.7275 17.4243C20.9884 17.4642 21.0923 17.7998 20.9035 17.9923L19.4326 19.4917L19.7797 21.61C19.8243 21.882 19.5515 22.0895 19.3181 21.961L17.5 20.9603L15.6819 21.961C15.4485 22.0895 15.1757 21.882 15.2203 21.61L15.5674 19.4917L14.0965 17.9923C13.9077 17.7998 14.0116 17.4642 14.2725 17.4243L16.3056 17.1133Z" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p
                    className="leading-none text-xl"
                    style={{
                      color: isDark ? "#FFFFFF" : "#000000",
                      fontFamily: "Onest, sans-serif",
                      fontWeight: 400,
                      lineHeight: "100%",
                      letterSpacing: "-2%"
                    }}
                  >
                    {t.processStep2}
                  </p>
                </div>
                <div className="flex items-start gap-3 md:gap-4 ">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <path d="M8 12L11 15L16 10" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p
                    className="leading-none text-xl"
                    style={{
                      color: isDark ? "#FFFFFF" : "#000000",
                      fontFamily: "Onest, sans-serif",
                      fontWeight: 400,
                      lineHeight: "100%",
                      letterSpacing: "-2%"
                    }}
                  >
                    {t.processStep3}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8">
                <div></div>
              </div>
            </div>
          </AnimatedCard>

          {/* Contact Form Section */}
          <AnimatedCard delay={200}>
            {isSubmitted ? (
              <div className="text-center py-12">
                <p className="text-lg" style={{ color: isDark ? "#FFFFFF" : "#000000" }}>
                  {t.successMessage || t.receivedMessage}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder={t.nameLabel}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className={`w-full px-4 py-3 rounded-[4px] border-b-2 outline-none transition-colors ${
                        formData.name ? "focus:border-[#bC9A8F]" : "focus:border-white"
                      }`}
                      style={{
                        backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={t.emailLabel}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={`w-full px-4 py-3 rounded-[4px] border-b-2 outline-none transition-colors ${
                        formData.email ? "focus:border-[#bC9A8F]" : "focus:border-white"
                      }`}
                      style={{
                        backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder={t.messageLabel}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className={`w-full px-4 py-3 rounded-[4px] border-b-2 outline-none transition-colors ${
                        formData.message ? "focus:border-[#bC9A8F]" : "focus:border-white"
                      }`}
                      style={{
                        backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }}
                    />
                  </div>

                  {/* Attach File */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleFileAttach}
                      className="flex items-center gap-2 px-4 py-2 rounded-[4px] border transition-colors hover:border-[#FF6200] active:bg-[#666666] active:text-white"
                      style={{
                        borderColor: isDark ? "#3A3A3A" : "#E0E0E0",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }} 
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6200" strokeWidth="2">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                      </svg>
                      {t.attachLabel}
                    </button>
                    <span className="text-xs" style={{ color: isDark ? "#666666" : "#999999" }}>
                      {t.fileAttachInfo}
                    </span>
                  </div>

                  {attachedFile && (
                    <div className="flex items-center gap-2 text-sm " style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                      <span>{attachedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                        relative overflow-hidden
                        flex items-center justify-center gap-[10px]
                        text-[16px] font-medium leading-[1]
                        text-white
                        transition duration-300 ease-out
                        disabled:cursor-not-allowed disabled:opacity-50
                        bg-[#FF6200] rounded-[50px]
                        hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000]
                        active:bg-gradient-to-br active:from-[#FF6200] active:to-[#000000]
                        active:scale-[0.98]
                      `}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = "#FF6200"
                      }
                    }}
                    onMouseDown={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = "linear-gradient(93.96deg, #FF6200 -62.56%, #000000 61.87%)"
                      }
                    }}
                    onMouseUp={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
                      }
                    }}
                    style={{
                      width: "264px",
                      height: "40px",
                      padding: "4px 14px",
                      fontFamily: "Onest",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t.sending || "Sending..."}
                      </>
                    ) : (
                      t.send || "Send"
                    )}
                  </button>

                  {/* Terms */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms-projects"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 accent-[#f66001]"
                    />
                    <label
                      htmlFor="terms-projects"
                      className="text-sm"
                      style={{ color: isDark ? "#A0A0A0" : "#666666" }}
                    >
                      {t.termsLabel}{" "}
                      <Link href="/terms" className="text-[#FF6200] underline">
                        {t.termsAndConditions}
                      </Link>
                      .
                      <br />
                      <span className="text-xs">{t.emailDisclaimer}</span>
                    </label>
                  </div>

                  {/* reCAPTCHA widget */}
                  <div
                    ref={recaptchaRef}
                    className="g-recaptcha"
                    data-sitekey="6LcKsjksAAAAAGoEUPaQnULL3xDPUW5c_bLP5EjT"
                  />
                </form>

                {/* Image */}
                <div className="relative w-full aspect-[4/3] rounded-[4px] overflow-hidden">
                  <Image
                    src="/images/903416dfea2ecdd32e83cc85f6e0cee9b2d4fb63.jpg"
                    alt="Our workspace"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </AnimatedCard>
        </div>
      </section>
    </main>
  )
}
