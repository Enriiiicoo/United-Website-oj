"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Star, Zap, Shield, Users, Car, Home, Palette, MessageSquare, CheckCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

// Floating particle component
const VipParticle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-70"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }}
  />
)

export default function VIPPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handlePurchase = (tier: string, price: string) => {
    alert(
      `🎉 Contact our staff team on Discord to purchase ${tier} VIP for ${price}!\n\nJoin: https://discord.gg/eQeHev6p94`,
    )
    window.open("https://discord.gg/eQeHev6p94", "_blank")
  }

  const handleContactSupport = () => {
    window.open("https://discord.gg/eQeHev6p94", "_blank")
  }

  const vipTiers = [
    {
      name: "VIP Bronze",
      price: "$9.99",
      duration: "30 Days",
      color: "from-amber-600 to-orange-700",
      glowColor: "shadow-amber-500/50",
      borderColor: "border-amber-500/30",
      icon: Star,
      features: [
        "Priority Queue Access",
        "Bronze VIP Tag",
        "2x Experience Boost",
        "Access to VIP Lounge",
        "Custom License Plates",
        "VIP Support Channel",
      ],
    },
    {
      name: "VIP Silver",
      price: "$19.99",
      duration: "30 Days",
      color: "from-gray-400 to-gray-600",
      glowColor: "shadow-gray-400/50",
      borderColor: "border-gray-400/30",
      icon: Shield,
      popular: true,
      features: [
        "All Bronze Features",
        "Silver VIP Tag",
        "3x Experience Boost",
        "Exclusive Vehicle Access",
        "Custom Phone Numbers",
        "VIP Housing Priority",
        "Monthly VIP Events",
      ],
    },
    {
      name: "VIP Gold",
      price: "$39.99",
      duration: "30 Days",
      color: "from-yellow-400 to-yellow-600",
      glowColor: "shadow-yellow-500/50",
      borderColor: "border-yellow-500/30",
      icon: Crown,
      features: [
        "All Silver Features",
        "Gold VIP Tag",
        "5x Experience Boost",
        "Exclusive Gold Vehicles",
        "Custom Character Slots",
        "VIP Business Discounts",
        "Priority Staff Support",
        "Exclusive Gold Events",
      ],
    },
    {
      name: "VIP Diamond",
      price: "$79.99",
      duration: "30 Days",
      color: "from-cyan-400 to-blue-600",
      glowColor: "shadow-cyan-500/50",
      borderColor: "border-cyan-500/30",
      icon: Sparkles,
      premium: true,
      features: [
        "All Gold Features",
        "Diamond VIP Tag",
        "10x Experience Boost",
        "Exclusive Diamond Fleet",
        "Custom Properties",
        "VIP Staff Privileges",
        "Direct Admin Contact",
        "Exclusive Diamond Perks",
        "Monthly VIP Rewards",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/10 via-transparent to-purple-900/10"></div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <VipParticle key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-yellow-500/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            VIP MEMBERSHIP
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock the ultimate roleplay experience with our premium VIP memberships. Get exclusive access to features,
            vehicles, properties, and much more!
          </p>

          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Instant Activation
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Secure Payment
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2" />
              24/7 Support
            </Badge>
          </div>
        </div>

        {/* VIP Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {vipTiers.map((tier, index) => (
            <div key={index} className="relative group">
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 text-sm font-semibold animate-pulse">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              {tier.premium && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 text-sm font-semibold animate-pulse">
                    PREMIUM
                  </Badge>
                </div>
              )}

              <Card
                className={`relative h-full backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border-2 ${tier.borderColor} ${tier.glowColor} hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:border-opacity-60`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl mx-auto flex items-center justify-center shadow-lg ${tier.glowColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <tier.icon className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tier.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>
                  </div>

                  <CardTitle className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {tier.name}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                      {tier.price}
                    </div>
                    <CardDescription className="text-gray-400">{tier.duration}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePurchase(tier.name, tier.price)}
                    className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-semibold py-3 shadow-lg ${tier.glowColor} hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group/btn`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Purchase Now
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                  </Button>
                </CardContent>

                {/* Card Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tier.color} rounded-lg blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Car,
              title: "Exclusive Vehicles",
              description: "Access to premium vehicle collections not available to regular players",
              color: "from-red-500 to-pink-600",
            },
            {
              icon: Home,
              title: "VIP Properties",
              description: "Priority access to the best properties and exclusive VIP housing areas",
              color: "from-blue-500 to-cyan-600",
            },
            {
              icon: Palette,
              title: "Customization",
              description: "Unlimited character customization options and exclusive cosmetic items",
              color: "from-purple-500 to-violet-600",
            },
          ].map((benefit, index) => (
            <Card
              key={index}
              className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                  ></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="text-center">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-orange-500/30 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="relative mb-4">
                <MessageSquare className="w-12 h-12 text-orange-500 mx-auto" />
                <div className="absolute inset-0 bg-orange-500 blur-xl opacity-30"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
              <p className="text-gray-300 mb-6">
                Our VIP support team is available 24/7 to assist you with purchases, activation, and any questions you
                may have. Join our Discord for instant support!
              </p>
              <Button
                onClick={handleContactSupport}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 font-semibold shadow-lg shadow-orange-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Join Discord Support
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-500 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-orange-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-purple-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-40 right-10 w-2 h-2 bg-cyan-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  )
}
