"use client"

import type React from "react"
import { useLocale } from "@/lib/locale-context"
import { translations } from "@/lib/i18n"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  category_id: string | null
  categories: { name: string; slug: string } | { name: string; slug: string }[] | null
  created_at: string
  published_at: string | null
  author_id: string
  locale?: string
  author?: {
    display_name: string | null
    avatar_url: string | null
  } | null
}

function getAuthorInitials(name: string | null | undefined): string {
  if (!name) return "AU"
  const parts = name.trim().split(" ")
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function getAuthorName(author: Post["author"]): string {
  return author?.display_name || "Author"
}

function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Automation: "bg-[#FF6200]",
    New: "bg-[#FF6200]",
    "Most Readed": "bg-[#FF6200]",
    News: "bg-[#FF6200]",
    Автоматизація: "bg-[#FF6200]",
    Новини: "bg-[#FF6200]",
    Популярне: "bg-[#FF6200]",
  }
  return colors[category] || "bg-[#FF6200]"
}

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  )
}

export default function BlogContent() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [displayAllPosts, setDisplayAllPosts] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { locale } = useLocale()
  const t = translations[locale as "en" | "uk"] || translations.en

  // ⚠️ IMPORTANT: Scroll to top on page load - DO NOT REMOVE
  // This ensures pages open from header, not footer, as per design requirements
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [locale])

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createBrowserClient()
      
      // Fetch posts in the current locale
      const targetLocale = locale === "uk" ? "uk" : "en"
      const { data: projectsCategory } = await supabase.from("categories").select("id").eq("slug", "projects").single()
      const projectsCategoryId = projectsCategory?.id

