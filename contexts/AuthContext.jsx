"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = () => {
      if (typeof window !== "undefined") {
        try {
          // Check for existing token on mount
          const token = localStorage.getItem("auth_token")
          const userData = localStorage.getItem("user_data")

          if (token && userData) {
            const parsedUserData = JSON.parse(userData)
            setUser(parsedUserData)
          }
        } catch (error) {
          console.error("Error parsing user data:", error)
          // Clear corrupted data
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token")
            localStorage.removeItem("user_data")
          }
        }
      }
      setLoading(false)
    }

    // Small delay to ensure proper hydration
    const timer = setTimeout(initAuth, 100)
    return () => clearTimeout(timer)
  }, [])

  const login = async (username, password) => {
    // Mock authentication - accept any username, password must be 'test123'
    if (password !== "test123") {
      throw new Error('Invalid credentials. Password must be "test123"')
    }

    // Mock JWT token and user data
    const mockToken = "mock-jwt-token-" + Date.now()
    const userData = {
      id: 1,
      username,
      email: `${username}@company.com`,
      name: username.charAt(0).toUpperCase() + username.slice(1),
    }

    if (typeof window !== "undefined") {
      // Store in localStorage
      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("user_data", JSON.stringify(userData))
    }

    setUser(userData)
    return userData
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
    }
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
