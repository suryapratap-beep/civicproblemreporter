"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  X,
  ImageIcon,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Send,
} from "lucide-react"

export default function ComplaintPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5))
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-background px-4 py-16">
          <Card className="w-full max-w-md border-border text-center">
            <CardContent className="flex flex-col items-center gap-4 pt-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground">Complaint Submitted!</h2>
              <p className="text-muted-foreground">
                Your complaint has been registered with ID <span className="font-mono font-bold text-primary">#CMP-2026-0847</span>. 
                You can track the progress in the tracking section.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => setSubmitted(false)}>Submit Another</Button>
                <Button variant="outline" asChild>
                  <a href="/track">Track Progress</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[oklch(0.4_0.15_200)] px-4 py-16">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="relative mx-auto max-w-7xl text-center">
            <h1 className="text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
              Submit a <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Complaint</span>
            </h1>
            <p className="mt-3 text-primary-foreground/70">
              Report an issue and upload supporting evidence for quick resolution
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <Card className="border-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  Complaint Details
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Fill in your information and describe the issue in detail
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                      <Input id="fullName" placeholder="Enter your full name" required className="bg-background" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required className="bg-background" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required className="bg-background" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="ward" className="text-foreground">Ward / District</Label>
                      <Select>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select ward" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ward-1">Ward 1 - Downtown</SelectItem>
                          <SelectItem value="ward-2">Ward 2 - Northside</SelectItem>
                          <SelectItem value="ward-3">Ward 3 - Eastside</SelectItem>
                          <SelectItem value="ward-4">Ward 4 - Westside</SelectItem>
                          <SelectItem value="ward-5">Ward 5 - Southside</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="category" className="text-foreground">Service Category</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waste">Waste Management</SelectItem>
                        <SelectItem value="transport">Transportation</SelectItem>
                        <SelectItem value="water">Water & Sewage</SelectItem>
                        <SelectItem value="parks">Parks & Recreation</SelectItem>
                        <SelectItem value="lighting">Street Lighting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="address" className="text-foreground">Location of Issue</Label>
                    <Input id="address" placeholder="Street address or landmark" required className="bg-background" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description" className="text-foreground">Describe the Issue</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about the problem..."
                      rows={4}
                      required
                      className="bg-background resize-none"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-foreground">Upload Evidence (Images)</Label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border bg-gradient-to-b from-secondary/30 to-primary/[0.02] p-8 transition-colors hover:border-primary/50 hover:from-secondary/50 hover:to-primary/[0.05]"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">Click to upload images</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB each (max 5 files)</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    {files.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {files.map((file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                          >
                            <div className="flex items-center gap-3">
                              <ImageIcon className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                              className="h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                      <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="text-xs text-muted-foreground">
                        All uploaded images are verified by our AI system for authenticity and deepfake detection before processing.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Complaint"}
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Sidebar Info */}
            <div className="flex flex-col gap-4">
              <Card className="border-border">
                <CardContent className="flex flex-col gap-3 pt-6">
                  <h3 className="font-semibold text-card-foreground">How it works</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { step: "1", text: "Fill in your personal details and ward" },
                      { step: "2", text: "Describe the issue and select category" },
                      { step: "3", text: "Upload photos of the issue" },
                      { step: "4", text: "AI verifies image authenticity" },
                      { step: "5", text: "Complaint assigned to officer" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.4_0.15_200)] text-xs font-bold text-primary-foreground">
                          {item.step}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-warning/5">
                <CardContent className="flex flex-col gap-2 pt-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <h3 className="text-sm font-semibold text-card-foreground">Important Note</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Submitting false or misleading complaints is a punishable offense. Our AI system detects manipulated images and deepfakes automatically.
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">AI Verified</Badge>
                    <Badge variant="secondary" className="text-xs">Deepfake Detection</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
