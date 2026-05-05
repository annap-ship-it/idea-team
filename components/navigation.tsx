"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocaleToggle } from "@/components/locale-toggle"
import { useLocale } from "@/lib/locale-context"
import { useTheme } from "@/lib/theme-context"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Building2, Award, Briefcase, Menu } from "lucide-react"
import { ContactFormModal } from "@/components/contact-form-modal"
import { cn } from "@/lib/utils"

export function Navigation() {
  const { locale, t } = useLocale()
  const { theme } = useTheme()

  // The useLocale hook already provides the correct translated strings

  const [companyOpen, setCompanyOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false)
  const [hoverStates, setHoverStates] = useState<{ [key: number]: string }>({})
  const [isScrolled, setIsScrolled] = useState(false)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimerRefServices = useRef<NodeJS.Timeout | null>(null)
  const closeTimerRefProjects = useRef<NodeJS.Timeout | null>(null)

  const isDark = theme === "dark"
  const navBg = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.15)"
  const navBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.5)"
  const textColor = isDark ? "#FFFFFF" : "#000000"
  const featuredProjectLinks = [
    {
      href: "/projects/ar-earring-virtual-try-on",
      label: "AR Earring Virtual Try-On (Unity / Face Tracking)",
    },
    {
      href: "/projects/waltair-robotics",
      label: "Waltair Robotics (Mobile App v4)",
    },
    {
      href: "/projects/devops-for-yotewo",
      label: "DevOps for Yotewo",
    },
  ]
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setCompanyOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setCompanyOpen(false)
    }, 200)
  }

  const handleServicesMouseEnter = () => {
    if (closeTimerRefServices.current) {
      clearTimeout(closeTimerRefServices.current)
      closeTimerRefServices.current = null
    }
    setServicesOpen(true)
  }

  const handleServicesMouseLeave = () => {
    closeTimerRefServices.current = setTimeout(() => {
      setServicesOpen(false)
    }, 200)
  }

  const handleProjectsMouseEnter = () => {
    if (closeTimerRefProjects.current) {
      clearTimeout(closeTimerRefProjects.current)
      closeTimerRefProjects.current = null
    }
    setProjectsOpen(true)
  }

  const handleProjectsMouseLeave = () => {
    closeTimerRefProjects.current = setTimeout(() => {
      setProjectsOpen(false)
    }, 200)
  }

  const handleProjectHover = (index: number, state: string) => {
    setHoverStates((prevStates) => ({
      ...prevStates,
      [index]: state,
    }))
  }

  return (
    <>
      <ContactFormModal isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />

      {/* Desktop Navigation */}
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-50 hidden xl:block">
        <div
          className="flex items-center justify-between h-[52px] rounded-[50px] border"
          style={{
            maxWidth: "calc(100vw - 80px)",
            width: "max-content",
            paddingLeft: "14px",
            paddingRight: "6px",
            paddingTop: "6px",
            paddingBottom: "6px",
            gap: "40px",
            background: navBg,
            backdropFilter: "blur(40px)",
            border: `1px solid ${navBorder}`,
            boxShadow: "0px 4px 20px 0px rgba(88, 71, 61, 0.1)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {isDark ? (
              <img src="/images/logo-dark.svg" alt="IdeaTeam" width="120" height="19" className="block" />
            ) : (
              <img src="/images/logo-light.svg" alt="IdeaTeam" width="120" height="19" className="block" />
            )}
          </Link>

          <div className="flex items-center flex-shrink min-w-0" style={{ gap: "40px" }}>

            {/* Company Dropdown */}
            <div
              className={cn("relative flex justify-center px-3 py-1.5 border border-transparent transition-colors duration-100 rounded-full", {" border-gray-300": companyOpen})}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setCompanyOpen(!companyOpen)}
                className="flex items-center gap-1 whitespace-nowrap"
                style={{
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "16px",
                  letterSpacing: "0.02em",
                  color: textColor,
                }}
              >
                {t.company}
                {companyOpen ? (
                  <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
                ) : (
                  <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
                )}
              </button>

              {companyOpen && (
                <div
                  className="absolute z-50"
                  style={{
                    top: "50px",
                    left: "50%",
                    transform: "translateX(-5%)",
                    width: "552px",
                  }}
                >
                  {/* Triangle aligned to button */}
                  <div
                    className="absolute"
                    style={{
                      top: "-11px",
                      left: "5%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "11px solid transparent",
                      borderRight: "11px solid transparent",
                      borderBottom: `11px solid ${isDark ? "#212121" : "#FFFFFF"}`,
                    }}
                  />

                  {/* Dropdown */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: "552px",
                      height: "196px",
                      borderRadius: "14px",
                      background: isDark ? "#212121" : "#FFFFFF",
                      boxShadow: !isDark ? "0px 1px 1px #00000010" : undefined,
                    }}
                  >

                    <div className="flex h-full">
                      {/* Left column - Menu items */}
                      <div className="flex-1 p-6 flex flex-col justify-center gap-4">
                        <Link
                          href="/#about-us"
                          className="flex items-center gap-5 transition-all duration-300 ease-out group"
                          style={{
                            width: "186px",
                            height: "44px",
                            padding: "10px",
                            borderRadius: "8px",
                            background: isDark ? "#212121" : "#FFFFFF",
                            fontFamily: "Onest",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "110%",
                            letterSpacing: "-0.03em",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isDark ? "#212121" : "#FFFFFF"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          <div
                            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                            style={{ background: "#FF6200" }}
                          >
                            <Building2 className="h-4 w-4 text-white" />
                          </div>
                          {/* Using t.aboutUs from useLocale hook instead of currentTranslations */}
                          <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>{t.aboutUs}</span>
                        </Link>

                        <Link
                          href="/#our-expertise"
                          className="flex items-center gap-5 transition-all duration-300 ease-out group"
                          style={{
                            width: "186px",
                            height: "44px",
                            padding: "10px",
                            borderRadius: "8px",
                            background: isDark ? "#212121" : "#FFFFFF",
                            fontFamily: "Onest",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "110%",
                            letterSpacing: "-0.03em",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isDark ? "#212121" : "#FFFFFF"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          <div
                            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                            style={{ background: "#FF6200" }}
                          >
                            <Award className="h-4 w-4 text-white" />
                          </div>
                          {/* Using t.ourExperience from useLocale hook instead of currentTranslations */}
                          <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>{t.ourExperience}</span>
                        </Link>

                        <Link
                          href="/careers"
                          className="flex items-center gap-5 transition-all duration-300 ease-out group"
                          style={{
                            width: "186px",
                            height: "44px",
                            padding: "10px",
                            borderRadius: "8px",
                            background: isDark ? "#212121" : "#FFFFFF",
                            fontFamily: "Onest",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "110%",
                            letterSpacing: "-0.03em",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isDark ? "#212121" : "#FFFFFF"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          <div
                            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                            style={{ background: "#FF6200" }}
                          >
                            <Briefcase className="h-4 w-4 text-white" />
                          </div>
                          {/* Using t.careers from useLocale hook instead of currentTranslations */}
                          <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>{t.careers}</span>
                        </Link>
                      </div>

                      {/* Right column - World map and stats */}
                      <div
                        className="relative"
                        style={{
                          width: "320px",
                          height: "167px",
                          top: "14px",
                          left: "274px",
                          position: "absolute",
                        }}
                      >
                        {/* World map background */}
                        <div
                          className="absolute"
                          style={{
                            width: "257.82px",
                            height: "166.81px",
                            top: "0.09px",
                            left: "0.09px",
                          }}
                        >
                          <img
                            src={isDark ? "/images/world-20map.svg" : "/images/world-map-light.svg"}
                            alt="World map"
                            style={{
                              width: "100%",
                              height: "100%",
                              border: "0.5px solid rgba(255, 255, 255, 0.5)",
                              opacity: 1,
                            }}
                          />
                        </div>

                        {/* 20+ text */}
                        <div
                          className="absolute z-10"
                          style={{
                            top: "10px",
                            left: "13px",
                            width: "43px",
                            height: "26px",
                            fontFamily: "Onest",
                            fontWeight: 800,
                            fontSize: "24px",
                            lineHeight: "110%",
                            letterSpacing: "-0.03em",
                            color: isDark ? "#FFFFFF" : "#212121", // Updated text color
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            textAlign: "left",
                          }}
                        >
                          20+
                        </div>

                        {/* Different Countries text */}
                        <div
                          className="absolute z-10"
                          style={{
                            top: "36px",
                            left: "13px",
                            width: "138px",
                            height: "18px",
                            fontFamily: "Onest",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "110%",
                            letterSpacing: "-0.03em",
                            color: isDark ? "#FFFFFF" : "#212121", // Updated text color
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {/* Using t.differentCountries from useLocale hook instead of currentTranslations */}
                          {t.differentCountries}
                        </div>

                        {/* Read All Reviews button */}
                        <Link
                          href="/#feedbacks"
                          className="absolute transition-all duration-300 ease-out"
                          style={{
                            bottom: "14px",
                            left: "14px",
                            width: "auto",
                            minWidth: "140px",
                            maxWidth: "270px",
                            height: "30px",
                            borderRadius: "50px",
                            border: "1px solid #FF6200",
                            paddingTop: "4px",
                            paddingRight: "12px",
                            paddingBottom: "4px",
                            paddingLeft: "12px",
                            backdropFilter: "blur(4px)",
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "13px",
                            lineHeight: "100%",
                            color: isDark ? "#FFFFFF" : "#212121",
                            background: "transparent",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#FF62001A"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = "#FF620099"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = "#FF62001A"
                          }}
                        >
                          {/* Using t.readAllReviews from useLocale hook instead of currentTranslations */}
                          {t.readAllReviews}
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className={cn("relative flex justify-center px-3 py-1.5 border border-transparent transition-colors duration-100 rounded-full", {" border-gray-300": servicesOpen})}
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 whitespace-nowrap"
                style={{
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "16px",
                  letterSpacing: "0.02em",
                  color: textColor,
                }}
              >
                {t.services}

                {servicesOpen ? (
                  <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
                ) : (
                  <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
                )}
              </button>

              {servicesOpen && (
                <div
                  className="absolute z-50"
                  style={{
                    top: "50px",
                    left: "50%",
                    transform: "translateX(-25%)",
                    width: "552px",
                  }}
                >
                  {/* Triangle */}
                  <div
                    className="absolute"
                    style={{
                      top: "-11px",
                      left: "25%",
                      transform: "translateX(-50%)",
                      borderLeft: "11px solid transparent",
                      borderRight: "11px solid transparent",
                      borderBottom: `11px solid ${isDark ? "#212121" : "#FFFFFF"}`,
                    }}
                  />

                  {/* Dropdown */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: "552px",
                      height: "207px",
                      borderRadius: "14px",
                      background: isDark ? "#212121" : "#FFFFFF",
                      boxShadow: !isDark ? "0px 1px 1px #00000010" : undefined,
                    }}
                  >

                    <div className="flex h-full p-5 gap-5">
                      {/* Column 1 - 30% width */}
                      <div className="flex flex-col gap-3" style={{ width: "30%" }}>
                        <Link
                          href="/services#custom-web-solutions"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "rgba(255, 255, 255, 0.6)" : "#212121",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.customWebSolutions from useLocale hook instead of currentTranslations */}
                          {t.customWebSolutions}
                        </Link>
                        <Link
                          href="/services#mobile-applications"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.mobileApplications from useLocale hook instead of currentTranslations */}
                          {t.mobileApplications}
                        </Link>
                        <Link
                          href="/services#ux-ui-design"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.uiUxDesign from useLocale hook instead of currentTranslations */}
                          {t.uiUxDesign}
                        </Link>
                      </div>

                      {/* Column 2 - 30% width */}
                      <div className="flex flex-col gap-3" style={{ width: "30%" }}>
                        <Link
                          href="/services#qa"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.qaAutomation from useLocale hook instead of currentTranslations */}
                          {t.qaAutomation}
                        </Link>
                        <Link
                          href="/services#devops"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.devops from useLocale hook instead of currentTranslations */}
                          {t.devops}
                        </Link>
                        <Link
                          href="/services#data-analytics"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.dataAnalytics from useLocale hook instead of currentTranslations */}
                          {t.dataAnalytics}
                        </Link>
                      </div>

                      {/* Column 3 - Blog Article Card - 40% width */}
                      <div
                        className="relative"
                        style={{
                          width: "40%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Link
                          href="/services"
                          className="relative overflow-hidden transition-all duration-300 ease-out"
                          style={{
                            width: "196px",
                            height: "167px",
                            borderRadius: "6px",
                            boxShadow: "0px 3px 3px 0px #00000010",
                          }}
                        >
                          <img
                            src="/images/blog-article-laptop.jpg"
                            alt="Blog article"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-3 left-3.5 right-3.5">
                            <h3
                              style={{
                                fontFamily: "Onest",
                                fontWeight: 500,
                                fontSize: "16px",
                                lineHeight: "110%",
                                letterSpacing: "-0.03em",
                                color: "#FFFFFF",
                              }}
                            >
                              {/* Using t.allServices from useLocale hook instead of currentTranslations */}
                              {t.allServices}
                            </h3>
                          </div>
                          <button
                            className="absolute bottom-3.5 left-3.5"
                            style={{
                              width: "168px",
                              height: "30px",
                              borderRadius: "50px",
                              border: "1px solid #FF6200",
                              paddingTop: "4px",
                              paddingRight: "14px",
                              paddingBottom: "4px",
                              paddingLeft: "14px",
                              backdropFilter: "blur(4px)",
                              background: "transparent",
                              fontFamily: "Onest",
                              fontWeight: 400,
                              fontSize: "16px",
                              lineHeight: "100%",
                              color: "#FFFFFF",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#FF62001A"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent"
                            }}
                            onMouseDown={(e) => {
                              e.currentTarget.style.background = "#FF620099"
                            }}
                            onMouseUp={(e) => {
                              e.currentTarget.style.background = "#FF62001A"
                            }}
                          >
                            {/* Using t.viewAll from useLocale hook instead of currentTranslations */}
                            {t.viewAll}
                          </button>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div
              className={cn("relative flex justify-center border px-3 py-2.5 border-transparent transition-colors duration-100 rounded-full", {" border-gray-300": projectsOpen})}
              onMouseEnter={handleProjectsMouseEnter} 
              onMouseLeave={handleProjectsMouseLeave}>
              <button
                onClick={() => setProjectsOpen(!projectsOpen)}
                className="flex items-center gap-1 transition-colors whitespace-nowrap"
                style={{
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0.02em",
                  color: textColor,
                }}
              >
                {/* Using t.projects from useLocale hook instead of currentTranslations */}
                {t.projects}
                {projectsOpen ? (
                  <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
                ) : (
                  <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
                )}
              </button>

              {projectsOpen && (
                <div
                  className="absolute z-50"
                  onMouseEnter={handleProjectsMouseEnter}
                  onMouseLeave={handleProjectsMouseLeave}
                  style={{
                    top: "46px", // Changed top position to 46px margin from navigation top
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "auto",
                    minWidth: "600px",
                    maxWidth: "calc(100vw - 40px)",
                  }}
                >
                  {/* Triangle pointer */}
                  <div
                    className="absolute"
                    style={{
                      top: "-11px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "11px solid transparent",
                      borderRight: "11px solid transparent",
                      borderBottom: `11px solid ${isDark ? "#212121" : "#F5F5F5"}`,
                    }}
                  />

                  {/* Dropdown content */}
                  <div
                    style={{
                      width: "100%",
                      minHeight: "315px",
                      borderRadius: "14px",
                      background: isDark ? "#212121" : "#F5F5F5",
                      padding: "20px",
                      display: "flex",
                      gap: "20px",
                      boxShadow: "0px 1px 1px 0px #00000010",
                    }}
                  >
                    {/* Left Column - Image */}
                    <div style={{ width: "auto", flexShrink: 0 }}>
                      <Link
                        href="/projects"
                        onClick={() => setProjectsOpen(false)}
                        style={{
                          display: "block",
                          width: "235px",
                          height: "276px",
                          borderRadius: "6px",
                          background: "#000000",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <img
                          src="/images/projects-laptop.png"
                          alt="Multi-brand eCommerce Landing Pages"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                    </div>

                    {/* Right Column - Project Links */}
                    <div
                      style={{
                        width: "auto",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minWidth: "300px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <Link
                          href="/projects#3"
                          onClick={() => setProjectsOpen(false)}
                          className="transition-all duration-300 ease-out"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            padding: "6px 8px",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.multibrandEcommerce from useLocale hook instead of currentTranslations */}
                          {t.multibrandEcommerce}
                        </Link>
                        <Link
                          href="/projects#4"
                          onClick={() => setProjectsOpen(false)}
                          className="transition-all duration-300 ease-out"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            padding: "6px 8px",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.statisticsPlatform from useLocale hook instead of currentTranslations */}
                          {t.statisticsPlatform}
                        </Link>
                        <Link
                          href="/projects#2"
                          onClick={() => setProjectsOpen(false)}
                          className="transition-all duration-300 ease-out"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            padding: "6px 8px",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.sensorInfobox from useLocale hook instead of currentTranslations */}
                          {t.sensorInfobox}
                        </Link>
                        <Link
                          href="/projects#1"
                          onClick={() => setProjectsOpen(false)}
                          className="transition-all duration-300 ease-out"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            padding: "6px 8px",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          {/* Using t.ecommercePlatform from useLocale hook instead of currentTranslations */}
                          {t.ecommercePlatform}
                        </Link>
                        {featuredProjectLinks.map((project) => (
                          <Link
                            key={project.href}
                            href={project.href}
                            onClick={() => setProjectsOpen(false)}
                            className="transition-all duration-300 ease-out"
                            style={{
                              fontFamily: "Onest",
                              fontWeight: 400,
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0.02em",
                              color: isDark ? "#FFFFFF99" : "#21212199",
                              padding: "6px 8px",
                              borderRadius: "8px",
                            }}
                            onMouseDown={(e) => {
                              e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                              e.currentTarget.style.border = "1px solid #FF620033"
                            }}
                            onMouseUp={(e) => {
                              e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                              e.currentTarget.style.border = "none"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent"
                              e.currentTarget.style.border = "none"
                            }}
                          >
                            {project.label}
                          </Link>
                        ))}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          marginTop: "28px", // Updated from 14px to 28px for spacing between projects and heading
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 500,
                            fontSize: "24px",
                            lineHeight: "110%",
                            letterSpacing: "-0.03em",
                            color: isDark ? "#FFFFFF" : "#000000",
                            margin: 0,
                          }}
                        >
                          {/* Using t.portfolioHeading from useLocale hook instead of currentTranslations */}
                          {t.portfolioHeading}
                        </h3>
                        <Link
                          href="/projects"
                          onClick={() => setProjectsOpen(false)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#FF62001A"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = "#FF620099"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = "#FF62001A"
                          }}
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 500,
                            fontSize: "16px",
                            color: isDark ? "#FFFFFF" : "#212121",
                            padding: "4px 14px",
                            borderRadius: "50px",
                            border: "1px solid #FF6200",
                            background: "transparent",
                            backdropFilter: "blur(4px)",
                            textAlign: "center",
                            transition: "all 300ms ease-out",
                            textDecoration: "none",
                            display: "inline-block",
                            width: "auto",
                            minWidth: "fit-content",
                            height: "30px",
                            lineHeight: "22px",
                          }}
                        >
                          {/* Using t.exploreAllPortfolio from useLocale hook instead of currentTranslations */}
                          {t.exploreAllPortfolio}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className={cn("relative flex justify-center border px-3.5 py-2.5 border-transparent transition-colors duration-100 rounded-full hover:border-gray-300")}
              style={{
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.02em",
                color: textColor,
              }}
            >
              {/* Using t.blog from useLocale hook instead of currentTranslations */}
              {t.blog}
            </Link>

            <Link
              href="/careers"
              className={cn("relative flex justify-center border px-3.5 py-2.5 border-transparent transition-colors duration-100 rounded-full hover:border-gray-300")}
              style={{
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.02em",
                color: textColor,
              }}
            >
              {/* Using t.careers from useLocale hook instead of currentTranslations */}
              {t.careers}
            </Link>
          </div>

          <div className="flex items-center shrink-0" style={{ gap: "12px" }}>
            <LocaleToggle />
            <ThemeToggle />
            <button
              onClick={() => setContactFormOpen(true)}
              className="transition-all ease-out whitespace-nowrap bg-transparent hover:bg-[#FF62001A] active:bg-[#FF62004D] disabled:bg-[#FF62004D] disabled:cursor-not-allowed"
              style={{
                minWidth: "fit-content",
                width: "auto",
                height: "40px",
                borderRadius: "50px",
                border: "1px solid #FF6200",
                padding: "4px 16px",
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.02em",
                textAlign: "center",
                transitionDuration: "300ms",
                color: textColor,
              }}
            >
              {/* Using t.contactUs from useLocale hook instead of currentTranslations */}
              {t.contactUs}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 xl:hidden"
        style={{
          background: isScrolled ? "#FFFFFF26" : "transparent",
          border: isScrolled ? "1px solid #FFFFFF1A" : "none",
          backdropFilter: isScrolled ? "blur(40px)" : "none",
          boxShadow: isScrolled ? "0px 4px 20px 0px #58473D1A" : "none",
          borderRadius: isScrolled ? "50px" : "0px",
          height: isScrolled ? "52px" : "auto",
          paddingTop: isScrolled ? "6px" : "44px",
          paddingBottom: isScrolled ? "6px" : "44px",
          paddingLeft: "24px",
          paddingRight: "24px",
          transition: "all 300ms ease-out",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {isDark ? (
              <img
                src="/images/logo-dark.svg"
                alt="IdeaTeam"
                style={{
                  width: "120px",
                  height: "18.46px",
                }}
              />
            ) : (
              <img
                src="/images/logo-light.svg"
                alt="IdeaTeam"
                style={{
                  width: "120px",
                  height: "18.46px",
                }}
              />
            )}
          </Link>

          <div className="flex items-center" style={{ gap: "0px" }}>
            {/* Language Switcher */}
            <div
              style={{
                width: "62px",
                height: "40px",
                borderRadius: "50px",
                gap: "6px",
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              <LocaleToggle />
            </div>

            {/* Dark/Light Mode Switcher */}
            <div
              style={{
                width: "64px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemeToggle />
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 12L32 32"
                    stroke={textColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 12L12 32"
                    stroke={textColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <Menu
                  style={{
                    width: "24px",
                    height: "24px",
                    color: textColor,
                  }}
                />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="fixed z-50 animate-nav fade-in"
            style={{
              top: "96px",
              left: "16px",
              right: "16px",
              width: "auto",
              maxWidth: "720px",
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
              overflowX: "hidden",
              WebkitOverflowScrolling: "touch",
              borderRadius: "14px",
              background: isDark ? "#212121" : "#FFFFFF",
              boxShadow: !isDark ? "0px 4px 10px 0px #00000026" : undefined,
              paddingTop: "30px",
              paddingRight: "20px",
              paddingBottom: "30px",
              paddingLeft: "20px",
              gap: "13px",
              display: "flex",
              flexDirection: "column",
              animationTimingFunction: "ease-out",
              animationDuration: "300ms",
              margin: "0 auto",
            }}
          >
            {/* Company Accordion */}
            <div>
              <button
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                className="w-full flex items-center justify-between transition-all duration-300 ease-out"
                style={{
                  padding: "16px 20px",
                  borderRadius: "8px",
                  background: mobileCompanyOpen
                    ? isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.03)"
                    : "transparent",
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0.02em",
                  color: isDark ? "#FFFFFF" : "#212121",
                }}
              >
                {t.company}
                {mobileCompanyOpen ? (
                  <ChevronUp className="h-5 w-5" style={{ color: isDark ? "#FFFFFF" : "#212121" }} />
                ) : (
                  <ChevronDown className="h-5 w-5" style={{ color: isDark ? "#FFFFFF" : "#212121" }} />
                )}
              </button>

              {mobileCompanyOpen && (
                <div
                  className="animate-in fade-in slide-in-from-top-2"
                  style={{
                    marginTop: "8px",
                    padding: "16px",
                    animationTimingFunction: "ease-out",
                    animationDuration: "300ms",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: window.innerWidth >= 480 ? "1fr 1fr" : "1fr",
                      gap: "16px",
                      alignItems: "start",
                    }}
                  >
                    {/* Menu items - Left column on 480px+ */}
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/#about-us"
                        className="flex items-center gap-3 transition-all duration-300 ease-out"
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          background: "transparent",
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF" : "#212121",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.03)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        {/* Using t.aboutUs from useLocale hook instead of currentTranslations */}
                        <span>{t.aboutUs}</span>
                      </Link>

                      <Link
                        href="/#our-expertise"
                        className="flex items-center gap-3 transition-all duration-300 ease-out"
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          background: "transparent",
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF" : "#212121",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.03)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        {/* Using t.ourExperience from useLocale hook instead of currentTranslations */}
                        <span>{t.ourExperience}</span>
                      </Link>

                      <Link
                        href="/careers"
                        className="flex items-center gap-3 transition-all duration-300 ease-out"
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          background: "transparent",
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF" : "#212121",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.03)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Briefcase className="h-4 w-4 text-white" />
                        </div>
                        {/* Using t.careers from useLocale hook instead of currentTranslations */}
                        <span>{t.careers}</span>
                      </Link>
                    </div>

                    {/* World map card - Right column on 480px+ */}
                    <div
                      className="relative"
                      style={{
                        width: "100%",
                        maxWidth: "258px",
                        aspectRatio: "258 / 167",
                        borderRadius: "6px",
                        overflow: "visible",
                        marginTop: window.innerWidth < 480 ? "16px" : "0",
                      }}
                    >
                      {/* World map background */}
                      <img
                        src={isDark ? "/images/world-20map.svg" : "/images/world-map-light.svg"}
                        alt="World map"
                        className="absolute inset-0"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          border: "none",
                          borderRadius: "6px",
                        }}
                      />

                      {/* 20+ text overlay */}
                      <div
                        className="absolute z-10"
                        style={{
                          top: "min(10px, 3%)",
                          left: "min(13px, 5%)",
                          fontFamily: "Onest",
                          fontWeight: 800,
                          fontSize: "clamp(18px, 4.5vw, 24px)",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                          color: isDark ? "#FFFFFF" : "#212121",
                          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        20+
                      </div>

                      {/* Different Countries text */}
                      <div
                        className="absolute z-10"
                        style={{
                          top: "min(36px, 22%)",
                          left: "min(13px, 5%)",
                          right: "min(13px, 5%)",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "clamp(13px, 3.2vw, 16px)",
                          lineHeight: "120%",
                          letterSpacing: "-0.03em",
                          color: isDark ? "#FFFFFF" : "#212121",
                          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {/* Using t.differentCountries from useLocale hook instead of currentTranslations */}
                        {t.differentCountries}
                      </div>

                      {/* Read All Reviews button */}
                      <Link
                        href="/#feedbacks"
                        className="absolute transition-all duration-300 ease-out text-center flex items-center justify-center"
                        style={{
                          bottom: "min(14px, 8%)",
                          left: "min(14px, 5%)",
                          right: "min(14px, 5%)",
                          maxWidth: "188px",
                          height: "clamp(26px, 7vw, 30px)",
                          borderRadius: "50px",
                          border: "1px solid #FF6200",
                          padding: "4px 12px",
                          backdropFilter: "blur(4px)",
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "clamp(12px, 3vw, 16px)",
                          lineHeight: "100%",
                          color: isDark ? "#FFFFFF" : "#212121",
                          background: "transparent",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#FF62001A"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.background = "#FF620099"
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.background = "#FF62001A"
                        }}
                      >
                        {/* Using t.readAllReviews from useLocale hook instead of currentTranslations */}
                        {t.readAllReviews}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between transition-all duration-300 ease-out"
                style={{
                  padding: "16px 20px",
                  borderRadius: "8px",
                  background: mobileServicesOpen
                    ? isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.03)"
                    : "transparent",
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0.02em",
                  color: isDark ? "#FFFFFF" : "#212121",
                }}
              >
                {/* Using t.services from useLocale hook instead of currentTranslations */}
                {t.services}
                {mobileServicesOpen ? (
                  <ChevronUp className="h-5 w-5" style={{ color: isDark ? "#FFFFFF" : "#212121" }} />
                ) : (
                  <ChevronDown className="h-5 w-5" style={{ color: isDark ? "#FFFFFF" : "#212121" }} />
                )}
              </button>

              {mobileServicesOpen && (
                <div
                  className="mt-3 animate-in fade-in"
                  style={{
                    animationTimingFunction: "ease-out",
                    animationDuration: "300ms",
                  }}
                >
                  {/* Responsive layout: vertical on <480px, horizontal on >=480px */}
                  <div className="flex flex-col min-[720px]:flex-row min-[720px]:gap-5">
                    {/* Services links */}
                    <div className="flex flex-col gap-3 min-[720px]:grid min-[720px]:grid-cols-2 min-[720px]:flex-1">
                      <Link
                        href="/services#custom-web-solutions"
                        className="transition-all duration-300 ease-out p-2"
                        style={{
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF99" : "#21212199",
                          borderRadius: "8px",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                      >
                        {/* Using t.customWebSolutions from useLocale hook instead of currentTranslations */}
                        {t.customWebSolutions}
                      </Link>
                      <Link
                        href="/services#qa"
                        className="transition-all duration-300 ease-out p-2"
                        style={{
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF99" : "#21212199",
                          borderRadius: "8px",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                      >
                        {/* Using t.qaAutomation from useLocale hook instead of currentTranslations */}
                        {t.qaAutomation}
                      </Link>
                      <Link
                        href="/services#mobile-applications"
                        className="transition-all duration-300 ease-out p-2"
                        style={{
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF99" : "#21212199",
                          borderRadius: "8px",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                      >
                        {/* Using t.mobileApplications from useLocale hook instead of currentTranslations */}
                        {t.mobileApplications}
                      </Link>
                      <Link
                        href="/services#devops"
                        className="transition-all duration-300 ease-out p-2"
                        style={{
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF99" : "#21212199",
                          borderRadius: "8px",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                      >
                        {/* Using t.devops from useLocale hook instead of currentTranslations */}
                        {t.devops}
                      </Link>
                      <Link
                        href="/services#ux-ui-design"
                        className="transition-all duration-300 ease-out p-2"
                        style={{
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF99" : "#21212199",
                          borderRadius: "8px",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                      >
                        {/* Using t.uiUxDesign from useLocale hook instead of currentTranslations */}
                        {t.uiUxDesign}
                      </Link>
                      <Link
                        href="/services#data-analytics"
                        className="transition-all duration-300 ease-out p-2"
                        style={{
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF99" : "#21212199",
                          borderRadius: "8px",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                      >
                        {/* Using t.dataAnalytics from useLocale hook instead of currentTranslations */}
                        {t.dataAnalytics}
                      </Link>
                    </div>

                    {/* Blog Article Card */}
                    <div className="mt-5 min-[720px]:mt-0 min-[720px]:flex min-[720px]:items-start min-[720px]:justify-center min-[720px]:min-w-[200px]">
                      <Link
                        href="/services"
                        className="relative overflow-hidden block transition-all duration-300 ease-out hover:scale-105"
                        style={{
                          width: "100%",
                          maxWidth: "380px",
                          height: "180px",
                          borderRadius: "6px",
                          boxShadow: "0px 1px 1px 0px #00000010",
                        }}
                      >
                        <img
                          src="/images/blog-article-laptop.jpg"
                          alt="Blog article"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-3 left-3.5 right-3.5">
                          <h3
                            style={{
                              fontFamily: "Onest",
                              fontWeight: 500,
                              fontSize: "16px",
                              lineHeight: "110%",
                              letterSpacing: "-0.03em",
                              color: "#FFFFFF",
                            }}
                          >
                            {/* Using t.allServices from useLocale hook instead of currentTranslations */}
                            {t.allServices}
                          </h3>
                        </div>
                        <button
                          className="absolute bottom-3.5 left-3.5 right-3.5 transition-all duration-300 ease-out"
                          style={{
                            height: "36px",
                            borderRadius: "50px",
                            border: "1px solid #FF6200",
                            paddingTop: "4px",
                            paddingRight: "14px",
                            paddingBottom: "4px",
                            paddingLeft: "14px",
                            backdropFilter: "blur(4px)",
                            background: "rgba(255, 255, 255, 0.1)",
                            fontFamily: "Onest",
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "100%",
                            letterSpacing: "-0.03em",
                            color: "#FFFFFF",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#FF6200"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                          }}
                        >
                          {/* Using t.viewAll from useLocale hook instead of currentTranslations */}
                          {t.viewAll}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Projects Accordion */}
            <div>
              <button
                onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                className="w-full flex items-center justify-between transition-all duration-300 ease-out"
                style={{
                  padding: "16px 20px",
                  borderRadius: "8px",
                  background: mobileProjectsOpen
                    ? isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.03)"
                    : "transparent",
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0.02em",
                  color: isDark ? "#FFFFFF" : "#212121",
                }}
              >
                {/* Using t.projects from useLocale hook instead of currentTranslations */}
                {t.projects}
                {mobileProjectsOpen ? (
                  <ChevronUp className="h-5 w-5" style={{ color: isDark ? "#FFFFFF" : "#212121" }} />
                ) : (
                  <ChevronDown className="h-5 w-5" style={{ color: isDark ? "#FFFFFF" : "#212121" }} />
                )}
              </button>

              {mobileProjectsOpen && (
                <div
                  className="mt-4"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  {/* Project Links - full width on mobile */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      marginBottom: "16px",
                    }}
                  >
                    <Link
                      href="/projects#4"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setMobileProjectsOpen(false)
                      }}
                      className="transition-all duration-300 ease-out"
                      style={{
                        fontFamily: "Onest",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0.02em",
                        color: isDark ? "#FFFFFF99" : "#21212199",
                        padding: "6px 0",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.border = "1px solid #FF620033"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.border = "none"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.border = "none"
                        e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                      }}
                    >
                      {/* Using t.multibrandEcommerce from useLocale hook instead of currentTranslations */}
                      {t.multibrandEcommerce}
                    </Link>
                    <Link
                      href="/projects#1"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setMobileProjectsOpen(false)
                      }}
                      className="transition-all duration-300 ease-out"
                      style={{
                        fontFamily: "Onest",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0.02em",
                        color: isDark ? "#FFFFFF99" : "#21212199",
                        padding: "6px 0",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.border = "1px solid #FF620033"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.border = "none"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.border = "none"
                        e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                      }}
                    >
                      {/* Using t.statisticsPlatform from useLocale hook instead of currentTranslations */}
                      {t.statisticsPlatform}
                    </Link>
                    <Link
                      href="/projects#2"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setMobileProjectsOpen(false)
                      }}
                      className="transition-all duration-300 ease-out"
                      style={{
                        fontFamily: "Onest",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0.02em",
                        color: isDark ? "#FFFFFF99" : "#21212199",
                        padding: "6px 0",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.border = "1px solid #FF620033"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.border = "none"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.border = "none"
                        e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                      }}
                    >
                      {/* Using t.sensorInfobox from useLocale hook instead of currentTranslations */}
                      {t.sensorInfobox}
                    </Link>
                    <Link
                      href="/projects#3"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setMobileProjectsOpen(false)
                      }}
                      className="transition-all duration-300 ease-out"
                      style={{
                        fontFamily: "Onest",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0.02em",
                        color: isDark ? "#FFFFFF99" : "#21212199",
                        padding: "6px 0",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.border = "1px solid #FF620033"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.border = "none"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.border = "none"
                        e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                        e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                      }}
                    >
                      {/* Using t.ecommercePlatform from useLocale hook instead of currentTranslations */}
                      {t.ecommercePlatform}
                    </Link>
                       {featuredProjectLinks.map((project) => (
                      <Link
                        key={project.href}
                        href={project.href}
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileProjectsOpen(false)
                        }}
                        className="transition-all duration-300 ease-out"
                        style={{
                          fontFamily: "Onest",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0.02em",
                          color: isDark ? "#FFFFFF99" : "#21212199",
                          padding: "6px 0",
                          borderRadius: "8px",
                          textDecoration: "none",
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          e.currentTarget.style.border = "1px solid #FF620033"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          e.currentTarget.style.border = "none"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.border = "none"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          e.currentTarget.style.color = isDark ? "#FFC7A3" : "#000000"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = isDark ? "#FFFFFF99" : "#21212199"
                        }}
                      >
                        {project.label}
                      </Link>
                    ))}
                  </div>

                  <div className="flex gap-3 min-[480px]:gap-5">
                    {/* Portfolio Card - left column */}
                    <div className="flex-shrink-0">
                      <Link
                        href="/projects"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileProjectsOpen(false)
                        }}
                        className="block transition-transform duration-300 hover:scale-105"
                      >
                        {/* Mobile card (360px-479px) */}
                        <div
                          className="block min-[480px]:hidden"
                          style={{
                            width: "128px",
                            height: "148px",
                            borderRadius: "6px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/images/portfolio-card-mobile.png"
                            alt="Multi-brand E-commerce Landing Pages"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        {/* Tablet card (480px+) */}
                        <div
                          className="hidden min-[480px]:block"
                          style={{
                            width: "100%",
                            maxWidth: "180px",
                            height: "210px",
                            borderRadius: "6px",
                            background: "#000000",
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <img
                            src="/images/projects-laptop.png"
                            alt="Multi-brand eCommerce Landing Pages"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Heading and Button - right column */}
                    <div className="flex flex-col justify-center gap-3 flex-1 min-w-0">
                      <h3
                        style={{
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "18px",
                          lineHeight: "120%",
                          letterSpacing: "-0.03em",
                          color: isDark ? "#FFFFFF" : "#000000",
                          margin: 0,
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "normal",
                        }}
                        className="min-[480px]:text-xl"
                      >
                        {t.portfolioHeading}
                      </h3>
                      <Link
                        href="/projects"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileProjectsOpen(false)
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#FF62001A"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.background = "#FF620099"
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.background = "#FF62001A"
                        }}
                        style={{
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "13px",
                          color: isDark ? "#FFFFFF" : "#212121",
                          padding: "8px 12px",
                          borderRadius: "50px",
                          border: "1px solid #FF6200",
                          background: "transparent",
                          backdropFilter: "blur(4px)",
                          textAlign: "center",
                          transition: "all 300ms ease-out",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          whiteSpace: "normal",
                          maxWidth: "100%",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          lineHeight: "1.4",
                        }}
                        className="min-[480px]:text-sm self-start"
                      >
                        {t.exploreAllPortfolio}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Blog Link */}
            <Link
              href="/blog"
              className="w-full transition-all duration-300 ease-out"
              style={{
                padding: "16px 20px",
                borderRadius: "8px",
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.02em",
                color: isDark ? "#FFFFFF" : "#212121",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            >
              {/* Using t.blog from useLocale hook instead of currentTranslations */}
              {t.blog}
            </Link>

            {/* Careers Link */}
            <Link
              href="/careers"
              className="w-full transition-all duration-300 ease-out"
              style={{
                padding: "16px 20px",
                borderRadius: "8px",
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.02em",
                color: isDark ? "#FFFFFF" : "#212121",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            >
              {/* Using t.careers from useLocale hook instead of currentTranslations */}
              {t.careers}
            </Link>

            {/* Contact us button */}
            <button
              className="w-full transition-all duration-300 ease-out"
              style={{
                marginTop: "20px",
                height: "40px",
                borderRadius: "50px",
                background: "#FF6200",
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.02em",
                color: "#FFFFFF",
                padding: "12px 14px",
              }}
              onClick={() => {
                setContactFormOpen(true)
                setMobileMenuOpen(false)
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E55800"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FF6200"
              }}
            >
              {/* Using t.contactUs from useLocale hook instead of currentTranslations */}
              {t.contactUs}
            </button>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navigation
