"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Send, CheckCircle } from "lucide-react"
import { useState } from "react"
import { submitWhitelistApplication } from "@/app/actions/whitelist"
import { toast } from "sonner"

export default function WhitelistPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    discord: "",
    experience: "",
    character: "",
    backstory: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      const result = await submitWhitelistApplication(formDataObj)

      if (result.success) {
        setSubmitted(true)
        toast.success(result.message)
        // Reset form
        setFormData({
          name: "",
          age: "",
          discord: "",
          experience: "",
          character: "",
          backstory: "",
        })
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern flex items-center justify-center">
        <Card className="bg-black/50 border-green-500/30 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Application Submitted!</h2>
            <p className="text-gray-400 mb-6">
              Thank you for your application. Our staff will review it within 24-48 hours and contact you via Discord.
            </p>
            <Button onClick={() => setSubmitted(false)} className="bg-orange-600 hover:bg-orange-700">
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            <span className="text-orange-500">Whitelist</span> <span className="text-white">Application</span>
          </h1>
          <p className="text-lg text-gray-400">Apply to join our exclusive roleplay community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-black/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <FileText className="h-6 w-6" />
                  Application Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-black/50 border-gray-600 text-white"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="age" className="text-gray-300">
                        Age Range *
                      </Label>
                      <Select
                        name="age"
                        onValueChange={(value) => setFormData({ ...formData, age: value })}
                        disabled={isSubmitting}
                        required
                      >
                        <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select your age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16-18">16-18</SelectItem>
                          <SelectItem value="19-25">19-25</SelectItem>
                          <SelectItem value="26-35">26-35</SelectItem>
                          <SelectItem value="36+">36+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="discord" className="text-gray-300">
                      Discord Username *
                    </Label>
                    <Input
                      id="discord"
                      name="discord"
                      value={formData.discord}
                      onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                      className="bg-black/50 border-gray-600 text-white"
                      placeholder="username#1234"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-gray-300">
                      Roleplay Experience *
                    </Label>
                    <Select
                      name="experience"
                      onValueChange={(value) => setFormData({ ...formData, experience: value })}
                      disabled={isSubmitting}
                      required
                    >
                      <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                        <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                        <SelectItem value="expert">Expert (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="character" className="text-gray-300">
                      Character Name & Concept *
                    </Label>
                    <Input
                      id="character"
                      name="character"
                      value={formData.character}
                      onChange={(e) => setFormData({ ...formData, character: e.target.value })}
                      className="bg-black/50 border-gray-600 text-white"
                      placeholder="e.g., Ahmed Hassan - Taxi Driver"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="backstory" className="text-gray-300">
                      Character Backstory *
                    </Label>
                    <Textarea
                      id="backstory"
                      name="backstory"
                      value={formData.backstory}
                      onChange={(e) => setFormData({ ...formData, backstory: e.target.value })}
                      className="bg-black/50 border-gray-600 text-white min-h-32"
                      placeholder="Tell us about your character's background, personality, and goals..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-black/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400">Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-300 text-sm">
                <div className="flex gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Must be 16+ years old</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Active Discord account</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Basic roleplay knowledge</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Respectful attitude</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Commitment to server rules</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400">Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-300 text-sm">
                <div className="flex gap-2">
                  <span className="text-orange-500">1.</span>
                  <span>Submit application</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500">2.</span>
                  <span>Staff review (24-48h)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500">3.</span>
                  <span>Discord interview</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500">4.</span>
                  <span>Final decision</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-900/20 border-orange-500/50">
              <CardContent className="p-4 text-center">
                <p className="text-orange-300 text-sm">
                  Applications are reviewed carefully. Please be patient and honest in your responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
