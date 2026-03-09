"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "@/lib/theme-context"
import { useLocale } from "@/lib/locale-context"
import { X } from "lucide-react"
import { getRecaptchaSiteKey } from "@/app/actions/recaptcha"
import Link from "next/link"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const { theme } = useTheme()
  const { t } = useLocale()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const scriptLoaded = useRef(false)
  const [siteKey, setSiteKey] = useState<string>("")

  const isDark = theme === "dark"

  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        const key = await getRecaptchaSiteKey()
        setSiteKey(key)
      } catch (error) {
        console.error("[v0] Failed to fetch reCAPTCHA site key:", error)
      }
    }
    fetchSiteKey()
  }, [])

  useEffect(() => {
    if (scriptLoaded.current || !siteKey) return

    // Load reCAPTCHA v3 script
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true

    document.head.appendChild(script)
    scriptLoaded.current = true

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [siteKey])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validExtensions = [".doc", ".docx", ".pdf", ".ppt", ".pptx"]
    const maxSize = 3 * 1024 * 1024 // 3MB
    const maxFiles = 3

    const validFiles = selectedFiles.filter((file) => {
      const ext = "." + file.name.split(".").pop()?.toLowerCase()
      return validExtensions.includes(ext) && file.size <= maxSize
    })

    if (attachedFiles.length + validFiles.length > maxFiles) {
      setSubmitStatus("error")
      return
    }

    setAttachedFiles((prev) => [...prev, ...validFiles].slice(0, maxFiles))
  }

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptTerms) {
      setSubmitStatus("error")
      return
    }

    if (!name || !email || !message) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)

    try {
      // Wait for grecaptcha to be available
      if (!siteKey) {
        setSubmitStatus("error")
        setIsSubmitting(false)
        return
      }

      // Get reCAPTCHA v3 token
      let grecaptcha = (window as any).grecaptcha

      // Wait up to 3 seconds for grecaptcha to load
      let attempts = 0
      while (!grecaptcha && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 100))
        grecaptcha = (window as any).grecaptcha
        attempts++
      }

      if (!grecaptcha) {
        setSubmitStatus("error")
        setIsSubmitting(false)
        return
      }

      const token = await grecaptcha.execute(siteKey, { action: "contact" })

      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("message", message)
      formData.append("recaptchaToken", token)

      attachedFiles.forEach((file) => {
        formData.append("files", file)
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      const responseData = await response.json()

      if (response.ok && responseData.success) {
        setSubmitStatus("success")
        setName("")
        setEmail("")
        setMessage("")
        setAttachedFiles([])
        setAcceptTerms(false)
        setTimeout(() => {
          onClose()
          setSubmitStatus(null)
        }, 2000)
      } else {
        setSubmitStatus("error")
        console.error("[v0] Submit error:", responseData)
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("[v0] Submit error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 md:p-4 overflow-y-auto"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        paddingTop: "clamp(60px, 8vh, 100px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-[14px] shadow-lg my-10"
        style={{
          maxWidth: "820px",
          backgroundColor: isDark ? "#212121" : "#FFFFFF",
          borderRadius: "14px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 hover:bg-opacity-80 transition z-10"
          style={{
            color: isDark ? "#FFFFFF" : "#212121",
          }}
        >
          <X size={24} />
        </button>

        {/* SECTION 1: Header (Title + Description) */}
        <div
          style={{
            padding: "clamp(18px, 3vw, 30px)",
            paddingBottom: "clamp(12px, 2vw, 18px)",
          }}
        >
          <h1
            className="font-bold mb-3 sm:mb-4"
            style={{
              color: isDark ? "#FFFFFF" : "#212121",
              fontFamily: "Onest",
              fontWeight: 700,
              fontSize: "clamp(26px, 5vw, 38px)",
              lineHeight: "1",
              letterSpacing: "-0.04em",
            }}
          >
            {t.letsTalk}
          </h1>

          <p
            className="mb-0"
            style={{
              color: isDark ? "#A8A8A8" : "#A8A8A8",
              fontFamily: "Onest",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.1vw, 16px)",
              lineHeight: "1.1",
            }}
          >
            {t.contactFormDesc}
          </p>
        </div>

        {/* SECTION 2: Form + Image (2 columns on desktop, 1 column on mobile) */}
        <style>{`
          .form-image-grid {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 24px;
            padding: clamp(18px, 3vw, 30px);
            padding-top: clamp(12px, 2vw, 18px);
            padding-bottom: clamp(12px, 2vw, 18px);
          }
          @media (max-width: 1023px) {
            .form-image-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
        `}</style>

        <div className="form-image-grid">
          {/* Left Column: Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="contact-name"
                className="block mb-2"
                style={{
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "clamp(13px, 1vw, 16px)",
                }}
              >
                {t.name}
              </label>
              <input
                id="contact-name"
                name="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.enterYourName}
                className="w-full px-4 rounded-lg border transition"
                style={{
                  backgroundColor: isDark ? "#373737" : "#FFFFFF",
                  borderColor: isDark ? "#626262" : "#A8A8A8",
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  height: "40px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="contact-email"
                className="block mb-2"
                style={{
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "clamp(13px, 1vw, 16px)",
                }}
              >
                {t.email}
              </label>
              <input
                id="contact-email"
                name="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.enterYourEmail}
                className="w-full px-4 rounded-lg border transition"
                style={{
                  backgroundColor: isDark ? "#373737" : "#FFFFFF",
                  borderColor: isDark ? "#626262" : "#A8A8A8",
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  height: "40px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="contact-message"
                className="block mb-2"
                style={{
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "clamp(13px, 1vw, 16px)",
                }}
              >
                {t.message}
              </label>
              <textarea
                id="contact-message"
                name="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.enterYourMessage}
                className="w-full px-4 py-2.5 rounded-lg border transition resize-none"
                style={{
                  backgroundColor: isDark ? "#373737" : "#FFFFFF",
                  borderColor: isDark ? "#626262" : "#A8A8A8",
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  height: "70px",
                }}
                required
              />
            </div>

            {/* Attached Files */}
            {attachedFiles.length > 0 && (
              <div className="mt-4">
                <label
                  style={{
                    color: isDark ? "#FFFFFF" : "#212121",
                    fontFamily: "Onest",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1vw, 16px)",
                  }}
                >
                  {t.attachFileOptional}
                </label>
                <div className="mt-2 space-y-2">
                  {attachedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-3 py-2 rounded-lg"
                      style={{
                        backgroundColor: isDark ? "#373737" : "#F5F5F5",
                        borderColor: isDark ? "#626262" : "#E0E0E0",
                      }}
                    >
                      <span
                        style={{
                          color: isDark ? "#FFFFFF" : "#212121",
                          fontFamily: "Onest",
                          fontSize: "clamp(12px, 1vw, 14px)",
                        }}
                      >
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        style={{ color: "#FF6200" }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Send button and File attachment */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2.5 rounded-full font-semibold transition hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
                style={{
                  backgroundColor: "#FF6200",
                  color: "#FFFFFF",
                  fontFamily: "Onest",
                  fontWeight: 600,
                  fontSize: "clamp(13px, 0.95vw, 15px)",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  minWidth: "140px",
                }}
              >
                {isSubmitting ? "Sending..." : t.send}
              </button>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(12px, 1vw, 14px)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: isDark ? "#FFFFFF" : "#212121",
                    fontFamily: "Onest",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M8 12.5L14.5 6C15.88 4.62 18.12 4.62 19.5 6C20.88 7.38 20.88 9.62 19.5 11L10 20.5C7.79 22.71 4.21 22.71 2 20.5C-0.21 18.29 -0.21 14.71 2 12.5L11 3.5"
                      stroke="#FF6200"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t.attachFileOptional}
                </span>
              </label>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <p className="text-green-500 text-center" style={{ color: "#4CAF50" }}>
                {t.successMessage}
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center" style={{ color: "#F44336" }}>
                {t.errorMessage}
              </p>
            )}
          </form>

          {/* Right Column: Image (desktop only) */}
          <div
            className="hidden lg:flex"
            style={{
              backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.05)",
              borderRadius: "6px",
              height: "278px",
              width: "100%",
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/f236a65b9dcdd59fe25f5a9694d5243e04bca53a-20-282-29.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "20px",
            }}
          >
            {/* Case Study Text */}
            <div
              style={{
                color: "#FFFFFF",
                textShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                paddingBottom: "20px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "Onest",
                  fontWeight: 500,
                  fontSize: "clamp(12px, 1vw, 14px)",
                  lineHeight: "1.3",
                  letterSpacing: "-0.02em",
                }}
              >
                {t.caseStudyText}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Acceptance Terms */}
        <style>{`
          .acceptance-grid {
            display: grid;
            gap: 24px;
            align-items: start;
            grid-template-columns: 1fr;
            padding: clamp(18px, 3vw, 28px);
            padding-top: clamp(12px, 2vw, 18px);
            border-top: 1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
          }
          @media (max-width: 1023px) {
            .acceptance-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
        `}</style>

        <div className="acceptance-grid">
          {/* Left Column: Checkbox + Terms Text */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "6px",
                marginBottom: "6px",
              }}
            >
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                style={{
                  accentColor: "#FF6200",
                  marginTop: "4px",
                  flexShrink: 0,
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
                required
              />
              <label
                htmlFor="terms"
                style={{
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 1vw, 14px)",
                  lineHeight: "1.3",
                  cursor: "pointer",
                }}
              >
                {t.iAccept || "I Accept"}{" "}
                <Link
                  href="/terms"
                  className="underline text-white hover:text-[#FF6200]"
                // optional: open in new tab if it's external/legal page
                // target="_blank"
                // rel="noopener noreferrer"
                >
                  {t.acceptTerms || "Terms and Conditions"}
                </Link>
              </label>
            </div>

            {/* "By submitting..." text */}
            <p
              style={{
                color: isDark ? "#A8A8A8" : "#A8A8A8",
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "clamp(11px, 0.9vw, 13px)",
                lineHeight: "1.3",
                marginLeft: "26px",
              }}
            >
              {t.bySubmitting} {t.mayEcho}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
