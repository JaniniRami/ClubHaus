"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hash, Send, Users, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"

interface Message {
  id: number
  user: string
  userInitials: string
  content: string
  timestamp: string
  isOwn?: boolean
}

interface Club {
  id: string
  name: string
  topic: string
  memberCount: number
  isAdmin?: boolean
}

const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: 1,
      user: "Sarah Ahmad",
      userInitials: "SA",
      content: "Hey everyone! Just finished the ChatGPT integration tutorial. Anyone want to collaborate on a project?",
      timestamp: "10:23 AM",
    },
    {
      id: 2,
      user: "Omar Hassan",
      userInitials: "OH",
      content: "That sounds great! I've been working on a computer vision project. Maybe we can combine our work?",
      timestamp: "10:25 AM",
    },
  ],
  "2": [
    {
      id: 1,
      user: "Khalid Yousef",
      userInitials: "KY",
      content: "Anyone using React 19 yet? The new features look amazing!",
      timestamp: "9:15 AM",
    },
    {
      id: 2,
      user: "Nadia Ali",
      userInitials: "NA",
      content: "Yes! The compiler is a game changer. Server components are so much easier now.",
      timestamp: "9:18 AM",
    },
  ],
}

export function ChatScreen({ studentData }: { studentData: { name: string; studentId: string; major: string } }) {
  const { user } = useAuth()
  const joinedClubs = user?.clubs || []

  const [view, setView] = useState<"channels" | "chat">("channels")
  const [activeChannel, setActiveChannel] = useState("")
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChannel])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userInitials = studentData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    const message: Message = {
      id: Date.now(),
      user: studentData.name,
      userInitials,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      isOwn: true,
    }

    setMessages((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), message],
    }))

    setNewMessage("")
  }

  const handleChannelSelect = (clubId: string) => {
    setActiveChannel(clubId)
    setView("chat")
  }

  const handleBack = () => {
    setView("channels")
  }

  const currentClub = joinedClubs.find((c) => c.id === activeChannel)
  const currentMessages = messages[activeChannel] || []

  if (joinedClubs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <div className="text-center max-w-md px-6">
          <Hash className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No Club Chats Yet</h3>
          <p className="text-muted-foreground text-sm">
            Join clubs from the Clubs tab to access their community chats and connect with members.
          </p>
        </div>
      </div>
    )
  }

  if (view === "channels") {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="px-4 py-3 border-b border-border bg-card">
          <h2 className="text-lg font-bold text-foreground">Club Chats</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{joinedClubs.length} clubs</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {joinedClubs.map((club) => (
            <button
              key={club.id}
              onClick={() => handleChannelSelect(club.id)}
              className="w-full flex items-center gap-3 px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors active:bg-muted"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Hash className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-semibold text-foreground truncate">{club.name}</h3>
                  {club.isAdmin && (
                    <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full flex-shrink-0">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-3 w-3" />
                  {club.memberCount} members
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="bg-card border-b border-border px-3 py-2.5 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-primary flex-shrink-0" />
            <h3 className="text-sm font-bold text-foreground truncate">{currentClub?.name}</h3>
            {currentClub?.isAdmin && (
              <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full flex-shrink-0">
                Admin
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {currentMessages.length === 0 ? (
          <div className="text-center py-12">
            <Hash className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground px-4">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          currentMessages.map((message) => (
            <div key={message.id} className={cn("flex gap-2", message.isOwn && "flex-row-reverse")}>
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback
                  className={cn(
                    "text-xs font-semibold",
                    message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                  )}
                >
                  {message.userInitials}
                </AvatarFallback>
              </Avatar>
              <div className={cn("flex-1 max-w-[75%]", message.isOwn && "flex flex-col items-end")}>
                <div className={cn("flex items-baseline gap-2 mb-1", message.isOwn && "flex-row-reverse")}>
                  <span className="text-xs font-semibold text-foreground">
                    {message.isOwn ? "You" : message.user.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{message.timestamp}</span>
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-3 py-2 text-sm break-words",
                    message.isOwn
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm",
                  )}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-3 bg-card">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-background border-border text-sm h-9"
          />
          <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 h-9 w-9 flex-shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
