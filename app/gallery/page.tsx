"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Upload, Filter, Eye } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const galleryItems = [
  {
    id: 1,
    title: "Downtown Los Santos Sunset",
    image: "/placeholder.jpg",
    category: "Screenshots",
    author: {
      name: "PlayerOne",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 24,
      comments: 8,
      views: 156,
    },
    timestamp: "2 hours ago",
    featured: true,
  },
  {
    id: 2,
    title: "Police Chase Through Mountains",
    image: "/placeholder.jpg",
    category: "Action",
    author: {
      name: "CopGamer",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 31,
      comments: 12,
      views: 203,
    },
    timestamp: "5 hours ago",
    featured: false,
  },
  {
    id: 3,
    title: "Weekly Car Meet at Pier",
    image: "/placeholder.jpg",
    category: "Events",
    author: {
      name: "CarLover",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 45,
      comments: 15,
      views: 289,
    },
    timestamp: "1 day ago",
    featured: true,
  },
  {
    id: 4,
    title: "Grove Street Roleplay Scene",
    image: "/placeholder.jpg",
    category: "Roleplay",
    author: {
      name: "StreetKing",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 18,
      comments: 6,
      views: 134,
    },
    timestamp: "1 day ago",
    featured: false,
  },
  {
    id: 5,
    title: "Emergency Medical Response",
    image: "/placeholder.jpg",
    category: "Roleplay",
    author: {
      name: "DocMike",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 27,
      comments: 9,
      views: 178,
    },
    timestamp: "2 days ago",
    featured: false,
  },
  {
    id: 6,
    title: "Beach Party Community Event",
    image: "/placeholder.jpg",
    category: "Events",
    author: {
      name: "PartyPlanner",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 62,
      comments: 23,
      views: 445,
    },
    timestamp: "3 days ago",
    featured: true,
  },
]

const categories = ["All", "Screenshots", "Roleplay", "Events", "Action"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredItems =
    selectedCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <DashboardLayout title="Gallery">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Community Gallery</h1>
            <p className="text-gray-400 mt-2">Discover amazing screenshots and moments captured by our community.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Screenshot
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
                        : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-orange-500"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery */}
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="bg-gray-900 border-gray-700 overflow-hidden hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="relative">
                <div className={`relative ${viewMode === "grid" ? "aspect-video" : "aspect-[21/9]"} bg-gray-800`}>
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  {item.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white">Featured</Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/70 text-white border-0">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.author.avatar || "/placeholder.svg"} alt={item.author.name} />
                      <AvatarFallback className="text-xs bg-gray-700 text-white">
                        {item.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">{item.author.name}</p>
                      <p className="text-xs text-gray-500">{item.timestamp}</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-3">{item.title}</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{item.stats.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{item.stats.comments}</span>
                    </button>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{item.stats.views}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-orange-400 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Guidelines */}
        <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700">
          <CardContent className="p-6">
            <div className="text-center">
              <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Share Your Screenshots</h3>
              <p className="text-gray-300 mb-4">
                Captured an amazing moment? Share it with the community and get featured!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-300 mb-6">
                <div>• High quality images only</div>
                <div>• No inappropriate content</div>
                <div>• Include descriptive titles</div>
                <div>• Tag relevant categories</div>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Upload Your Screenshot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
