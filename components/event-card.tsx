"use client"

import { Calendar, MapPin, Users, Star, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
  matchScore?: number // Added match score for recommended events
}

interface EventCardProps {
  event: Event
  featured?: boolean
  onToggleRegister?: (eventId: number) => void
  onViewDetails?: (eventId: number) => void
}

export function EventCard({ event, featured = false, onToggleRegister, onViewDetails }: EventCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border border-border/50 bg-card hover:border-accent/50 transition-all duration-200 hover:shadow-lg hover:shadow-accent/10 pt-0",
        featured && "shadow-md",
      )}
    >
      <div className="relative h-40 w-full overflow-hidden bg-muted">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
        {featured && event.matchScore && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <TrendingUp className="h-3 w-3" />
            {event.matchScore}% Match
          </div>
        )}
        {event.capacity && event.registered !== undefined && (
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Users className="h-3 w-3" />
            {event.registered}/{event.capacity}
          </div>
        )}
        {event.isRegistered && !featured && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Registered
          </div>
        )}
      </div>
      <CardContent className="p-4">
        {event.club && (
          <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-foreground font-medium text-xs mb-2">
            {event.club}
          </span>
        )}
        <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{event.title}</h3>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {event.date} • {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
          {event.rating && (
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-foreground font-medium">{event.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">/5.0</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          {onToggleRegister && (
            <Button
              onClick={() => onToggleRegister(event.id)}
              variant={event.isRegistered ? "outline" : "default"}
              className={cn(
                "flex-1",
                event.isRegistered
                  ? "border-border hover:bg-muted"
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
                ? "Unregister"
                : event.registered !== undefined && event.capacity !== undefined && event.registered >= event.capacity
                  ? "Full"
                  : "Register"}
            </Button>
          )}
          {onViewDetails && (
            <Button onClick={() => onViewDetails(event.id)} variant="outline" className="border-border hover:bg-muted">
              Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
