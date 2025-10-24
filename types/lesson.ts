export interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  content: string
  quiz: Question[]
  masteryLevel: number
}
