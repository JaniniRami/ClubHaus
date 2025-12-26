"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Star, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: number
  type: "event" | "club" | "team" | "achievement"
  title: string
  message: string
  time: string
  isRead: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "event",
    title: "New Event Match",
    message: "AI Workshop: Building Chatbots matches your interests!",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: 2,
    type: "club",
    title: "Web Dev Society",
    message: "New event posted: Advanced React Patterns Workshop",
    time: "5 hours ago",
    isRead: false,
  },
  {
    id: 3,
    type: "event",
    title: "Event Reminder",
    message: "Web Dev Bootcamp starts in 1 day",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: 4,
    type: "team",
    title: "ClubHaus Warriors",
    message: "Team practice scheduled for tomorrow at 3 PM",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: 5,
    type: "achievement",
    title: "Achievement Unlocked",
    message: "You've earned the 'Event Explorer' badge!",
    time: "2 days ago",
    isRead: true,
  },
  {
    id: 6,
    type: "club",
    title: "Gaming & Esports",
    message: "Your team won the tournament! Check out the highlights.",
    time: "3 days ago",
    isRead: true,
  },
]

const iconMap = {
  event: Calendar,
  club: Users,
  team: UserPlus,
  achievement: Star,
}

const colorMap = {
  event: "text-primary",
  club: "text-accent",
  team: "text-cyan-500",
  achievement: "text-yellow-500",
}

export function NotificationsScreen() {
  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {notifications.filter((n) => !n.isRead).length} unread notifications
          </p>
          <button className="text-sm text-primary font-medium hover:underline">Mark all as read</button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type]
            const colorClass = colorMap[notification.type]

            return (
              <Card
                key={notification.id}
                className={cn(
                  "border border-border/50 bg-card hover:border-accent/30 transition-all duration-200",
                  !notification.isRead && "bg-muted/30",
                )}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                        !notification.isRead ? "bg-primary/20" : "bg-muted",
                      )}
                    >
                      <Icon className={cn("h-5 w-5", colorClass)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-bold text-foreground">{notification.title}</h3>
                        {!notification.isRead && (
                          <span className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
