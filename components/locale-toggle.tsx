"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { useTheme } from "@/lib/theme-context"

export function LocaleToggle() {
  const { locale, setLocale } = useLocale()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const textColor = isDark ? "#FFFFFF" : "#000000"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "en" ? "uk" : "en")}
      style={{'backgroundColor': '#00000000'}}
      className="relative flex justify-center border px-3.5 py-2.5 border-transparent transition-colors duration-100 rounded-full hover:border-gray-300 hover:bg-black"
    >
      <span
        style={{
          color: textColor,
          fontWeight: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
        }}
      >
        {locale === "en" ? "EN" : "UK"}
      </span>
    </Button>
  )
}
