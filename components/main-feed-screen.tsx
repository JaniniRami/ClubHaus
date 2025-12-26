"use client"

import type React from "react"

import { Home, Users, User, Bell, Filter, Search, X, MessageCircle, Radar } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ClubsScreen } from "@/components/clubs-screen"
import { TeamsScreen } from "@/components/teams-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { NotificationsScreen } from "@/components/notifications-screen"
import { ChatScreen } from "@/components/chat-screen"
import { ConnectScreen } from "@/components/connect-screen"
import { EventDetailsModal } from "@/components/event-details-modal"
import type { StudentData } from "@/components/onboarding-screen"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MainFeedScreenProps {
  selectedInterests: string[]
  studentData: StudentData
}

const recommendedEvents = [
  {
    id: 1,
    title: "AI Workshop: Building Chatbots",
    date: "March 15, 2024",
    time: "2:00 PM",
    location: "Engineering Lab 301",
    tags: ["AI", "Workshop"],
    image: "/ai-workshop-robotics.jpg",
    club: "AI & ML Club",
    registered: 24,
    capacity: 30,
    rating: 4.8,
    isRegistered: false,
    matchScore: 92, // Added match score based on student interests
  },
  {
    id: 2,
    title: "Web Dev Bootcamp",
    date: "March 18, 2024",
    time: "4:00 PM",
    location: "Computer Center",
    tags: ["Web Dev", "Tutorial"],
    image: "/web-development-coding.png",
    club: "Web Dev Society",
    registered: 45,
    capacity: 50,
    rating: 4.6,
    isRegistered: true,
    matchScore: 87, // Added match score
  },
]

const allEvents = [
  {
    id: 3,
    title: "Robotics Competition Finals",
    date: "March 20, 2024",
    time: "10:00 AM",
    location: "Main Auditorium",
    tags: ["Robotics", "Competition"],
    image: "/robotics-competition.png",
    club: "Robotics Club",
    registered: 89,
    capacity: 100,
    rating: 4.9,
    isRegistered: false,
  },
  {
    id: 4,
    title: "Startup Pitch Night",
    date: "March 22, 2024",
    time: "6:00 PM",
    location: "Innovation Hub",
    tags: ["Entrepreneurship", "Networking"],
    image: "/startup-pitch.png",
    club: "Entrepreneurship Hub",
    registered: 67,
    capacity: 80,
    rating: 4.7,
    isRegistered: false,
  },
  {
    id: 5,
    title: "Gaming Tournament",
    date: "March 25, 2024",
    time: "3:00 PM",
    location: "Student Center",
    tags: ["Gaming", "Competition"],
    image: "/gaming-esports-tournament.jpg",
    club: "Gaming & Esports",
    registered: 120,
    capacity: 150,
    rating: 4.5,
    isRegistered: true,
  },
  {
    id: 6,
    title: "Music Club Jam Session",
    date: "March 27, 2024",
    time: "7:00 PM",
    location: "Arts Building",
    tags: ["Music Club", "Performance"],
    image: "/music-performance-concert.jpg",
    club: "Music Performance Club",
    registered: 34,
    capacity: 40,
    rating: 4.4,
    isRegistered: false,
  },
]

