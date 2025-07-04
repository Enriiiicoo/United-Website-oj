import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Star, Zap, Shield, Car, Home } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { TiltCard } from "@/components/tilt-card"
import { LiquidBlob } from "@/components/liquid-blob"
import { MatrixRain } from "@/components/matrix-rain"

export default function VIPPage() {
  const vipTiers = [
    {
      name: "VIP Bronze",
      price: "$9.99",
      period: "/month",
      color: "from-amber-600 to-amber-800",
      icon: Star,
      features: [
        "Priority queue access",
        "Exclusive VIP chat",
        "Custom name color",
        "2x experience boost",
        "VIP spawn locations",
      ],
    },
    {
      name: "VIP Silver",
      price: "$19.99",
      period: "/month",
      color: "from-gray-400 to-gray-600",
      icon: Shield,
      features: [
        "All Bronze benefits",
        "Exclusive vehicles",
        "VIP properties",
        "3x experience boost",
        "Custom license plates",
        "Priority support",
      ],
    },
    {
      name: "VIP Gold",
      price: "$29.99",
      period: "/month",
      color: "from-yellow-400 to-yellow-600",
      icon: Crown,
      features: [
        "All Silver benefits",
        "Exclusive weapons",
        "VIP businesses",
        "5x experience boost",
        "Custom animations",
        "VIP events access",
        "Dedicated support",
      ],
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern relative overflow-hidden">
      {/* VIP page gets liquid blobs and matrix rain for premium feel */}
      <LiquidBlob />
      <MatrixRain />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
              <span className="text-orange-500">VIP</span> <span className="text-white">Membership</span>
            </h1>
            <p className="text-lg text-gray-400">Unlock exclusive features and support the server</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {vipTiers.map((tier, index) => {
            const IconComponent = tier.icon
            return (
              <AnimatedSection key={tier.name} animation="slideUp" delay={index * 200}>
                <TiltCard>
                  <Card
                    className={`bg-gradient-to-br ${tier.color} border-0 relative overflow-hidden hover:scale-105 transition-all duration-500 ${index === 1 ? "scale-105 shadow-2xl" : ""} backdrop-blur-sm`}
                  >
                    {index === 1 && (
                      <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 text-sm font-bold animate-pulse">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader className={`text-center ${index === 1 ? "pt-12" : "pt-6"}`}>
                      <IconComponent className="h-12 w-12 mx-auto mb-4 text-white animate-bounce" />
                      <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                      <div className="text-4xl font-bold text-white">
                        {tier.price}
                        <span className="text-lg font-normal">{tier.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 text-white hover:scale-105 transition-transform"
                        >
                          <Zap className="h-4 w-4 text-yellow-300" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      <Button className="w-full mt-6 bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                </TiltCard>
              </AnimatedSection>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection animation="slideLeft" delay={600}>
            <TiltCard>
              <Card className="bg-black/50 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Car className="h-6 w-6" />
                    VIP Vehicles
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>
                    Access exclusive high-end vehicles including supercars, luxury sedans, and custom motorcycles only
                    available to VIP members.
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>

          <AnimatedSection animation="slideRight" delay={800}>
            <TiltCard>
              <Card className="bg-black/50 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Home className="h-6 w-6" />
                    VIP Properties
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>
                    Own premium properties in the best locations with exclusive interiors and special features not
                    available to regular players.
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
