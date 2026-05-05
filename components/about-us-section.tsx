"use client"
import { useLocale } from "@/lib/locale-context"
import { WorldMapWithHover } from "./world-map-with-hover"

type Pin = {
  x: number
  y: number
}

const pins: Pin[] = [
  { x: 163, y: 194 }, // Western Canada
  { x: 370, y: 243 }, // United Kingdom
  { x: 359, y: 244 }, // Netherlands
  { x: 409, y: 239 }, // Belgium
  { x: 380, y: 223 }, // Germany
  { x: 397, y: 212 }, // Poland
  { x: 407, y: 212 }, // Ukraine
]

const content = {
  en: {
    title: "About Us",
    description1:
      "Born in 2023, a young IT studio that expands its operational reach with every project, uniting international talent around your idea.",
    description2:
      "Our team of middle+ engineers helps companies launch faster and scale with confidence. We've streamlined every step from request to delivery to cut delays, raise quality, and ensure full accountability.",
  },
  uk: {
    title: "Про нас",
    description1:
      "Заснована в 2023 році, молода IT-студія, яка розширює масштаби своєї діяльності з кожним проектом, об'єднуючи міжнародний талант навколо вашої ідеї.",
    description2:
      "Наша команда інженерів middle+ допомагає компаніям запускатись швидше та масштабуватись з впевненістю. Ми оптимізували кожний крок від запиту до доставки, щоб скоротити затримки, підвищити якість та забезпечити повну відповідальність.",
  },
}

export function AboutUsSection() {
  const { locale } = useLocale()
  const currentLocale = (locale as keyof typeof content) || "en"
  const texts = content[currentLocale]

  return (
    <section id="about-us" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">{texts.title}</h2>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <p className="md:text-lg leading-relaxed">{texts.description1}</p>
            <p className="md:text-lg leading-relaxed">{texts.description2}</p>
          </div>

          {/* Right: Interactive Map */}
          <div className="relative col-span-2">
            <div className="relative w-full" style={{ aspectRatio: "755/443" }}>
              <WorldMapWithHover />
            </div>
          </div>
        </div>
      </div>
      style={{
      fontFamily: "Onest",
     }}
    </section>
  )
}
