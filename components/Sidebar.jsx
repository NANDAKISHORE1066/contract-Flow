"use client"

import { FileText, BarChart3, FileBarChart, Settings } from "./ui/icons"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

const navigation = [
  { id: "contracts", name: "Contracts", icon: FileText },
  { id: "insights", name: "Insights", icon: BarChart3 },
  { id: "reports", name: "Reports", icon: FileBarChart },
  { id: "settings", name: "Settings", icon: Settings },
]

export default function Sidebar({ currentView, onViewChange }) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-primary">ContractFlow</h1>
        <p className="text-sm text-sidebar-foreground/70">Contracts Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11",
                currentView === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Button>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/50 text-center">Nandakishore eravena - ContractFlow</div>
      </div>
    </div>
  )
}
