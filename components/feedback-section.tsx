"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/locale-context";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  locale: "en" | "uk";
  name: string;
  position: string;
  company: string;
  rating: number;
  text: string;
  avatarUrl: string;
}

const content = {
  en: {
    title: "Clients Feedbacks",
    subtitle: "We do our very best to bring your idea to life just as it was envisioned",
  },
  uk: {
    title: "Відгуки клієнтів",
    subtitle: "Ми робимо все можливе, щоб втілити вашу ідею в життя саме так, як ви її уявляли",
  },
};

const testimonials: Testimonial[] = [
  // Ukrainian
  {
    id: 1,
    locale: "uk",
    name: "Микита Ткачов",
    position: "Chief Delivery Officer",
    company: "Beetroot",
    rating: 5,
    text: `Наша співпраця з Idea Team була повністю успішною. Команда ефективно впоралася з усіма завданнями в межах проєкту, забезпечивши високоякісний результат у визначені строки. Їхня увага до деталей, професіоналізм і здатність швидко вирішувати складні задачі справді вразили. Комунікація протягом усього проєкту була безперебійною, з оперативною підтримкою на кожному етапі. Ми дуже задоволені співпрацею та з нетерпінням чекаємо на нові спільні проєкти. Впевнено рекомендуємо Idea Team як надійну та високопрофесійну команду.`,
    avatarUrl: "/avatar2.svg",
  },
  {
    id: 2,
    locale: "uk",
    name: "Галина Борок",
    position: "Керівниця відділу клієнтської підтримки",
    company: "Amploo",
    rating: 5,
    text: `Процес роботи з Idea Team був для нас позитивним досвідом із самого початку. Це команда висококваліфікованих фахівців, і співпраця з Олександром на кожному етапі проєкту була справжнім задоволенням. Він ставив правильні запитання, швидко реагував і завжди був готовий допомогти. Складається враження, що Idea Team — це партнер, на якого можна покластися та з яким комфортно працювати в довгостроковій перспективі.`,
    avatarUrl: "/avatar3.svg",
  },
  {
    id: 3,
    locale: "uk",
    name: "Яна Оксенюк",
    position: "Керівниця європейських партнерств",
    company: "Mirko Solutions",
    rating: 5,
    text: `Співпраця з Idea Team залишила виключно позитивні враження. Проєкт було виконано якісно та у погоджені терміни, що є надзвичайно важливим для нашої команди. Особливо цінуємо оперативну комунікацію з менеджерами компанії — ми швидко отримували відповіді на всі запитання, що дозволяло ефективно рухатися вперед. Дякуємо за професіоналізм і відповідальний підхід до роботи! Рекомендуємо Idea Team як надійного партнера.`,
    avatarUrl: "/avatar1.svg",
  },
  // English
  {
    id: 4,
    locale: "en",
    name: "Mykyta Tkachov",
    position: "Chief Delivery Officer",
    company: "Beetroot",
    rating: 5,
    text: `Our collaboration with Idea Team was a complete success. They efficiently handled all the tasks within the project, delivering high-quality results on time. Their attention to detail, professionalism, and ability to solve complex issues quickly truly stood out.`,
    avatarUrl: "/avatar2.svg",
  },
  {
    id: 5,
    locale: "en",
    name: "Rostyk Zhuk",
    position: "CEO",
    company: "Appexoft",
    rating: 5,
    text: `Idea Team became our reliable partner: their flexibility, refined processes, and strong management made collaborative work smooth. We were impressed by how quickly they solved complex issues with innovative solutions.`,
    avatarUrl: "/avatar4.svg",
  },
  {
    id: 6,
    locale: "en",
    name: "Artem Malyi",
    position: "CEO",
    company: "IT Svit",
    rating: 5,
    text: `We turned to the Idea Team to expand the team for our client's project. From the first contact, their structured approach and expertise were clear. The team quickly immersed themselves, offered innovative solutions, ensured transparent communication and on-time delivery. The final product exceeded the end client's expectations in functionality and usability.`,
    avatarUrl: "/avatar5.svg",
  },
  {
    id: 7,
    locale: "en",
    name: "Maryna Shuliak",
    position: "CBDO",
    company: "Acropolium",
    rating: 5,
    text: `Working with the Idea Team showed us how quickly the team can dive into a project and maintain a high development pace. Communication was always transparent, and the solutions were well-thought-out and effective.`,
    avatarUrl: "/avatar3.svg",
  },
  {
  id: 8,
    locale: "en",
    name: "Olha Kisil",
    position: "Talent Manager",
    company: "TalentsToday",
    rating: 5,
    text: `We received more than just task execution, Idea Team fully immersed themselves in our processes and flow. Thanks to their competence, the project was completed on time and delivered additional value to the end client.`,
    avatarUrl: "/avatar1.svg",
  },
  {
  id: 9,
    locale: "en",
    name: "Oleksandr Bilyi",
    position: "CEO",
    company: "InAppo",
    rating: 5,
    text: `The high qualification of Idea Team specialists is noticeable from the very first weeks. They offer optimal technical solutions, and their communication style makes collaboration exceptionally comfortable.`,
    avatarUrl: "/avatar2.svg",
  },
  {
    id: 10,
    locale: "en",
    name: "Vladimir Bulashov",
    position: "Head of Partnerships Department",
    company: "Digis",
    rating: 5,
    text: `Working with the Idea Team is easy: their processes are well-organized, the team pays attention to details, and they are always available. Thanks to their engagement and quality support, we were able to accelerate our project development.`,
    avatarUrl: "/avatar7.svg",
  },
];

