import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const galleryItems = [
  {
    title: "Downtown Los Santos",
    description: "Beautiful sunset view of the city skyline",
    image: "/placeholder.jpg",
    category: "Screenshots",
    author: "PlayerOne",
  },
  {
    title: "Police Chase",
    description: "High-speed pursuit through the mountains",
    image: "/placeholder.jpg",
    category: "Action",
    author: "CopGamer",
  },
  {
    title: "Car Meet",
    description: "Weekly car show at the pier",
    image: "/placeholder.jpg",
    category: "Events",
    author: "CarLover",
  },
  {
    title: "Gang Territory",
    description: "Roleplay scene in Grove Street",
    image: "/placeholder.jpg",
    category: "Roleplay",
    author: "StreetKing",
  },
  {
    title: "Hospital RP",
    description: "Medical roleplay at the hospital",
    image: "/placeholder.jpg",
    category: "Roleplay",
    author: "DocMike",
  },
  {
    title: "Beach Party",
    description: "Community event at Vespucci Beach",
    image: "/placeholder.jpg",
    category: "Events",
    author: "PartyPlanner",
  },
  {
    title: "Custom Cars",
    description: "Showcase of modified vehicles",
    image: "/placeholder.jpg",
    category: "Screenshots",
    author: "ModMaster",
  },
  {
    title: "Heist Preparation",
    description: "Planning the perfect crime",
    image: "/placeholder.jpg",
    category: "Action",
    author: "HeistBoss",
  },
]

const categories = ["All", "Screenshots", "Roleplay", "Events", "Action"]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community <span className="text-orange-600">Gallery</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Check out amazing screenshots, roleplay moments, and community events captured by our players in United
            Roleplay.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-orange-100 hover:border-orange-300"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative aspect-video">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-xs text-orange-600">By {item.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Screenshots</h2>
            <p className="text-lg text-gray-600 mb-6">
              Captured an amazing moment in-game? Share it with the community!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer">
                <Button className="bg-orange-600 hover:bg-orange-700">Upload to Discord</Button>
              </a>
              <Button variant="outline">Submission Guidelines</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
