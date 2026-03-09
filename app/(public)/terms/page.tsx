"use client"

import { useLocale } from "@/lib/locale-context"
import { PolicyBanner } from "@/components/policy-banner"
import { RequestConsultationSection } from "@/components/request-consultation-section"

const content = {
  en: {
    title: "Terms of Use",
    effectiveDate: "Effective Date: January 1, 2024",
    sections: [
      {
        title: "1. Agreement to Terms",
        content: `By accessing or using IdeaTeam's website and services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.`
      },
      {
        title: "2. Services Description",
        content: `IdeaTeam provides custom software development services, including but not limited to:

• Web application development
• Mobile application development
• UI/UX design services
• Software consulting
• DevOps and cloud services
• Quality assurance and testing`
      },
      {
        title: "3. User Responsibilities",
        content: `When using our services, you agree to:

• Provide accurate and complete information
• Maintain the confidentiality of your account credentials
• Not use our services for any illegal or unauthorized purpose
• Not interfere with or disrupt our services or servers
• Comply with all applicable laws and regulations`
      },
      {
        title: "4. Intellectual Property",
        content: `All content, features, and functionality on our website are owned by IdeaTeam and are protected by international copyright, trademark, and other intellectual property laws.

Upon full payment for development services, clients receive ownership of the custom code created specifically for their project, as outlined in the project agreement.`
      },
      {
        title: "5. Payment Terms",
        content: `• Payment terms are specified in individual project agreements
• Deposits may be required before project commencement
• Late payments may result in project delays or suspension
• All fees are non-refundable unless otherwise stated in the project agreement`
      },
      {
        title: "6. Project Delivery",
        content: `• Project timelines are estimates and may vary based on scope changes
• Clients are responsible for timely feedback and approvals
• Final delivery is contingent upon full payment
• Source code transfer occurs after final payment confirmation`
      },
      {
        title: "7. Limitation of Liability",
        content: `IdeaTeam shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service in question.`
      },
      {
        title: "8. Termination",
        content: `We reserve the right to terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, or third parties.`
      },
      {
        title: "9. Changes to Terms",
        content: `We may modify these Terms of Use at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of our services after such modifications constitutes acceptance of the updated terms.`
      },
      {
        title: "10. Contact Information",
        content: `For questions about these Terms of Use, please contact us at:

Email: legal@ideateam.dev
Address: IdeaTeam Development Company`
      }
    ]
  },
  uk: {
    title: "Умови використання",
    effectiveDate: "Дата набрання чинності: 1 січня 2024",
    sections: [
      {
        title: "1. Прийняття умов",
        content: `Отримуючи доступ або використовуючи веб-сайт та послуги IdeaTeam, ви погоджуєтесь дотримуватися цих Умов використання. Якщо ви не погоджуєтесь з цими умовами, будь ласка, не використовуйте наші послуги.`
      },
      {
        title: "2. Опис послуг",
        content: `IdeaTeam надає послуги з розробки програмного забезпечення на замовлення, включаючи, але не обмежуючись:

• Розробка веб-додатків
• Розробка мобільних додатків
• Послуги UI/UX дизайну
• Консультації з програмного забезпечення
• DevOps та хмарні послуги
• Забезпечення якості та тестування`
      },
      {
        title: "3. Обов'язки користувача",
        content: `Використовуючи наші послуги, ви погоджуєтесь:

• Надавати точну та повну інформацію
• Зберігати конфіденційність ваших облікових даних
• Не використовувати наші послуги для незаконних або несанкціонованих цілей
• Не втручатися в роботу наших послуг або серверів
• Дотримуватися всіх застосовних законів та правил`
      },
      {
        title: "4. Інтелектуальна власність",
        content: `Весь контент, функції та функціональність на нашому веб-сайті належать IdeaTeam і захищені міжнародними законами про авторське право, товарні знаки та іншу інтелектуальну власність.

Після повної оплати послуг з розробки клієнти отримують право власності на код, створений спеціально для їхнього проєкту, як зазначено в угоді про проєкт.`
      },
      {
        title: "5. Умови оплати",
        content: `• Умови оплати вказані в індивідуальних угодах про проєкт
• Перед початком проєкту може вимагатися передоплата
• Затримка оплати може призвести до затримки або призупинення проєкту
• Усі збори не підлягають поверненню, якщо інше не зазначено в угоді про проєкт`
      },
      {
        title: "6. Доставка проєкту",
        content: `• Терміни проєкту є приблизними і можуть змінюватися залежно від зміни обсягу
• Клієнти несуть відповідальність за своєчасний зворотний зв'язок та схвалення
• Остаточна доставка залежить від повної оплати
• Передача вихідного коду відбувається після підтвердження остаточного платежу`
      },
      {
        title: "7. Обмеження відповідальності",
        content: `IdeaTeam не несе відповідальності за будь-які непрямі, випадкові, особливі, наслідкові або штрафні збитки, що виникають внаслідок використання вами наших послуг. Наша загальна відповідальність не перевищує суму, сплачену вами за конкретну послугу.`
      },
      {
        title: "8. Припинення",
        content: `Ми залишаємо за собою право припинити або призупинити ваш доступ до наших послуг у будь-який час, без попередження, за поведінку, яка, на нашу думку, порушує ці Умови використання або є шкідливою для інших користувачів, нас або третіх осіб.`
      },
      {
        title: "9. Зміни до умов",
        content: `Ми можемо змінювати ці Умови використання в будь-який час. Ми повідомимо вас про будь-які зміни, розмістивши нові умови на цій сторінці. Ваше подальше використання наших послуг після таких змін означає прийняття оновлених умов.`
      },
      {
        title: "10. Контактна інформація",
        content: `З питань щодо цих Умов використання, будь ласка, зв'яжіться з нами:

Email: legal@ideateam.dev
Адреса: IdeaTeam Development Company`
      }
    ]
  }
}

export default function TermsPage() {
  const { locale } = useLocale()
  const t = content[locale as keyof typeof content] || content.en

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <PolicyBanner
        title={t.title}
        lightBanner="/images/banner-terms-light.png"
        darkBanner="/images/banner-terms-dark.png"
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
