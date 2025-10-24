"use client"

import type React from "react"
import { useState } from "react"
import { Search, Loader, Sparkles } from "lucide-react"

interface SearchBarProps {
  onSearch: (topic: string) => void
  loading: boolean
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
    }
  }

  const suggestedTopics = ["Quantum Physics", "Web Development", "Machine Learning", "Climate Science", "Blockchain"]

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl transition-all duration-500 ${isFocused ? "opacity-100 scale-105" : "opacity-0"}`}
        />

        <div className="relative glass rounded-2xl p-1 border border-white/20 hover:border-white/40 transition-all duration-300 ease-out">
          <div className="flex items-center gap-3 px-6 py-4">
            {loading ? (
              <Loader className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-muted-foreground" />
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter a topic... (e.g., Quantum Physics, Web Development)"
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground disabled:opacity-50 text-lg transition-all duration-300 ease-out"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out flex items-center gap-2 group/btn"
            >
              <Sparkles className="w-4 h-4 group-hover/btn:animate-spin" />
              {loading ? "Generating..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 justify-center">
        {suggestedTopics.map((topic, idx) => (
          <button
            key={topic}
            onClick={() => {
              setInput(topic)
              onSearch(topic)
            }}
            disabled={loading}
            className="px-4 py-2 rounded-full bg-muted/50 hover:bg-muted text-foreground text-sm font-medium transition-all duration-300 ease-out hover:scale-105 disabled:opacity-50 border border-border/50 hover:border-border"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  )
}
