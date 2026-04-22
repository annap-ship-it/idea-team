"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useParams } from "next/navigation"
import { useLocale } from "@/lib/locale-context"

interface ProjectData {
  id?: string
  title: { en: string; uk?: string } | string
  slug?: string
  excerpt?: string
  featured_image?: string
  content?: any
  created_at?: string
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
        "Stability & Error Handling Improvements",
        "Resolved synchronization issues with socket events and refined session time-tracking logic.",
        "Fixed UI layout inconsistencies across iOS and Android devices.",
        "Improved error handling and validation within key user flows such as Account Settings and Custom Programs.",
        "Feature Enhancements",
        "Integrated new APIs to enable seamless communication between the mobile app and the tennis ball machine.",
        "Rebuilt the Play Clips view for smoother video playback and improved responsiveness.",
        "Implemented internationalization (i18n) and localization support for multiple languages.",
        "Enhanced Session Details and Live Statistics screens with dynamic chart updates and real-time data visualization.",
        "Improved navigation logic and UI transitions in “Change Other Params” and “Create Option Wizard” flows.",
        "Updated buttons, modals, and form components to align with the latest design guidelines.",
        "Refactoring & Optimization",
        "Decomposed large files into smaller, reusable components for better scalability.",
        "Replaced unreliable third-party libraries with stable, custom-built solutions to prevent navigation freezes.",
        "Migrated form validation logic to react-hook-form + Zod, reducing boilerplate and improving code readability.",
        "Communication & Collaboration",
        "Close collaboration with the client’s backend and product management teams to clarify requirements and align functionality with user expectations.",
        "Early regression reporting and proactive proposal of alternative solutions during sprint reviews.",
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
  "internal-monitoring-system-symbotic": {
    title: {
      en: "Internal Monitoring System for Symbotic",
      uk: "Система внутрішнього моніторингу для Symbotic",
    },
    featured_image: "/monitoring-dashboard-with-graphs-and-data-visualiz.jpg",
    client: {
      en: "Symbotic",
      uk: "Symbotic",
    },
    industry: {
      en: "Robotics & Automation",
      uk: "Робототехніка та автоматизація",
    },
    duration: {
      en: "6 months",
      uk: "6 місяців",
    },
    team: {
      en: "4 developers, 1 designer, 1 QA",
      uk: "4 розробники, 1 дизайнер, 1 QA",
    },
    overview: {
      en: "Symbotic needed a scalable internal monitoring tool to track their robotic systems in real-time. The challenge was to create a system that could handle massive amounts of data while providing instant insights to operators.",
      uk: "Symbotic потребувала масштабованого внутрішнього інструменту моніторингу для відстеження їх робототехнічних систем у реальному часі. Завдання було створити систему, яка може обробляти величезні обсяги даних, надаючи миттєвий аналіз операторам.",
    },
    challenge: {
      en: "Develop a scalable internal monitoring tool with real-time data updates for tracking robotic warehouse systems. The system needed to handle thousands of data points per second while maintaining a responsive user interface.",
      uk: "Розробка масштабованого внутрішнього інструменту моніторингу з live-оновленням даних для відстеження робототехнічних систем складу. Система мала обробляти тисячі точок даних за секунду зберігаючи оперативний інтерфейс користувача.",
    },
    solution: {
      en: "We designed full architecture from scratch, implemented GraphQL APIs for efficient data fetching, and built the admin frontend using Vue.js and Vuex for state management. Integrated Web Push notifications for critical alerts and Apollo Client for real-time data subscriptions.",
      uk: "Ми спроектували повну архітектуру з нуля, реалізували GraphQL API для ефективного отримання даних та розробили адмін-фронтенд з Vue.js та Vuex для управління станом. Інтегрували Web Push-сповіщення для критичних сигналів та Apollo Client для підписки на live-дані.",
    },
    result: {
      en: "Delivered an efficient, scalable monitoring system with live data delivery. The system now handles 10,000+ data points per second with sub-100ms latency. Operator response time to critical events improved by 60%.",
      uk: "Дощенко масштабовану систему моніторингу з live-доставкою даних. Система тепер обробляє 10 000+ точок даних за секунду з затримкою менше 100 мс. Час реакції оператора на критичні события покращився на 60%.",
    },
    stack: ["Vue.js", "GraphQL", "MongoDB", "Node.js", "Apollo Client", "Redis", "Docker"],
    features: {
      en: [
        "Real-time dashboard with live data updates",
        "Custom alert system with Web Push notifications",
        "Historical data analysis and reporting",
        "Role-based access control",
        "Mobile-responsive design",
      ],
      uk: [
        "Панель керування в реальному часі з live-оновленнями даних",
        "Спеціалізована система сигналів з Web Push-сповіщеннями",
        "Аналіз історичних даних та звітування",
        "Контроль доступу за ролями",
        "Адаптивний мобільний дизайн",
      ],
    },
    gallery: ["/dashboard-overview-screen.jpg", "/analytics-charts-and-graphs.jpg", "/alert-management-interface.jpg"],
    testimonial: {
      quote: "Excellent work on the monitoring system!",
      author: "John Doe",
      company: "Symbotic",
    },
  },
  "intertop-sensor-infobox": {
    title: {
      en: "Intertop Sensor Infobox",
      uk: "Intertop Sensor Infobox",
    },
    featured_image: "/retail-store-sensor-display-system.jpg",
    client: {
      en: "Intertop",
      uk: "Intertop",
    },
    industry: {
      en: "Retail",
      uk: "Роздріб",
    },
    duration: {
      en: "4 months",
      uk: "4 місяці",
    },
    team: {
      en: "3 developers, 1 QA",
      uk: "3 розробники, 1 QA",
    },
    overview: {
      en: "Intertop, a major retail chain, needed a solution to bridge online and offline inventory data, providing customers with real-time product availability information in-store.",
      uk: "Intertop, великий роздрібний ланцюг, потребував рішення для об'єднання даних інвентарю онлайн та офлайн, надаючи клієнтам інформацію про доступність товарів у реальному часі у магазині.",
    },
    challenge: {
      en: "Provide real-time product availability across online and offline channels. The solution needed to integrate with legacy 1C and MSSQL databases while maintaining data consistency.",
      uk: "Надати актуальну інформацію про наявність товарів онлайн та офлайн. Рішення мало інтегруватися зі спадковими системами 1C та MSSQL, збереживши узгодженість даних.",
    },
    solution: {
      en: "Developed an interactive in-store sensor infobox using Node.js that syncs inventory data from offline 1C and MSSQL databases in real-time. Created a user-friendly touch interface for customers.",
      uk: "Розробка інтерактивного сенсорного інфобоксу з Node.js, що синхронізує дані запасів з офлайн-баз даних 1C та MSSQL у реальному часі. Створили зручний сенсорний інтерфейс для клієнтів.",
    },
    result: {
      en: "Improved customer experience with accurate, up-to-date product information in-store. Customer satisfaction scores increased by 35%, and store staff inquiries about stock reduced by 50%.",
      uk: "Покращений клієнтський досвід завдяки точній інформації про товари в магазині. Оцінки задоволеності клієнтів зросли на 35%, запити персоналу про наявність товарів зменшилися на 50%.",
    },
    stack: ["PHP", "MySQL", "Node.js", "MSSQL", "jQuery", "Backbone", "1C Integration"],
    features: {
      en: [
        "Touch-screen interface for customers",
        "Real-time inventory synchronization",
        "Integration with 1C ERP system",
        "Offline mode support",
        "Admin panel for content management",
      ],
      uk: [
        "Сенсорний екран для клієнтів",
        "Синхронізація запасів у реальному часі",
        "Інтеграція з системою 1C ERP",
        "Підтримка офлайн-режиму",
        "Адмін-панель для управління контентом",
      ],
    },
    gallery: ["/retail-kiosk-interface.jpg", "/product-information-display.jpg", "/inventory-management-dashboard.png"],
    testimonial: {
      quote: "Great job on the sensor infobox!",
      author: "Jane Smith",
      company: "Intertop",
    },
  },
  "multi-brand-ecommerce-landing-pages": {
    title: {
      en: "Multi-brand E-commerce Landing Pages",
      uk: "Багатобрендові лендинги електронної комерції",
    },
    featured_image: "/ecommerce-landing-page-design-multiple-brands.jpg",
    client: {
      en: "Multiple Tech Brands",
      uk: "Декілька технічних брендів",
    },
    industry: {
      en: "E-commerce",
      uk: "Електронна комерція",
    },
    duration: {
      en: "8 months",
      uk: "8 місяців",
    },
    team: {
      en: "5 developers, 2 designers",
      uk: "5 розробників, 2 дизайнери",
    },
    overview: {
      en: "Major tech brands including Lenovo, Samsung, Nokia, and Panasonic needed high-performance landing pages for their marketing campaigns.",
      uk: "Великі технічні бренди, включаючи Lenovo, Samsung, Nokia та Panasonic, потребували високопродуктивних лендингів для своїх маркетингових кампаній.",
    },
    challenge: {
      en: "Create high-performance, SEO-friendly landing pages for major tech brands. Each brand required unique design while maintaining consistent performance standards.",
      uk: "Створення високопродуктивних SEO-оптимізованих лендингів для великих технічних брендів. Кожен бренд вимагав унікального дизайну при збереженні однакових стандартів продуктивності.",
    },
    solution: {
      en: "Developed multiple SPA landing pages focusing on SEO, responsive design, and cross-browser compatibility. Optimized performance for high-traffic campaigns using code splitting and lazy loading.",
      uk: "Розробка SPA лендингів з акцентом на SEO, адаптивний дизайн та кросбраузерність. Оптимізація продуктивності для високого трафіку з використанням розділення коду та ледачого завантаження.",
    },
    result: {
      en: "Enhanced user engagement and increased visibility for marketing efforts. Page load times reduced to under 2 seconds. Conversion rates improved by 25% across all brands.",
      uk: "Підвищена взаємодія користувачів та видимість маркетингових кампаній. Час завантаження сторінок скорочено до 2 секунд. Показники конверсії покращилися на 25% у всіх брендів.",
    },
    stack: ["HTML5", "CSS3", "RequireJS", "Grunt", "jQuery", "Backbone", "SASS"],
    features: {
      en: [
        "SEO-optimized page structure",
        "Responsive design for all devices",
        "Cross-browser compatibility",
        "A/B testing integration",
        "Analytics tracking",
      ],
      uk: [
        "SEO-оптимізована структура сторінки",
        "Адаптивний дизайн для всіх пристроїв",
        "Сумісність з усіма браузерами",
        "Інтеграція A/B-тестування",
        "Відстеження аналітики",
      ],
    },
    gallery: ["/lenovo-landing-page-design.jpg", "/samsung-product-showcase.jpg", "/mobile-responsive-design.png"],
    testimonial: {
      quote: "Impressive landing pages for the tech brands!",
      author: "Mike Johnson",
      company: "Tech Brands Inc.",
    },
  },
  "statistics-platform": {
    title: {
      en: "Statistics Platform",
      uk: "Платформа статистики",
    },
    featured_image: "/platform-dashboard-analytics.jpg",
    client: {
      en: "Sports Analytics Client",
      uk: "Клієнт спортивної аналітики",
    },
    industry: {
      en: "Sports Analytics",
      uk: "Спортивна аналітика",
    },
    duration: {
      en: "6 months",
      uk: "6 місяців",
    },
    team: {
      en: "4 developers, 1 designer",
      uk: "4 розробники, 1 дизайнер",
    },
    overview: {
      en: "A comprehensive sports statistics platform for tracking and analyzing athlete performance metrics.",
      uk: "Комплексна платформа спортивної статистики для відстеження та аналізу метрик продуктивності спортсменів.",
    },
    challenge: {
      en: "Create a scalable platform for processing massive amounts of sports data in real-time.",
      uk: "Створити масштабовану платформу для обробки великих обсягів спортивних даних у реальному часі.",
    },
    solution: {
      en: "Developed a real-time analytics engine with interactive dashboards for coaches and analysts.",
      uk: "Розроблено engine реал-тайм аналітики з інтерактивними панелями керування для тренерів та аналітиків.",
    },
    result: {
      en: "Enabled coaches to make data-driven decisions with instant insights into athlete performance.",
      uk: "Дозволено тренерам приймати рішення на основі даних з миттєвими аналізами продуктивності спортсменів.",
    },
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "Chart.js", "WebSocket"],
    features: {
      en: [
        "Real-time analytics dashboard",
        "Athlete performance tracking",
        "Data visualization and reporting",
        "Team management system",
        "Mobile app integration",
      ],
      uk: [
        "Панель керування реал-тайм аналітики",
        "Відстеження продуктивності спортсменів",
        "Візуалізація даних та звітування",
        "Система управління командою",
        "Інтеграція мобільного додатка",
      ],
    },
    gallery: ["/analytics-dashboard.jpg", "/performance-charts.jpg", "/athlete-tracking.jpg"],
    testimonial: {
      quote: "Excellent analytics platform for our team!",
      author: "Coach Smith",
      company: "Sports Team",
    },
  },
  "ecommerce-platform": {
    title: {
      en: "High-performance eCommerce Platform",
      uk: "Високопродуктивна платформа електронної комерції",
    },
    featured_image: "/ecommerce-storefront-checkout.jpg",
    client: {
      en: "E-commerce Client",
      uk: "Клієнт електронної комерції",
    },
    industry: {
      en: "E-commerce",
      uk: "Електронна комерція",
    },
    duration: {
      en: "7 months",
      uk: "7 місяців",
    },
    team: {
      en: "6 developers, 2 designers",
      uk: "6 розробників, 2 дизайнери",
    },
    overview: {
      en: "Built a feature-rich e-commerce platform capable of handling millions of transactions with high performance.",
      uk: "Побудована багатофункціональна платформа електронної комерції, здатна обробляти мільйони транзакцій з високою продуктивністю.",
    },
    challenge: {
      en: "Create a scalable, performant e-commerce platform that handles high traffic and transaction volume.",
      uk: "Створити масштабовану, продуктивну платформу електронної комерції, яка обробляє високий трафік та обсяг транзакцій.",
    },
    solution: {
      en: "Implemented microservices architecture with advanced caching and database optimization strategies.",
      uk: "Впроваджено архітектуру мікросервісів з передовими стратегіями кеширування та оптимізації бази даних.",
    },
    result: {
      en: "Achieved sub-second page load times and processed over 10,000 concurrent users without performance degradation.",
      uk: "Досягнуто часу завантаження сторінки менше секунди та обробки понад 10 000 одночасних користувачів без деградації продуктивності.",
    },
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe API", "Elasticsearch"],
    features: {
      en: [
        "Advanced product search with filters",
        "Secure payment processing",
        "Inventory management system",
        "Customer analytics and recommendations",
        "Admin dashboard",
      ],
      uk: [
        "Розширений пошук товарів з фільтрами",
        "Безпечна обробка платежів",
        "Система управління запасами",
        "Аналітика клієнтів та рекомендації",
        "Адмін-панель",
      ],
    },
    gallery: ["/product-listing.jpg", "/shopping-cart.jpg", "/order-tracking.jpg"],
    testimonial: {
      quote: "Outstanding e-commerce platform performance!",
      author: "Store Owner",
      company: "E-commerce Business",
    },
  },
  "testing-expertise-sports-social-platform": {
    title: {
      en: "Testing Expertise for a Sports Social Platform",
      uk: "Тестування експертизи для спортивної соціальної платформи",
    },
    featured_image: "/sports-social-media-platform-testing-qa.jpg",
    client: {
      en: "Sports Social Platform",
      uk: "Спортивна соціальна платформа",
    },
    industry: {
      en: "Social Media / Sports",
      uk: "Соціальні мережі / Спорт",
    },
    duration: {
      en: "5 months",
      uk: "5 місяців",
    },
    team: {
      en: "3 QA engineers, 1 test lead",
      uk: "3 QA інженери, 1 тест-лідер",
    },
    overview: {
      en: "Provided end-to-end QA and testing expertise for a sports-focused social platform, covering functional, performance, and security testing.",
      uk: "Надано повний спектр QA та тестування для спортивної соціальної платформи, включаючи функціональне, продуктивнісне та безпекове тестування.",
    },
    challenge: {
      en: "Ensure platform stability under high concurrency, validate social features and media uploads, and secure user data while maintaining fast response times.",
      uk: "Забезпечити стабільність платформи при високій навантаженості, перевірити соціальні функції та завантаження медіа, а також захистити дані користувачів при збереженні швидкої відповіді системи.",
    },
    solution: {
      en: "Implemented automated test suites, load testing scenarios, and security scans; integrated CI pipelines for regression prevention and faster releases.",
      uk: "Впроваджено автоматизовані тести, сценарії навантажувального тестування та сканування безпеки; інтегровано CI для запобігання регресіям та прискорення релізів.",
    },
    result: {
      en: "Reduced critical bugs in production by 70% and improved release confidence with automated regression checks.",
      uk: "Зменшено кількість критичних багів у продакшені на 70% та підвищено впевненість у релізах завдяки автоматичним перевіркам регресій.",
    },
    stack: ["Jest", "Cypress", "k6", "Sentry", "Jenkins"],
    features: {
      en: [
        "Automated regression suites",
        "Load and stress testing",
        "Security scanning and vulnerability checks",
        "CI integration for test gating",
        "Detailed bug triage and reporting",
      ],
      uk: [
        "Автоматизовані набори регресійних тестів",
        "Тестування навантаження та стресу",
        "Сканування безпеки та перевірка вразливостей",
        "Інтеграція CI для контролю тестів",
        "Детальна триаж та звітність по багах",
      ],
    },
    gallery: ["/qa-dashboard.jpg", "/load-testing-graph.jpg", "/bug-triage-board.jpg"],
    testimonial: {
      quote: "Thorough and professional QA work that significantly improved our release stability.",
      author: "QA Manager",
      company: "Sports Social Platform",
    },
  },
}

