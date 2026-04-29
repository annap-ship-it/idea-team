import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    const targetLocale = searchParams.get("locale") === "uk" ? "uk" : "en"
    // Get projects category ID
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", "projects")
      .single()

    if (categoryError || !category) {
      throw new Error("Projects category not found")
    }

    // Get published projects
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, featured_image, content, created_at")
      .eq("category_id", category.id)
      .eq("status", "published")
      .eq("locale", targetLocale)
      .order("created_at", { ascending: false })

    if (postsError) {
      throw new Error(postsError.message)
    }

    // If no projects found, use default projects
    const defaultProjects = [
      {
        id: "1",
        title: {
          en: "Internal Monitoring System for Symbotic",
          uk: "Система внутрішнього моніторингу для Symbotic",
        },
        slug: "internal-monitoring-system-symbotic",
        image: "/images/3a8ceacf9a599490d7b40d1ec06dca37f1ea0d31.jpg",
        shortDescription: {
          en: "Implemented solution to enhance user engagement and increase visibility for marketing efforts.",
          uk: "Реалізованого рішення для підвищення залученості користувачів та видимості при маркетингових зусиллях.",
        },
      },
      {
        id: "2",
        title: {
          en: "Intertop Sensor Infobox",
          uk: "Інформаційна панель датчиків Intertop",
        },
        slug: "intertop-sensor-infobox",
        image: "/images/a4b670ec7fa05f0d5a4c674af059268a7f9bb862.jpg",
        shortDescription: {
          en: "Improved customer experience with accurate, up-to-date product information in-store.",
          uk: "Поліпшена взаємодія з клієнтами завдяки точній та актуальній інформації про товари в магазині.",
        },
      },
      {
        id: "3",
        title: {
          en: "Multi-brand E-commerce Landing Pages",
          uk: "Багатобрендові сторінки e-commerce",
        },
        slug: "multi-brand-ecommerce-landing-pages",
        image: "/images/684e917a1465786de030e274e2232ff33cd056fe.png",
        shortDescription: {
          en: "Enhanced user engagement and increased visibility for marketing efforts.",
          uk: "Посилена залученість користувачів та збільшена видимість при маркетингових зусиллях.",
        },
      },
      {
        id: "6",
        title: {
          en: "AR Earring Virtual Try-On (Unity / Face Tracking)",
          uk: "AR примірка сережок (Unity / Face Tracking)",
        },
        slug: "ar-earring-virtual-try-on",
        image: "/1600x400_Earring_Collection_1.webp",
        shortDescription: {
          en: "Markerless AR earring try-on with realistic movement and stable face tracking.",
          uk: "Markerless AR-примірка сережок із реалістичним рухом та стабільним face tracking.",
        },
      },
      {
        id: "4",
        title: {
          en: "Waltair Robotics (Mobile App v4)",
          uk: "Waltair Robotics (Mobile App v4)",
        },
        slug: "waltair-robotics",
        image: "/Waltair-Robotics-1.png",
        shortDescription: {
          en: "Mobile version was stabilized and improved. Fixed regressions in session timers, navigation flow, and video playback, as well as inconsistent UI behavior across devices and orientations. Resolved socket synchronization issues, improved overall code maintainability by reducing monolithic structure, and addressed instability caused by third-party libraries. Added proper localization support and enhanced data visualization capabilities.",
          uk: "Виправлена мобільна версія, яка мала низку проблем, що впливали на зручність використання та підтримку, зокрема регресії в таймерах сесій, навігації та відтворенні відео, а також нестабільну поведінку інтерфейсу на різних пристроях і в різних орієнтаціях. Додатково виникали проблеми із синхронізацією socket-подій, монолітною та складною для підтримки структурою коду й нестабільністю сторонніх бібліотек. Крім того, бракувало підтримки локалізації та можливостей для візуалізації даних.",
        },
      },
           {
        id: "5",
        title: {
          en: "Testing Expertise for a Sports Social Platform",
          uk: "Тестування експертизи для спортивної соціальної платформи",
        },
        slug: "testing-expertise-sports-social-platform",
        image: "/images/56951b6f749b0c1c24e1b24aab787192b5cc65e2.jpg",
        shortDescription: {
          en: "Improved release stability, higher product quality, and smoother QA processes.",
          uk: "Підвищена стабільність релізів, вища якість продукту та плавніші процеси QA.",
        },
      },
      {
        id: "7",
        title: {
          en: "DevOps for Yotewo",
          uk: "DevOps для Yotewo",
        },
        slug: "devops-for-yotewo",
        image: "/yotewo-blog.png",
        shortDescription: {
          en: "Built end-to-end DevOps infrastructure across AWS and Azure with automated CI/CD, secure networking, cost controls, and scalable delivery.",
          uk: "Побудовано end-to-end DevOps-інфраструктуру на AWS та Azure з автоматизованим CI/CD, secure networking, контролем витрат і готовністю до масштабування.",
        },
      },
    ]

    // Map posts to the format needed for Our Projects section
    const mappedPosts =
      posts && posts.length > 0
        ? posts.map((post) => ({
            id: post.id,
            title: {
              en: post.title,
              uk: post.title, // Database posts use same title - add UK translations in admin if needed
            },
            slug: post.slug,
            image: post.featured_image || "/placeholder.svg",
            shortDescription: {
              en: post.excerpt || "Explore our recent client work",
              uk: post.excerpt || "Вивчайте нашу недавню роботу з клієнтами",
            },
          }))
        : []

    const fallbackOnly = defaultProjects.filter((fallbackProject) => !mappedPosts.some((post) => post.slug === fallbackProject.slug))
    const projects = mappedPosts.length > 0 ? [...mappedPosts, ...fallbackOnly] : defaultProjects
    const uniqueProjects = projects.filter((project, index, array) => index === array.findIndex((item) => item.slug === project.slug))

    return NextResponse.json(uniqueProjects)
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    // Return default projects on error - these have proper { en, uk } structure
    const defaultProjects = [
      {
        id: "1",
        title: {
          en: "Internal Monitoring System for Symbotic",
          uk: "Система внутрішнього моніторингу для Symbotic",
        },
        slug: "internal-monitoring-system-symbotic",
        image: "/images/3a8ceacf9a599490d7b40d1ec06dca37f1ea0d31.jpg",
        shortDescription: {
          en: "Implemented solution to enhance user engagement and increase visibility for marketing efforts.",
          uk: "Реалізованого рішення для підвищення залученості користувачів та видимості при маркетингових зусиллях.",
        },
      },
      {
        id: "2",
        title: {
          en: "Intertop Sensor Infobox",
          uk: "Інформаційна панель датчиків Intertop",
        },
        slug: "intertop-sensor-infobox",
        image: "/images/a4b670ec7fa05f0d5a4c674af059268a7f9bb862.jpg",
        shortDescription: {
          en: "Improved customer experience with accurate, up-to-date product information in-store.",
          uk: "Поліпшена взаємодія з клієнтами завдяки точній та актуальній інформації про товари в магазині.",
        },
      },
      {
        id: "3",
        title: {
          en: "Multi-brand E-commerce Landing Pages",
          uk: "Багатобрендові сторінки e-commerce",
        },
        slug: "multi-brand-ecommerce-landing-pages",
        image: "/images/684e917a1465786de030e274e2232ff33cd056fe.png",
        shortDescription: {
          en: "Enhanced user engagement and increased visibility for marketing efforts.",
          uk: "Посилена залученість користувачів та збільшена видимість при маркетингових зусиллях.",
        },
      },
      {
        id: "6",
        title: {
          en: "AR Earring Virtual Try-On (Unity / Face Tracking)",
          uk: "AR примірка сережок (Unity / Face Tracking)",
        },
        slug: "ar-earring-virtual-try-on",
        image: "/1600x400_Earring_Collection_1.webp",
        shortDescription: {
          en: "Markerless AR earring try-on with realistic movement and stable face tracking.",
          uk: "Markerless AR-примірка сережок із реалістичним рухом та стабільним face tracking.",
        },
      },
      {
        id: "4",
        title: {
          en: "Waltair Robotics (Mobile App v4)",
          uk: "Waltair Robotics (Mobile App v4)",
        },
        slug: "waltair-robotics",
        image: "/Waltair-Robotics-1.png",
        shortDescription: {
          en: "Mobile version was stabilized and improved. Fixed regressions in session timers, navigation flow, and video playback, as well as inconsistent UI behavior across devices and orientations. Resolved socket synchronization issues, improved overall code maintainability by reducing monolithic structure, and addressed instability caused by third-party libraries. Added proper localization support and enhanced data visualization capabilities.",
          uk: "Виправлена мобільна версія, яка мала низку проблем, що впливали на зручність використання та підтримку, зокрема регресії в таймерах сесій, навігації та відтворенні відео, а також нестабільну поведінку інтерфейсу на різних пристроях і в різних орієнтаціях. Додатково виникали проблеми із синхронізацією socket-подій, монолітною та складною для підтримки структурою коду й нестабільністю сторонніх бібліотек. Крім того, бракувало підтримки локалізації та можливостей для візуалізації даних.",
        },
      },
      {
        id: "5",
        title: {
          en: "Testing Expertise for a Sports Social Platform",
          uk: "Тестування експертизи для спортивної соціальної платформи",
        },
        slug: "testing-expertise-sports-social-platform",
        image: "/images/56951b6f749b0c1c24e1b24aab787192b5cc65e2.jpg",
        shortDescription: {
          en: "Improved release stability, higher product quality, and smoother QA processes.",
          uk: "Підвищена стабільність релізів, вища якість продукту та плавніші процеси QA.",
        },
      },
    ]
    return NextResponse.json(defaultProjects)
  }
}
