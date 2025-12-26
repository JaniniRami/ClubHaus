"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Edit, Mail, GraduationCap, Star, Users, Calendar, QrCode } from "lucide-react"
import type { StudentData } from "@/components/onboarding-screen"
import { useState } from "react"
import { QrCodeModal } from "@/components/qr-code-modal"

interface ProfileScreenProps {
  studentData: StudentData
  selectedInterests: string[]
}

export function ProfileScreen({ studentData, selectedInterests }: ProfileScreenProps) {
  const [showQrCode, setShowQrCode] = useState(false)

  const stats = [
    { label: "Events Attended", value: "12", icon: Calendar },
    { label: "Clubs Joined", value: "3", icon: Users },
    { label: "Total Points", value: "340", icon: Star },
  ]

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6 pt-4">
          <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-2xl">
              {studentData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-foreground mb-1">{studentData.name}</h2>
          <p className="text-muted-foreground text-sm mb-1">Student ID: {studentData.studentId}</p>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{studentData.major}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50 bg-card">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <stat.icon className="h-5 w-5 text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button
            onClick={() => setShowQrCode(true)}
            variant="outline"
            className="border-border hover:bg-muted bg-transparent"
          >
            <QrCode className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="border-border hover:bg-muted bg-transparent">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Interests Section */}
        <Card className="border-border/50 bg-card mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              My Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.length > 0 ? (
                selectedInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No interests selected yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="border-border/50 bg-card mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium text-foreground">{studentData.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Campus</span>
                <span className="text-sm font-medium text-foreground">Main Campus</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card className="border-border/50 bg-card">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Recent Achievements
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Event Explorer</p>
                  <p className="text-xs text-muted-foreground">Attended 10+ events</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Club Enthusiast</p>
                  <p className="text-xs text-muted-foreground">Joined 3 clubs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showQrCode && <QrCodeModal studentData={studentData} onClose={() => setShowQrCode(false)} />}
    </div>
  )
}