export function FeedbackSection() {
  const { locale } = useLocale();
  const [isDark, setIsDark] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const updateTheme = () => setIsDark(html.classList.contains("dark"));
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const filteredTestimonials = testimonials.filter((t) => t.locale === locale);

  useEffect(() => {
    if (filteredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [filteredTestimonials.length]);

  if (!mounted || filteredTestimonials.length === 0) return null;

  const current = filteredTestimonials[currentIndex];

  const bgColor = isDark ? "var(--darkgrey1, #323130)" : "#FAF9F8";
  const cardBg = isDark ? "var(--black_bg, #161515)" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#212121";
  const textSecondary = isDark ? "#A8A4A0" : "#999999";
  const borderColor = isDark ? "rgba(22, 21, 21, 0.3)" : "#F1F0F0";

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);

  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);

  return (
    <section id="feedbacks" className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: textColor }}>
            {content[locale as keyof typeof content].title}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: textSecondary }}>
            {content[locale as keyof typeof content].subtitle}
          </p>
        </div>

        {/* ==================== DESKTOP ==================== */}
        <div className="hidden md:flex justify-center relative">
          <div className="relative w-full max-w-4xl flex">
            {/* Avatar */}
            <div
              className="absolute w-32 h-32 rounded-full overflow-hidden flex-shrink-0 z-20"
              style={{
                backgroundColor: "#FF6200",
                border: "4px solid #FF6200",
                left: "0",
                top: "0",
              }}
            >
              <img
                src={current.avatarUrl || "/placeholder.svg"}
                alt={current.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Polygon Connector */}
            <img
              src={isDark ? "/images/polygon-arrow-dark.svg" : "/images/polygon-arrow-light.svg"}
              alt=""
              className="absolute z-20"
              style={{
                width: "37px",
                height: "41px",
                left: "135px",
                top: "45px",
              }}
            />
            {/* Feedback Card */}
            <div
              className="rounded-2xl p-8 ml-40"
              style={{
                backgroundColor: cardBg,
                border: `0px solid ${borderColor}`,
                minHeight: "306px",
                color: textColor,
              }}
            >
              <div className="flex flex-col h-full">
                {/* Top Row: Name/Position on Left, Stars on Right */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: textColor }}>
                      {current.name}
                    </h3>
                    <p className="text-sm" style={{ color: textSecondary }}>
                      {current.position}, {current.company}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5"
                        style={{
                          fill: i < current.rating ? "#FF6200" : "#D9D9D9",
                          stroke: i < current.rating ? "#FF6200" : "#D9D9D9",
                        }}
                      />
                    ))}
                  </div>
                  </div>
                </div>
                {/* Middle: Testimonial Text */}
                <p className="text-base leading-relaxed flex-1 line-clamp-4" style={{ color: textColor }}>
                  {current.text}
                </p>
                <div className="flex justify-end gap-6 mt-6">
                  <button
                    onClick={goToPrev}
                    className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ color: textSecondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#FF6200"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = textSecondary
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ color: textSecondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#FF6200"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = textSecondary
                    }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Layout */}
        <div className="md:hidden flex justify-center">
          <div className="w-full max-w-xs">
        
            <div
              className="mx-auto mb-4 w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
              style={{
                backgroundColor: "#FF6200",
                border: "4px solid #FF6200",
              }}
            >
              <img
                src={current.avatarUrl || "/placeholder.svg"}
                alt={current.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Feedback Card Mobile */}
            <div className="flex flex-col items-center">
            <img
              src={isDark ? "/images/polygon-arrow-dark.svg" : "/images/polygon-arrow-light.svg"}
              alt=""
              className="z-20 rotate-90 -mb-1.5"
              style={{
                width: "37px",
                height: "41px",
              }}/>
              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: cardBg,
                  border: `2px solid ${borderColor}`,
                  color: textColor,
                }}
              >
                <div className="flex flex-col gap-4">
                  {/* Top: Name/Position and Stars */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold" style={{ color: textColor }}>
                        {current.name}
                      </h3>
                      <p className="text-sm" style={{ color: textSecondary }}>
                        {current.position}, {current.company}
                      </p>
                    </div>
                    {/* Stars on right */}
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          style={{
                            fill: i < current.rating ? "#FF6200" : "#D9D9D9",
                            stroke: i < current.rating ? "#FF6200" : "#D9D9D9",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Testimonial Text */}
                  <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                    {current.text}
                  </p>
                  {/* Navigation Arrows - Bottom */}
                  <div
                    className="flex justify-between items-center mt-4 pt-4"
                    style={{ borderTop: `1px solid ${borderColor}` }}
                  >
                    <button
                      onClick={goToPrev}
                      className="flex items-center justify-center transition-colors text-[#999999] dark:text-[#A8A4A0] active:text-orange-500"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="flex items-center justify-center transition-colors text-[#999999] dark:text-[#A8A4A0] active:text-orange-500"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-12">
          {filteredTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: i === currentIndex ? "#FF6200" : "#D9D9D9",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
