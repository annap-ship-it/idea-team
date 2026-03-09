"use client"

import { useLocale } from "@/lib/locale-context"
import { PolicyBanner } from "@/components/policy-banner"
import { RequestConsultationSection } from "@/components/request-consultation-section"

const content = {
  en: {
    title: "Privacy Policy",
    effectiveDate: "Effective Date: January 1, 2024",
    sections: [
      {
        title: "1. Introduction",
        content: `Welcome to IdeaTeam ("Company", "we", "us", or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.`
      },
      {
        title: "2. Information We Collect",
        content: `We collect information that you provide directly to us, including:
        
• Personal identification information (name, email address, phone number)
• Business information (company name, job title)
• Project requirements and specifications
• Communication records between you and our team
• Payment and billing information (processed through secure third-party providers)`
      },
      {
        title: "3. How We Use Your Information",
        content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send you technical notices, updates, security alerts, and support messages
• Respond to your comments, questions, and customer service requests
• Communicate with you about products, services, offers, and events
• Monitor and analyze trends, usage, and activities in connection with our services`
      },
      {
        title: "4. Information Sharing",
        content: `We may share your information in the following situations:

• With service providers who perform services on our behalf
• To comply with legal obligations
• To protect and defend our rights and property
• With your consent or at your direction
• In connection with a merger, acquisition, or sale of assets`
      },
      {
        title: "5. Data Security",
        content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.`
      },
      {
        title: "6. Your Rights",
        content: `Depending on your location, you may have the following rights:

• Access to your personal data
• Correction of inaccurate data
• Deletion of your data
• Restriction of processing
• Data portability
• Objection to processing

To exercise these rights, please contact us at privacy@ideateam.dev`
      },
      {
        title: "7. Cookies and Tracking",
        content: `We use cookies and similar tracking technologies to collect and track information about your browsing activity. You can control cookies through your browser settings. For more details, please see our Cookie Policy.`
      },
      {
        title: "8. Contact Us",
        content: `If you have questions about this Privacy Policy, please contact us at:

Email: privacy@ideateam.dev
Address: IdeaTeam Development Company`
      }
    ]
  },
  uk: {
    title: "Політика конфіденційності",
    effectiveDate: "Дата набрання чинності: 1 січня 2024",
    sections: [
      {
        title: "1. Вступ",
        content: `Ласкаво просимо до IdeaTeam ("Компанія", "ми", "нас" або "наш"). Ми прагнемо захистити вашу особисту інформацію та ваше право на конфіденційність. Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо, розкриваємо та захищаємо вашу інформацію під час відвідування нашого веб-сайту або використання наших послуг.`
      },
      {
        title: "2. Інформація, яку ми збираємо",
        content: `Ми збираємо інформацію, яку ви надаєте нам безпосередньо, включаючи:

• Особисту ідентифікаційну інформацію (ім'я, електронна адреса, номер телефону)
• Ділову інформацію (назва компанії, посада)
• Вимоги та специфікації проєкту
• Записи комунікації між вами та нашою командою
• Платіжну та білінгову інформацію (обробляється через захищених сторонніх провайдерів)`
      },
      {
        title: "3. Як ми використовуємо вашу інформацію",
        content: `Ми використовуємо зібрану інформацію для:

• Надання, підтримки та покращення наших послуг
• Обробки транзакцій та надсилання пов'язаної інформації
• Надсилання технічних повідомлень, оновлень, сповіщень безпеки та повідомлень підтримки
• Відповіді на ваші коментарі, запитання та запити до служби підтримки
• Зв'язку з вами щодо продуктів, послуг, пропозицій та подій
• Моніторингу та аналізу тенденцій, використання та діяльності у зв'язку з нашими послугами`
      },
      {
        title: "4. Обмін інформацією",
        content: `Ми можемо ділитися вашою інформацією в наступних ситуаціях:

• З постачальниками послуг, які виконують послуги від нашого імені
• Для виконання юридичних зобов'язань
• Для захисту наших прав та власності
• За вашою згодою або за вашим вказівкою
• У зв'язку зі злиттям, поглинанням або продажем активів`
      },
      {
        title: "5. Безпека даних",
        content: `Ми впроваджуємо відповідні технічні та організаційні заходи для захисту вашої особистої інформації від несанкціонованого доступу, зміни, розкриття або знищення. Однак жоден метод передачі через Інтернет не є на 100% безпечним.`
      },
      {
        title: "6. Ваші права",
        content: `Залежно від вашого місцезнаходження, ви можете мати наступні права:

• Доступ до ваших особистих даних
• Виправлення неточних даних
• Видалення ваших даних
• Обмеження обробки
• Переносимість даних
• Заперечення проти обробки

Щоб скористатися цими правами, будь ласка, зв'яжіться з нами за адресою privacy@ideateam.dev`
      },
      {
        title: "7. Файли cookie та відстеження",
        content: `Ми використовуємо файли cookie та подібні технології відстеження для збору та відстеження інформації про вашу діяльність у браузері. Ви можете контролювати файли cookie через налаштування браузера. Для отримання додаткової інформації, будь ласка, перегляньте нашу Політику щодо файлів cookie.`
      },
      {
        title: "8. Зв'яжіться з нами",
        content: `Якщо у вас є запитання щодо цієї Політики конфіденційності, будь ласка, зв'яжіться з нами:

Email: privacy@ideateam.dev
Адреса: IdeaTeam Development Company`
      }
    ]
  }
}

export default function PrivacyPage() {
  const { locale } = useLocale()
  const t = content[locale as keyof typeof content] || content.en

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <PolicyBanner
        title={t.title}
        lightBanner="/images/privacy-light.png"
        darkBanner="/images/privacy-dark.png"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
          {t.effectiveDate}
        </p>
        
        <div className="space-y-8">
          {t.sections.map((section, index) => (
            <section key={index}>
              <h2 
                className="text-xl font-bold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                {section.title}
              </h2>
              <div 
                className="whitespace-pre-line text-base leading-relaxed policy-text"
                style={{ color: "rgba(var(--foreground, 255 255 255) / 0.6)" }}
              >
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
      
      <RequestConsultationSection />
    </main>
  )
}
