"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useParams } from "next/navigation"
import { useLocale } from "@/lib/locale-context"

interface ProjectData {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  content: any
  created_at: string
  [key: string]: any
}

const translations = {
  en: {
    backToProjects: "Back to Projects",
    client: "Client",
    industry: "Industry",
    duration: "Duration",
    team: "Team",
    overview: "Overview",
    challenge: "Challenge",
    solution: "Solution",
    result: "Result",
    technologyStack: "Technology Stack",
    keyFeatures: "Key Features",
    projectGallery: "Project Gallery",
    similarProject: "Have a similar project in mind?",
    letsTalk: "Let's Talk",
  },
  uk: {
    backToProjects: "Назад до проектів",
    client: "Клієнт",
    industry: "Індустрія",
    duration: "Тривалість",
    team: "Команда",
    overview: "Огляд",
    challenge: "Проблема",
    solution: "Рішення",
    result: "Результат",
    technologyStack: "Стек технологій",
    keyFeatures: "Ключові функції",
    projectGallery: "Галерея проекту",
    similarProject: "Чи у вас є подібний проект на думці?",
    letsTalk: "Давайте поговоримо",
  },
}

// Default project data for fallback
const defaultProjectsData: Record<string, any> = {
  "waltair-robotics": {
    title: {
      en: "Waltair Robotics (Mobile App v4)",
      uk: "Waltair Robotics (Mobile App v4)",
    },
    featured_image: "/Waltair-Robotics-1.png",
    client: {
      en: "Waltair Robotics",
      uk: "Waltair Robotics",
    },
    industry: {
      en: "Fitness & Sports Technology",
      uk: "Фітнес та спортивні технології",
    },
    duration: {
      en: "3 months",
      uk: "3 місяці",
    },
    team: {
      en: "Mobile & Backend Team",
      uk: "Mobile та Backend команда",
    },

    overview: {
      en: `Waltair Robotics is a mobile application built for tennis coaches to remotely control a smart ball-feeding machine, record training sessions, and analyze performance through real-time statistics and charts.
 The app connects via Wi-Fi, synchronizing machine commands, shot data (hand used, speed, direction), and live video streams enabling coaches to deliver data-driven training experiences.
The project entered its final stage of active development. We focused on improving app stability, UI/UX consistency, and overall performance ahead of public release.`,
      uk: `Waltair Robotics — це мобільний застосунок, створений для тенісних тренерів, який дозволяє дистанційно керувати розумною машиною для подачі м’ячів, записувати тренування та аналізувати результати за допомогою статистики та графіків у реальному часі.
 Застосунок підключається через Wi-Fi, синхронізуючи команди машини, дані про удари (рука, швидкість, напрямок) та живі відеотрансляції, забезпечуючи тренерам можливість проводити тренування на основі даних.
Проєкт увійшов у фінальну фазу активної розробки. Ми зосередилися на покращенні стабільності, узгодженості UI/UX та загальної продуктивності перед публічним релізом.`,
    },

    challenge: {
      en: [
        "- Regressions in session timers, navigation flow, and video playback\n",
        "- Inconsistent UI behavior across iPhone, iPad, and Android (portrait & landscape)\n",
        "- Synchronization issues with socket events and time tracking\n",
        "- Monolithic code structure with large, hard-to-maintain components\n",
        "- Unstable third-party libraries causing freezes and performance issues\n",
        "- Lack of localization and limited data visualization",
      ],
      uk: [
        "- Регресії у таймерах сесій, навігації та відтворенні відео\n",
        "- Неконсистентна поведінка UI на iPhone, iPad та Android (портрет / альбом)\n",
        "- Проблеми синхронізації socket-подій і відстеження часу\n",
        "- Монолітна структура коду та великі компоненти, які важко підтримувати\n",
        "- Нестабільні сторонні бібліотеки, що викликали зависання та зниження продуктивності\n",
        "- Відсутність локалізації та обмежена візуалізація даних",
      ],
    },

    solution: {
      en: [
        "Stability & Error Handling Improvements\n",
        "Resolved synchronization issues with socket events and refined session time-tracking logic.\n",
        "Fixed UI layout inconsistencies across iOS and Android devices.\n",
        "Improved error handling and validation within key user flows such as Account Settings and Custom Programs.\n",
        "Feature Enhancements\n",
        "Integrated new APIs to enable seamless communication between the mobile app and the tennis ball machine.\n",
        "Rebuilt the Play Clips view for smoother video playback and improved responsiveness.\n",
        "Implemented internationalization (i18n) and localization support for multiple languages.\n",
        "Enhanced Session Details and Live Statistics screens with dynamic chart updates and real-time data visualization.\n",
        "Improved navigation logic and UI transitions in “Change Other Params” and “Create Option Wizard” flows.\n",
        "Updated buttons, modals, and form components to align with the latest design guidelines.\n",
        "Refactoring & Optimization\n",
        "Decomposed large files into smaller, reusable components for better scalability.\n",
        "Replaced unreliable third-party libraries with stable, custom-built solutions to prevent navigation freezes.\n",
        "Migrated form validation logic to react-hook-form + Zod, reducing boilerplate and improving code readability.\n",
        "Communication & Collaboration\n",
        "Close collaboration with the client’s backend and product management teams to clarify requirements and align functionality with user expectations.\n",
        "Early regression reporting and proactive proposal of alternative solutions during sprint reviews.\n",
      ],
      uk: [
        "Покращення стабільності та обробки помилок",
        "Вирішено проблеми синхронізації socket-подій та логіки відстеження часу сесій.",
        "Усунено розбіжності в UI на різних пристроях iOS та Android.",
        "Покращено обробку помилок і валідацію в ключових сценаріях (Налаштування акаунта, Користувацькі програми).",
        "Розширення функціоналу",
        "Інтегровано нові API для плавної взаємодії між застосунком і машиною для подачі м’ячів.",
        "Повністю перероблено екран Play Clips для більш плавного відеовідтворення.",
        "Реалізовано інтернаціоналізацію (i18n) та підтримку кількох мов.",
        "Покращено екрани Session Details та Live Statistics з динамічними графіками та даними в реальному часі.",
        "Оновлено навігацію та UI-переходи у потоках Change Other Params та Create Option Wizard.",
        "Оновлено кнопки, модальні вікна та форми згідно з новими дизайн-гайдами.",
        "Рефакторинг та оптимізація",
        "Розбито великі файли на малі, багаторазово використовувані компоненти.",
        "Замінено нестабільні сторонні бібліотеки на кастомні рішення для уникнення зависань.",
        "Перенесено валідацію форм на react-hook-form + Zod, зменшивши шаблонний код та покращивши читабельність.",
        "Комунікація та співпраця",
        "Тісна взаємодія з backend та product-командами замовника для уточнення вимог і узгодження функціоналу.",
        "Раннє виявлення регресій та проактивні пропозиції альтернативних рішень під час спринт-рев’ю.",
      ],
    },
    result: {
      en: `The updated Waltair Robotics Mobile App v4 now delivers a far more stable, intuitive, and scalable experience for tennis coaches.

With improved performance, a consistent user interface, and powerful analytics capabilities, the application is ready for extensive QA testing and final deployment.`,
      uk: `Оновлений Waltair Robotics Mobile App v4 тепер забезпечує набагато стабільніший, інтуїтивний та масштабований досвід для тенісних тренерів.

З покращеною продуктивністю, узгодженим інтерфейсом і потужною аналітикою застосунок готовий до фінального тестування та релізу.`,
    },

    stack: [
      "React Native",
      "Redux",
      "Python",
      "Socket.io",
      "react-hook-form",
      "Zod",
      "i18n",
    ],

    features: {
      en: [
        "Real-time machine control via Wi-Fi",
        "Live statistics and charts",
        "Video playback (Play Clips)",
        "Session tracking and analytics",
        "Multi-language support",
        "Improved navigation and UI flows",
      ],
      uk: [
        "Керування машиною в реальному часі через Wi-Fi",
        "Статистика та графіки в реальному часі",
        "Відео (Play Clips)",
        "Аналітика тренувань",
        "Підтримка кількох мов",
        "Покращена навігація",
      ],
    },

    gallery: ["/Waltair-Robotics-2.jpg", "/Waltair-Robotics-3.jpg", "/Waltair-Robotics 4.jpg"],

    testimonial: {
      quote: "We turned to the Idea Team to expand the team for our client's project. From the first contact, their structured approach and expertise were clear. The team quickly immersed themselves, offered innovative solutions, ensured transparent communication and on-time delivery. The final product exceeded the end client's expectations in functionality and usability.",
      author: "Artem Malyi",
      company: "IT Svit",
    },
  },
  // ... other projects unchanged (omitted here for brevity)
}

