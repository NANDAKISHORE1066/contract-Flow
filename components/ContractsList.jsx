"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Search, Upload, Eye, AlertTriangle, CheckCircle, Clock, FileText, Loader2 } from "./ui/icons"

const ITEMS_PER_PAGE = 10

export default function ContractsList({ onViewContract, onUpload }) {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchContracts()
  }, [])

  const fetchContracts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/contracts.json")
      if (!response.ok) throw new Error("Failed to fetch contracts")
      const data = await response.json()
      setContracts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.parties.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    const matchesRisk = riskFilter === "all" || contract.risk === riskFilter
    return matchesSearch && matchesStatus && matchesRisk
  })

  const totalPages = Math.ceil(filteredContracts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedContracts = filteredContracts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Expired":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Renewal Due":
        return <Clock className="h-4 w-4 text-yellow-500" />
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

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Contracts</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchContracts}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Contracts</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Manage and monitor your contract portfolio with confidence
          </p>
        </div>
        <Button
          onClick={onUpload}
          className="gap-3 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
        >
          <Upload className="h-5 w-5" />
          Upload Contract
        </Button>
      </div>

      <Card className="glass-card shadow-lg border-0">
        <CardContent className="pt-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search contracts, parties, or terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-base border-2 focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-56 h-12 border-2 focus:border-primary/50">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Renewal Due">Renewal Due</SelectItem>
                </SelectContent>
              </Select>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-full sm:w-56 h-12 border-2 focus:border-primary/50">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="Low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      {filteredContracts.length === 0 ? (
        <Card className="glass-card shadow-lg border-0">
          <CardContent className="pt-8">
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">No contracts found</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                {searchTerm || statusFilter !== "all" || riskFilter !== "all"
                  ? "Try adjusting your filters to find what you're looking for"
                  : "Upload your first contract to get started with professional contract management"}
              </p>
              <Button
                onClick={onUpload}
                size="lg"
                className="px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Contract
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card shadow-lg border-0">
          <CardHeader className="pb-6">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-semibold text-foreground">Contract Portfolio</CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-2">
                  Showing {paginatedContracts.length} of {filteredContracts.length} contracts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border-2 border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/40">
                    <TableHead className="font-semibold text-foreground py-4">Contract Name</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Parties</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Expiry Date</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Risk Score</TableHead>
                    <TableHead className="text-right font-semibold text-foreground py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedContracts.map((contract, index) => (
                    <TableRow
                      key={contract.id}
                      className="hover:bg-muted/20 transition-colors duration-150 border-border/30"
                    >
                      <TableCell className="font-medium text-foreground py-4 text-base">{contract.name}</TableCell>
                      <TableCell className="text-muted-foreground py-4 text-base">{contract.parties}</TableCell>
                      <TableCell className="text-muted-foreground py-4 text-base">
                        {new Date(contract.expiry).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(contract.status)}
                          <span className="text-base font-medium">{contract.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant={getRiskBadgeVariant(contract.risk)} className="px-3 py-1 text-sm font-medium">
                          {contract.risk}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewContract(contract.id)}
                          className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors px-4 py-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                <p className="text-base text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border-2 hover:border-primary/50 transition-colors"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border-2 hover:border-primary/50 transition-colors"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
