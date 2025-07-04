"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Crown, Star, Zap, Gift, Users, Car, Home, Sparkles, Diamond, Gem } from "lucide-react"

const vipTiers = [
  {
    id: "bronze",
    name: "Bronze VIP",
    price: "$9.99",
    period: "/month",
    color: "from-orange-600 to-orange-800",
    borderColor: "border-orange-500",
    glowColor: "shadow-orange-500/50",
    icon: Star,
    popular: false,
    features: [
      "Priority queue access",
      "VIP chat tag",
      "Access to VIP Discord channels",
      "Monthly in-game cash bonus",
      "Custom license plates",
      "VIP spawn locations",
    ],
  },
  {
    id: "silver",
    name: "Silver VIP",
    price: "$19.99",
    period: "/month",
    color: "from-gray-400 to-gray-600",
    borderColor: "border-gray-400",
    glowColor: "shadow-gray-400/50",
    icon: Zap,
    popular: true,
    features: [
      "All Bronze VIP features",
      "Higher priority queue",
      "Exclusive VIP vehicles",
      "Double monthly cash bonus",
      "Custom character slots (+2)",
      "VIP housing discounts",
      "Early access to new features",
    ],
  },
  {
    id: "gold",
    name: "Gold VIP",
    price: "$39.99",
    period: "/month",
    color: "from-yellow-400 to-yellow-600",
    borderColor: "border-yellow-400",
    glowColor: "shadow-yellow-400/50",
    icon: Crown,
    popular: false,
    features: [
      "All Silver VIP features",
      "Highest priority queue",
      "Exclusive Gold VIP vehicles",
      "Triple monthly cash bonus",
      "Custom character slots (+5)",
      "Free VIP housing",
      "Personal VIP support",
      "Custom animations",
      "Exclusive VIP events",
    ],
  },
]

const vipPerks = [
  {
    icon: Users,
    title: "Priority Access",
    description: "Skip the queue and get priority access to the server during peak hours.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Car,
    title: "Exclusive Vehicles",
    description: "Access to VIP-only vehicles and customization options not available to regular players.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Home,
    title: "Premium Properties",
    description: "Discounts on premium properties and access to VIP-only housing locations.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Gift,
    title: "Monthly Rewards",
    description: "Receive monthly in-game cash bonuses and exclusive items delivered to your account.",
    color: "from-pink-500 to-rose-600",
  },
]

export default function VIPPage() {
  const handlePurchase = (tier: string) => {
    // Simulate purchase process
    alert(`Redirecting to purchase ${tier} VIP...`)
    // In real implementation, redirect to payment processor
  }

  const handleContactSupport = () => {
    alert("Opening support ticket system...")
    // In real implementation, open support system
  }

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/united", "_blank")
  }

  return (
    <DashboardLayout title="VIP Membership">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Diamond className="w-12 h-12 text-yellow-400 animate-pulse" />
            <h1 className="text-6xl font-bold">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                VIP
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Membership
              </span>
            </h1>
            <Gem className="w-12 h-12 text-purple-400 animate-bounce" />
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Unlock the ultimate roleplay experience with exclusive perks, priority access, and premium features that
            will elevate your gameplay to legendary status.
          </p>
        </div>

        {/* VIP Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vipTiers.map((tier, index) => {
            const IconComponent = tier.icon
            return (
              <Card
                key={tier.id}
                className={`relative bg-gray-900/80 backdrop-blur-xl border-2 ${tier.borderColor} hover:scale-105 transition-all duration-500 group overflow-hidden ${tier.glowColor} hover:shadow-2xl ${
                  tier.popular ? "ring-4 ring-orange-500/50 ring-opacity-50" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 text-sm font-bold shadow-lg animate-pulse">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Most Popular
                      <Sparkles className="w-4 h-4 ml-2" />
                    </Badge>
                  </div>
                )}

                {/* Animated Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                ></div>

                <CardHeader className="text-center pb-6 relative z-10">
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${tier.color} rounded-full mx-auto flex items-center justify-center shadow-2xl ${tier.glowColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tier.color} rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}
                    ></div>
                  </div>
                  <CardTitle className="text-3xl text-white group-hover:text-orange-300 transition-colors duration-300">
                    {tier.name}
                  </CardTitle>
                  <div className="text-center mt-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {tier.price}
                    </span>
                    <span className="text-gray-400 text-lg">{tier.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8 relative z-10">
                  <ul className="space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3 group/item">
                        <div className="relative">
                          <Check className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-0 group-hover/item:opacity-30 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePurchase(tier.name)}
                    className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-bold py-4 text-lg shadow-2xl ${tier.glowColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group/btn`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <IconComponent className="w-5 h-5" />
                      Choose {tier.name}
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* VIP Perks */}
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-pink-500/5 animate-pulse"></div>

          <CardHeader className="relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />
                <CardTitle className="text-4xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Why Choose VIP?
                </CardTitle>
                <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />
              </div>
              <CardDescription className="text-xl text-gray-300">
                Unlock exclusive features and enhance your roleplay experience like never before
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {vipPerks.map((perk, index) => {
                const IconComponent = perk.icon
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:scale-105 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${perk.color} rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${perk.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                      ></div>
                    </div>
                    <h3 className="font-bold text-white mb-3 text-lg group-hover:text-orange-300 transition-colors duration-300">
                      {perk.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {perk.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-3xl text-white text-center flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-orange-400 animate-pulse" />
              Frequently Asked Questions
              <Sparkles className="w-8 h-8 text-orange-400 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {[
              {
                question: "How do I activate my VIP membership?",
                answer:
                  "After purchase, your VIP status will be automatically activated within 5 minutes. Make sure to link your Discord account for instant activation.",
              },
              {
                question: "Can I upgrade or downgrade my VIP tier?",
                answer:
                  "Yes, you can change your VIP tier at any time. Contact our support team for assistance with tier changes and we'll handle the transition seamlessly.",
              },
              {
                question: "What happens if I cancel my VIP subscription?",
                answer:
                  "Your VIP benefits will remain active until the end of your current billing period. No refunds for partial months, but you keep all benefits until expiration.",
              },
              {
                question: "Do VIP benefits transfer between characters?",
                answer:
                  "Most VIP benefits are account-wide and apply to all your characters. Some specific items may be character-bound for balance purposes.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 group"
              >
                <h4 className="font-bold text-white mb-3 text-lg group-hover:text-orange-300 transition-colors duration-300">
                  {faq.question}
                </h4>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-r from-orange-900/80 to-red-900/80 backdrop-blur-xl border border-orange-700/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 animate-pulse"></div>

          <CardContent className="p-12 text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gift className="w-10 h-10 text-orange-300 animate-bounce" />
              <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
                Need Help?
              </h3>
              <Gift className="w-10 h-10 text-orange-300 animate-bounce" />
            </div>
            <p className="text-xl text-orange-200 mb-8 leading-relaxed">
              Have questions about VIP membership? Our dedicated support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={handleContactSupport}
                className="bg-black/40 hover:bg-black/60 text-white border-2 border-orange-500 hover:border-orange-400 px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Users className="w-5 h-5 mr-3" />
                Contact Support
              </Button>
              <Button
                onClick={handleJoinDiscord}
                className="bg-black/40 hover:bg-black/60 text-white border-2 border-orange-500 hover:border-orange-400 px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Sparkles className="w-5 h-5 mr-3" />
                Join Discord
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