let localePostsQuery = supabase
        .from("posts")
        .select(
          `id, title, slug, excerpt, featured_image, category_id, categories(name, slug), created_at, published_at, author_id, locale, status`,
        )
        .eq("status", "published")
        .eq("locale", targetLocale)
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(50)

        if (projectsCategoryId) {
            englishPostsQuery = englishPostsQuery.neq("category_id", projectsCategoryId)
          }

          const { data: englishPosts } = await englishPostsQuery
      
      let finalPostsData = postsData

      if ((!localeError && postsData && postsData.length === 0) || localeError) {
        // If requested Ukrainian but none found, fall back to English
        if (targetLocale === "uk") {
          const { data: englishPosts } = await supabase
            .from("posts")
            .select(
              `id, title, slug, excerpt, featured_image, category_id, categories(name, slug), created_at, published_at, author_id, locale, status`,
            )
            .eq("status", "published")
            .neq("category_id", projectsCategoryId)
            .eq("locale", "en")
            .order("published_at", { ascending: false, nullsFirst: false })
            .limit(50)
          finalPostsData = englishPosts
        }
      }

      if (finalPostsData && finalPostsData.length > 0) {
        const nonProjectPosts = finalPostsData.filter((post) => {
          const categorySlug = Array.isArray(post.categories) ? post.categories[0]?.slug : post.categories?.slug
          return categorySlug !== "projects" && (!projectsCategoryId || post.category_id !== projectsCategoryId)
        })

        const authorIds = [...new Set(nonProjectPosts.map((p) => p.author_id).filter(Boolean))]
        let authorsMap: Record<string, { display_name: string | null; avatar_url: string | null }> = {}

        if (authorIds.length > 0) {
          const { data: authorsData } = await supabase
            .from("profiles")
            .select("id, display_name, avatar_url")
            .in("id", authorIds)

          if (authorsData) {
            authorsMap = authorsData.reduce(
              (acc, author) => {
                acc[author.id] = { display_name: author.display_name, avatar_url: author.avatar_url }
                return acc
              },
              {} as Record<string, { display_name: string | null; avatar_url: string | null }>,
            )
          }
        }

         const postsWithAuthors = nonProjectPosts.map((post) => ({
          ...post,
          author: authorsMap[post.author_id] || null,
        }))
        setPosts(postsWithAuthors)
      }
      setLoading(false)
    }
    fetchPosts()
  }, [locale])

  const defaultPosts: Post[] = [
    {
      id: "1",
      title:
        locale === "uk"
          ? "Повний посібник з аутсорсингу IT-персоналу в 2024 році"
          : "The Ultimate Guide to IT Personnel Outsourcing in 2024",
      slug: "it-personnel-outsourcing-guide-2024",
      excerpt:
        locale === "uk"
          ? "Дізнайтеся, як аутсорсинг IT-персоналу може трансформувати ваші бізнес-операції."
          : "Learn how IT personnel outsourcing can transform your business operations.",
      featured_image: "/it-team-working-remotely-on-computers.jpg",
      category_id: "c812ffe4-c357-4ade-bd6a-6dab6d9b1d79",
      categories: [{ name: locale === "uk" ? "Автоматизація" : "Automation", slug: "automation" }],
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      locale: locale,
      author: { display_name: "Author", avatar_url: null },
    },
    {
      id: "2",
      title:
        locale === "uk"
          ? "5 переваг аутсорсингу вашої команди розробників"
          : "5 Benefits of Outsourcing Your Development Team",
      slug: "benefits-outsourcing-development-team",
      excerpt:
        locale === "uk"
          ? "Дізнайтеся про ключові переваги роботи з аутсорсингованою командою розробників."
          : "Discover the key advantages of working with an outsourced development team.",
      featured_image: "/developers-collaborating-on-project.jpg",
      category_id: "c812ffe4-c357-4ade-bd6a-6dab6d9b1d79",
      categories: [{ name: locale === "uk" ? "Новини" : "New", slug: "new" }],
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      locale: locale,
      author: { display_name: "Author", avatar_url: null },
    },
    {
      id: "3",
      title:
        locale === "uk"
          ? "Як вибрати правильного IT-партнера для аутсорсингу"
          : "How to Choose the Right IT Outsourcing Partner",
      slug: "choose-right-it-outsourcing-partner",
      excerpt:
        locale === "uk"
          ? "Комплексний контрольний список для оцінки та вибору ідеального партнера."
          : "A comprehensive checklist for evaluating and selecting the perfect IT outsourcing partner.",
      featured_image: "/business-meeting-handshake-partnership.jpg",
      category_id: "c812ffe4-c357-4ade-bd6a-6dab6d9b1d79",
      categories: [{ name: locale === "uk" ? "Популярне" : "Most Readed", slug: "most-readed" }],
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      locale: locale,
      author: { display_name: "Author", avatar_url: null },
    },
  ]

  const displayPosts = posts.length > 0 ? posts : defaultPosts
  const filteredPosts = searchQuery.trim()
    ? displayPosts.filter((post) => {
        const query = searchQuery.toLowerCase()
        return post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query)
      })
    : displayPosts

  const displayFeatured = filteredPosts[0]
  const displayLatestNews = filteredPosts.slice(1, 3)
  const displayRegular = displayAllPosts ? filteredPosts.slice(3) : []
  const showViewAllButton = !displayAllPosts && filteredPosts.length > 3

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-8 h-8 border-2 border-[#FF6200] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <section className="py-8 md:py-12 border-b border-[#E5E5E5] dark:border-[#333] mt-20 sm:mt-24 lg:mt-28">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <input
            type="text"
            placeholder={t.search || "Search articles..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded border border-[#FF6200] bg-[var(--background)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[#FF6200]"
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <AnimatedCard>
            <h1
              className="text-4xl md:text-6xl font-bold text-center mt-[47px] mb-11 leading-[5rem]"
              style={{
                backgroundImage: "linear-gradient(90.39deg, #FF6200 34.5%, var(--foreground) 66.76%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.blog}
            </h1>
          </AnimatedCard>

          {displayFeatured && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <AnimatedCard delay={100}>
                <Link href={`/blog/${displayFeatured.slug}`} className="group block">
                  <div className="relative">
                    <div className="relative h-[300px] md:h-[400px] rounded-[14px] overflow-hidden mb-6">
                      {displayFeatured.categories && displayFeatured.categories[0]?.name && (
                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className={`px-4 py-2 rounded-[4px] text-sm font-medium text-white ${getCategoryColor(displayFeatured.categories[0].name)}`}
                          >
                            {displayFeatured.categories[0].name}
                          </span>
                        </div>
                      )}
                      <Image
                        src={displayFeatured.featured_image || "/placeholder.svg?height=400&width=600"}
                        alt={displayFeatured.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                    <h2
                      className="text-xl md:text-2xl font-bold mb-4 group-hover:text-[#FF6200] transition-colors"
                      style={{ color: "var(--foreground)" }}
                    >
                      {displayFeatured.title}
                    </h2>
                    <p className="text-[#787877] dark:text-[#CCCCCC] mb-6 line-clamp-3 text-sm md:text-base">
                      {displayFeatured.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FF6200] flex items-center justify-center text-white text-sm font-medium">
                        {getAuthorInitials(displayFeatured.author?.display_name)}
                      </div>
                      <span className="text-sm" style={{ color: "var(--foreground)" }}>
                        {getAuthorName(displayFeatured.author)}
                      </span>
                      <span className="text-sm text-[#787877] dark:text-[#CCCCCC]">•</span>
                      <span className="text-sm" style={{ color: "var(--foreground)" }}>
                        {formatDate(displayFeatured.published_at || displayFeatured.created_at, locale)}
                      </span>
                      <span className="text-sm text-[#787877] dark:text-[#CCCCCC]">•</span>
                      <span className="text-sm" style={{ color: "var(--foreground)" }}>
                        3 {t.minRead}
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedCard>

              <AnimatedCard delay={200}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
                    {t.lastNews}
                  </h3>
                  <div className="space-y-6">
                    {displayLatestNews.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block group border-b border-[#E5E5E5] dark:border-[#333] pb-6 last:border-0"
                      >
                        <h4
                          className="text-lg font-semibold mb-2 group-hover:text-[#FF6200] transition-colors"
                          style={{ color: "var(--foreground)" }}
                        >
                          {post.title}
                        </h4>
                        <p className="text-sm text-[#787877] dark:text-[#CCCCCC] mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-3">
                          {post.author && (
                            <>
                              <div className="w-6 h-6 rounded-full bg-[#FF6200] flex items-center justify-center text-white text-xs font-medium">
                                {getAuthorInitials(post.author.display_name)}
                              </div>
                              <span className="text-xs" style={{ color: "var(--foreground)" }}>
                                {post.author.display_name || "Anonymous"}
                              </span>
                            </>
                          )}
                          <span className="text-xs text-[#787877] dark:text-[#CCCCCC]">•</span>
                          <span className="text-xs" style={{ color: "var(--foreground)" }}>
                            {formatDate(post.published_at || post.created_at, locale)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </div>
          )}

          {displayRegular.length > 0 && (
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8">{t.blog}</h3>
              <div className="space-y-8">
                {displayRegular.map((post, idx) => (
                  <AnimatedCard key={post.id} delay={idx * 100}>
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <div className="flex gap-6 hover:opacity-80 transition">
                        <Image
                          src={post.featured_image || "/placeholder.svg"}
                          alt={post.title}
                          width={200}
                          height={150}
                          className="w-[200px] h-[150px] object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2 group-hover:text-[#FF6200] transition">
                            {post.title}
                          </h4>
                          <p className="text-foreground opacity-70 mb-3">{post.excerpt}</p>
                          <div className="flex items-center gap-3 text-sm opacity-70">
                            {post.author && (
                              <>
                                <span>{post.author.display_name || "Anonymous"}</span>
                                <span>•</span>
                              </>
                            )}
                            <span>{formatDate(post.created_at, locale)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          )}

          {showViewAllButton && (
            <div className="text-center mt-12">
              <button
                onClick={() => setDisplayAllPosts(true)}
                className="px-8 py-3 border border-[#FF6200] text-[#FF6200] rounded-lg hover:bg-[#FF6200] hover:text-white transition"
              >
                {t.viewAllPosts}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
