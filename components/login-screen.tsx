"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (!success) {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="pt-12 pb-8 px-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">ClubHaus</h1>
        <p className="text-muted-foreground">Sign in to continue</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@gju.edu.jo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-card border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-card border-border text-foreground"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border/50">
          <p className="text-xs font-semibold text-foreground mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              <span className="font-medium text-accent">Student (Club Admin):</span> student@gju.edu.jo / student123
            </p>
            <p>
              <span className="font-medium text-primary">Student:</span> sarah@gju.edu.jo / student123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
