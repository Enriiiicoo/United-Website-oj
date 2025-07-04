import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import { TiltCard } from "@/components/tilt-card"
import { GlowingOrbs } from "@/components/glowing-orbs"
import { MorphingShapes } from "@/components/morphing-shapes"
import { Camera, ImageIcon, Play } from "lucide-react"
import Image from "next/image"

export default function GalleryPage() {
  const images = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder.svg?height=400&width=600`,
    alt: `Gallery image ${i + 1}`,
    title: `Epic Moment ${i + 1}`,
    category: i % 3 === 0 ? "Events" : i % 3 === 1 ? "Roleplay" : "Community",
    isVideo: i % 5 === 0,
  }))

  const categories = ["All", "Events", "Roleplay", "Community"]

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern relative overflow-hidden">
      <GlowingOrbs />
      <MorphingShapes />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/20 to-orange-400/20 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-8">
              <Camera className="h-6 w-6 text-orange-400" />
              <span className="text-orange-300 font-semibold">Visual Showcase</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="text-white">Server</span>
              <br />
              <span className="text-orange-500">Gallery</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto rounded-full mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Witness the incredible moments and memories created by our amazing community
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection animation="fadeIn" delay={200}>
          <div className="flex justify-center mb-16">
            <div className="flex gap-2 bg-black/50 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    index === 0
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((image, index) => (
            <AnimatedSection key={image.id} animation="scaleIn" delay={index * 50}>
              <TiltCard>
                <Card className="bg-black/50 border-orange-500/30 overflow-hidden hover:border-orange-500/50 transition-all duration-500 group backdrop-blur-sm break-inside-avoid mb-6">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Video Play Button */}
                      {image.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="bg-orange-500 rounded-full p-4 hover:scale-110 transition-transform duration-300">
                            <Play className="h-8 w-8 text-white ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {image.category}
                        </span>
                      </div>

                      {/* Media Type Icon */}
                      <div className="absolute top-4 right-4">
                        {image.isVideo ? (
                          <Play className="h-5 w-5 text-white/80" />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-white/80" />
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">
                        {image.title}
                      </h3>
                      <p className="text-gray-400 text-sm">UNITED Server</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500">{image.isVideo ? "Video" : "Screenshot"}</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${i < 4 ? "bg-orange-500" : "bg-gray-600"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Load More Section */}
        <AnimatedSection animation="fadeIn" delay={1000}>
          <div className="text-center mt-16">
            <TiltCard>
              <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 group">
                <span className="group-hover:scale-110 transition-transform inline-block">Load More Memories</span>
              </button>
            </TiltCard>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
