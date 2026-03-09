"use client"

import { useLocale } from "@/lib/locale-context"
import { PolicyBanner } from "@/components/policy-banner"
import { RequestConsultationSection } from "@/components/request-consultation-section"

const content = {
  en: {
    title: "Cookie Policy",
    effectiveDate: "Effective Date: January 1, 2024",
    sections: [
      {
        title: "1. What Are Cookies",
        content: `Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.`
      },
      {
        title: "2. How We Use Cookies",
        content: `We use cookies for the following purposes:
          •    Essential Cookies: Required for the website to function properly
          •    Analytics Cookies: Help us understand how visitors interact with our website
          •    Functional Cookies: Remember your preferences and settings
          •    Marketing Cookies: Used to deliver relevant advertisements`
      },
      {
        title: "3. Types of Cookies We Use",
        content: `Essential Cookies:
These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms.

Analytics Cookies:
These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.

Functional Cookies:
These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.

Marketing Cookies:
These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.`
      },
      {
        title: "4. Third-Party Cookies",
        content: `Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:

•    Google Analytics - for website analytics
•    Google reCAPTCHA - for spam protection
•    Social media platforms - for social sharing functionality`
      },
      {
        title: "5. Managing Cookies",
        content: `You can control and manage cookies in various ways:

Browser Settings:
Most browsers allow you to refuse or accept cookies, delete cookies, and be notified when a cookie is set. These settings are usually found in the 'options' or 'preferences' menu of your browser.

Our Cookie Settings:
You can manage your cookie preferences through our cookie consent banner that appears when you first visit our website.

Note: Disabling certain cookies may affect the functionality of this website.`
      },
      {
        title: "6. Cookie Retention",
        content: `Session Cookies: Deleted when you close your browser
Persistent Cookies: Remain on your device for a set period or until you delete them

Our analytics cookies are retained for up to 2 years.`
      },
      {
        title: "7. Updates to This Policy",
        content: `We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date.`
      },
      {
        title: "8. Contact Us",
        content: `If you have questions about our use of cookies, please contact us at:

Email: privacy@ideateam.dev
Address: IdeaTeam Development Company`
      }
    ]
  },
  uk: {
    title: "Політика файлів cookie",
    effectiveDate: "Дата набрання чинності: 1 січня 2024",
    sections: [
      {
        title: "1. Що таке файли cookie",
        content: `Файли cookie - це невеликі текстові файли, які розміщуються на вашому комп'ютері або мобільному пристрої, коли ви відвідуєте веб-сайт. Вони широко використовуються для більш ефективної роботи веб-сайтів та надання інформації власникам веб-сайтів.`
      },
      {
        title: "2. Як ми використовуємо файли cookie",
        content: `Ми використовуємо файли cookie для наступних цілей:

•    Необхідні файли cookie: потрібні для правильної роботи веб-сайту
•    Аналітичні файли cookie: допомагають нам зрозуміти, як відвідувачі взаємодіють з нашим веб-сайтом
•    Функціональні файли cookie: запам'ятовують ваші налаштування та переваги
•    Маркетингові файли cookie: використовуються для показу релевантної реклами`
      },
      {
        title: "3. Типи файлів cookie, які ми використовуємо",
        content: `Необхідні файли cookie:
Ці файли cookie необхідні для функціонування веб-сайту і не можуть бути вимкнені. Вони зазвичай встановлюються тільки у відповідь на ваші дії, такі як налаштування конфіденційності або заповнення форм.

Аналітичні файли cookie:
Ці файли cookie дозволяють нам підраховувати відвідування та джерела трафіку, щоб ми могли вимірювати та покращувати продуктивність нашого сайту.

Функціональні файли cookie:
Ці файли cookie дозволяють веб-сайту надавати розширену функціональність та персоналізацію.

Маркетингові файли cookie:
Ці файли cookie можуть бути встановлені через наш сайт нашими рекламними партнерами для створення профілю ваших інтересів та показу вам релевантної реклами на інших сайтах.`
      },
      {
        title: "4. Файли cookie третіх сторін",
        content: `Деякі файли cookie розміщуються сторонніми службами, які з'являються на наших сторінках. Ми використовуємо наступні сторонні служби:

•    Google Analytics - для аналітики веб-сайту
•    Google reCAPTCHA - для захисту від спаму
•    Платформи соціальних мереж - для функцій соціального обміну`
      },
      {
        title: "5. Управління файлами cookie",
        content: `Ви можете контролювати та керувати файлами cookie різними способами:

Налаштування браузера:
Більшість браузерів дозволяють вам відмовитися від файлів cookie або прийняти їх, видалити файли cookie та отримувати сповіщення про встановлення файлу cookie.

Наші налаштування файлів cookie:
Ви можете керувати своїми налаштуваннями файлів cookie через наш банер згоди на файли cookie, який з'являється при першому відвідуванні нашого веб-сайту.

Примітка: Вимкнення певних файлів cookie може вплинути на функціональність цього веб-сайту.`
      },
      {
        title: "6. Зберігання файлів cookie",
        content: `Сеансові файли cookie: видаляються при закритті браузера
Постійні файли cookie: залишаються на вашому пристрої протягом встановленого періоду або до їх видалення

Наші аналітичні файли cookie зберігаються до 2 років.`
      },
      {
        title: "7. Оновлення цієї політики",
        content: `Ми можемо час від часу оновлювати цю Політику файлів cookie. Будь-які зміни будуть опубліковані на цій сторінці з оновленою датою набрання чинності.`
      },
      {
        title: "8. Зв'яжіться з нами",
        content: `Якщо у вас є запитання щодо нашого використання файлів cookie, будь ласка, зв'яжіться з нами:

Email: privacy@ideateam.dev
Адреса: IdeaTeam Development Company`
      }
    ]
  }
}

export default function CookiePolicyPage() {
  const { locale } = useLocale()
  const t = content[locale as keyof typeof content] || content.en

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <PolicyBanner
        title={t.title}
        lightBanner="/images/cookie-light.png"
        darkBanner="/images/cookie-dark.png"
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
                className="whitespace-pre-line text-base leading-relaxed"
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
