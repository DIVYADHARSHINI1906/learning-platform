"use client"

import { useState } from "react"
import type { Lesson } from "@/types/lesson"
import QuizModal from "./quiz-modal"
import { BookOpen, Award, ChevronRight, Zap } from "lucide-react"

interface LessonCardProps {
  lesson: Lesson
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [mastery, setMastery] = useState(lesson.masteryLevel)
  const [isHovered, setIsHovered] = useState(false)

  const getMasteryColor = (level: number) => {
    if (level < 30) return "from-red-500 to-orange-500"
    if (level < 60) return "from-yellow-500 to-orange-500"
    if (level < 85) return "from-blue-500 to-cyan-500"
    return "from-green-500 to-emerald-500"
  }

  const getMasteryLabel = (level: number) => {
    if (level < 30) return "Beginner"
    if (level < 60) return "Intermediate"
    if (level < 85) return "Advanced"
    return "Master"
  }

  return (
    <>
      <div className="group h-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-2xl transition-all duration-500 ${isHovered ? "opacity-100 scale-105" : "opacity-0"}`}
        />

        <div className="relative glass rounded-2xl p-6 h-full flex flex-col border border-white/20 hover:border-white/40 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:gradient-text transition-all">
                {lesson.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>
            </div>
            <div
              className={`ml-4 p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 transform transition-transform ${isHovered ? "scale-110 rotate-12" : ""}`}
            >
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Content Preview */}
          <div className="flex-1 mb-6">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="line-clamp-3">{lesson.content}</p>
            </div>
          </div>

          {/* Mastery Level */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                Mastery Level
              </span>
              <span
                className={`text-sm font-bold bg-gradient-to-r ${getMasteryColor(mastery)} bg-clip-text text-transparent`}
              >
                {getMasteryLabel(mastery)}
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-white/10">
              <div
                className={`h-full bg-gradient-to-r ${getMasteryColor(mastery)} transition-all duration-500 shadow-lg shadow-primary/50`}
                style={{ width: `${mastery}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{mastery}% complete</p>
          </div>

          {/* Quiz Button */}
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 ease-out flex items-center justify-center gap-2 group/btn transform hover:scale-105 active:scale-95"
          >
            <Zap className="w-4 h-4" />
            Take Quiz
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {showQuiz && (
        <QuizModal
          lesson={lesson}
          onClose={() => setShowQuiz(false)}
          onComplete={(newMastery) => {
            setMastery(newMastery)
            setShowQuiz(false)
          }}
        />
      )}
    </>
  )
}
