"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  CheckCircle2,
  Clock,
  User,
  DollarSign,
  MapPin,
  Calendar,
  FileText,
  AlertCircle,
  ArrowRight,
  Truck,
  Wrench,
} from "lucide-react"

type ComplaintData = {
  id: string
  title: string
  category: string
  status: "submitted" | "assigned" | "in-progress" | "resolved"
  progress: number
  submittedDate: string
  location: string
  description: string
  officer: {
    name: string
    designation: string
    phone: string
  }
  funds: {
    allocated: number
    spent: number
  }
  timeline: {
    date: string
    event: string
    status: "completed" | "current" | "pending"
  }[]
}

const sampleComplaints: ComplaintData[] = [
  {
    id: "CMP-2026-0847",
    title: "Broken Streetlight on Oak Avenue",
    category: "Street Lighting",
    status: "in-progress",
    progress: 65,
    submittedDate: "2026-02-15",
    location: "142 Oak Avenue, Ward 3",
    description: "Streetlight has been out for 2 weeks. Area is very dark at night, safety concern for pedestrians.",
    officer: {
      name: "Officer James Rodriguez",
      designation: "Electrical Services Supervisor",
      phone: "+1 (555) 200-0034",
    },
    funds: {
      allocated: 2500,
      spent: 1200,
    },
    timeline: [
      { date: "Feb 15", event: "Complaint submitted", status: "completed" },
      { date: "Feb 16", event: "AI image verification passed", status: "completed" },
      { date: "Feb 17", event: "Assigned to Officer Rodriguez", status: "completed" },
      { date: "Feb 19", event: "Funds allocated - $2,500", status: "completed" },
      { date: "Feb 22", event: "Repair crew dispatched", status: "current" },
      { date: "TBD", event: "Resolution & closure", status: "pending" },
    ],
  },
  {
    id: "CMP-2026-0831",
    title: "Pothole on Main Street",
    category: "Transportation",
    status: "assigned",
    progress: 35,
    submittedDate: "2026-02-18",
    location: "500 Main Street, Ward 1",
    description: "Large pothole causing damage to vehicles. Multiple complaints from residents.",
    officer: {
      name: "Officer Lisa Thompson",
      designation: "Road Maintenance Lead",
      phone: "+1 (555) 200-0078",
    },
    funds: {
      allocated: 5000,
      spent: 0,
    },
    timeline: [
      { date: "Feb 18", event: "Complaint submitted", status: "completed" },
      { date: "Feb 19", event: "AI image verification passed", status: "completed" },
      { date: "Feb 20", event: "Assigned to Officer Thompson", status: "current" },
      { date: "TBD", event: "Funds allocation", status: "pending" },
      { date: "TBD", event: "Repair work begins", status: "pending" },
      { date: "TBD", event: "Resolution & closure", status: "pending" },
    ],
  },
  {
    id: "CMP-2026-0799",
    title: "Water Main Leak on Elm Drive",
    category: "Water & Sewage",
    status: "resolved",
    progress: 100,
    submittedDate: "2026-02-10",
    location: "78 Elm Drive, Ward 2",
    description: "Water main leak flooding the street and affecting multiple properties.",
    officer: {
      name: "Officer Karen White",
      designation: "Water Emergency Response",
      phone: "+1 (555) 200-0091",
    },
    funds: {
      allocated: 8000,
      spent: 7200,
    },
    timeline: [
      { date: "Feb 10", event: "Complaint submitted", status: "completed" },
      { date: "Feb 10", event: "Emergency priority assigned", status: "completed" },
      { date: "Feb 10", event: "Assigned to Officer White", status: "completed" },
      { date: "Feb 11", event: "Emergency funds - $8,000", status: "completed" },
      { date: "Feb 12", event: "Repair crew completed work", status: "completed" },
      { date: "Feb 14", event: "Resolved & verified", status: "completed" },
    ],
  },
]

const statusColors = {
  submitted: "bg-chart-5/10 text-chart-5",
  assigned: "bg-primary/10 text-primary",
  "in-progress": "bg-warning/10 text-warning",
  resolved: "bg-success/10 text-success",
}

