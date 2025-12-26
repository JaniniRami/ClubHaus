"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface TeamFormationModalProps {
  onClose: () => void
}

const skillOptions = [
  "Frontend Development",
  "Backend Development",
  "UI/UX Design",
  "Project Management",
  "Data Science",
  "Mobile Development",
  "DevOps",
  "Marketing",
]

const competitionOptions = [
  "Hackathon",
  "Programming Contest",
  "Robotics Competition",
  "Design Challenge",
  "Business Case Competition",
  "Other",
]

export function TeamFormationModal({ onClose }: TeamFormationModalProps) {
  const [teamName, setTeamName] = useState("")
  const [competition, setCompetition] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [teamSize, setTeamSize] = useState("")
  const [description, setDescription] = useState("")

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleSubmit = () => {
    // Handle team formation post creation
    console.log("[v0] Team formation:", { teamName, competition, selectedSkills, teamSize, description })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <Card className="w-full max-w-lg bg-background border-border max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Create Team Formation Post</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <CardContent className="p-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Team Name</label>
            <Input
              type="text"
              placeholder="Enter team name..."
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="bg-card border-border"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Competition/Event</label>
            <div className="flex flex-wrap gap-2">
              {competitionOptions.map((comp) => (
                <button
                  key={comp}
                  onClick={() => setCompetition(comp)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors",
                    competition === comp
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:bg-muted",
                  )}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Skills Needed</label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors",
                    selectedSkills.includes(skill)
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-transparent text-muted-foreground border-border hover:bg-muted",
                  )}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Team Size Needed</label>
            <Input
              type="number"
              placeholder="e.g., 4"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="bg-card border-border"
              min="1"
              max="20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
            <textarea
              placeholder="Describe your project and what you're looking for in teammates..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] p-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!teamName || !competition || selectedSkills.length === 0 || !teamSize}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
