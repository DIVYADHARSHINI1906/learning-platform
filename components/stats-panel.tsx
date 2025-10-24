"use client"

import { Flame, BookOpen, Trophy } from "lucide-react"

interface StatsPanelProps {
  stats: {
    totalQuizzes: number
    totalMastery: number
    streak: number
  }
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
      {/* Quizzes Completed */}
      <div className="glass rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 ease-out group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Quizzes Completed</h3>
          <div className="p-2 rounded-lg bg-blue-500/20 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <p className="text-3xl font-bold gradient-text">{stats.totalQuizzes}</p>
        <p className="text-sm text-muted-foreground mt-2">Keep learning to increase this</p>
      </div>

      {/* Current Streak */}
      <div className="glass rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 ease-out group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Current Streak</h3>
          <div className="p-2 rounded-lg bg-orange-500/20 group-hover:scale-110 transition-transform">
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
          </div>
        </div>
        <p className="text-3xl font-bold text-orange-500">{stats.streak}</p>
        <p className="text-sm text-muted-foreground mt-2">Days in a row</p>
      </div>

      {/* Average Mastery */}
      <div className="glass rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 ease-out group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Avg Mastery</h3>
          <div className="p-2 rounded-lg bg-green-500/20 group-hover:scale-110 transition-transform">
            <Trophy className="w-5 h-5 text-green-500" />
          </div>
        </div>
        <p className="text-3xl font-bold text-green-500">{stats.totalMastery}%</p>
        <p className="text-sm text-muted-foreground mt-2">Overall progress</p>
      </div>
    </div>
  )
}
