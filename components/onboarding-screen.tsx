"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { GraduationCap } from "lucide-react"

const interestCategories = [
  {
    category: "Tech & Innovation",
    interests: ["Software & Coding", "Engineering & Robotics", "Data & AI"],
  },
  {
    category: "Business & Career",
    interests: ["Entrepreneurship & Startups", "Marketing & Media", "Management & Leadership"],
  },
  {
    category: "Arts & Creativity",
    interests: ["Art & Design", "Music & Performance", "Content Creation"],
  },
  {
    category: "Social & Recreation",
    interests: ["Sports & Fitness", "Gaming & Esports", "Volunteering & Community"],
  },
]

interface OnboardingScreenProps {
  onContinue: (selectedInterests: string[], studentData: StudentData) => void
}

export interface StudentData {
  name: string
  email: string
  studentId: string
  major: string
}

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const [studentData, setStudentData] = useState<StudentData>({
    name: "Ram Janini",
    email: "r.janini@gju.edu.jo",
    studentId: "20221504010",
    major: "Electrical Engineering",
  })

  const toggleInterest = (interest: string) => {
    setSelected((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleContinueStep1 = () => {
    setStep(2)
  }

  const handleContinueStep2 = () => {
    onContinue(selected, studentData)
  }

  if (step === 1) {
    return (
      <div className="h-full flex flex-col p-6 pt-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground text-balance">Welcome to ClubHaus</h1>
            </div>
          </div>
          <p className="text-muted-foreground mb-8 text-balance">
            Let's get to know you better. Fill in your student details to personalize your experience.
          </p>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                value={studentData.name}
                onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                className="h-12 bg-card border-border focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@gju.edu.jo"
                value={studentData.email}
                onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                className="h-12 bg-card border-border focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="studentId" className="text-sm font-medium text-foreground mb-2 block">
                Student ID
              </label>
              <Input
                id="studentId"
                placeholder="20240123"
                value={studentData.studentId}
                onChange={(e) => setStudentData({ ...studentData, studentId: e.target.value })}
                className="h-12 bg-card border-border focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="major" className="text-sm font-medium text-foreground mb-2 block">
                Major
              </label>
              <Input
                id="major"
                placeholder="Computer Science"
                value={studentData.major}
                onChange={(e) => setStudentData({ ...studentData, major: e.target.value })}
                className="h-12 bg-card border-border focus:border-accent"
              />
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleContinueStep1}
          className="w-full text-base font-semibold h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
        >
          Continue
        </Button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-6 pt-12">
      <div className="flex-1 overflow-y-auto -mr-2 pr-2">
        <h1 className="text-3xl font-bold text-foreground mb-3 text-balance">What are you into?</h1>
        <p className="text-muted-foreground mb-6 text-balance">
          Select interests so we can find the best events for you.
        </p>

        <div className="space-y-6 pb-4">
          {interestCategories.map((category) => (
            <div key={category.category} className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      "border-2 hover:scale-105 active:scale-95",
                      selected.includes(interest)
                        ? "bg-accent border-accent text-accent-foreground shadow-lg shadow-accent/25"
                        : "bg-card border-border text-foreground hover:border-accent/50",
                    )}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border/50">
        <Button
          size="lg"
          onClick={handleContinueStep2}
          className="w-full text-base font-semibold h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
        >
          Continue
        </Button>
        <button
          onClick={() => setStep(1)}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  )
}
