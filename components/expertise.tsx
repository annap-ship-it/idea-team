"use client"

import { useLocale } from "@/lib/locale-context"

export function ExpertiseSection() {
  const { locale } = useLocale()

  const content = {
    en: {
      title: "Our Expertise",
      outstaffingTitle: "Outstaffing",
      outsourcingTitle: "Outsourcing",
      consultationTitle: "Consultation",
      outstaff_1: "Client-Controlled Team Member",
      outstaff_1_desc:
        "You select and manage the developer directly as if they were part of your team, while we handle HR, payroll, and administrative tasks.",
      outstaff_2: "Flexible Team Scaling",
      outstaff_2_desc: "When your needs change, you can scale up or down and quickly adjust resources.",
      outstaff_3: "Integration & Management",
      outstaff_3_desc:
        "Developers fully integrate into your workflows, tools, and communication channels under your direction.",
      outstaff_4: "Responsibility Split",
      outstaff_4_desc:
        "You retain full control over development and task management, while we assume responsibility for employment logistics.",
      outsource_1: "Full-Scope Delivery",
      outsource_1_desc:
        "We take ownership of the project's execution, from requirements and design to deployment and QA.",
      outsource_2: "Third-Party Management",
      outsource_2_desc: "You're hands-off—our team handles all day-to-day management, scheduling, and deliverables.",
      outsource_3: "Contract-Based Accountability",
      outsource_3_desc:
        "We are accountable for quality, timelines, and final outcomes based on the terms of our agreement.",
      outsource_4: "Efficient for Full Projects",
      outsource_4_desc: "Ideal when you need a specific output without involving your internal team in operations.",
      consult_1: "Expert Guidance",
      consult_1_desc:
        "Our senior technical leadership helps analyze architecture, review tech stacks, and propose solutions—without committing to full delivery. (General industry practice)",
      consult_2: "Strategic Alignment",
      consult_2_desc: "We support you in making informed decisions on tech direction, scalability, and best practices.",
    },
    uk: {
      title: "Наша експертиза",
      outstaffingTitle: "Аутстафінг",
      outsourcingTitle: "Аутсорсинг",
      consultationTitle: "Консалтинг",
      outstaff_1: "Розробник під контролем клієнта",
      outstaff_1_desc:
        "Ви вибираєте та керуєте розробником напряму, як якби він був частиною вашої команди, а ми займаємось HR, зарплатою та адміністративними завданнями.",
      outstaff_2: "Гнучке масштабування команди",
      outstaff_2_desc:
        "Коли ваші потреби змінюються, ви можете збільшити або зменшити команду та швидко адаптувати ресурси.",
      outstaff_3: "Інтеграція та управління",
      outstaff_3_desc:
        "Розробники повністю інтегруються у ваші робочі процеси, інструменти та канали комунікації під вашим керуванням.",
      outstaff_4: "Розподіл відповідальності",
      outstaff_4_desc:
        "Ви зберігаєте повний контроль над розробкою та управлінням завданнями, а ми беремо на себе відповідальність за логістику найму.",
      outsource_1: "Повна реалізація проекту",
      outsource_1_desc:
        "Ми беремо на себе відповідальність за виконання проекту, від вимог та дизайну до розгортання та тестування.",
      outsource_2: "Управління третьою стороною",
      outsource_2_desc:
        "Ви можете не займатися управлінням—наша команда займається всім щоденним управлінням, розкладом та результатами.",
      outsource_3: "Контрактна відповідальність",
      outsource_3_desc:
        "Ми несемо відповідальність за якість, терміни та кінцеві результати на основі умов нашої угоди.",
      outsource_4: "Ефективно для повних проектів",
      outsource_4_desc:
        "Ідеально, коли вам потрібен конкретний результат без залучення вашої внутрішної команди до операцій.",
      consult_1: "Експертна допомога",
      consult_1_desc:
        "Наше старше технічне керівництво допомагає аналізувати архітектуру, переглядати технічні стеки та пропонувати рішення—без зобов'язання повної реалізації. (Загальна практика в галузі)",
      consult_2: "Стратегічне вирівнювання",
      consult_2_desc:
        "Ми допомагаємо вам приймати обґрунтовані рішення щодо технічного напрямку, масштабованості та найкращих практик.",
    },
  }

  const t = content[locale as "en" | "uk"] || content.en

  return (
    <section id="our-expertise" className="py-16 px-4 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-32 relative overflow-hidden rounded-2xl bg-[#212121]">
        {/* Фоновые векторы */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Первый вектор — слева, обрезан сверху и слева */}
          <svg
            width="892"
            height="814"
            viewBox="0 0 892 814"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[-135px] top-[-132px] w-auto h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M36.6466 677.93L-54.311 677.263C-116.8 676.862 -155.324 607.47 -123.721 552.423L45.3311 257.906L155.551 456.075L36.6466 677.863V677.93Z"
              fill="#252525"
            />
            <path d="M193.5 384.89L84.7445 189.493L164.225 51.15L270.307 241.687L193.5 384.89Z" fill="#252525" />
            <path
              d="M675.373 682L592.298 681.4L490.051 497.525L599.275 293.722L746.32 558.239C777.099 613.621 737.648 682.4 675.308 681.933L675.373 682Z"
              fill="#252525"
            />
            <path
              d="M315.74 679.491H310.59L279.685 679.225L113.23 678.091L347.362 240.966L203.597 -17.7738L245.585 -91.0614C277.077 -146.077 355.056 -145.544 385.895 -90.0611L560.044 223.361L315.675 679.558L315.74 679.491Z"
              fill="#252525"
            />
          </svg>

          {/* Второй вектор — повёрнутый на -90 градусов, справа */}
          <svg
            width="1034"
            height="944"
            viewBox="0 0 1034 944"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[564px] top-[614px] w-auto h-auto rotate-[-90deg] origin-left-top"
            preserveAspectRatio="none"
          >
            <path
              d="M36.6466 677.93L-54.311 677.263C-116.8 676.862 -155.324 607.47 -123.721 552.423L45.3311 257.906L155.551 456.075L36.6466 677.863V677.93Z"
              fill="#252525"
            />
            <path d="M193.5 384.89L84.7445 189.493L164.225 51.15L270.307 241.687L193.5 384.89Z" fill="#252525" />
            <path
              d="M675.373 682L592.298 681.4L490.051 497.525L599.275 293.722L746.32 558.239C777.099 613.621 737.648 682.4 675.308 681.933L675.373 682Z"
              fill="#252525"
            />
            <path
              d="M315.74 679.491H310.59L279.685 679.225L113.23 678.091L347.362 240.966L203.597 -17.7738L245.585 -91.0614C277.077 -146.077 355.056 -145.544 385.895 -90.0611L560.044 223.361L315.675 679.558L315.74 679.491Z"
              fill="#252525"
            />
          </svg>
        </div>

        {/* Контент */}
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-20">{t.title}</h2>

          {/* Outstaffing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20 border-b border-white/40">
            <h3 className="text-3xl md:text-4xl font-medium leading-[1.15]">
              <span
                className="
                  inline-block
                  pb-[3px]
                  bg-gradient-to-r from-orange-600 to-white
                  bg-[length:0%_100%]
                  bg-left
                  bg-no-repeat
                  bg-clip-text
                  text-white
                  transition-all duration-500 ease-out
                  hover:bg-[length:100%_100%]
                  hover:text-transparent
                "
              >
                {t.outstaffingTitle}
              </span>
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.outstaff_1}</p>
                  <p className="text-white/60">{t.outstaff_1_desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.outstaff_2}</p>
                  <p className="text-white/60">{t.outstaff_2_desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.outstaff_3}</p>
                  <p className="text-white/60">{t.outstaff_3_desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.outstaff_4}</p>
                  <p className="text-white/60">{t.outstaff_4_desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Outsourcing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-20 border-b border-white/40">
            <h3 className="text-3xl md:text-4xl font-medium leading-[1.15]">
              <span
                className="
                  inline-block
                  pb-[3px]
                  bg-gradient-to-r from-orange-600 to-white
                  bg-[length:0%_100%]
                  bg-left
                  bg-no-repeat
                  bg-clip-text
                  text-white
                  transition-all duration-500 ease-out
                  hover:bg-[length:100%_100%]
                  hover:text-transparent
                "
              >
                {t.outsourcingTitle}
              </span>
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.outsource_1}</p>
                  <p className="text-white/60">{t.outsource_1_desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.outsource_2}</p>
                  <p className="text-white/60">{t.outsource_2_desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.outsource_3}</p>
                  <p className="text-white/60">{t.outsource_3_desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.outsource_4}</p>
                  <p className="text-white/60">{t.outsource_4_desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pt-20">
            <h3 className="text-3xl md:text-4xl font-medium leading-[1.15]">
              <span
                className="
                  inline-block
                  pb-[3px]
                  bg-gradient-to-r from-orange-600 to-white
                  bg-[length:0%_100%]
                  bg-left
                  bg-no-repeat
                  bg-clip-text
                  text-white
                  transition-all duration-500 ease-out
                  hover:bg-[length:100%_100%]
                  hover:text-transparent
                "
              >
                {t.consultationTitle}
              </span>
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.consult_1}</p>
                  <p className="text-white/60">{t.consult_1_desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-[9px] w-[16px] h-[16px]">
                  <img
                    src="/icons/tech/bullet-red.svg"
                    alt="Icon"
                    className="w-2 h-2 block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.consult_2}</p>
                  <p className="text-white/60">{t.consult_2_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