export function MainFeedScreen({ selectedInterests, studentData }: MainFeedScreenProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedClub, setSelectedClub] = useState<string | null>(null)
  const [events, setEvents] = useState([...recommendedEvents, ...allEvents])
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)

  const handleToggleRegister = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isRegistered: !event.isRegistered,
              registered: event.isRegistered ? (event.registered ?? 0) - 1 : (event.registered ?? 0) + 1,
            }
          : event,
      ),
    )
  }

  const handleViewDetails = (eventId: number) => {
    setSelectedEventId(eventId)
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || event.tags.some((tag) => tag === selectedCategory)
    const matchesClub = !selectedClub || event.club === selectedClub
    return matchesSearch && matchesCategory && matchesClub
  })

  const recommendedFiltered = filteredEvents.slice(0, 2)
  const allFiltered = filteredEvents.slice(2)

  const categories = Array.from(new Set(events.flatMap((e) => e.tags)))
  const clubs = Array.from(new Set(events.map((e) => e.club).filter(Boolean)))

  const renderContent = () => {
    if (activeTab === "notifications") {
      return <NotificationsScreen />
    }

    if (activeTab === "chat") {
      return <ChatScreen studentData={studentData} />
    }

    if (activeTab === "connect") {
      return <ConnectScreen studentData={studentData} selectedInterests={selectedInterests} />
    }

    switch (activeTab) {
      case "clubs":
        return <ClubsScreen selectedInterests={selectedInterests} />
      case "teams":
        return <TeamsScreen />
      case "profile":
        return <ProfileScreen studentData={studentData} selectedInterests={selectedInterests} />
      default:
        return (
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="px-6 mb-4">
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-card border-border"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn("border-border", showFilters && "bg-muted")}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {showFilters && (
                <div className="space-y-3 p-3 bg-card rounded-lg border border-border">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Category</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                          "px-3 py-1 text-xs font-semibold rounded-full border transition-colors",
                          !selectedCategory
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent text-muted-foreground border-border hover:bg-muted",
                        )}
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={cn(
                            "px-3 py-1 text-xs font-semibold rounded-full border transition-colors",
                            selectedCategory === cat
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-transparent text-muted-foreground border-border hover:bg-muted",
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Club</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedClub(null)}
                        className={cn(
                          "px-3 py-1 text-xs font-semibold rounded-full border transition-colors",
                          !selectedClub
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent text-muted-foreground border-border hover:bg-muted",
                        )}
                      >
                        All Clubs
                      </button>
                      {clubs.map((club) => (
                        <button
                          key={club}
                          onClick={() => setSelectedClub(club ?? null)}
                          className={cn(
                            "px-3 py-1 text-xs font-semibold rounded-full border transition-colors",
                            selectedClub === club
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-transparent text-muted-foreground border-border hover:bg-muted",
                          )}
                        >
                          {club}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {recommendedFiltered.length > 0 && (
              <div className="px-6 mb-6">
                <h2 className="text-lg font-bold text-foreground mb-4">Recommended for You</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                  {recommendedFiltered.map((event) => (
                    <div key={event.id} className="flex-shrink-0 w-72">
                      <EventCard
                        event={event}
                        featured
                        onToggleRegister={handleToggleRegister}
                        onViewDetails={handleViewDetails}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {allFiltered.length > 0 && (
              <div className="px-6">
                <h2 className="text-lg font-bold text-foreground mb-4">All Events</h2>
                <div className="space-y-4">
                  {allFiltered.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onToggleRegister={handleToggleRegister}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredEvents.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-muted-foreground">No events found matching your filters</p>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {studentData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-foreground">
            {activeTab === "home" && "Campus Feed"}
            {activeTab === "clubs" && "Clubs"}
            {activeTab === "teams" && "Teams"}
            {activeTab === "connect" && "Connect"}
            {activeTab === "profile" && "Profile"}
            {activeTab === "notifications" && "Notifications"}
            {activeTab === "chat" && "Chat"}
          </h1>
        </div>
        <button
          onClick={() => setActiveTab(activeTab === "notifications" ? "home" : "notifications")}
          className="p-2 hover:bg-card rounded-full transition-colors relative"
        >
          <Bell className="h-6 w-6 text-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
        </button>
      </div>

      {renderContent()}

      {selectedEventId && (
        <EventDetailsModal
          event={events.find((e) => e.id === selectedEventId)!}
          onClose={() => setSelectedEventId(null)}
          onToggleRegister={handleToggleRegister}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3">
        <div className="flex items-center justify-around">
          <NavButton icon={Home} label="Home" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <NavButton icon={Users} label="Clubs" active={activeTab === "clubs"} onClick={() => setActiveTab("clubs")} />
          <NavButton
            icon={Radar}
            label="Connect"
            active={activeTab === "connect"}
            onClick={() => setActiveTab("connect")}
          />
          <NavButton
            icon={MessageCircle}
            label="Chat"
            active={activeTab === "chat"}
            onClick={() => setActiveTab("chat")}
          />
          <NavButton
            icon={User}
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </div>
      </div>
    </div>
  )
}

interface NavButtonProps {
  icon: React.ElementType
  label: string
  active: boolean
  onClick: () => void
}

function NavButton({ icon: Icon, label, active, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors hover:bg-muted/50"
    >
      <Icon className={cn("h-6 w-6 transition-colors", active ? "text-primary" : "text-muted-foreground")} />
      <span className={cn("text-xs font-medium transition-colors", active ? "text-primary" : "text-muted-foreground")}>
        {label}
      </span>
    </button>
  )
}
