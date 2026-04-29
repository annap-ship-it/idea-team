import type React from "react"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Projects are currently stored as hardcoded data in the component
  // When projects are added to the database, update this to query from the database
  const projectsData: Record<string, any> = {
    "internal-monitoring-system-symbotic": {
      title: "Internal Monitoring System for Symbotic",
      excerpt: "Scalable internal monitoring tool for real-time tracking of robotic systems",
    },
    "ecommerce-platform": {
      title: "High-performance eCommerce Platform",
      excerpt: "Feature-rich e-commerce platform capable of handling millions of transactions",
    },
    "waltair-robotics": {
      title: "Waltair Robotics (Mobile App v4) Case Study",
      excerpt: "Waltair Robotics is a mobile application built for tennis coaches to remotely control a smart ball-feeding machine, record training sessions, and analyze performance through real-time statistics and charts.",
    },
    "ar-earring-virtual-try-on": {
      title: "AR Earring Virtual Try-On (Unity / Face Tracking)",
      excerpt: "Markerless AR earring try-on PoC built with Unity face tracking, dynamic anchors, and realistic accessory physics.",
    },
  }

  const project = projectsData[params.slug]

  if (!project) {
    return {
      title: "Project | Portfolio | Idea Team Dev",
      description: "View our software development project portfolio and case studies.",
    }
  }

  return {
    title: `${project.title} | Project Portfolio | Idea Team Dev`,
    description: project.excerpt || "Discover how we built this innovative software solution.",
    openGraph: {
      title: project.title,
      description: project.excerpt || "View this project case study from our portfolio.",
      type: "article",
    },
  }
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children
}
