"use client"

import { Button } from "@/components/ui/button"
import { Users, Calendar, Star, Sparkles } from "lucide-react"
import Image from "next/image"

interface LandingScreenProps {
  onGetStarted: () => void
}

export function LandingScreen({ onGetStarted }: LandingScreenProps) {
  const features = [
    {
      icon: Calendar,
      title: "Discover Events",
      description: "Find and join exciting campus events",
    },
    {
      icon: Users,
      title: "Join Clubs",
      description: "Connect with like-minded students",
    },
    {
      icon: Star,
      title: "Build Community",
      description: "Foster meaningful connections",
    },
  ]

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        {/* App Logo/Icon */}
        <div className="mb-8">
          <div className="h-24 w-24 rounded-3xl bg-primary/20 flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-5xl font-bold text-foreground mb-4 text-center">
          ClubHaus
        </h1>

        {/* Slogan */}
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-sm">
          Fostering a connected, collaborative GJU community.
        </p>

        {/* Features */}
        <div className="w-full max-w-sm space-y-4 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <Button
          size="lg"
          onClick={onGetStarted}
          className="w-full max-w-sm text-base font-semibold h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 mb-4"
        >
          Get Started
        </Button>
      </div>

      {/* GJU Logo at Bottom */}
      <div className="px-6 pb-6 flex justify-center">
        <div className="flex items-center gap-3 opacity-60">
          <Image
            src="/gjulogo.png"
            alt="German Jordanian University"
            width={200}
            height={70}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

