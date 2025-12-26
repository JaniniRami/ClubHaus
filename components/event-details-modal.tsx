"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Calendar, MapPin, Users, Star, Download, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  tags: string[]
  image: string
  club?: string
  registered?: number
  capacity?: number
  rating?: number
  isRegistered?: boolean
}

interface EventDetailsModalProps {
  event: Event
  onClose: () => void
  onToggleRegister: (eventId: number) => void
}

const attendees = [
  { name: "Sarah Johnson", initial: "SJ" },
  { name: "Mike Chen", initial: "MC" },
  { name: "Emily Davis", initial: "ED" },
  { name: "Alex Kumar", initial: "AK" },
  { name: "Jessica Lee", initial: "JL" },
]

export function EventDetailsModal({ event, onClose, onToggleRegister }: EventDetailsModalProps) {
  const handleExportCalendar = () => {
    // Create ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${new Date(event.date).toISOString().replace(/[-:]/g, "").split(".")[0]}Z
LOCATION:${event.location}
DESCRIPTION:Event organized by ${event.club || "Campus"}
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${event.title.replace(/\s+/g, "_")}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <Card className="w-full max-w-lg bg-background border-border max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
          {event.isRegistered && (
            <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
              Registered
            </div>
          )}
        </div>

        <CardContent className="p-6">
          {event.club && (
            <span className="inline-block px-3 py-1 rounded-md bg-muted text-foreground font-medium text-sm mb-3">
              {event.club}
            </span>
          )}

          <h2 className="text-2xl font-bold text-foreground mb-4">{event.title}</h2>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">
                {event.date} • {event.time}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">{event.location}</span>
            </div>
            {event.registered !== undefined && event.capacity !== undefined && (
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">
                  {event.registered} / {event.capacity} registered
                </span>
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                  />
                </div>
              </div>
            )}
            {event.rating && (
              <div className="flex items-center gap-3 text-sm">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="text-foreground font-medium">{event.rating.toFixed(1)} / 5.0</span>
                <span className="text-muted-foreground">(Based on previous events)</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Who's Going</h3>
            <div className="flex items-center gap-2 mb-2">
              {attendees.slice(0, 5).map((attendee, index) => (
                <Avatar key={index} className="h-10 w-10 border-2 border-background">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    {attendee.initial}
                  </AvatarFallback>
                </Avatar>
              ))}
              {event.registered && event.registered > 5 && (
                <div className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-semibold text-foreground">+{event.registered - 5}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {attendees
                .slice(0, 2)
                .map((a) => a.name.split(" ")[0])
                .join(", ")}{" "}
              and {(event.registered ?? 0) - 2} others
            </p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => onToggleRegister(event.id)}
              className={cn(
                "w-full",
                event.isRegistered
                  ? "bg-transparent border border-border hover:bg-muted"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              disabled={
                !event.isRegistered &&
                event.registered !== undefined &&
                event.capacity !== undefined &&
                event.registered >= event.capacity
              }
            >
              {event.isRegistered
                ? "Unregister from Event"
                : event.registered !== undefined && event.capacity !== undefined && event.registered >= event.capacity
                  ? "Event is Full"
                  : "Register for Event"}
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={handleExportCalendar}
                variant="outline"
                className="flex-1 border-border hover:bg-muted bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="flex-1 border-border hover:bg-muted bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
