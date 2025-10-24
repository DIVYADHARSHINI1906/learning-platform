import { type NextRequest, NextResponse } from "next/server"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface LessonData {
  id: string
  title: string
  description: string
  content: string
  quiz: Question[]
  masteryLevel: number
}

async function fetchRelatedQuestions(topic: string): Promise<string[]> {
  try {
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(topic)}&format=json&no_html=1`)
    const data = await response.json()

    const relatedTopics = data.RelatedTopics?.slice(0, 5).map((item: any) => item.Text) || []
    return relatedTopics
  } catch (error) {
    console.error("Error fetching questions:", error)
    return []
  }
}

function generateLesson(topic: string, index: number): LessonData {
  const levels = [
    "Fundamentals",
    "Intermediate Concepts",
    "Advanced Techniques",
    "Real-World Applications",
    "Future Trends",
  ]
  const descriptions = [
    "Learn the core concepts and principles",
    "Dive deeper into practical applications",
    "Master complex strategies and methods",
    "See how this topic impacts the world",
    "Explore emerging developments and innovations",
  ]

  const level = levels[index % levels.length]
  const description = descriptions[index % descriptions.length]

  return {
    id: `${topic}-${index}`,
    title: `${topic} - ${level}`,
    description,
    content: `Explore the ${level.toLowerCase()} of ${topic}. This comprehensive lesson covers essential concepts, practical applications, and expert insights to help you master this subject.`,
    quiz: [
      {
        question: `What is the primary focus of ${level.toLowerCase()} in ${topic}?`,
        options: [
          "Understanding core principles and building strong foundations",
          "Advanced applications only",
          "Historical context only",
          "Unrelated concepts",
        ],
        correctAnswer: 0,
        explanation: `${level} focuses on understanding core principles and building strong foundations for ${topic}.`,
      },
      {
        question: `Which of these is a key concept in ${topic}?`,
        options: [
          "Basic principles and foundational knowledge",
          "Random unrelated topics",
          "Fictional concepts",
          "Outdated theories",
        ],
        correctAnswer: 0,
        explanation: "Key concepts are the building blocks of understanding any subject.",
      },
      {
        question: `Why is learning ${level.toLowerCase()} important?`,
        options: [
          "It builds a strong foundation for advanced learning",
          "It is not important",
          "It only applies to beginners",
          "It is optional",
        ],
        correctAnswer: 0,
        explanation: `Strong ${level.toLowerCase()} knowledge is essential for progressing in ${topic}.`,
      },
    ],
    masteryLevel: 0,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json()

    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Invalid topic provided" }, { status: 400 })
    }

    const relatedQuestions = await fetchRelatedQuestions(topic)

    const lessons: LessonData[] = Array.from({ length: 5 }, (_, i) => generateLesson(topic, i))

    return NextResponse.json({ lessons })
  } catch (error) {
    console.error("Error generating lessons:", error)
    return NextResponse.json({ error: "Failed to generate lessons" }, { status: 500 })
  }
}
