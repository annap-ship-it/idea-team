"use client"

import { useLocale } from "@/lib/locale-context"

const content = {
  en: {
    title: "Why Us?",
    cards: [
      { label: "We are ", highlighted: "structured" },
      { label: "We don't ", highlighted: "hide our rates" },
      { label: "We're keen on ", highlighted: "technologies" },
      { label: "We take full ", highlighted: "responsibility" },
    ],
    transparency: {
      label: "We are completely transparent in communication and always by your side to ",
      highlighted1: "maximize",
      label2: " the efficiency of implementing ",
      highlighted2: "your idea",
    },
  },
  uk: {
    title: "Чому ми?",
    cards: [
      { label: "Ми ", highlighted: "структурована" },
      { label: "Ми не ", highlighted: "приховуємо ціни" },
      { label: "Ми захоплюємось ", highlighted: "технологіями" },
      { label: "Ми беремо повну ", highlighted: "відповідальність" },
    ],
    transparency: {
      label: "Ми повністю прозорі в спілкуванні та завжди поруч із вами, щоб ",
      highlighted1: "максимізувати",
      label2: " ефективність впровадження ",
      highlighted2: "вашої ідеї",
    },
  },
}

export function WhyUsSection2() {
  const { locale } = useLocale()
  const t = content[locale as keyof typeof content]

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center mb-16 md:mb-24">
          {t.title}
        </h2>

        {/* MOBILE LAYOUT - Separate and independent */}
        <div className="md:hidden space-y-6">
          {/* 2x2 grid of cards */}
          <div className="grid grid-cols-2 gap-3 font-bold">
            {t.cards.map((card, idx) => (
              <div
                key={idx}
                className="rounded-lg p-4 flex flex-col gap-2"
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #FAF9F8 97.02%)",
                  border: "1px solid #E0E0E0",
                }}
              >
                <svg
                  className="w-5 h-5 text-[#000]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {idx === 0 && (
                    <>
                      <path
                        d="M6.81962 22L6.81966 19.143C6.66381 17.592 5.6343 16.4165 4.6836 15M14.456 22L14.456 20.2858C19.365 20.2858 18.8197 14.5717 18.8197 14.5717C18.8197 14.5717 21.0014 14.5717 21.0014 12.286L18.8197 8.8576C18.8197 4.28632 15.1109 2.04169 11.1833 2.00068C8.98285 1.97771 7.22624 2.53124 5.91347 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 7L15 9.5L13 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 7L3 9.5L5 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 6L8 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                  {idx === 1 && (
                    <>
                      <path
                        d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 10H16M8 6H12M8 14H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.3056 17.1133L17.2147 15.1856C17.3314 14.9381 17.6686 14.9381 17.7853 15.1856L18.6944 17.1133L20.7275 17.4243C20.9884 17.4642 21.0923 17.7998 20.9035 17.9923L19.4326 19.4917L19.7797 21.61C19.8243 21.882 19.5515 22.0895 19.3181 21.961L17.5 20.9603L15.6819 21.961C15.4485 22.0895 15.1757 21.882 15.2203 21.61L15.5674 19.4917L14.0965 17.9923C13.9077 17.7998 14.0116 17.4642 14.2725 17.4243L16.3056 17.1133Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                  {idx === 2 && (
                    <>
                      <path d="M19 20H5C3.89543 20 3 19.1046 3 18V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20Z" stroke="#212121" stroke-width="1.5"/>
                      <path d="M7 7V3.6C7 3.26863 7.26863 3 7.6 3H16.4C16.7314 3 17 3.26863 17 3.6V7" stroke="#212121" stroke-width="1.5"/>
                      <path d="M10 3V7" stroke="#212121" stroke-width="1.5"/>
                      <path d="M12 3V7" stroke="#212121" stroke-width="1.5"/>
                      <path d="M16.5 14C16.2239 14 16 13.7761 16 13.5C16 13.2239 16.2239 13 16.5 13C16.7761 13 17 13.2239 17 13.5C17 13.7761 16.7761 14 16.5 14Z" fill="#212121" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </>
                  )}
                 {idx === 3 && (
                    <>
                      <path
                        d="M3.2 14.2222V4C3.2 2.89543 4.09543 2 5.2 2H18.8C19.9046 2 20.8 2.89543 20.8 4V14.2222M3.2 14.2222H20.8M3.2 14.2222L1.71969 19.4556C1.35863 20.7321 2.31762 22 3.64418 22H20.3558C21.6824 22 22.6414 20.7321 22.2803 19.4556L20.8 14.2222"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M11 19L13 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 6L16 8L14 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 6L8 8L10 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                </svg>
                <p className="text-[#212121]">
                  {card.label}
                  <span className="text-[#FF6200]">{card.highlighted}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Large transparent card */}
          <div
            className="flex flex-col gap-2 rounded-2xl p-6"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #FAF9F8 97.02%)",
              border: "1px solid #E0E0E0",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 14V18.4C4 18.7314 4.26863 19 4.6 19H10" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 14V18.4C19 18.7314 18.7314 19 18.4 19H14" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 5H18.4C18.7314 5 19 5.26863 19 5.6V10" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 10V5.6C4 5.26863 4.26863 5 4.6 5H10" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 19V20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20V19" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 10H5C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14H4" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 10H20C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14H19" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 5V4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4V5" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="font-semibold text-[#212121] leading-relaxed">
              {t.transparency.label}
              <span className="text-[#FF6200]">{t.transparency.highlighted1}</span>
              {t.transparency.label2}
              <span className="text-[#FF6200]">{t.transparency.highlighted2}</span>
            </p>
          </div>

          {/* Laptop with gradient background */}
          <div className="relative rounded-2xl overflow-hidden w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-500 to-[#FF6200] z-0" />
            <img
              src="/images/macbook-pro-16-mockup-v4-isometric-201.png"
              alt="Laptop mockup"
              className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* DESKTOP LAYOUT - Separate and independent */}
        <div className="hidden md:block">
          {/* Grid of cards around central laptop image */}
          <div className="grid grid-cols-3 gap-8 relative mb-16">
            {/* Left column cards */}
            <div className="flex flex-col gap-8 justify-between">
              {/* We are structured */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E0E0E0",
                }}
              >
                <svg
                  className="w-6 h-6 text-[#212121] mb-[14px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.81962 22L6.81966 19.143C6.66381 17.592 5.6343 16.4165 4.6836 15M14.456 22L14.456 20.2858C19.365 20.2858 18.8197 14.5717 18.8197 14.5717C18.8197 14.5717 21.0014 14.5717 21.0014 12.286L18.8197 8.8576C18.8197 4.28632 15.1109 2.04169 11.1833 2.00068C8.98285 1.97771 7.22624 2.53124 5.91347 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 7L15 9.5L13 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 7L3 9.5L5 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 6L8 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[24px] font-[Onest]  text-[#212121]">
                  {t.cards[0].label}
                  <span className="text-[#FF6200]">{t.cards[0].highlighted}</span>
                </p>
              </div>

              {/* We're keen on technologies */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E0E0E0",
                }}
              >
                <svg
                  className="w-6 h-6 text-[#212121] mb-[14px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.2 14.2222V4C3.2 2.89543 4.09543 2 5.2 2H18.8C19.9046 2 20.8 2.89543 20.8 4V14.2222M3.2 14.2222H20.8M3.2 14.2222L1.71969 19.4556C1.35863 20.7321 2.31762 22 3.64418 22H20.3558C21.6824 22 22.6414 20.7321 22.2803 19.4556L20.8 14.2222"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M11 19L13 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 6L16 8L14 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 6L8 8L10 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[24px] font-[Onest]  text-[#212121]">
                  {t.cards[2].label}
                  <span className="text-[#FF6200]">{t.cards[2].highlighted}</span>
                </p>
              </div>
            </div>

            {/* Center: Laptop with gradient background */}
            <div className="flex justify-center items-center">
              <div className="relative rounded-3xl overflow-hidden w-full max-w-xs">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-500 to-[#FF6200] z-0" />
                <img
                  src="/images/macbook-pro-16-mockup-v4-isometric-201.png"
                  alt="Laptop mockup"
                  className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right column cards */}
            <div className="flex flex-col gap-8 justify-between">
              {/* We don't hide our rates */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E0E0E0",
                }}
              >
                <svg className=" mb-[14px]" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 20H5C3.89543 20 3 19.1046 3 18V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20Z" stroke="#212121" stroke-width="1.5" />
                  <path d="M7 7V3.6C7 3.26863 7.26863 3 7.6 3H16.4C16.7314 3 17 3.26863 17 3.6V7" stroke="#212121" stroke-width="1.5" />
                  <path d="M10 3V7" stroke="#212121" stroke-width="1.5" />
                  <path d="M12 3V7" stroke="#212121" stroke-width="1.5" />
                  <path d="M16.5 14C16.2239 14 16 13.7761 16 13.5C16 13.2239 16.2239 13 16.5 13C16.7761 13 17 13.2239 17 13.5C17 13.7761 16.7761 14 16.5 14Z" fill="#212121" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p className="text-[24px] font-[Onest]  text-[#212121]">
                  {t.cards[1].label}
                  <span className="text-[#FF6200]">{t.cards[1].highlighted}</span>
                </p>
              </div>

              {/* We take full responsibility */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E0E0E0",
                }}
              >
                <svg
                  className="w-6 h-6 text-[#212121] mb-[14px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10H16M8 6H12M8 14H11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.3056 17.1133L17.2147 15.1856C17.3314 14.9381 17.6686 14.9381 17.7853 15.1856L18.6944 17.1133L20.7275 17.4243C20.9884 17.4642 21.0923 17.7998 20.9035 17.9923L19.4326 19.4917L19.7797 21.61C19.8243 21.882 19.5515 22.0895 19.3181 21.961L17.5 20.9603L15.6819 21.961C15.4485 22.0895 15.1757 21.882 15.2203 21.61L15.5674 19.4917L14.0965 17.9923C13.9077 17.7998 14.0116 17.4642 14.2725 17.4243L16.3056 17.1133Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[24px] font-[Onest]  text-[#212121]">
                  {t.cards[3].label}
                  <span className="text-[#FF6200]">{t.cards[3].highlighted}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Large transparent card at bottom */}
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-12"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAF9F8 97.02%)",
                border: "1px solid #E0E0E0",
              }}
            >
              <svg
                className="w-6 h-6 text-[#212121] mb-[14px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 14V18.4C4 18.7314 4.26863 19 4.6 19H10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 14V18.4C19 18.7314 18.7314 19 18.4 19H14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 5H18.4C18.7314 5 19 5.26863 19 5.6V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 10V5.6C4 5.26863 4.26863 5 4.6 5H10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 19V20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20V19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 10H5C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14H4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 10H20C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 5V4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4V5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[24px] font-[Onest]  text-[#212121] leading-relaxed">
                {t.transparency.label}
                <span className="text-[#FF6200]">{t.transparency.highlighted1}</span>
                {t.transparency.label2}
                <span className="text-[#FF6200]">{t.transparency.highlighted2}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
