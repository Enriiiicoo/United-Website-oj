"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Upload, Filter, Eye, Camera, ImageIcon, Video } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

// Floating particle component
const GalleryParticle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse opacity-70"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }}
  />
)

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
      likes: 124,
      comments: 18,
      views: 856,
    },
    timestamp: "2 hours ago",
    featured: true,
  },
  {
    id: 2,
    title: "Epic Police Chase",
    image: "/placeholder.jpg",
    category: "Action",
    author: {
      name: "CopGamer",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 231,
      comments: 42,
      views: 1203,
    },
    timestamp: "5 hours ago",
    featured: false,
  },
  {
    id: 3,
    title: "Weekly Car Meet",
    image: "/placeholder.jpg",
    category: "Events",
    author: {
      name: "CarLover",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 345,
      comments: 65,
      views: 1789,
    },
    timestamp: "1 day ago",
    featured: true,
  },
  {
    id: 4,
    title: "Grove Street RP",
    image: "/placeholder.jpg",
    category: "Roleplay",
    author: {
      name: "StreetKing",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 189,
      comments: 26,
      views: 934,
    },
    timestamp: "1 day ago",
    featured: false,
  },
  {
    id: 5,
    title: "Medical Emergency",
    image: "/placeholder.jpg",
    category: "Roleplay",
    author: {
      name: "DocMike",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 167,
      comments: 19,
      views: 678,
    },
    timestamp: "2 days ago",
    featured: false,
  },
  {
    id: 6,
    title: "Beach Party Event",
    image: "/placeholder.jpg",
    category: "Events",
    author: {
      name: "PartyPlanner",
      avatar: "/placeholder-user.jpg",
    },
    stats: {
      likes: 412,
      comments: 83,
      views: 2145,
    },
    timestamp: "3 days ago",
    featured: true,
  },
]

const categories = ["All", "Screenshots", "Roleplay", "Events", "Action"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const filteredItems =
    selectedCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const handleUpload = () => {
    window.open("https://discord.gg/eQeHev6p94", "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/10 via-transparent to-purple-900/10"></div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <GalleryParticle key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-pink-500/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <Camera className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            COMMUNITY GALLERY
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover amazing screenshots and moments captured by our community. Share your best roleplay experiences and
            get featured!
          </p>

          <Button
            onClick={handleUpload}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Upload className="w-5 h-5" />
              Upload Screenshot
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Button>
        </div>

        {/* Filters */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/50"
                        : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-pink-500/50 backdrop-blur-sm"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300"
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
          className={`grid gap-8 mb-16 ${
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 overflow-hidden hover:border-pink-500/50 transition-all duration-500 hover:scale-105 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <div className={`relative ${viewMode === "grid" ? "aspect-video" : "aspect-[21/9]"} bg-gray-800`}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  {item.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg animate-pulse">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/70 backdrop-blur-sm text-white border-0 shadow-lg">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-pink-500/30">
                      <AvatarImage src={item.author.avatar || "/placeholder.svg"} alt={item.author.name} />
                      <AvatarFallback className="text-sm bg-gray-700 text-white">
                        {item.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">{item.author.name}</p>
                      <p className="text-xs text-gray-500">{item.timestamp}</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-4 group-hover:text-pink-300 transition-colors duration-300">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-300 group/btn">
                      <Heart className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium">{item.stats.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group/btn">
                      <MessageCircle className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium">{item.stats.comments}</span>
                    </button>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.stats.views}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-pink-400 transition-colors duration-300 hover:scale-110">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Guidelines */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>

          <CardContent className="p-8 text-center relative z-10">
            <div className="relative mb-6">
              <Upload className="h-16 w-16 text-purple-400 mx-auto" />
              <div className="absolute inset-0 bg-purple-400 blur-xl opacity-30"></div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
              Share Your Screenshots
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Captured an amazing moment? Share it with the community and get featured in our gallery!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-300 mb-8">
              <div className="flex items-center justify-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                High quality images only
              </div>
              <div className="flex items-center justify-center gap-2">
                <Video className="w-4 h-4 text-pink-400" />
                No inappropriate content
              </div>
              <div className="flex items-center justify-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                Include descriptive titles
              </div>
              <div className="flex items-center justify-center gap-2">
                <Filter className="w-4 h-4 text-orange-400" />
                Tag relevant categories
              </div>
            </div>
            <Button
              onClick={handleUpload}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Upload className="w-5 h-5" />
                Upload Your Screenshot
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-pink-500 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-cyan-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-40 right-10 w-2 h-2 bg-pink-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  )
}
