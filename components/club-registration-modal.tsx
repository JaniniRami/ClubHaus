"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Upload, Building2, CheckCircle } from "lucide-react"

interface ClubRegistrationModalProps {
  onClose: () => void
}

export function ClubRegistrationModal({ onClose }: ClubRegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    clubName: "",
    category: "",
    description: "",
    adminName: "",
    adminEmail: "",
    logo: "",
  })

  const categories = ["Technology", "Arts", "Business", "Engineering", "Recreation", "Social", "Academic"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2500)
  }

  if (submitted) {
    return (
      <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl w-full max-w-md p-8 border border-border text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Club Registered!</h2>
          <p className="text-muted-foreground mb-4">
            Your club has been successfully registered. You can now start posting events and managing your club members.
          </p>
          <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
            Done
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-border">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Register a Club</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clubName" className="text-foreground">
              Club Name *
            </Label>
            <Input
              id="clubName"
              placeholder="e.g., Blockchain Innovation Club"
              value={formData.clubName}
              onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">
              Category *
            </Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what your club is about and what activities you'll organize..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="bg-background border-border resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminName" className="text-foreground">
              Admin Name *
            </Label>
            <Input
              id="adminName"
              placeholder="Your full name"
              value={formData.adminName}
              onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminEmail" className="text-foreground">
              Admin Email *
            </Label>
            <Input
              id="adminEmail"
              type="email"
              placeholder="your.email@gju.edu.jo"
              value={formData.adminEmail}
              onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Club Logo</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload logo</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">What happens next?</p>
            <ul className="space-y-1 text-xs list-disc list-inside">
              <li>Your club will be instantly activated</li>
              <li>You'll become a club admin</li>
              <li>You can immediately start posting events</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Register Club
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
