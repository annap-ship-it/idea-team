"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
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
      "Покращення стабільності та обробки помилок\n",
"Вирішено проблеми синхронізації socket-подій та логіки відстеження часу сесій.\n",
"Усунено розбіжності в UI на різних пристроях iOS та Android.\n",
"Покращено обробку помилок і валідацію в ключових сценаріях (Налаштування акаунта, Користувацькі програми).\n",
"Розширення функціоналу\n",
"Інтегровано нові API для плавної взаємодії між застосунком і машиною для подачі м’ячів.\n",
"Повністю перероблено екран Play Clips для більш плавного відеовідтворення.\n",
"Реалізовано інтернаціоналізацію (i18n) та підтримку кількох мов.\n",
"Покращено екрани Session Details та Live Statistics з динамічними графіками та даними в реальному часі.\n",
"Оновлено навігацію та UI-переходи у потоках Change Other Params та Create Option Wizard.\n",
"Оновлено кнопки, модальні вікна та форми згідно з новими дизайн-гайдами.\n",
"Рефакторинг та оптимізація\n",
"Розбито великі файли на малі, багаторазово використовувані компоненти.\n",
"Замінено нестабільні сторонні бібліотеки на кастомні рішення для уникнення зависань.\n",
"Перенесено валідацію форм на react-hook-form + Zod, зменшивши шаблонний код та покращивши читабельність.\n",
"Комунікація та співпраця\n",
"Тісна взаємодія з backend та product-командами замовника для уточнення вимог і узгодження функціоналу.\n",
"Раннє виявлення регресій та проактивні пропозиції альтернативних рішень під час спринт-рев’ю.\n",
],
  },
  result: {
    en: `The updated Waltair Robotics Mobile App v4 now delivers a far more stable, intuitive, and scalable experience for tennis coaches.\n
With improved performance, a consistent user interface, and powerful analytics capabilities, the application is ready for extensive QA testing and final deployment.`,
    uk: `Оновлений Waltair Robotics Mobile App v4 тепер забезпечує набагато стабільніший, інтуїтивний та масштабований досвід для тенісних тренерів.\n
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
      en: "2 QA engineers",
      uk: "2 QA-інженери",
    },
    overview: {
      en: "An NBA-focused sports social platform needed comprehensive QA support during rapid development to ensure stability and quality.",
      uk: "Спортивна соціальна платформа, орієнтована на NBA, потребувала комплексної підтримки QA під час швидкої розробки для забезпечення стабільності та якості.",
    },
    challenge: {
      en: "Ensure high product quality and stability during rapid development of an NBA-focused sports social platform with frequent releases and new feature additions.",
      uk: "Забезпечити високу якість продукту та стабільність при швидкій розробці соцплатформи для NBA з частими релізами та додаванням нових функцій.",
    },
    solution: {
      en: "Provided manual QA support covering 170+ tickets, tested new and existing features, identified critical bugs, collaborated with developers, and recommended Android devices for testing.",
      uk: "Ручне QA-покриття понад 170 задач, тестування нових та існуючих функцій, виявлення критичних багів, співпраця з розробниками, рекомендації Android-пристроїв для тестування.",
    },
    result: {
      en: "Improved release stability, higher product quality, and smoother QA processes. Bug escape rate reduced by 80%. Release cycle time decreased from 2 weeks to 1 week.",
      uk: "Підвищена стабільність релізів, краща якість продукту, оптимізація QA-процесів. Показник виходу багів зменшено на 80%. Час циклу релізу скорочено з 2 тижнів до 1 тижня.",
    },
    stack: ["Manual Testing", "Team Collaboration Tools", "JIRA", "TestRail", "Android Testing"],
    features: {
      en: [
        "Comprehensive test case development",
        "Regression testing automation",
        "Cross-device compatibility testing",
        "Performance testing",
        "User acceptance testing",
      ],
      uk: [
        "Розробка комплексних тестових сценаріїв",
        "Автоматизація регресійного тестування",
        "Тестування сумісності на різних пристроях",
        "Тестування продуктивності",
        "Користувацьке акцептаційне тестування",
      ],
    },
    gallery: ["/qa-testing-dashboard.jpg", "/mobile-app-testing.png", "/bug-tracking-system.jpg"],
    testimonial: {
      quote: "Excellent QA work on the sports platform!",
      author: "Emily White",
      company: "Sports Social Platform",
    },
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { locale } = useLocale()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  const t = translations[locale as "en" | "uk"]

  const getLocalizedText = (text: any): any => {
    if (!text) return ""
    if (typeof text === "string") return text
    if (Array.isArray(text)) return text
    if (typeof text === "object" && (text.en || text.uk)) {
      return text[locale as "en" | "uk"] || text.en || text.uk || ""
    }
    return ""
  }

  const getListItems = (value: any): string[] => {
    // 1) Если сам value массив (частый случай в твоих данных)
    if (Array.isArray(value)) {
      return value
        .map((item) => String(item).replace(/^-+\s*/, "").trim())
        .filter(Boolean)
    }

    // 2) Локализация может вернуть массив или строку
    const localized = getLocalizedText(value)

    if (Array.isArray(localized)) {
      return localized
        .map((item) => String(item).replace(/^-+\s*/, "").trim())
        .filter(Boolean)
    }

    // 3) Если строка — делим по строкам
    return String(localized)
      .split("\n")
      .map((line) => line.replace(/^-+\s*/, "").trim())
      .filter(Boolean)
  }

  useEffect(() => {
  async function fetchProjects() {
    try {
      const supabase = createBrowserClient()

      // Get projects category ID
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", "projects")
        .single()

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

          // Объединяем проекты из БД + defaultProjects (без дублей по slug)
          const mergedProjects = [
            ...mappedProjects,
            ...defaultProjects.filter(
              (defProject) =>
                !mappedProjects.some((dbProject) => dbProject.slug === defProject.slug),
            ),
          ]

          setProjects(mergedProjects)
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

  const titleGradient = isDark ? "#FFFFFF" : "#000000"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6200]"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <section className="relative">
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src={project.featured_image || "/placeholder.svg"}
            alt={String(getLocalizedText(project.title))}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-[1280px] mx-auto">
            <Link href="/projects" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft size={20} />
              {t.backToProjects}
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {String(getLocalizedText(project.title))}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          {(project.client || project.industry || project.duration || project.team) && (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-[4px] mb-12"
              style={{ backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5" }}
            >
              {project.client && (
                <div>
                  <p className="text-[#FF6200] font-semibold text-sm mb-1">{t.client}</p>
                  <p style={{ color: isDark ? "#FFFFFF" : "#000000" }}>{String(getLocalizedText(project.client))}</p>
                </div>
              )}
              {project.industry && (
                <div>
                  <p className="text-[#FF6200] font-semibold text-sm mb-1">{t.industry}</p>
                  <p style={{ color: isDark ? "#FFFFFF" : "#000000" }}>{String(getLocalizedText(project.industry))}</p>
                </div>
              )}
              {project.duration && (
                <div>
                  <p className="text-[#FF6200] font-semibold text-sm mb-1">{t.duration}</p>
                  <p style={{ color: isDark ? "#FFFFFF" : "#000000" }}>{String(getLocalizedText(project.duration))}</p>
                </div>
              )}
              {project.team && (
                <div>
                  <p className="text-[#FF6200] font-semibold text-sm mb-1">{t.team}</p>
                  <p style={{ color: isDark ? "#FFFFFF" : "#000000" }}>{String(getLocalizedText(project.team))}</p>
                </div>
              )}
            </div>
          )}

          {project.overview && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4" style={{ color: titleGradient }}>
                {t.overview}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                {String(getLocalizedText(project.overview))}
              </p>
            </div>
          )}

          {/* ✅ Challenge / Solution / Result */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {project.challenge && (
              <div
                className="p-6 rounded-[4px] border-t-4 border-[#FF6200]"
                style={{
                  backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                  boxShadow: isDark ? "none" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-[#FF6200] font-bold text-lg mb-3">{t.challenge}</h3>
                <ul className="list-disc pl-5 space-y-2" style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                  {getListItems(project.challenge).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.solution && (
              <div
                className="p-6 rounded-[4px] border-t-4 border-[#FF6200]"
                style={{
                  backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                  boxShadow: isDark ? "none" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-[#FF6200] font-bold text-lg mb-3">{t.solution}</h3>
                <ul className="list-disc pl-5 space-y-2" style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                  {getListItems(project.solution).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.result && (
              <div
                className="p-6 rounded-[4px] border-t-4 border-[#FF6200]"
                style={{
                  backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                  boxShadow: isDark ? "none" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-[#FF6200] font-bold text-lg mb-3">{t.result}</h3>
                <p style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{String(getLocalizedText(project.result))}</p>
              </div>
            )}
          </div>

          {project.stack && project.stack.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{ color: titleGradient }}>
                {t.technologyStack}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                      color: isDark ? "#FFFFFF" : "#000000",
                      border: `1px solid ${isDark ? "#3A3A3A" : "#E0E0E0"}`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{ color: titleGradient }}>
                {t.keyFeatures}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF6200] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{ color: titleGradient }}>
                {t.projectGallery}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.gallery.map((image: string, i: number) => (
                  <div key={i} className="relative aspect-[3/2] rounded-[4px] overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${String(getLocalizedText(project.title))} screenshot ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.testimonial && (
            <div className="p-8 rounded-[4px] mb-12" style={{ backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5" }}>
              <svg className="w-10 h-10 text-[#FF6200] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg italic mb-4" style={{ color: isDark ? "#FFFFFF" : "#000000" }}>
                "{project.testimonial.quote}"
              </p>
              <p className="text-[#FF6200] font-semibold">{project.testimonial.author}</p>
              <p className="text-sm" style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                {project.testimonial.company}
              </p>
            </div>
          )}

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4" style={{ color: isDark ? "#FFFFFF" : "#000000" }}>
              {t.similarProject}
            </h3>
            <Link
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2DSvfJWDr_AXOWUTxid3bQrwNr4so5STlGytDH-8W1vkXUDJ-nA1VYSW8oeSY2-eKxNHsYpUfY"
              className="inline-block px-8 py-3 rounded-full bg-[#FF6200] text-white font-semibold hover:bg-[#E55A00] transition-colors"
            >
              {t.letsTalk}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
