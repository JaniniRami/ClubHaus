"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Star, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ClubRegistrationModal } from "@/components/club-registration-modal"
import { useAuth } from "@/lib/auth-context"
import clubsData from "@/data/clubs.json"

interface Club {
  id: string
  name: string
  category: string
  members: number
  description: string
  image: string
  isJoined: boolean
}

// Convert JSON data to Club[] format with isJoined defaulting to false
const clubs: Club[] = clubsData.map((club) => ({
  ...club,
  isJoined: club.isJoined ?? false,
}))

interface ClubsScreenProps {
  selectedInterests: string[]
}

export function ClubsScreen({ selectedInterests }: ClubsScreenProps) {
  const [clubList, setClubList] = useState(clubs)
  const [filter, setFilter] = useState<"all" | "joined">("all")
  const [showRegistration, setShowRegistration] = useState(false)
  const { user, isClubAdmin } = useAuth() // Added auth context to check club admin status

  const toggleJoin = (clubId: string) => {
    setClubList((prev) => prev.map((club) => (club.id === clubId ? { ...club, isJoined: !club.isJoined } : club)))
  }

  const filteredClubs = filter === "joined" ? clubList.filter((club) => club.isJoined) : clubList

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-6 pt-4 mb-4">
        <Button
          onClick={() => setShowRegistration(true)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Register a New Club
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-4 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === "all" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted",
          )}
        >
          All Clubs
        </button>
        <button
          onClick={() => setFilter("joined")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === "joined" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted",
          )}
        >
          My Clubs
        </button>
      </div>

      {/* Clubs List */}
      <div className="px-6 space-y-4">
        {filteredClubs.map((club) => (
          <Card
            key={club.id}
            className="overflow-hidden border border-border/50 bg-card hover:border-accent/50 transition-all duration-200 !p-0 !gap-0"
          >
            <div className="relative h-32 w-full overflow-hidden bg-muted">
              <img src={club.image || "/placeholder.svg"} alt={club.name} className="w-full h-full object-fill" />
              {club.isJoined && (
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Joined
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-foreground mb-1">{club.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-md bg-muted text-foreground font-medium">{club.category}</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {club.members} members
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{club.description}</p>
              <div className="space-y-2">
                {isClubAdmin(club.id.toString()) && (
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Event
                  </Button>
                )}
                <Button
                  onClick={() => toggleJoin(club.id)}
                  variant={club.isJoined ? "outline" : "default"}
                  className={cn(
                    "w-full",
                    club.isJoined
                      ? "border-border hover:bg-muted"
                      : "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  {club.isJoined ? "Leave Club" : "Join Club"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Club Registration Modal */}
      {showRegistration && <ClubRegistrationModal onClose={() => setShowRegistration(false)} />}
    </div>
  )
}
