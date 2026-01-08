"use client"

import { useState } from "react"
import { LandingScreen } from "@/components/landing-screen"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { MainFeedScreen } from "@/components/main-feed-screen"
import type { StudentData } from "@/components/onboarding-screen"

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true)
  const [showMainFeed, setShowMainFeed] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [studentData, setStudentData] = useState<StudentData>({
    name: "Ram Janini",
    email: "r.janini@gju.edu.jo",
    studentId: "20221504010",
    major: "Electrical Engineering",
  })

  const handleGetStarted = () => {
    setShowLanding(false)
  }

  const handleContinue = (interests: string[], data: StudentData) => {
    setSelectedInterests(interests)
    setStudentData(data)
    setShowMainFeed(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#fafafa' }}>
      <div className="w-full max-w-md h-[844px] bg-card rounded-[2.5rem] overflow-hidden border border-border/50 relative">
        {showLanding ? (
          <LandingScreen onGetStarted={handleGetStarted} />
        ) : !showMainFeed ? (
          <OnboardingScreen onContinue={handleContinue} />
        ) : (
          <MainFeedScreen selectedInterests={selectedInterests} studentData={studentData} />
        )}
      </div>
    </div>
  )
}
