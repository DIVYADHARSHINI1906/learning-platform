"use client"

import type { Lesson } from "@/types/lesson"
import LessonCard from "./lesson-card"

interface LessonGridProps {
  lessons: Lesson[]
}

export default function LessonGrid({ lessons }: LessonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className="animate-scale-up"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <LessonCard lesson={lesson} />
        </div>
      ))}
    </div>
  )
}
