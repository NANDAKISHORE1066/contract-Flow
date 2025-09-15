"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import ContractsList from "./ContractsList"
import ContractDetail from "./ContractDetail"
import UploadModal from "./UploadModal"

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("contracts")
  const [selectedContract, setSelectedContract] = useState(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const handleViewContract = (contractId) => {
    setSelectedContract(contractId)
    setCurrentView("contract-detail")
  }

  const handleBackToList = () => {
    setSelectedContract(null)
    setCurrentView("contracts")
  }

  const renderMainContent = () => {
    switch (currentView) {
      case "contracts":
        return <ContractsList onViewContract={handleViewContract} onUpload={() => setIsUploadModalOpen(true)} />
      case "contract-detail":
        return <ContractDetail contractId={selectedContract} onBack={handleBackToList} />
      case "insights":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Contract Insights</h1>
            <p className="text-muted-foreground">AI-powered insights and analytics coming soon...</p>
          </div>
        )
      case "reports":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Reports</h1>
            <p className="text-muted-foreground">Comprehensive reporting dashboard coming soon...</p>
          </div>
        )
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Settings</h1>
            <p className="text-muted-foreground">Account and system settings coming soon...</p>
          </div>
        )
      default:
        return <ContractsList onViewContract={handleViewContract} onUpload={() => setIsUploadModalOpen(true)} />
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto bg-gradient-to-b from-transparent to-muted/10">
          {renderMainContent()}
        </main>
      </div>
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </div>
  )
}
