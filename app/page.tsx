"use client"

import { useAuth } from "../contexts/AuthContext"
import LoginForm from "../components/LoginForm"
import Dashboard from "../components/Dashboard"
import { Loader2 } from "../components/ui/icons"

export default function Home() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return isAuthenticated ? <Dashboard /> : <LoginForm />
}
