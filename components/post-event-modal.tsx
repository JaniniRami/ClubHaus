"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Upload, Calendar, MapPin, Users } from "lucide-react"

interface PostEventModalProps {
  onClose: () => void
  onPost: (eventData: any) => void
}

export function PostEventModal({ onClose, onPost }: PostEventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    description: "",
    image: "",
    tags: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPost(formData)
  }

  return (
    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-border">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Post New Event</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Event Title *
            </Label>
            <Input
              id="title"
              placeholder="e.g., AI Workshop"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-foreground">
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Location *
            </Label>
            <Input
              id="location"
              placeholder="e.g., Engineering Lab 301"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              Capacity
            </Label>
            <Input
              id="capacity"
              type="number"
              placeholder="e.g., 50"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your event..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="bg-background border-border resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-foreground">
              Tags (comma separated)
            </Label>
            <Input
              id="tags"
              placeholder="e.g., AI, Workshop, Technology"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Event Image</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload image</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Post Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
