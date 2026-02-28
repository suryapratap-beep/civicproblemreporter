"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  FileText,
  ImageIcon,
  Shield,
  MapPin,
  Calendar,
  Eye,
  Trash2,
  Bus,
  Droplets,
  Trees,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const statsCards = [
  {
    title: "Total Complaints Today",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: FileText,
    description: "vs yesterday",
  },
  {
    title: "Resolved Today",
    value: "31",
    change: "+8%",
    trend: "up",
    icon: CheckCircle2,
    description: "vs yesterday",
  },
  {
    title: "Pending Review",
    value: "16",
    change: "-4%",
    trend: "down",
    icon: Clock,
    description: "vs yesterday",
  },
  {
    title: "Active Officers",
    value: "23",
    change: "0%",
    trend: "up",
    icon: Users,
    description: "on duty now",
  },
]

const complaints = [
  {
    id: "CMP-2026-0847",
    citizen: "John Carter",
    category: "Street Lighting",
    categoryIcon: Lightbulb,
    title: "Broken Streetlight on Oak Avenue",
    location: "142 Oak Ave, Ward 3",
    date: "2026-02-28",
    status: "in-progress",
    priority: "medium",
    officer: "James Rodriguez",
    hasImage: true,
    imageVerified: true,
    funds: 2500,
    progress: 65,
  },
  {
    id: "CMP-2026-0848",
    citizen: "Sarah Miller",
    category: "Waste Management",
    categoryIcon: Trash2,
    title: "Overflowing dumpster near school",
    location: "300 School Rd, Ward 1",
    date: "2026-02-28",
    status: "submitted",
    priority: "high",
    officer: "Unassigned",
    hasImage: true,
    imageVerified: false,
    funds: 0,
    progress: 10,
  },
  {
    id: "CMP-2026-0849",
    citizen: "Michael Johnson",
    category: "Transportation",
    categoryIcon: Bus,
    title: "Dangerous pothole on Highway 9",
    location: "Highway 9, Ward 4",
    date: "2026-02-28",
    status: "assigned",
    priority: "high",
    officer: "Lisa Thompson",
    hasImage: true,
    imageVerified: true,
    funds: 5000,
    progress: 30,
  },
  {
    id: "CMP-2026-0850",
    citizen: "Emily Chen",
    category: "Water & Sewage",
    categoryIcon: Droplets,
    title: "Sewage overflow on Pine Street",
    location: "89 Pine St, Ward 2",
    date: "2026-02-27",
    status: "in-progress",
    priority: "critical",
    officer: "Karen White",
    hasImage: true,
    imageVerified: true,
    funds: 8000,
    progress: 80,
  },
  {
    id: "CMP-2026-0851",
    citizen: "David Brown",
    category: "Parks & Recreation",
    categoryIcon: Trees,
    title: "Broken playground equipment",
    location: "Central Park, Ward 5",
    date: "2026-02-27",
    status: "resolved",
    priority: "medium",
    officer: "David Williams",
    hasImage: true,
    imageVerified: true,
    funds: 3200,
    progress: 100,
  },
  {
    id: "CMP-2026-0852",
    citizen: "Priya Patel",
    category: "Street Lighting",
    categoryIcon: Lightbulb,
    title: "Dark zone near residential area",
    location: "250 Sunset Blvd, Ward 3",
    date: "2026-02-28",
    status: "submitted",
    priority: "low",
    officer: "Unassigned",
    hasImage: false,
    imageVerified: false,
    funds: 0,
    progress: 5,
  },
]

const categoryStats = [
  { name: "Waste Management", icon: Trash2, count: 12, resolved: 8, color: "text-chart-1" },
  { name: "Transportation", icon: Bus, count: 9, resolved: 5, color: "text-chart-2" },
  { name: "Water & Sewage", icon: Droplets, count: 7, resolved: 6, color: "text-primary" },
  { name: "Parks & Rec", icon: Trees, count: 5, resolved: 4, color: "text-chart-3" },
  { name: "Street Lighting", icon: Lightbulb, count: 14, resolved: 8, color: "text-chart-5" },
]

const statusColors: Record<string, string> = {
  submitted: "bg-chart-5/10 text-chart-5",
  assigned: "bg-primary/10 text-primary",
  "in-progress": "bg-warning/10 text-warning",
  resolved: "bg-success/10 text-success",
}

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-chart-5/10 text-chart-5",
  high: "bg-warning/10 text-warning",
  critical: "bg-destructive/10 text-destructive",
}

export default function AdminPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredComplaints = statusFilter === "all"
    ? complaints
    : complaints.filter((c) => c.status === statusFilter)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="bg-primary px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground sm:text-3xl">Admin Dashboard</h1>
                <p className="mt-1 text-primary-foreground/70">Complaint management and analytics overview</p>
              </div>
              <Badge className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                <div className="mr-1.5 h-2 w-2 rounded-full bg-success animate-pulse" />
                Live
              </Badge>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((stat) => (
              <Card key={stat.title} className="border-border">
                <CardContent className="flex items-start justify-between pt-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3 text-success" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-destructive" />
                      )}
                      <span className={`text-xs ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">{stat.description}</span>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Category Breakdown & Quick Actions */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Card className="border-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Complaints by Category
                </CardTitle>
                <CardDescription className="text-muted-foreground">{"Today's breakdown across service departments"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {categoryStats.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <cat.icon className={`h-4 w-4 ${cat.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{cat.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {cat.resolved}/{cat.count} resolved
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${(cat.resolved / cat.count) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm text-muted-foreground">Avg. Resolution Time</span>
                  <span className="font-bold text-foreground">2.3 days</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm text-muted-foreground">Total Funds Allocated</span>
                  <span className="font-mono font-bold text-foreground">$47,200</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm text-muted-foreground">Images Verified</span>
                  <span className="font-bold text-foreground">41/47</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm text-muted-foreground">Deepfakes Detected</span>
                  <span className="font-bold text-destructive">3</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-success/10 p-3">
                  <span className="text-sm text-muted-foreground">Citizen Satisfaction</span>
                  <span className="font-bold text-success">96.4%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Complaints Table */}
          <Card className="mt-8 border-border">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    All Complaints
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">Manage and review all submitted complaints</CardDescription>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-background">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Complaint</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Officer</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComplaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-mono text-xs font-bold text-primary">
                          {complaint.id}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <p className="truncate text-sm font-medium text-foreground">{complaint.title}</p>
                            <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {complaint.location}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <complaint.categoryIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-foreground">{complaint.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${priorityColors[complaint.priority]}`}>
                            {complaint.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${statusColors[complaint.status]}`}>
                            {complaint.status.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {complaint.hasImage ? (
                            <div className="flex items-center gap-1">
                              <ImageIcon className="h-4 w-4 text-muted-foreground" />
                              {complaint.imageVerified ? (
                                <Shield className="h-3.5 w-3.5 text-success" />
                              ) : (
                                <AlertCircle className="h-3.5 w-3.5 text-warning" />
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">None</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs ${complaint.officer === "Unassigned" ? "text-destructive" : "text-foreground"}`}>
                            {complaint.officer}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={complaint.progress} className="h-1.5 w-16" />
                            <span className="text-xs text-muted-foreground">{complaint.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
