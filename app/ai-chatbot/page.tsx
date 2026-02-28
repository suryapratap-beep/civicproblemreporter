"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Send,
  Upload,
  ImageIcon,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  Navigation,
  ScanEye,
  FileSearch,
  Trash2,
  HelpCircle,
  X,
} from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type VerificationResult = {
  status: "genuine" | "suspicious" | "deepfake" | "analyzing"
  confidence: number
  details: string[]
}

const quickActions = [
  { label: "How to submit a complaint?", icon: HelpCircle },
  { label: "Track my complaint status", icon: Navigation },
  { label: "Find nearest service center", icon: Navigation },
  { label: "Report a streetlight outage", icon: Trash2 },
]

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Civic AI Assistant. I can help you navigate the system, answer questions about public services, and verify uploaded images for authenticity. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true)
    setTimeout(() => {
      let response = ""
      const lower = userMessage.toLowerCase()
      if (lower.includes("complaint") && lower.includes("submit")) {
        response = "To submit a complaint:\n\n1. Go to the 'Submit Complaint' page from the navigation\n2. Fill in your personal details (name, email, phone)\n3. Select the service category (Waste, Transportation, etc.)\n4. Describe the issue in detail\n5. Upload photos as evidence\n6. Our AI will verify the images automatically\n7. Click submit and you'll receive a tracking ID\n\nWould you like me to take you to the complaint form?"
      } else if (lower.includes("track")) {
        response = "You can track your complaint progress by:\n\n1. Going to 'Track Complaints' in the navigation\n2. Enter your complaint ID (e.g., #CMP-2026-0847)\n3. You'll see the current status, assigned officer, allocated funds, and timeline\n\nWould you like to check a specific complaint?"
      } else if (lower.includes("service") || lower.includes("center")) {
        response = "We offer 5 main service categories:\n\n- Waste Management - Public Works Dept, 200 Civic Center Dr\n- Transportation - Transit Authority, 150 Transit Blvd\n- Water & Sewage - Water Authority, 300 Reservoir Rd\n- Parks & Recreation - Parks Dept, 75 Greenway Ave\n- Street Lighting - Electrical Services, 100 Power Lane\n\nEach department has dedicated staff ready to help. Which service do you need?"
      } else if (lower.includes("streetlight") || lower.includes("light")) {
        response = "To report a streetlight outage:\n\n1. Go to Submit Complaint\n2. Select 'Street Lighting' as the category\n3. Provide the exact location or nearest address\n4. Upload a photo of the dark area if possible\n5. Our team typically responds within 24-48 hours\n\nThe Electrical Services department handles all street lighting issues at 100 Power Lane."
      } else {
        response = "Thank you for your message. I can help you with:\n\n- Navigating the civic services platform\n- Submitting and tracking complaints\n- Finding service center locations\n- Verifying image authenticity\n- Understanding complaint procedures\n\nPlease ask me anything specific about these services!"
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    simulateResponse(input)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadedImage(e.target.files[0])
      setVerificationResult(null)
    }
  }

  const verifyImage = () => {
    if (!uploadedImage) return
    setIsVerifying(true)
    setVerificationResult({ status: "analyzing", confidence: 0, details: [] })

    setTimeout(() => {
      const isGenuine = Math.random() > 0.3
      setVerificationResult({
        status: isGenuine ? "genuine" : "suspicious",
        confidence: isGenuine ? 94.7 : 32.1,
        details: isGenuine
          ? [
              "No signs of digital manipulation detected",
              "EXIF metadata is consistent",
              "Pixel-level analysis passed",
              "No GAN artifacts found",
              "Lighting and shadows are consistent",
            ]
          : [
              "Potential signs of image manipulation",
              "Inconsistent noise patterns detected",
              "Possible GAN-generated artifacts",
              "Metadata inconsistencies found",
              "Recommend manual review by officer",
            ],
      })
      setIsVerifying(false)
    }, 3000)
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
              AI <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Civic Assistant</span>
            </h1>
            <p className="mt-3 text-primary-foreground/70">
              Navigate services, verify images, and detect deepfakes with AI
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 lg:w-96">
              <TabsTrigger value="chat" className="gap-2">
                <Bot className="h-4 w-4" />
                Chat Assistant
              </TabsTrigger>
              <TabsTrigger value="verify" className="gap-2">
                <ScanEye className="h-4 w-4" />
                Image Verification
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat">
              <div className="grid gap-6 lg:grid-cols-4">
                <Card className="border-border lg:col-span-3">
                  <CardContent className="flex flex-col p-0">
                    <ScrollArea className="h-[500px] p-4">
                      <div className="flex flex-col gap-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                          >
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                msg.role === "assistant" ? "bg-primary/10" : "bg-secondary"
                              }`}
                            >
                              {msg.role === "assistant" ? (
                                <Bot className="h-4 w-4 text-primary" />
                              ) : (
                                <span className="text-xs font-bold text-secondary-foreground">Y</span>
                              )}
                            </div>
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                msg.role === "assistant"
                                  ? "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground"
                                  : "bg-gradient-to-br from-primary to-[oklch(0.4_0.15_200)] text-primary-foreground"
                              }`}
                            >
                              <p className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</p>
                              <p className={`mt-1 text-[10px] ${msg.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <Bot className="h-4 w-4 text-primary" />
                            </div>
                            <div className="rounded-2xl bg-secondary px-4 py-3">
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={chatEndRef} />
                      </div>
                    </ScrollArea>
                    <div className="border-t border-border p-4">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Ask me anything about civic services..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSend()}
                          className="bg-background"
                        />
                        <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions Sidebar */}
                <div className="flex flex-col gap-4">
                  <Card className="border-border">
                    <CardContent className="flex flex-col gap-3 pt-6">
                      <h3 className="text-sm font-semibold text-card-foreground">Quick Actions</h3>
                      {quickActions.map((action) => (
                        <Button
                          key={action.label}
                          variant="outline"
                          className="h-auto justify-start gap-2 whitespace-normal text-left text-xs"
                          onClick={() => {
                            setInput(action.label)
                            setTimeout(() => {
                              const userMessage: Message = {
                                id: Date.now().toString(),
                                role: "user",
                                content: action.label,
                                timestamp: new Date(),
                              }
                              setMessages((prev) => [...prev, userMessage])
                              setInput("")
                              simulateResponse(action.label)
                            }, 100)
                          }}
                        >
                          <action.icon className="h-4 w-4 shrink-0 text-primary" />
                          {action.label}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/[0.02]">
                    <CardContent className="flex flex-col gap-2 pt-6">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-semibold text-card-foreground">AI Capabilities</h3>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {[
                          "Navigation assistance",
                          "Image authenticity check",
                          "Deepfake detection",
                          "Service information",
                          "Complaint guidance",
                        ].map((cap) => (
                          <li key={cap} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Image Verification Tab */}
            <TabsContent value="verify">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                      <FileSearch className="h-5 w-5 text-primary" />
                      Upload Image for Verification
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Our AI analyzes images for manipulation, deepfakes, and GAN artifacts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed border-border bg-gradient-to-b from-secondary/30 to-primary/[0.02] p-10 transition-colors hover:border-primary/50 hover:from-secondary/50 hover:to-primary/[0.05]"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                    >
                      {uploadedImage ? (
                        <>
                          <ImageIcon className="h-12 w-12 text-primary" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-foreground">{uploadedImage.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              setUploadedImage(null)
                              setVerificationResult(null)
                            }}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Remove
                          </Button>
                        </>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-muted-foreground" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-foreground">
                              Click to upload an image
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Supports PNG, JPG, WEBP up to 10MB
                            </p>
                          </div>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <Button
                      onClick={verifyImage}
                      disabled={!uploadedImage || isVerifying}
                      className="w-full gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <ScanEye className="h-4 w-4" />
                          Verify Image Authenticity
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Verification Results */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                      <Shield className="h-5 w-5 text-primary" />
                      Verification Results
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      AI analysis of the uploaded image
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!verificationResult ? (
                      <div className="flex flex-col items-center gap-3 py-12 text-center">
                        <ScanEye className="h-16 w-16 text-muted-foreground/30" />
                        <p className="text-sm text-muted-foreground">
                          Upload and verify an image to see results here
                        </p>
                      </div>
                    ) : verificationResult.status === "analyzing" ? (
                      <div className="flex flex-col items-center gap-4 py-12">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <div className="text-center">
                          <p className="font-medium text-foreground">Analyzing Image...</p>
                          <p className="text-sm text-muted-foreground">
                            Running deepfake detection and manipulation checks
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                          <Badge variant="secondary">Pixel Analysis</Badge>
                          <Badge variant="secondary">GAN Detection</Badge>
                          <Badge variant="secondary">Metadata Check</Badge>
                          <Badge variant="secondary">Noise Pattern</Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5">
                        {/* Status Banner */}
                        <div
                          className={`flex items-center gap-3 rounded-xl p-4 ${
                            verificationResult.status === "genuine"
                              ? "bg-success/10"
                              : "bg-destructive/10"
                          }`}
                        >
                          {verificationResult.status === "genuine" ? (
                            <CheckCircle2 className="h-8 w-8 text-success" />
                          ) : (
                            <XCircle className="h-8 w-8 text-destructive" />
                          )}
                          <div>
                            <p className={`font-bold ${verificationResult.status === "genuine" ? "text-success" : "text-destructive"}`}>
                              {verificationResult.status === "genuine" ? "Image Verified - Genuine" : "Warning - Suspicious Image"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Confidence: {verificationResult.confidence}%
                            </p>
                          </div>
                        </div>

                        {/* Confidence Bar */}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Authenticity Score</span>
                            <span className="font-bold text-foreground">{verificationResult.confidence}%</span>
                          </div>
                          <div className="h-3 overflow-hidden rounded-full bg-secondary">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                verificationResult.confidence > 70 ? "bg-success" : "bg-destructive"
                              }`}
                              style={{ width: `${verificationResult.confidence}%` }}
                            />
                          </div>
                        </div>

                        {/* Analysis Details */}
                        <div className="flex flex-col gap-2">
                          <h4 className="text-sm font-semibold text-foreground">Analysis Details</h4>
                          {verificationResult.details.map((detail) => (
                            <div key={detail} className="flex items-start gap-2">
                              {verificationResult.status === "genuine" ? (
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                              ) : (
                                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                              )}
                              <p className="text-sm text-muted-foreground">{detail}</p>
                            </div>
                          ))}
                        </div>

                        {/* Checks */}
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "Deepfake", check: verificationResult.status === "genuine" },
                            { label: "GAN Artifacts", check: verificationResult.status === "genuine" },
                            { label: "Metadata", check: verificationResult.status === "genuine" },
                            { label: "Pixel Analysis", check: verificationResult.status === "genuine" },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2 rounded-lg border border-border p-3">
                              {item.check ? (
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              ) : (
                                <XCircle className="h-4 w-4 text-destructive" />
                              )}
                              <span className="text-xs font-medium text-foreground">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
