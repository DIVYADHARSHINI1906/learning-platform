"use client"

import { useState } from "react"
import type { Lesson } from "@/types/lesson"
import { X, CheckCircle, XCircle, Zap } from "lucide-react"

interface QuizModalProps {
  lesson: Lesson
  onClose: () => void
  onComplete: (mastery: number) => void
}

export default function QuizModal({ lesson, onClose, onComplete }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(30)

  const quiz = lesson.quiz
  const question = quiz[currentQuestion]

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    if (index === question.correctAnswer) {
      setScore(score + 1)
    }
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      const newMastery = Math.min(100, lesson.masteryLevel + Math.round((score / quiz.length) * 20))
      onComplete(newMastery)
    }
  }

  const progress = ((currentQuestion + 1) / quiz.length) * 100

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-bounce-in border border-border">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Zap className="w-6 h-6 text-accent" />
              {lesson.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Question {currentQuestion + 1} of {quiz.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-300 ease-out hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Question */}
          <div className="mb-8 animate-slide-up">
            <h3 className="text-xl font-semibold text-foreground mb-6">{question.question}</h3>

            {/* Answers */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg text-left font-medium transition-all duration-300 ease-out border-2 transform hover:scale-102 ${
                    selectedAnswer === index
                      ? index === question.correctAnswer
                        ? "border-green-500 bg-green-500/10 text-foreground scale-105"
                        : "border-red-500 bg-red-500/10 text-foreground scale-105"
                      : showResult && index === question.correctAnswer
                        ? "border-green-500 bg-green-500/10 text-foreground"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                  } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-500 animate-bounce-in" />
                    )}
                    {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-500 animate-bounce-in" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Result Message */}
          {showResult && (
            <div
              className={`p-4 rounded-lg mb-6 animate-slide-up border ${
                selectedAnswer === question.correctAnswer
                  ? "bg-green-500/10 border-green-500/30 text-green-700"
                  : "bg-red-500/10 border-red-500/30 text-red-700"
              }`}
            >
              <p className="font-semibold">
                {selectedAnswer === question.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
              </p>
              <p className="text-sm mt-1">{question.explanation}</p>
            </div>
          )}

          {/* Score */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              Current Score:{" "}
              <span className="font-bold text-primary text-lg">
                {score}/{quiz.length}
              </span>
            </p>
          </div>

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 ease-out animate-slide-up transform hover:scale-105 active:scale-95"
            >
              {currentQuestion < quiz.length - 1 ? "Next Question →" : "Complete Quiz 🎉"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
