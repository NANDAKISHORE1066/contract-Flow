"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import {
  ArrowLeft,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Brain,
  Search,
  TrendingUp,
  Shield,
  Loader2,
} from "./ui/icons"

export default function ContractDetail({ contractId, onBack }) {
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedEvidence, setSelectedEvidence] = useState(null)

  useEffect(() => {
    if (contractId) {
      fetchContractDetail(contractId)
    }
  }, [contractId])

  const fetchContractDetail = async (id) => {
    try {
      setLoading(true)
      const response = await fetch("/contract-details.json")
      if (!response.ok) throw new Error("Failed to fetch contract details")
      const data = await response.json()
      const contractData = data[id]
      if (!contractData) throw new Error("Contract not found")
      setContract(contractData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getRiskBadgeVariant = (risk) => {
    switch (risk) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "default"
      default:
        return "default"
    }
  }

  const getRiskIcon = (risk) => {
    switch (risk) {
      case "High":
        return <AlertTriangle className="h-4 w-4" />
      case "Medium":
        return <Clock className="h-4 w-4" />
      case "Low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Expired":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "Renewal Due":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !contract) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Contract</h3>
              <p className="text-muted-foreground mb-4">{error || "Contract not found"}</p>
              <Button onClick={onBack}>Back to Contracts</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Contracts
        </Button>
      </div>

      {/* Contract Metadata */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{contract.name}</CardTitle>
              <CardDescription className="text-base mt-2">{contract.parties}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(contract.status)}
              <span className="font-medium">{contract.status}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{new Date(contract.start).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Expiry Date</p>
                <p className="text-sm text-muted-foreground">{new Date(contract.expiry).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Parties</p>
                <p className="text-sm text-muted-foreground">{contract.parties}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Risk Level</p>
                <Badge variant={getRiskBadgeVariant(contract.risk)} className="mt-1">
                  {contract.risk}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clauses Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Clauses
            </CardTitle>
            <CardDescription>Key clauses identified in this contract</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contract.clauses?.map((clause, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{clause.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <Progress value={clause.confidence * 100} className="w-16 h-2" />
                    <span className="text-xs font-medium">{Math.round(clause.confidence * 100)}%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{clause.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Insights
            </CardTitle>
            <CardDescription>AI-powered risk analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contract.insights?.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  {getRiskIcon(insight.risk)}
                  <Badge variant={getRiskBadgeVariant(insight.risk)} className="text-xs">
                    {insight.risk} Risk
                  </Badge>
                </div>
                <p className="text-sm">{insight.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Evidence Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Supporting Evidence
              </CardTitle>
              <CardDescription>Document snippets and references</CardDescription>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  View All Evidence
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Contract Evidence</SheetTitle>
                  <SheetDescription>Detailed evidence and document snippets for {contract.name}</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {contract.evidence?.map((evidence, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">{evidence.source}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Relevance</span>
                          <Progress value={evidence.relevance * 100} className="w-16 h-2" />
                          <span className="text-xs font-medium">{Math.round(evidence.relevance * 100)}%</span>
                        </div>
                      </div>
                      <blockquote className="text-sm bg-muted p-3 rounded border-l-4 border-primary">
                        "{evidence.snippet}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contract.evidence?.slice(0, 4).map((evidence, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{evidence.source}</span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(evidence.relevance * 100)}% relevant
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">"{evidence.snippet}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
