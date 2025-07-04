"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Crown, Star, Zap, Gift, Users, Car, Home } from "lucide-react"

const vipTiers = [
  {
    id: "bronze",
    name: "Bronze VIP",
    price: "$9.99",
    period: "/month",
    color: "from-orange-600 to-orange-800",
    borderColor: "border-orange-500",
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
  },
  {
    icon: Car,
    title: "Exclusive Vehicles",
    description: "Access to VIP-only vehicles and customization options not available to regular players.",
  },
  {
    icon: Home,
    title: "Premium Properties",
    description: "Discounts on premium properties and access to VIP-only housing locations.",
  },
  {
    icon: Gift,
    title: "Monthly Rewards",
    description: "Receive monthly in-game cash bonuses and exclusive items delivered to your account.",
  },
]

export default function VIPPage() {
  return (
    <DashboardLayout title="VIP Membership">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            VIP{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Membership
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Enhance your roleplay experience with exclusive perks, priority access, and premium features.
          </p>
        </div>

        {/* VIP Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vipTiers.map((tier) => {
            const IconComponent = tier.icon
            return (
              <Card
                key={tier.id}
                className={`bg-gray-900 border-2 ${tier.borderColor} relative ${
                  tier.popular ? "ring-2 ring-orange-500 ring-opacity-50" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-full mx-auto mb-4 flex items-center justify-center`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-400">{tier.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-semibold py-3`}
                  >
                    Choose {tier.name}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* VIP Perks */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Why Choose VIP?</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Unlock exclusive features and enhance your roleplay experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vipPerks.map((perk, index) => {
                const IconComponent = perk.icon
                return (
                  <div key={index} className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{perk.title}</h3>
                    <p className="text-sm text-gray-400">{perk.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-white mb-2">How do I activate my VIP membership?</h4>
              <p className="text-gray-400 text-sm">
                After purchase, your VIP status will be automatically activated within 5 minutes. Make sure to link your
                Discord account.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Can I upgrade or downgrade my VIP tier?</h4>
              <p className="text-gray-400 text-sm">
                Yes, you can change your VIP tier at any time. Contact our support team for assistance with tier
                changes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">What happens if I cancel my VIP subscription?</h4>
              <p className="text-gray-400 text-sm">
                Your VIP benefits will remain active until the end of your current billing period. No refunds for
                partial months.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Do VIP benefits transfer between characters?</h4>
              <p className="text-gray-400 text-sm">
                Most VIP benefits are account-wide and apply to all your characters. Some specific items may be
                character-bound.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-r from-orange-900 to-red-900 border-orange-700">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
            <p className="text-orange-200 mb-6">
              Have questions about VIP membership? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-black/30 hover:bg-black/50 text-white border border-orange-500">
                Contact Support
              </Button>
              <Button className="bg-black/30 hover:bg-black/50 text-white border border-orange-500">
                Join Discord
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
