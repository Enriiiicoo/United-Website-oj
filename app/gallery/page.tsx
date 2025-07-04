"use client"

import { Navigation } from "@/components/navigation"
import { ProtectedPage } from "@/components/protected-page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Upload, Filter } from "lucide-react"
import Image from "next/image"

const galleryItems = [
  {
    id: 1,
    title: "Downtown Los Santos Sunset",
    description: "Beautiful golden hour shot of the city skyline from Vinewood Hills",
    image: "/placeholder.jpg",
    category: "Screenshots",
    author: {
      name: "PlayerOne",
      avatar: "/placeholder-user.jpg",
    },
    likes: 24,
    comments: 8,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "High Speed Police Chase",
    description: "Intense pursuit through the winding mountain roads",
    image: "/placeholder.jpg",
    category: "Action",
    author: {
      name: "CopGamer",
      avatar: "/placeholder-user.jpg",
    },
    likes: 31,
    comments: 12,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    title: "Weekly Car Meet",
    description: "Amazing turnout at this week's car show at Del Perro Pier",
    image: "/placeholder.jpg",
    category: "Events",
    author: {
      name: "CarLover",
      avatar: "/placeholder-user.jpg",
    },
    likes: 45,
    comments: 15,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    title: "Grove Street Roleplay",
    description: "Authentic gang roleplay scene in the heart of Los Santos",
    image: "/placeholder.jpg",
    category: "Roleplay",
    author: {
      name: "StreetKing",
      avatar: "/placeholder-user.jpg",
    },
    likes: 18,
    comments: 6,
    timestamp: "1 day ago",
  },
  {
    id: 5,
    title: "Emergency Medical Response",
    description: "Paramedics responding to a multi-vehicle accident",
    image: "/placeholder.jpg",
    category: "Roleplay",
    author: {
      name: "DocMike",
      avatar: "/placeholder-user.jpg",
    },
    likes: 27,
    comments: 9,
    timestamp: "2 days ago",
  },
  {
    id: 6,
    title: "Vespucci Beach Party",
    description: "Community event brought together over 50 players!",
    image: "/placeholder.jpg",
    category: "Events",
    author: {
      name: "PartyPlanner",
      avatar: "/placeholder-user.jpg",
    },
    likes: 62,
    comments: 23,
    timestamp: "3 days ago",
  },
]

const categories = [
  { name: "All", count: galleryItems.length },
  { name: "Screenshots", count: galleryItems.filter((item) => item.category === "Screenshots").length },
  { name: "Roleplay", count: galleryItems.filter((item) => item.category === "Roleplay").length },
  { name: "Events", count: galleryItems.filter((item) => item.category === "Events").length },
  { name: "Action", count: galleryItems.filter((item) => item.category === "Action").length },
]

export default function GalleryPage() {
  return (
    <ProtectedPage title="Gallery">
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Community <span className="text-orange-600">Gallery</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Discover amazing screenshots, roleplay moments, and community events captured by our players.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Category Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter by Category</h3>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.name}
                    variant="outline"
                    className="cursor-pointer hover:bg-orange-100 hover:border-orange-300 px-3 py-1"
                  >
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="relative aspect-video bg-gray-200">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-black/70 text-white">{item.category}</Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={item.author.avatar || "/placeholder.svg"} alt={item.author.name} />
                        <AvatarFallback className="text-xs">{item.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.author.name}</p>
                        <p className="text-xs text-gray-500">{item.timestamp}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{item.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{item.comments}</span>
                      </button>
                    </div>
                    <button className="text-gray-500 hover:text-orange-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upload Section */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Share Your Screenshots</CardTitle>
              <CardDescription className="text-lg">
                Captured an amazing moment in-game? Share it with the community and get featured!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-orange-50 rounded-lg">
                  <Upload className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-orange-800 mb-2">Upload Guidelines</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• High quality screenshots only</li>
                    <li>• No inappropriate content</li>
                    <li>• Include descriptive titles</li>
                    <li>• Tag relevant categories</li>
                  </ul>
                </div>
                <div className="p-6 bg-orange-50 rounded-lg">
                  <Heart className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-orange-800 mb-2">Get Featured</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Best shots get pinned</li>
                    <li>• Monthly contests</li>
                    <li>• Community voting</li>
                    <li>• Special recognition</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Screenshot
                </Button>
                <Button variant="outline">View Guidelines</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedPage>
  )
}
