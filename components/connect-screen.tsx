"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Trophy, BookOpen, Coffee, MessageSquare, Eye } from "lucide-react"
import type { StudentData } from "@/components/onboarding-screen"

interface ConnectScreenProps {
  studentData: StudentData
  selectedInterests: string[]
}

interface Student {
  id: string
  name: string
  major: string
  matchScore: number
  matchReason: string
  skills: string[]
  avatar: string
  intent?: string
}

const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Rami Janini",
    major: "Computer Engineering",
    matchScore: 94,
    matchReason: "You both code in Python & Flutter",
    skills: ["Python", "Flutter", "UI/UX"],
    avatar: "RJ",
    intent: "Looking for teammate",
  },
  {
    id: "2",
    name: "Layla Hassan",
    major: "Software Engineering",
    matchScore: 89,
    matchReason: "Taking 'Signals & Systems' this semester",
    skills: ["React", "Node.js", "AWS"],
    avatar: "LH",
    intent: "Study buddy",
  },
  {
    id: "3",
    name: "Omar Khalil",
    major: "Computer Science",
    matchScore: 85,
    matchReason: "Looking for a designer for Hult Prize",
    skills: ["UI/UX", "Figma", "Product Design"],
    avatar: "OK",
    intent: "Team formation",
  },
  {
    id: "4",
    name: "Noor Al-Fayez",
    major: "Data Science",
    matchScore: 78,
    matchReason: "Both interested in AI & Machine Learning",
    skills: ["Python", "TensorFlow", "Data Analysis"],
    avatar: "NA",
    intent: "Mentor available",
  },
  {
    id: "5",
    name: "Tariq Mansour",
    major: "Cybersecurity",
    matchScore: 72,
    matchReason: "Member of Robotics Club & AI Club",
    skills: ["Security", "Networking", "Python"],
    avatar: "TM",
  },
  {
    id: "6",
    name: "Maya Suleiman",
    major: "Information Systems",
    matchScore: 68,
    matchReason: "Both attending Web Dev Bootcamp",
    skills: ["JavaScript", "CSS", "React"],
    avatar: "MS",
    intent: "Coffee chat",
  },
]

const INTENTS = [
  { value: "teammate", label: "Find Teammate", icon: Target },
  { value: "study", label: "Study Buddy", icon: BookOpen },
  { value: "mentor", label: "Mentor", icon: Trophy },
  { value: "casual", label: "Casual", icon: Coffee },
]

export function ConnectScreen({ studentData, selectedInterests }: ConnectScreenProps) {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null)
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const filteredStudents = selectedIntent
    ? MOCK_STUDENTS.filter((s) => s.intent?.toLowerCase().includes(selectedIntent))
    : MOCK_STUDENTS

  const handleConnect = (student: Student) => {
    setSelectedStudent(student)
    setShowConnectionModal(true)
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background">
      {/* Intent Toggle */}
      <div className="px-4 py-4 bg-card border-b border-border sticky top-0 z-10">
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Find by intent</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedIntent(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              selectedIntent === null
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All
          </button>
          {INTENTS.map((intent) => {
            const Icon = intent.icon
            return (
              <button
                key={intent.value}
                onClick={() => setSelectedIntent(intent.value)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedIntent === intent.value
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {intent.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Student Cards */}
      <div className="px-4 py-4 space-y-4">
        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            className="border border-border/50 bg-card hover:border-accent/50 transition-all hover:shadow-lg overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Header with Avatar and Match Score */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                      {student.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base truncate">{student.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{student.major}</p>
                  </div>
                </div>
                {/* Match Badge */}
                <div
                  className={`flex-shrink-0 ml-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                    student.matchScore >= 85
                      ? "bg-green-500 text-white"
                      : student.matchScore >= 70
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                  }`}
                >
                  {student.matchScore}% Match
                </div>
              </div>

              {/* Match Reason */}
              <div className="px-4 pb-3">
                <p className="text-sm text-accent font-medium flex items-center gap-2">
                  <span className="text-base">🔥</span>
                  {student.matchReason}
                </p>
              </div>

              {/* Skills */}
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-muted text-foreground border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 pb-4 flex gap-2">
                <Button
                  onClick={() => handleConnect(student)}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Connect
                </Button>
                <Button variant="outline" className="border-border hover:bg-muted bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connection Request Modal */}
      {showConnectionModal && selectedStudent && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-card border border-border rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 space-y-4 animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                  {selectedStudent.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-foreground">{selectedStudent.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedStudent.major}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground mb-3">Why are you connecting?</p>
              <Button
                variant="outline"
                className="w-full justify-start border-border hover:bg-muted text-left bg-transparent"
              >
                <Target className="h-4 w-4 mr-3 text-primary" />
                Invite to Team
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-border hover:bg-muted text-left bg-transparent"
              >
                <MessageSquare className="h-4 w-4 mr-3 text-accent" />
                Ask a Question
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-border hover:bg-muted text-left bg-transparent"
              >
                <Coffee className="h-4 w-4 mr-3 text-orange-500" />
                Coffee Chat
              </Button>
            </div>

            <Button
              onClick={() => setShowConnectionModal(false)}
              variant="outline"
              className="w-full border-border hover:bg-muted"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
