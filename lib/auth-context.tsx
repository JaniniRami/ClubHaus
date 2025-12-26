"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  studentId: string
  major: string
  clubs: { id: string; name: string; isAdmin: boolean }[] // Tracks which clubs the student is member/admin of
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isClubAdmin: (clubId: string) => boolean
  updateUserClubs: (clubs: { id: string; name: string; isAdmin: boolean }[]) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes - all are students
const MOCK_USERS: Record<string, { password: string; user: Omit<User, "id"> & { id: string } }> = {
  "student@gju.edu.jo": {
    password: "student123",
    user: {
      id: "1",
      email: "student@gju.edu.jo",
      name: "Ahmad Ibrahim",
      studentId: "20210001",
      major: "Computer Science",
      clubs: [
        { id: "1", name: "AI & Machine Learning Club", isAdmin: true },
        { id: "2", name: "Web Development Society", isAdmin: false },
      ],
    },
  },
  "sarah@gju.edu.jo": {
    password: "student123",
    user: {
      id: "2",
      email: "sarah@gju.edu.jo",
      name: "Sarah Mohammed",
      studentId: "20210002",
      major: "Data Science",
      clubs: [],
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem("clubhaus_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    const userRecord = MOCK_USERS[email.toLowerCase()]
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user)
      localStorage.setItem("clubhaus_user", JSON.stringify(userRecord.user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("clubhaus_user")
  }

  const isClubAdmin = (clubId: string): boolean => {
    return user?.clubs.some((club) => club.id === clubId && club.isAdmin) ?? false
  }

  const updateUserClubs = (clubs: { id: string; name: string; isAdmin: boolean }[]) => {
    if (user) {
      const updatedUser = { ...user, clubs }
      setUser(updatedUser)
      localStorage.setItem("clubhaus_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isClubAdmin,
        updateUserClubs,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
