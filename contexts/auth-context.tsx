"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "customer" | "vendor" | "admin"
  storeId?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, role?: "customer" | "vendor") => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check registered users
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const foundUser = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password,
    )

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        storeId: foundUser.storeId,
      }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }

    // Demo users
    if (email === "admin@sportx.com" && password === "admin123") {
      const userData: User = { id: "admin-1", name: "Admin", email, role: "admin" }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }
    if (email === "vendor@sportx.com" && password === "vendor123") {
      const userData: User = { id: "vendor-1", name: "Vendor Store", email, role: "vendor", storeId: "store-1" }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }
    if (email === "user@sportx.com" && password === "user123") {
      const userData: User = { id: "user-1", name: "John Doe", email, role: "customer" }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "customer" | "vendor" = "customer",
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    if (users.find((u: { email: string }) => u.email === email)) {
      return false
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role,
      storeId: role === "vendor" ? `store-${Date.now()}` : undefined,
    }

    users.push(newUser)
    localStorage.setItem("registeredUsers", JSON.stringify(users))

    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      storeId: newUser.storeId,
    }
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
