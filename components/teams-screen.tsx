"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Trophy, Calendar, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { TeamFormationModal } from "@/components/team-formation-modal"

interface Team {
  id: number
  name: string
  sport: string
  members: number
  nextGame: string
  wins: number
  losses: number
  image: string
  isJoined: boolean
}

const teams: Team[] = [
  {
    id: 1,
    name: "ClubHaus Warriors",
    sport: "Basketball",
    members: 15,
    nextGame: "March 16, 2024",
    wins: 8,
    losses: 2,
    image: "/diverse-basketball-team.png",
    isJoined: true,
  },
  {
    id: 2,
    name: "Tech Titans",
    sport: "Football",
    members: 24,
    nextGame: "March 20, 2024",
    wins: 6,
    losses: 4,
    image: "/diverse-football-team.png",
    isJoined: false,
  },
  {
    id: 3,
    name: "Campus Runners",
    sport: "Track & Field",
    members: 18,
    nextGame: "March 22, 2024",
    wins: 12,
    losses: 1,
    image: "/running-track.jpg",
    isJoined: false,
  },
  {
    id: 4,
    name: "Net Ninjas",
    sport: "Volleyball",
    members: 12,
    nextGame: "March 18, 2024",
    wins: 7,
    losses: 3,
    image: "/diverse-volleyball-team.png",
    isJoined: true,
  },
  {
    id: 5,
    name: "Swim Squad",
    sport: "Swimming",
    members: 20,
    nextGame: "March 25, 2024",
    wins: 9,
    losses: 2,
    image: "/outdoor-swimming-pool.png",
    isJoined: false,
  },
]

export function TeamsScreen() {
  const [teamList, setTeamList] = useState(teams)
  const [filter, setFilter] = useState<"all" | "joined" | "recruitment">("all")
  const [showFormationModal, setShowFormationModal] = useState(false)

  const toggleJoin = (teamId: number) => {
    setTeamList((prev) => prev.map((team) => (team.id === teamId ? { ...team, isJoined: !team.isJoined } : team)))
  }

  const filteredTeams =
    filter === "joined"
      ? teamList.filter((team) => team.isJoined)
      : filter === "recruitment"
        ? teamList.filter((team) => team.members < 25)
        : teamList

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-6 mb-4">
        <Button
          onClick={() => setShowFormationModal(true)}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Team Formation Post
        </Button>
      </div>

      <div className="px-6 mb-4 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === "all" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted",
          )}
        >
          All Teams
        </button>
        <button
          onClick={() => setFilter("joined")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === "joined" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted",
          )}
        >
          My Teams
        </button>
        <button
          onClick={() => setFilter("recruitment")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === "recruitment"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-muted",
          )}
        >
          Recruiting
        </button>
      </div>

      <div className="px-6 space-y-4">
        {filteredTeams.map((team) => (
          <Card
            key={team.id}
            className="overflow-hidden border border-border/50 bg-card hover:border-accent/50 transition-all duration-200"
          >
            <div className="relative h-32 w-full overflow-hidden bg-muted">
              <img src={team.image || "/placeholder.svg"} alt={team.name} className="h-full w-full object-cover" />
              {team.isJoined && (
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Member
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-foreground mb-1">{team.name}</h3>
                <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-foreground font-medium text-sm">
                  {team.sport}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{team.members}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    {team.wins}-{team.losses}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground text-xs">{team.nextGame.split(",")[0]}</span>
                </div>
              </div>

              <Button
                onClick={() => toggleJoin(team.id)}
                variant={team.isJoined ? "outline" : "default"}
                className={cn(
                  "w-full",
                  team.isJoined
                    ? "border-border hover:bg-muted"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                {team.isJoined ? "Leave Team" : "Join Team"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showFormationModal && <TeamFormationModal onClose={() => setShowFormationModal(false)} />}
    </div>
  )
}
