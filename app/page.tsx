"use client"

import { useAuth } from "../contexts/AuthContext"
import LoginForm from "../components/LoginForm"
import Dashboard from "../components/Dashboard"
import { Loader2 } from "../components/ui/icons"

export default function Home() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Loading ContractFlow...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <Dashboard /> : <LoginForm />
}
