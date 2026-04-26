"use client"

import type React from "react"
import { useParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"
import { useLocale } from "@/lib/locale-context"
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  Check,
} from "lucide-react"
import type { JSX } from "react"
import { translations } from "@/lib/i18n"
import { AnimatedSection } from "@/components/AnimatedSection"

interface ContentBlock {
  type: string
  content?: string
  level?: number
  items?: string[] | { title: string; description: string }[]
}

interface PostContent {
  blocks?: ContentBlock[]
  type?: string
  content?: string
}

interface Post {
  id: string
  title: string
  slug: string
  content: PostContent | string | null
  excerpt: string
  featured_image: string | null
  category_id: string | null
  created_at: string
  author_id: string
  category?: { name: string; slug: string } | null
  profiles?: { display_name: string; avatar_url: string | null } | null
  locale?: string
}

interface RelatedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  category_id: string | null
  created_at: string
  category?: { name: string } | null
  profiles?: { display_name: string; avatar_url: string | null } | null
}

function formatDate(dateString: string, locale = "en-US"): string {
  const date = new Date(dateString)
  const localeMap = {
    uk: "uk-UA",
    en: "en-US",
  }
  return date.toLocaleDateString(localeMap[locale as keyof typeof localeMap] || "en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })
}

function estimateReadTime(content: PostContent | string | null): number {
  if (!content) return 5
  let text = ""
  if (typeof content === "string") {
    text = content.replace(/<[^>]*>/g, "")
  } else if (content.blocks) {
    text = content.blocks
      .map((block) => {
        if (block.content) return block.content
        if (Array.isArray(block.items)) {
          return block.items
            .map((item) => (typeof item === "string" ? item : `${item.title} ${item.description}`))
            .join(" ")
        }
        return ""
      })
      .join(" ")
  }
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.max(Math.ceil(wordCount / wordsPerMinute), 3)
}

function getCategoryColor(category: string): string {
  return "bg-[#FF6200]"
}

const benefitIcons = [DollarSign, Users, TrendingUp, Shield]

function ContentRenderer({ content, isDark }: { content: PostContent | string | null; isDark: boolean }) {
  if (!content) return null

  // Handle legacy HTML string content
  if (typeof content === "string") {
    return (
      <div
        className="article-content prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  if (content.type === "html" && typeof content.content === "string") {
    return (
      <div className="article-content" style={{ color: "var(--foreground)" }}>
        <style jsx global>{`
          .article-content h2 {
            font-size: 28px;
            font-weight: 700;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            color: var(--foreground);
          }
          .article-content h3 {
            font-size: 21.6px;
            font-weight: 600;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            color: var(--foreground);
          }
          .article-content p {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 1.5rem;
            color: #4A4A4A;
          }
          .dark .article-content p {
            color: #B0B0B0;
          }
          .article-content ul, .article-content ol {
            margin: 1.5rem 0;
            padding-left: 1.5rem;
          }
          .article-content li {
            margin-bottom: 0.75rem;
            line-height: 1.7;
            color: #4A4A4A;
          }
          .dark .article-content li {
            color: #B0B0B0;
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>
    )
  }

  // Handle JSON blocks content
  if (!content.blocks) return null

  return (
    <div className="article-content">
      {content.blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements
            const headingStyles =
              block.level === 2
                ? "text-[28px] font-bold mt-[3rem] mb-[1.5rem]"
                : "text-[21.6px] font-semibold mt-[2.5rem] mb-[1.25rem]"
            return (
              <AnimatedSection key={index} delay={index * 50}>
                <HeadingTag className={headingStyles} style={{ color: "var(--foreground)" }}>
                  {block.content}
                </HeadingTag>
              </AnimatedSection>
            )

          case "paragraph":
            return (
              <AnimatedSection key={index} delay={index * 50}>
                <p
                  className="text-base leading-[1.8] mb-6 text-[#4A4A4A] dark:text-[#B0B0B0] text-foreground"
                  style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}
                >
                  {block.content}
                </p>
              </AnimatedSection>
            )

          case "benefits":
            const benefitItems = block.items as { title: string; description: string }[]
            return (
              <AnimatedSection key={index} delay={index * 50}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
                  {benefitItems?.map((benefit, i) => {
                    const IconComponent = benefitIcons[i % benefitIcons.length]
                    return <BenefitCard key={i} benefit={benefit} icon={IconComponent} isDark={isDark} />
                  })}
                </div>
              </AnimatedSection>
            )

          case "list":
            const listItems = block.items as string[]
            return (
              <AnimatedSection key={index} delay={index * 50}>
                <ul className="my-6 space-y-3 pl-0">
                  {listItems?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4A4A4A] dark:text-[#B0B0B0]">
                      <span className="w-2 h-2 rounded-full bg-[#FF6200] mt-2 flex-shrink-0" />
                      <span className="leading-[1.7] text-popover-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            )

          default:
            return null
        }
      })}
    </div>
  )
}

function BenefitCard({
  benefit,
  icon: IconComponent,
  isDark,
}: { benefit: { title: string; description: string }; icon: any; isDark: boolean }) {
  return (
    <div
      className="p-6 rounded-[14px] border hover:border-[#FF6200] transition-all duration-300 group"
      style={{
        backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
        borderColor: isDark ? "#333333" : "#E5E5E5",
      }}
    >
      <div
        className="w-12 h-12 rounded-[8px] flex items-center justify-center mb-4 group-hover:bg-[#FF6200] transition-colors"
        style={{
          backgroundColor: isDark ? "rgba(255, 98, 0, 0.2)" : "rgba(255, 98, 0, 0.1)",
        }}
      >
        <IconComponent className="w-6 h-6 text-[#FF6200] group-hover:text-white transition-colors" />
      </div>
      <h4 className="font-semibold text-lg mb-2" style={{ color: isDark ? "#FFFFFF" : "#1A1A1A" }}>
        {benefit.title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: isDark ? "#9A9A9A" : "#666666" }}>
        {benefit.description}
      </p>
    </div>
  )
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const { locale } = useLocale()
  const allTranslations = { en: translations.en, uk: translations.uk }
  const t = allTranslations[locale as "en" | "uk"] || allTranslations.en

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  // ⚠️ IMPORTANT: Scroll to top on page load - DO NOT REMOVE
  // This ensures pages open from header, not footer, as per design requirements
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    async function fetchPost() {
      try {
        const supabase = createBrowserClient()

        // Try multiple slug variations to support both direct and localized slugs
        let { data, error } = await supabase
          .from("posts")
          .select(
            `
          id, title, slug, content, excerpt, featured_image, 
          category_id, created_at, author_id, locale, meta_title, meta_description
        `,
          )
          .eq("slug", slug)
          .eq("locale", locale === "uk" ? "uk" : "en")
          .eq("status", "published")
          .single()

        // If not found and we're looking for Ukrainian, try with -uk suffix on original slug
        if ((error || !data) && locale === "uk") {
          const ukSlug = slug.endsWith("-uk") ? slug : `${slug}-uk`
          const { data: ukData } = await supabase
            .from("posts")
            .select(
              `
            id, title, slug, content, excerpt, featured_image, 
            category_id, created_at, author_id, locale, meta_title, meta_description
          `,
            )
            .eq("slug", ukSlug)
            .eq("locale", "uk")
            .eq("status", "published")
            .single()

          if (ukData) {
            data = ukData
            error = null
          }
        }

        // If requested Ukrainian but still not found, fall back to English
        if ((error || !data) && locale === "uk") {
          const { data: enData, error: enError } = await supabase
            .from("posts")
            .select(
              `
            id, title, slug, content, excerpt, featured_image, 
            category_id, created_at, author_id, locale, meta_title, meta_description
          `,
            )
            .eq("slug", slug)
            .eq("locale", "en")
            .eq("status", "published")
            .single()

          data = enData
          error = enError
        }

        if (error || !data) {
          setPost(null)
          setLoading(false)
          return
        }

        console.log("[v0] Post loaded:", data.title, "locale:", data.locale)

        // Fetch category data separately
        let categoryData = null
        if (data.category_id) {
          const { data: cat } = await supabase
            .from("categories")
            .select("name, slug, id")
            .eq("id", data.category_id)
            .single()
          categoryData = cat
        }

        // Fetch author profile separately
        let profileData = null
        if (data.author_id) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name, avatar_url, id")
            .eq("id", data.author_id)
            .single()
          profileData = profile
        }

        const postWithRelations = {
          ...data,
          category: categoryData,
          profiles: profileData,
        } as Post

        setPost(postWithRelations)

        // Fetch related posts - ONLY from current fetched post's locale
        // This ensures English articles show English related, Ukrainian show Ukrainian related
       const { data: projectsCategory } = await supabase.from("categories").select("id").eq("slug", "projects").single()
        const projectsCategoryId = projectsCategory?.id

        let relatedPostsQuery = supabase
          .from("posts")
          .select(`id, title, slug, excerpt, featured_image, category_id, created_at, author_id, locale`)
          .eq("status", "published")
          .eq("locale", data.locale)
          .neq("slug", slug)
          .order("created_at", { ascending: false })
          .limit(3)

        if (projectsCategoryId) {
          relatedPostsQuery = relatedPostsQuery.neq("category_id", projectsCategoryId)
        }

        const { data: relatedData } = await relatedPostsQuery
        // Fetch author profiles and categories for related posts
        if (relatedData && relatedData.length > 0) {
          const enrichedRelatedPosts = await Promise.all(
            relatedData.map(async (post) => {
              let author = null
              let category = null

              if (post.author_id) {
                const { data: authorData } = await supabase
                  .from("profiles")
                  .select("display_name, avatar_url")
                  .eq("id", post.author_id)
                  .single()
                author = authorData
              }

              if (post.category_id) {
                const { data: catData } = await supabase
                  .from("categories")
                  .select("name, slug")
                  .eq("id", post.category_id)
                  .single()
                category = catData
              }

              return {
                ...post,
                profiles: author,
                category: category,
              }
            }),
          )
          setRelatedPosts(enrichedRelatedPosts as Post[])
        }
      } catch (err) {
        console.error("[v0] Error in fetchPost:", err)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug && locale) {
      fetchPost()
    }
  }, [slug, locale])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post?.title || "")

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    window.open(shareUrls[platform], "_blank", "width=600,height=400")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-8 h-8 border-2 border-[#FF6200] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "var(--background)" }}
      >
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          {t.articleNotFound || "Article not found"}
        </h1>
        <Link href="/blog" className="text-[#FF6200] hover:underline">
          {t.backToBlog}
        </Link>
      </div>
    )
  }

  const authorName = post.profiles?.display_name || "Jason Francisco"
  const authorInitials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Back Button - IMPORTANT: High margin-top to avoid header overlap on all screen sizes */}
      <AnimatedSection className="max-w-[1280px] mx-auto px-4 md:px-6 pt-24 md:pt-28 lg:pt-32 pb-2">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#787877] hover:text-[#FF6200] transition-colors text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToBlog}</span>
        </Link>
      </AnimatedSection>

      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          {/* Category */}
          {post.category?.name && (
            <AnimatedSection delay={100}>
              <div className="mb-4">
                <span
                  className={`px-4 py-2 rounded-[4px] text-sm font-medium text-white ${getCategoryColor(post.category.name)}`}
                >
                  {post.category.name}
                </span>
              </div>
            </AnimatedSection>
          )}

          {/* Title - H1 */}
          <AnimatedSection delay={200}>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight relative inline-block w-full"
              style={{
                background: isDark
                  ? "linear-gradient(90.39deg, #FFFFFF 34.5%, #FF6200 66.76%)"
                  : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {post.title}
            </h1>
          </AnimatedSection>

          {/* Meta Info */}
          <AnimatedSection delay={300}>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-[#E5E5E5] dark:border-[#333]">
              <div className="flex items-center gap-3">
                {post.profiles?.avatar_url ? (
                  <Image
                    src={post.profiles.avatar_url || "/placeholder.svg"}
                    alt={authorName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#FF6200] flex items-center justify-center text-white font-medium">
                    {authorInitials}
                  </div>
                )}
                <div>
                  <p className="font-medium" style={{ color: "var(--foreground)" }}>
                    {authorName}
                  </p>
                  <p className="text-sm text-[#787877]">{t.author}</p>
                </div>
              </div>

              <div className="flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(post.created_at || post.published_at, locale)}</span>
              </div>

              <div className="flex items-center gap-2 text-[#787877]">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{estimateReadTime(post.content)} {t.minRead}</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Featured Image with zoom on hover */}
          <AnimatedSection delay={400}>
            {post.featured_image && (
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-[14px] overflow-hidden mb-12 group">
                <Image
                  src={post.featured_image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            )}
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={500}>
            <ContentRenderer content={post.content} isDark={isDark} />
          </AnimatedSection>

          {/* Share Section */}
          <AnimatedSection delay={100}>
            <div className="mt-12 pt-8 border-t border-[#E5E5E5] dark:border-[#333]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#787877]" />
                  <span className="font-medium" style={{ color: "var(--foreground)" }}>
                    {t.shareThisArticle}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 hover:scale-110 transition-all"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-80 hover:scale-110 transition-all"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-80 hover:scale-110 transition-all"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-10 h-10 rounded-full bg-[#E5E5E5] dark:bg-[#333] flex items-center justify-center hover:bg-[#FF6200] hover:scale-110 transition-all group"
                    aria-label="Copy link"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-[#787877] group-hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
                {t.relatedArticles}
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((article, index) => (
                <AnimatedSection key={article.id} delay={index * 100}>
                  <Link href={`/blog/${article.slug}`} className="block group">
                    <div className="rounded-[14px] overflow-hidden border border-[#E5E5E5] dark:border-[#333] hover:border-[#FF6200] transition-all duration-300">
                      {/* Image */}
                      <div className="relative h-[200px] overflow-hidden">
                        {article.category?.name && (
                          <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-[4px] text-xs font-medium text-white bg-[#FF6200]">
                            {article.category.name}
                          </span>
                        )}
                        <Image
                          src={article.featured_image || "/placeholder.svg?height=200&width=400&query=technology blog"}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <p className="text-sm mb-2" style={{ color: "var(--foreground)" }}>
                          {formatDate(article.created_at, locale)}
                        </p>
                        <h3
                          className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-[#FF6200] transition-colors"
                          style={{ color: "var(--foreground)" }}
                        >
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#FF6200] flex items-center justify-center text-white text-xs">
                            {article.profiles?.display_name
                              ? article.profiles.display_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "JF"}
                          </div>
                          <span className="text-sm text-[#787877]">
                            {article.profiles?.display_name || "Jason Francisco"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
