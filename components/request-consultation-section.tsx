"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Loader2, Paperclip, X } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { getRecaptchaSiteKey } from "@/app/actions/recaptcha"

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      ready: (callback: () => void) => void
    }
  }
}

export function RequestConsultationSection() {
  const { t } = useLocale()

  const [isDark, setIsDark] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    acceptTerms: false,
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [siteKey, setSiteKey] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const key = await getRecaptchaSiteKey()
        setSiteKey(key)
      } catch (err) {
        console.error("Failed to load reCAPTCHA key:", err)
      }
    }
    fetchKey()
  }, [])

  useEffect(() => {
    if (scriptLoaded.current) return

    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit"
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    scriptLoaded.current = true

    const style = document.createElement("style")
    style.innerHTML = `.grecaptcha-badge { visibility: hidden !important; width: 0 !important; height: 0 !important; }`
    document.head.appendChild(style)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    const newFiles = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...newFiles].slice(0, 3))
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      setSubmitStatus({ type: "error", message: t.pleaseAcceptTerms || "Please accept the Terms and Conditions" })
      return
    }

    if (!siteKey) {
      setSubmitStatus({ type: "error", message: t.recaptchaNotLoaded || "reCAPTCHA not loaded. Refresh page." })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Wait for grecaptcha to be ready
      await new Promise<void>((resolve) => {
        if ((window as any).grecaptcha) {
          resolve()
        } else {
          const checkInterval = setInterval(() => {
            if ((window as any).grecaptcha) {
              clearInterval(checkInterval)
              resolve()
            }
          }, 100)
        }
      })

      const token = await window.grecaptcha.execute(siteKey, { action: "contact_form" })

      const form = new FormData()
      form.append("name", formData.name)
      form.append("email", formData.email)
      form.append("message", formData.message)
      form.append("recaptchaToken", token)
      files.forEach((file) => form.append("files", file))

      const res = await fetch("/api/contact", { method: "POST", body: form })
      const data = await res.json()

      if (res.ok) {
        setSubmitStatus({ type: "success", message: t.messageSent || "Message sent successfully!" })
        setFormData({ name: "", email: "", message: "", acceptTerms: false })
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ""
      } else {
        setSubmitStatus({ type: "error", message: data.error || t.failedToSend || "Failed to send message" })
      }
    } catch (err) {
      console.error("Submit failed:", err)
      setSubmitStatus({ type: "error", message: t.failedToSend || "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const services = [
    {
      id: "custom-web-solutions",
      title: t.customWebSolutions,
      description: t.customWebSolutionsDesc,
      image: "/images/3f00f5531b4c18a10739177bfb9caed239f86ebd.jpg",
      imageAlt: "Custom web solutions - laptop with code",
      reverse: false,
    },
    {
      id: "ux-ui-design",
      title: t.uiUxDesign,
      description: t.uiUxDesignDesc,
      image: "/images/8d64c3f21c11f588925bab77e415bd557cad385b.jpg",
      imageAlt: "UX/UI and Graphic Design workspace",
      reverse: true,
    },
    {
      id: "qa",
      title: t.qaAutomation,
      titleHighlight: t.locale === "uk" ? "Ручне та" : "Manual and",
      description: t.qaAutomationDesc,
      image: "/images/d99f7180c4bf0265069aa1c177dc0143e37e4d79.jpg",
      imageAlt: "Manual and Automation QA - testing screens",
      reverse: false,
    },
    {
      id: "devops",
      title: t.devops,
      description: t.devopsDesc,
      image: "/images/45fc920cb000857538e44a289f252b1506456ab8.jpg",
      imageAlt: "DevOps - keyboard and development",
      reverse: true,
    },
    {
      id: "data-analytics",
      title: t.dataAnalytics,
      description: t.dataAnalyticsDesc,
      image: "/images/ee788060a2aeeb43a086780a10e052075317f0cd.jpg",
      imageAlt: "Data Analytics - graphs and charts",
      reverse: false,
    },
    {
      id: "mobile-applications",
      title: t.mobileApplications,
      description: t.mobileApplicationsDesc,
      image: "/images/d00b7db9fb79ecd79b7d95fa7eecf2e662529ebe.jpg",
      imageAlt: "Mobile Applications - app icons",
      reverse: true,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      

      {/* Contact Form Section */}
      <section className="pt-10 pb-6 px-4 md:px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="rounded-2xl p-5 md:p-8 lg:p-9" style={{ background: "#1E1E1E" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Form */}
              <div>
                <h2
                  className="font-bold mb-6 text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                  style={{
                    fontFamily: "Onest",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    lineHeight: "1.15",
                  }}
                >
                  {t.getConsultation || "Send us a note with your idea, and we'll get in touch to provide guidance on implementation"}
                </h2>

 <form onSubmit={handleSubmit} className="space-y-5">
  <div>
    <label
      htmlFor="name"
      className="block mb-2 text-white font-onest text-base"
    >
      {t.name || "Name"}
    </label>
    <input
      id="name"
      type="text"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      placeholder={t.typeYourName || "Type your Name"}
      required
      className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#3A3A3A] rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-[#FF6200]"
    />
  </div>

  <div>
    <label
      htmlFor="email"
      className="block mb-2 text-white font-onest text-base"
    >
      {t.email || "Email"}
    </label>
    <input
      id="email"
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      placeholder={t.typeYourEmail || "Type your email"}
      required
      className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#3A3A3A] rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-[#FF6200]"
    />
  </div>

  <div>
    <label
      htmlFor="message"
      className="block mb-2 text-white font-onest text-base"
    >
      {t.message || "Message"}
    </label>
    <textarea
      id="message"
      rows={4}
      value={formData.message}
      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      placeholder={t.typeYourMessage || "Type your message"}
      required
      className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#3A3A3A] rounded-md text-white placeholder:text-white/50 resize-none focus:outline-none focus:border-[#FF6200]"
    />
  </div>
  <div className="flex flex-wrap items-center gap-4 mt-3">
  <label
      htmlFor="attach-file"
      className="flex items-center gap-2 cursor-pointer text-white hover:opacity-80 transition border border-[#212121] dark:border-[#3A3A3A] py-2 px-3 rounded-sm"
      style={{
        fontFamily: "Onest",
        fontSize: "16px",
      }}
    >
      <Paperclip size={18} color="#FF6200" />
      {t.attachFile || "Attach file (optional)"}
    </label>

    <input
      ref={fileInputRef}
      id="attach-file"
      type="file"
      multiple
      accept=".doc,.docx,.pdf,.ppt,.pptx"
      onChange={handleFileSelect}
      className="hidden"
    />


    <button
      type="submit"
      disabled={isSubmitting}
      className={`
        relative overflow-hidden w-full
        flex items-center justify-center gap-2.5
        px-6 py-3 text-sm md:text-base font-medium
        text-white
        bg-[#FF6200] rounded-full
        hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000]
        active:bg-gradient-to-br active:from-[#FF6200] active:to-[#000000]
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
      `}
      style={{
        minWidth: "200px",
        fontFamily: "Onest",
      }}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          {t.sending || "Sending..."}
        </>
      ) : (
        t.send || "Send"
      )}
    </button>
  </div>

  {files.length > 0 && (
    <div className="flex flex-wrap gap-3 mt-3">
      {files.map((file, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] rounded-full text-white text-sm border border-[#3A3A3A]"
        >
          <span className="truncate max-w-[180px]">{file.name}</span>
          <button type="button" onClick={() => removeFile(idx)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )}

  <div className="flex items-start gap-3 mt-5">
    <input
      type="checkbox"
      id="terms"
      checked={formData.acceptTerms}
      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
      className="mt-1 w-4 h-4 accent-[#FF6200] bg-transparent border-[#3A3A3A] rounded"
    />
    <label className="text-sm text-white/80 leading-relaxed" style={{ fontFamily: "Onest" }}>
      {t.iAccept || "I Accept"}{" "}
      <Link href="/terms" className="underline text-white hover:text-[#FF6200]">
        {t.acceptTerms || "Terms and Conditions"}
      </Link>
      .<br />
      {t.bySubmitting || "By submitting your email, you accept terms and conditions."}<br />
      {t.mayEcho || "We may send you occasionally marketing emails."}
    </label>
  </div>

  {submitStatus && (
    <div
      className={`p-4 rounded-md mt-5 ${
        submitStatus.type === "success" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
      }`}
    >
      {submitStatus.message}
    </div>
  )}
</form>
              </div>

              {/* Image */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src="/images/f236a65b9dcdd59fe25f5a9694d5243e04bca53a-20-281-29.jpg"
                  alt="Developer working at desk"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
