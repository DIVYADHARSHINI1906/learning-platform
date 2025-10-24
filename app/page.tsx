"use client"

import { useState, useEffect } from "react"
import SearchBar from "@/components/search-bar"
import LessonGrid from "@/components/lesson-grid"
import ParticleBackground from "@/components/particle-background"
import StatsPanel from "@/components/stats-panel"
import AchievementBadges from "@/components/achievement-badges"
import Leaderboard from "@/components/leaderboard"
import type { Lesson } from "@/types/lesson"

export default function Home() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [stats, setStats] = useState({ totalQuizzes: 0, totalMastery: 0, streak: 0 })
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("darkMode")
    if (saved) setDarkMode(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleSearch = async (searchTopic: string) => {
    setTopic(searchTopic)
    setLoading(true)

    try {
      const response = await fetch("/api/generate-lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: searchTopic }),
      })

      const data = await response.json()
      setLessons(data.lessons || [])

      setStats((prev) => ({
        ...prev,
        totalQuizzes: prev.totalQuizzes + 1,
        streak: prev.streak + 1,
      }))
    } catch (error) {
      console.error("Error fetching lessons:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden transition-colors duration-500 ${darkMode ? "dark" : ""}`}
    >
      <ParticleBackground />

      <div className="relative z-10">
        {/* Top Navigation Bar */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-lg gradient-text">LearnFlow</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-all duration-300 ease-out text-sm"
              >
                Leaderboard
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-muted transition-all duration-300 ease-out"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="pt-12 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-slide-down">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 gradient-text text-balance">
                Learn Anything
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Enter any topic and instantly get 5 adaptive lessons with interactive quizzes, achievements, and
                real-time progress tracking
              </p>
            </div>
          </div>
        </header>

        {/* Stats Panel */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            <StatsPanel stats={stats} />
          </div>
        </div>

        {/* Search Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>

        {/* Leaderboard */}
        {showLeaderboard && (
          <div className="px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-6xl mx-auto">
              <Leaderboard />
            </div>
          </div>
        )}

        {/* Lessons Grid */}
        {lessons.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 animate-slide-up">
                <h2 className="text-3xl font-bold mb-2">
                  Lessons on <span className="gradient-text">{topic}</span>
                </h2>
                <p className="text-muted-foreground">
                  Master these concepts with interactive quizzes and track your progress
                </p>
              </div>
              <LessonGrid lessons={lessons} />
            </div>
          </div>
        )}

        {/* Achievement Badges */}
        {lessons.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-6xl mx-auto">
              <AchievementBadges stats={stats} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && lessons.length === 0 && (
          <div className="px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="mb-6 animate-bounce-in">
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse-scale">
                  <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Start Your Learning Journey</h3>
              <p className="text-muted-foreground text-lg">
                Search for any topic to generate personalized lessons with quizzes
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
