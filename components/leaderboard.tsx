"use client"

import { Trophy } from "lucide-react"

export default function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: "Alex Chen", score: 2850, streak: 15, badge: "👑" },
    { rank: 2, name: "Jordan Smith", score: 2640, streak: 12, badge: "🥈" },
    { rank: 3, name: "Casey Lee", score: 2420, streak: 10, badge: "🥉" },
    { rank: 4, name: "Morgan Davis", score: 2180, streak: 8, badge: "⭐" },
    { rank: 5, name: "Taylor Brown", score: 1950, streak: 6, badge: "✨" },
  ]

  return (
    <div className="glass rounded-2xl p-8 border border-white/20 animate-slide-up">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h2 className="text-3xl font-bold">Global Leaderboard</h2>
      </div>

      <div className="space-y-3">
        {leaderboardData.map((entry, idx) => (
          <div
            key={entry.rank}
            className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 ease-out transform hover:scale-102 border border-white/10 hover:border-white/20"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="text-2xl font-bold text-muted-foreground w-8">{entry.badge}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{entry.name}</h3>
              <p className="text-sm text-muted-foreground">Streak: {entry.streak} days</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold gradient-text">{entry.score}</p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