export default function ProjectPage() {
  const params = useParams()
  const { locale } = useLocale()
  const t = translations[(locale as "en" | "uk")] || translations.en
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
    <main className="container mx-auto px-4 py-10" role="main">
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

          {Array.isArray(project.challenge) ? (
            // If challenge is an array of localized arrays/strings, try locale first
            Array.isArray((project.challenge as any)[locale]) ? (
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                {(project.challenge as any)[locale].map((item: string, i: number) => (
                  <li key={i}>{String(item).replace(/^- /, "").trim()}</li>
                ))}
              </ul>
            ) : (
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                {(project.challenge as any).map((item: any, i: number) => (
                  <li key={i}>{String(item).replace(/^- /, "").trim()}</li>
                ))}
              </ul>
            )
          ) : typeof project.challenge === "object" ? (
            Array.isArray((project.challenge as any)[locale]) ? (
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                {(project.challenge as any)[locale].map((item: string, i: number) => (
                  <li key={i}>{String(item).replace(/^- /, "").trim()}</li>
                ))}
              </ul>
            ) : (
              <p className="opacity-80 whitespace-pre-line">
                {getLocalizedText(project.challenge)}
              </p>
            )
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

          {Array.isArray(project.solution) ? (
            Array.isArray((project.solution as any)[locale]) ? (
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                {(project.solution as any)[locale].map((item: string, i: number) => (
                  <li key={i}>{String(item).trim()}</li>
                ))}
              </ul>
            ) : (
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                {(project.solution as any).map((item: any, i: number) => (
                  <li key={i}>{String(item).trim()}</li>
                ))}
              </ul>
            )
          ) : typeof project.solution === "object" ? (
            Array.isArray((project.solution as any)[locale]) ? (
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                {(project.solution as any)[locale].map((item: string, i: number) => (
                  <li key={i}>{String(item).trim()}</li>
                ))}
              </ul>
            ) : (
              <p className="opacity-80 whitespace-pre-line">
                {getLocalizedText(project.solution)}
              </p>
            )
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
          ) : (project.features as any)[locale] ? (
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              {(project.features as any)[locale].map((f: string, i: number) => (
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
    </main>
  )
}
