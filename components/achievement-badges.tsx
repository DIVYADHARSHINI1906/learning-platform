"use client"

import { Star, Zap, Target, Brain, Crown } from "lucide-react"

interface AchievementBadgesProps {
  stats: {
    totalQuizzes: number
    totalMastery: number
    streak: number
  }
}

export default function AchievementBadges({ stats }: AchievementBadgesProps) {
  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first quiz",
      icon: Star,
      unlocked: stats.totalQuizzes >= 1,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 2,
      name: "On Fire",
      description: "Maintain a 3-day streak",
      icon: Zap,
      unlocked: stats.streak >= 3,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 3,
      name: "Focused Learner",
      description: "Complete 5 quizzes",
      icon: Target,
      unlocked: stats.totalQuizzes >= 5,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 4,
      name: "Master Mind",
      description: "Achieve 80% mastery",
      icon: Brain,
      unlocked: stats.totalMastery >= 80,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      name: "Legend",
      description: "Complete 10 quizzes",
      icon: Crown,
      unlocked: stats.totalQuizzes >= 10,
      color: "from-yellow-400 to-yellow-600",
    },
  ]

  return (
    <div className="animate-slide-up">
      <h3 className="text-2xl font-bold mb-6">Achievements Unlocked</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {achievements.map((achievement, idx) => {
          const Icon = achievement.icon
          return (
            <div
              key={achievement.id}
              className={`glass rounded-xl p-4 border transition-all duration-300 ease-out transform hover:scale-105 ${
                achievement.unlocked
                  ? `border-white/40 hover:border-white/60 animate-bounce-in`
                  : "border-white/10 opacity-50"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-3 ${
                  achievement.unlocked ? "animate-pulse-scale" : ""
                }`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-sm text-foreground">{achievement.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