export default function TrackPage() {
  const [searchId, setSearchId] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintData | null>(null)
  const [showAll, setShowAll] = useState(true)

  const handleSearch = () => {
    const found = sampleComplaints.find(
      (c) => c.id.toLowerCase() === searchId.toLowerCase().replace("#", "")
    )
    if (found) {
      setSelectedComplaint(found)
      setShowAll(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="bg-primary px-4 py-16">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
              Track Your Complaints
            </h1>
            <p className="mt-3 text-primary-foreground/70">
              Monitor complaint progress, assigned officers, and fund allocation
            </p>
            {/* Search Bar */}
            <div className="mx-auto mt-8 flex max-w-md gap-2">
              <Input
                placeholder="Enter complaint ID (e.g. CMP-2026-0847)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 border-primary-foreground/20"
              />
              <Button variant="secondary" onClick={handleSearch} className="gap-2">
                <Search className="h-4 w-4" />
                Track
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* Selected Complaint Detail */}
          {selectedComplaint && !showAll && (
            <div className="mb-8">
              <Button
                variant="ghost"
                className="mb-4 gap-2"
                onClick={() => {
                  setShowAll(true)
                  setSelectedComplaint(null)
                }}
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to all complaints
              </Button>
              <ComplaintDetail complaint={selectedComplaint} />
            </div>
          )}

          {/* All Complaints */}
          {showAll && (
            <>
              <h2 className="mb-6 text-xl font-bold text-foreground">Your Complaints</h2>
              <div className="flex flex-col gap-4">
                {sampleComplaints.map((complaint) => (
                  <Card
                    key={complaint.id}
                    className="cursor-pointer border-border transition-all hover:border-primary/30 hover:shadow-md"
                    onClick={() => {
                      setSelectedComplaint(complaint)
                      setShowAll(false)
                    }}
                  >
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-primary">#{complaint.id}</span>
                          <Badge className={statusColors[complaint.status]}>
                            {complaint.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-card-foreground">{complaint.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {complaint.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {complaint.submittedDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-sm font-medium text-foreground">{complaint.progress}%</span>
                        <Progress value={complaint.progress} className="h-2 w-32" />
                        <span className="text-xs text-muted-foreground">{complaint.category}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ComplaintDetail({ complaint }: { complaint: ComplaintData }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Info */}
      <Card className="border-border lg:col-span-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-primary">#{complaint.id}</span>
                <Badge className={statusColors[complaint.status]}>
                  {complaint.status.replace("-", " ")}
                </Badge>
              </div>
              <CardTitle className="text-xl text-card-foreground">{complaint.title}</CardTitle>
              <CardDescription className="text-muted-foreground mt-1">{complaint.category}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Progress */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-bold text-foreground">{complaint.progress}%</span>
            </div>
            <Progress value={complaint.progress} className="h-3" />
          </div>

          {/* Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-foreground">{complaint.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Submitted</p>
                <p className="text-sm font-medium text-foreground">{complaint.submittedDate}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Description</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{complaint.description}</p>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Progress Timeline</h4>
            <div className="flex flex-col gap-0">
              {complaint.timeline.map((item, index) => (
                <div key={`${item.date}-${index}`} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        item.status === "completed"
                          ? "bg-success/10"
                          : item.status === "current"
                            ? "bg-primary/10"
                            : "bg-secondary"
                      }`}
                    >
                      {item.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : item.status === "current" ? (
                        <Truck className="h-4 w-4 text-primary" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    {index < complaint.timeline.length - 1 && (
                      <div className={`h-8 w-0.5 ${item.status === "completed" ? "bg-success/30" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-medium text-foreground">{item.event}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sidebar */}
      <div className="flex flex-col gap-4">
        {/* Officer */}
        <Card className="border-border">
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-card-foreground">Assigned Officer</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {complaint.officer.name.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">{complaint.officer.name}</p>
                <p className="text-xs text-muted-foreground">{complaint.officer.designation}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{complaint.officer.phone}</p>
          </CardContent>
        </Card>

        {/* Funds */}
        <Card className="border-border">
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-card-foreground">Fund Allocation</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Allocated</span>
                <span className="font-mono text-sm font-bold text-foreground">
                  ${complaint.funds.allocated.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Spent</span>
                <span className="font-mono text-sm font-bold text-foreground">
                  ${complaint.funds.spent.toLocaleString()}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Remaining</span>
                <span className="font-mono text-sm font-bold text-success">
                  ${(complaint.funds.allocated - complaint.funds.spent).toLocaleString()}
                </span>
              </div>
              <Progress
                value={(complaint.funds.spent / complaint.funds.allocated) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <Card className="border-border bg-primary/5">
          <CardContent className="flex flex-col gap-2 pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-card-foreground">Need Help?</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If your complaint is not progressing, contact the assigned officer directly or use our AI Assistant for guidance.
            </p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" className="text-xs" asChild>
                <a href="/ai-chatbot">AI Assistant</a>
              </Button>
              <Button size="sm" variant="outline" className="text-xs" asChild>
                <a href="/contact">Contact</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