export default function ProjectPage() {
  const params = useParams()
  const { locale } = useLocale()
  const t = translations[locale as "en" | "uk"] || translations.en
  const supabase = createBrowserClient()

  const [project, setProject] = useState<ProjectData | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    setIsDark(theme === "dark")
  }, [])

  useEffect(() => {
    async function fetchProject() {
      const slug = (params as any)?.slug as string

      if (!slug) {
        // fallback to first project if slug missing
        const firstKey = Object.keys(defaultProjectsData)[0]
        setProject(defaultProjectsData[firstKey])
        return
      }

      try {
        const { data } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .single()

        if (data) {
          setProject(data)
        } else {
          setProject(defaultProjectsData[slug] || null)
        }
      } catch (err) {
        setProject(defaultProjectsData[slug] || null)
      }
    }

    fetchProject()
  }, [params])

  if (!project) return null

  const getLocalizedText = (value: any) => {
    if (!value) return ""
    if (typeof value === "string") return value
    if (typeof value === "object") {
      return value[locale] ?? value.en ?? ""
    }
    return String(value)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/projects" className="flex items-center gap-2 text-sm mb-6">
        <ArrowLeft size={16} />
        {t.backToProjects}
      </Link>

      <h1 className="text-3xl font-bold mb-4">
        {getLocalizedText(project.title)}
      </h1>

      {project.featured_image && (
        <Image
          src={project.featured_image}
          alt={typeof project.title === "object" ? project.title.en : String(project.title)}
          width={1200}
          height={600}
          className="rounded-lg mb-10"
        />
      )}

      {/* INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {["client", "industry", "duration", "team"].map((key) => (
          <div key={key}>
            <p className="text-sm opacity-70">{(t as any)[key]}</p>
            <p className="font-medium">{getLocalizedText(project[key])}</p>
          </div>
        ))}
      </div>

      {/* OVERVIEW */}
      {project.overview && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">{t.overview}</h2>
          <p className="opacity-80 whitespace-pre-line">
            {getLocalizedText(project.overview)}
          </p>
        </section>
      )}

      {/* CHALLENGE */}
      {project.challenge && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">{t.challenge}</h2>

          {/*
            Only change: render a list when the data for the current locale is an array
            or when challenge itself is an array. Otherwise keep original paragraph rendering.
            This preserves layout, margins and design while showing items as a list.
          */}
          {project.challenge && typeof project.challenge === "object" && Array.isArray(project.challenge[locale]) ? (
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              {project.challenge[locale].map((item: string, i: number) => (
                <li key={i}>{String(item).replace(/^- /, "").trim()}</li>
              ))}
            </ul>
          ) : Array.isArray(project.challenge) ? (
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              {project.challenge.map((item: any, i: number) => (
                <li key={i}>{String(item).replace(/^- /, "").trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="opacity-80 whitespace-pre-line">
              {getLocalizedText(project.challenge)}
            </p>
          )}
        </section>
      )}

      {/* SOLUTION */}
      {project.solution && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">{t.solution}</h2>

          {project.solution && typeof project.solution === "object" && Array.isArray(project.solution[locale]) ? (
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              {project.solution[locale].map((item: string, i: number) => (
                <li key={i}>{String(item).replace(/^- /, "").trim()}</li>
              ))}
            </ul>
          ) : Array.isArray(project.solution) ? (
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              {project.solution.map((item: any, i: number) => (
                <li key={i}>{String(item).replace(/^- /, "").trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="opacity-80 whitespace-pre-line">
              {getLocalizedText(project.solution)}
            </p>
          )}
        </section>
      )}

      {/* RESULT */}
      {project.result && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">{t.result}</h2>
          <p className="opacity-80 whitespace-pre-line">
            {getLocalizedText(project.result)}
          </p>
        </section>
      )}

      {/* STACK */}
      {project.stack && Array.isArray(project.stack) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">{t.technologyStack}</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* FEATURES */}
      {project.features && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">{t.keyFeatures}</h2>
          {Array.isArray(project.features) ? (
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              {project.features.map((f: any, i: number) => (
                <li key={i}>{getLocalizedText(f)}</li>
              ))}
            </ul>
          ) : project.features && typeof project.features === "object" && Array.isArray(project.features[locale]) ? (
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              {project.features[locale].map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          ) : (
            <p className="opacity-80 whitespace-pre-line">
              {getLocalizedText(project.features)}
            </p>
          )}
        </section>
      )}

      {/* GALLERY */}
      {project.gallery && Array.isArray(project.gallery) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">{t.projectGallery}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.gallery.map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                alt="Gallery image"
                width={400}
                height={300}
                className="rounded-lg"
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="text-center py-10">
        <h3 className="text-2xl font-bold mb-4">{t.similarProject}</h3>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-[#FF6200] text-white rounded-lg text-lg"
        >
          {t.letsTalk}
        </Link>
      </section>
    </div>
  )
}
