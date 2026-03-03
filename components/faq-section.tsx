"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/lib/locale-context"

interface FAQItem {
  id: number
  questionEn: string
  questionUk: string
  answerEn: string
  answerUk: string
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    questionEn: "What is out-staffing?",
    questionUk: "Що таке аутстафінг?",
    answerEn:
      "Out-staffing is a model where developers work remotely as part of your team but remain employed by a software development studio. This allows businesses to scale teams quickly without hiring full-time in-house staff.",
    answerUk:
      "Аутстафінг — це модель, коли розробники працюють віддалено як частина вашої команди, але залишаються працівниками студії розробки програмного забезпечення. Це дозволяє бізнесу швидко масштабувати команду без найму штатних співробітників.",
  },
  {
    id: 2,
    questionEn: "Why is it better to hire developers through a software development studio than in-house?",
    questionUk:
      "Чому вигідніше наймати розробників через студію розробки, а не штатно?",
    answerEn:
      "Working with a studio provides immediate access to experienced developers, reduces recruitment and HR overhead, offers flexible team scaling, and ensures a structured development process with proven expertise.",
    answerUk:
      "Співпраця зі студією дає миттєвий доступ до досвідчених розробників, зменшує витрати на рекрутинг і HR, забезпечує гнучке масштабування команди та структурований процес розробки з перевіреною експертизою.",
  },
  {
    id: 3,
    questionEn: "What development methodologies do you use?",
    questionUk: "Якими методологіями розробки ви користуєтеся?",
    answerEn:
      "We primarily use Agile, Scrum, and Kanban to ensure iterative delivery, transparency, predictable timelines, and efficient project management.",
    answerUk:
      "Ми переважно використовуємо Agile, Scrum та Kanban, щоб забезпечити ітеративну доставку, прозорість процесів, прогнозовані терміни та ефективне управління проєктом.",
  },
  {
    id: 4,
    questionEn: "How does the onboarding process work?",
    questionUk: "Як відбувається процес адаптації (onboarding)?",
    answerEn:
      "Our onboarding includes detailed project briefings, access to tools and documentation, integration into your workflows, and alignment on communication and reporting standards. Developers are ready to start work quickly.",
    answerUk:
      "Наш onboarding включає детальні брифінги проєкту, доступ до інструментів та документації, інтеграцію у ваші робочі процеси та узгодження стандартів комунікації та звітності. Розробники готові розпочати роботу швидко.",
  },
  {
    id: 5,
    questionEn: "Where are your developers located?",
    questionUk: "Де знаходяться ваші розробники?",
    answerEn:
      "Our developers are distributed globally but operate in coordinated time zones. This ensures smooth collaboration while providing flexibility and access to top talent.",
    answerUk:
      "Наші розробники розташовані по всьому світу, але працюють у координованих часових зонах. Це забезпечує ефективну співпрацю та доступ до найкращих талантів.",
  },
  {
    id: 6,
    questionEn: "How quickly can you provide a developer?",
    questionUk: "Як швидко ви можете надати розробника?",
    answerEn:
      "Depending on the technology and project requirements, we can provide a qualified developer within 1–3 weeks.",
    answerUk:
      "Залежно від технологій та вимог проєкту, ми можемо надати кваліфікованого розробника протягом 1–3 тижнів.",
  },
  {
    id: 7,
    questionEn: "How quickly do you start project implementation?",
    questionUk: " Як швидко ви починаєте реалізацію проєкту?",
    answerEn:
      "After onboarding and requirement alignment, we can begin implementation immediately, ensuring minimal delays and fast project ramp-up.",
    answerUk:
      "Після onboarding та узгодження вимог ми можемо розпочати реалізацію негайно, забезпечуючи мінімальні затримки та швидкий старт проєкту.",
  },
  {
    id: 8,
    questionEn: "What if, after some time, the assigned specialist turns out not to be a good fit?",
    questionUk: "Що робити, якщо через певний час призначений спеціаліст виявиться не підходящим?",
    answerEn:
      "The assigned developer works 10 hours on a free dev test drive. If, during the project, the developer does not meet requirements or there are issues in their work, we find a replacement within three days and smoothly integrate the new candidate.",
    answerUk:
      "Призначений розробник спочатку працює 10 годин на безкоштовному dev test drive. Якщо під час проєкту розробник не відповідає вимогам або виникають проблемні питання в роботі, ми знаходимо заміну протягом трьох днів і плавно інтегруємо нового кандидата.",
  },
]

export function FAQSection() {
  const { locale } = useLocale()
  const [expandedId, setExpandedId] = useState<number | null>()
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkDarkMode = () => {
      const htmlElement = document.documentElement
      setIsDark(htmlElement.classList.contains("dark"))
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  const bgColor = isDark ? "var(--darkgrey1, #323130)" : "#FAF9F8"
  const cardBg = isDark ? "var(--black_bg, #161515)" : "#FFFFFF"
  const textColor = isDark ? "#FFFFFF" : "#212121"
  const mutedText = isDark ? "#EBEBEB" : "#666666"
  const borderColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"

  const title = locale === "uk" ? "Часті Питання" : "Frequently Asked Questions"

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-background" >
      <div className="max-w-[1127px] mx-auto px-4">
        {/* Title */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-24"
          style={{ color: textColor }}
        >
          {title}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqItems.map((item) => {
            const isExpanded = expandedId === item.id
            const question = locale === "uk" ? item.questionUk : item.questionEn
            const answer = locale === "uk" ? item.answerUk : item.answerEn

            return (
              <div
                key={item.id}
                className="rounded-[14px] overflow-hidden transition-all duration-300"
                style={{
                  border: `1px solid ${borderColor}`,
                  // Applying your requested gradient to every item
                  background: isExpanded
                    ? isDark
                      ? "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(171, 171, 171, 0.06) 100%), #323130"
                      : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(171, 171, 171, 0.06) 100%), #FFFFFF"
                    : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(171, 171, 171, 0.06) 100%)",
                }}
              >
                {/* Question Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full px-5 md:px-8 py-4 flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
                >
                  {/* Added the font-onest class here as well to match your previous request */}
                  <h3 className="text-[24px] font-[Onest] font-medium text-left" style={{ color: mutedText }}>
                    {question}
                  </h3>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <path
                        d="M1 5L7 11L13 5"
                        stroke="#FF6200"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer Row */}
                {isExpanded && (
                  <div className="px-5 md:px-8 pb-6 pt-0">
                    <p
                      className="text-base md:text-lg font-[Onest]"
                      style={{ color: isDark ? "rgba(255, 255, 255, 0.5)" : "#666666" }}
                    >
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
