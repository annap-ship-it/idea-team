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

  // Темная тема
  useEffect(() => {
    const checkDarkMode = () => setIsDark(document.documentElement.classList.contains("dark"))
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  // Загрузка reCAPTCHA
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
      setSubmitStatus({ type: "error", message: t.pleaseAcceptTerms || "Please accept the Terms and Conditions" })
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
        setSubmitStatus({ type: "success", message: t.messageSent || "Message sent successfully!" })
        setFormData({ name: "", email: "", message: "", acceptTerms: false })
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ""
        setTimeout(onClose, 1500)
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Failed to send message" })
      }
    } catch (err) {
      console.error("Submit failed:", err)
      setSubmitStatus({ type: "error", message: "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-[1120px] bg-[#1E1E1E] rounded-3xl overflow-hidden">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 z-10"
        >
          ×
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
          {/* Левая часть — форма */}
          <div>
            <h2 className="font-bold mb-6 text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
              style={{
                fontFamily: "Onest",
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: "1.15",
              }}>
              Send us a note with your idea, and we'll get in touch to provide guidance on implementation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Type your Name"
                  required
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#3A3A3A] rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-[#FF6200]"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Type your Email"
                  required
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#3A3A3A] rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-[#FF6200]"
                />
              </div>

              <div>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your Message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#3A3A3A] rounded-md text-white placeholder:text-white/50 resize-none focus:outline-none focus:border-[#FF6200]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <label
                  htmlFor="attach-file"
                  className="flex items-center gap-2 cursor-pointer text-white hover:opacity-80 transition border border-[#212121] py-2 px-3 rounded-sm"
                >
                  <Paperclip size={18} color="#FF6200" />
                  Attach file (optional)
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
                  className="w-full h-12 bg-[#FF6200] text-white rounded-full font-medium hover:bg-[#E55800] transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>

              {files.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] rounded-full text-white text-sm border border-[#3A3A3A]">
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
                <label className="text-sm text-white/80 leading-relaxed">
                  I Accept{" "}
                  <Link href="/terms" className="underline text-white hover:text-[#FF6200]">
                    Terms and Conditions
                  </Link>
                  . By submitting your email, you accept terms and conditions. We may send you occasionally marketing emails.
                </label>
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-md mt-5 ${submitStatus.type === "success" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>

          {/* Правая часть — картинка */}
          <div className="relative hidden lg:block h-[500px]">
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
