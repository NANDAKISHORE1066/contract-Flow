"use client"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from "./ui/icons"

const UPLOAD_STATUSES = {
  PENDING: "pending",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
}

export default function UploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles) => {
    const processedFiles = newFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      status: UPLOAD_STATUSES.PENDING,
      progress: 0,
      error: null,
    }))

    setFiles((prev) => [...prev, ...processedFiles])

    // Start upload simulation for each file
    processedFiles.forEach((fileObj) => {
      simulateUpload(fileObj.id)
    })
  }

  const simulateUpload = async (fileId) => {
    // Update status to uploading
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: UPLOAD_STATUSES.UPLOADING, progress: 0 } : f)),
    )

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))

      setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress } : f)))
    }

    // Simulate random success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1

    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              status: isSuccess ? UPLOAD_STATUSES.SUCCESS : UPLOAD_STATUSES.ERROR,
              progress: 100,
              error: isSuccess ? null : "Upload failed. Please try again.",
            }
          : f,
      ),
    )
  }

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const retryUpload = (fileId) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: UPLOAD_STATUSES.PENDING, progress: 0, error: null } : f)),
    )
    simulateUpload(fileId)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case UPLOAD_STATUSES.UPLOADING:
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />
      case UPLOAD_STATUSES.SUCCESS:
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case UPLOAD_STATUSES.ERROR:
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case UPLOAD_STATUSES.UPLOADING:
        return <Badge variant="secondary">Uploading</Badge>
      case UPLOAD_STATUSES.SUCCESS:
        return (
          <Badge variant="default" className="bg-green-500">
            Success
          </Badge>
        )
      case UPLOAD_STATUSES.ERROR:
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const handleClose = () => {
    setFiles([])
    setDragActive(false)
    onClose()
  }

  const successCount = files.filter((f) => f.status === UPLOAD_STATUSES.SUCCESS).length
  const errorCount = files.filter((f) => f.status === UPLOAD_STATUSES.ERROR).length
  const uploadingCount = files.filter((f) => f.status === UPLOAD_STATUSES.UPLOADING).length

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Upload Contracts</DialogTitle>
          <DialogDescription>Upload contract documents for AI analysis and management</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop files here or click to browse</h3>
            <p className="text-muted-foreground mb-4">Supports PDF, DOC, DOCX files up to 10MB each</p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>

          {/* Upload Status Summary */}
          {files.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{files.length} files</span>
              </div>
              {successCount > 0 && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">{successCount} uploaded</span>
                </div>
              )}
              {uploadingCount > 0 && (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-primary">{uploadingCount} uploading</span>
                </div>
              )}
              {errorCount > 0 && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">{errorCount} failed</span>
                </div>
              )}
            </div>
          )}

          {/* Files List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Uploaded Files</h4>
              <div className="space-y-2 max-h-64 overflow-auto">
                {files.map((fileObj) => (
                  <div key={fileObj.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getStatusIcon(fileObj.status)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{fileObj.name}</p>
                          <p className="text-sm text-muted-foreground">{formatFileSize(fileObj.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(fileObj.status)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(fileObj.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {fileObj.status === UPLOAD_STATUSES.UPLOADING && (
                      <Progress value={fileObj.progress} className="w-full" />
                    )}

                    {fileObj.status === UPLOAD_STATUSES.ERROR && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-red-600">{fileObj.error}</p>
                        <Button variant="outline" size="sm" onClick={() => retryUpload(fileObj.id)}>
                          Retry
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          {files.length > 0 && successCount > 0 && (
            <Button onClick={handleClose}>Done ({successCount} uploaded)</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
