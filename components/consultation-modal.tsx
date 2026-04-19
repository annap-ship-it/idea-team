// components/consultation-modal.tsx

"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Loader2, Paperclip, X } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { getRecaptchaSiteKey } from "@/app/actions/recaptcha"

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const { t, locale } = useLocale()

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

  // Темная тема
  useEffect(() => {
    const checkDarkMode = () => setIsDark(document.documentElement.classList.contains("dark"))
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  // reCAPTCHA
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
      setSubmitStatus({ type: "error", message: t.pleaseAcceptTerms || "Будь ласка, прийміть умови" })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
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
        setSubmitStatus({ type: "success", message: t.messageSent || "Повідомлення успішно надіслано!" })
        setFormData({ name: "", email: "", message: "", acceptTerms: false })
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ""

        setTimeout(() => {
          setSubmitStatus(null)
          onClose()
        }, 3000)
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Не вдалося надіслати повідомлення" })
      }
    } catch (err) {
      console.error("Submit failed:", err)
      setSubmitStatus({ type: "error", message: "Не вдалося надіслати повідомлення. Спробуйте ще раз." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-[1120px] rounded-3xl overflow-hidden" 
        style={{ background: isDark ? "#1E1E1E" : "#FFFFFF" }}>
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-4xl hover:text-gray-400 z-10"
          style={{ color: isDark ? "#FFFFFF" : "#000000" }}
        >
          ×
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
          {/* Форма */}
          <div>
            <h2 className="font-bold mb-6" 
              style={{ 
                fontFamily: "Onest", 
                fontSize: "clamp(28px, 3vw, 40px)", 
                lineHeight: "1.15",
                color: isDark ? "#FFFFFF" : "#212121" 
              }}>
              {locale === "uk" 
                ? "Надішліть нам вашу ідею, і ми зв'яжемося з вами" 
                : "Send us a note with your idea, and we'll get in touch"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.typeYourName || "Введіть своє ім'я"}
                required
                className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[#FF6200]"
                style={{
                  background: isDark ? "#2A2A2A" : "#F9F9F9",
                  border: isDark ? "1px solid #3A3A3A" : "1px solid #D7DBE4",
                  color: isDark ? "#FFFFFF" : "#212121"
                }}
              />

              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.typeYourEmail || "Введіть свою електронну адресу"}
                required
                className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[#FF6200]"
                style={{
                  background: isDark ? "#2A2A2A" : "#F9F9F9",
                  border: isDark ? "1px solid #3A3A3A" : "1px solid #D7DBE4",
                  color: isDark ? "#FFFFFF" : "#212121"
                }}
              />

              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.typeYourMessage || "Введіть своє повідомлення"}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-md resize-none focus:outline-none focus:border-[#FF6200]"
                style={{
                  background: isDark ? "#2A2A2A" : "#F9F9F9",
                  border: isDark ? "1px solid #3A3A3A" : "1px solid #D7DBE4",
                  color: isDark ? "#FFFFFF" : "#212121"
                }}
              />

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer" 
                  style={{ color: isDark ? "#FFFFFF" : "#212121" }}>
                  <Paperclip size={18} color="#FF6200" />
                  {t.attachFile || "Додати файл (необов'язково)"}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".doc,.docx,.pdf,.ppt,.pptx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#FF6200] text-white rounded-full font-medium hover:bg-[#E55800] transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                    {t.sending || "Надсилання..."}
                  </>
                ) : (
                  t.send || "Надіслати"
                )}
              </button>

              {files.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border"
                      style={{ background: isDark ? "#2A2A2A" : "#F9F9F9", borderColor: isDark ? "#3A3A3A" : "#D7DBE4" }}>
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
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#FF6200]"
                />
                <label className="text-sm" style={{ color: isDark ? "#FFFFFF" : "#212121" }}>
                  {locale === "uk" 
                    ? "Я приймаю Умови та Положення. Надсилаючи свій запит, ви погоджуєтеся з умовами та положеннями. Ми можемо періодично надсилати вам маркетингові листи."
                    : "I Accept Terms and Conditions. By submitting your email, you accept terms and conditions. We may send you occasionally marketing emails."}
                </label>
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-md mt-5 ${submitStatus.type === "success" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>

          {/* Правая картинка */}
          <div className="relative hidden lg:block h-[520px]">
            <Image
              src="/images/f236a65b9dcdd59fe25f5a9694d5243e04bca53a-20-281-29.jpg"
              alt="Developer working"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
