import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Shield, Users, MessageSquare, Gavel, Eye, Heart } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { TiltCard } from "@/components/tilt-card"
import { ParallaxBackground } from "@/components/parallax-background"
import { Constellation } from "@/components/constellation"

export default function RulesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern relative overflow-hidden">
      <ParallaxBackground />
      <Constellation />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/20 to-orange-400/20 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-8">
              <Gavel className="h-6 w-6 text-orange-400" />
              <span className="text-orange-300 font-semibold">Community Guidelines</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="text-orange-500">Server</span>
              <br />
              <span className="text-white">Rules</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto rounded-full mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Follow these guidelines to ensure an amazing experience for our entire community
            </p>
          </div>
        </AnimatedSection>

        {/* Rules Grid - Masonry Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* General Rules - Large Card */}
          <AnimatedSection animation="slideLeft" delay={200}>
            <TiltCard>
              <Card className="bg-gradient-to-br from-black/80 via-orange-950/20 to-black/80 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl text-orange-400">
                    <div className="relative">
                      <Shield className="h-8 w-8" />
                      <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-lg" />
                    </div>
                    General Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    "Respect all players and staff members at all times",
                    "No cheating, hacking, or exploiting game mechanics",
                    "English and Arabic are the primary languages",
                    "No advertising other servers or communities",
                    "Follow staff instructions without argument",
                    "Use appropriate usernames and character names",
                  ].map((rule, index) => (
                    <div key={index} className="flex gap-4 hover:text-white transition-colors group">
                      <span className="text-orange-500 font-bold text-lg min-w-[2rem]">{index + 1}.</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{rule}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>

          {/* Roleplay Rules */}
          <AnimatedSection animation="slideRight" delay={400}>
            <TiltCard>
              <Card className="bg-gradient-to-br from-black/80 via-orange-950/20 to-black/80 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl text-orange-400">
                    <div className="relative">
                      <Users className="h-8 w-8" />
                      <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-lg" />
                    </div>
                    Roleplay Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    "Stay in character at all times during roleplay",
                    "No random deathmatch (RDM) or vehicle deathmatch (VDM)",
                    "Realistic roleplay is required - no unrealistic actions",
                    "Follow fear roleplay rules when threatened",
                    "No metagaming or powergaming allowed",
                    "Character development should be gradual and realistic",
                  ].map((rule, index) => (
                    <div key={index} className="flex gap-4 hover:text-white transition-colors group">
                      <span className="text-orange-500 font-bold text-lg min-w-[2rem]">{index + 1}.</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{rule}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>
        </div>

        {/* Bottom Row - Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatedSection animation="slideUp" delay={600}>
            <TiltCard>
              <Card className="bg-gradient-to-br from-black/80 via-orange-950/20 to-black/80 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-500 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl text-orange-400">
                    <MessageSquare className="h-6 w-6" />
                    Chat Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["No spamming or flooding", "No offensive language", "Use appropriate channels"].map(
                    (rule, index) => (
                      <div key={index} className="flex gap-3 hover:text-white transition-colors group">
                        <span className="text-orange-500 font-bold">{index + 1}.</span>
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{rule}</span>
                      </div>
                    ),
                  )}
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={700}>
            <TiltCard>
              <Card className="bg-gradient-to-br from-black/80 via-orange-950/20 to-black/80 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-500 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl text-orange-400">
                    <Eye className="h-6 w-6" />
                    Staff Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Respect staff decisions", "Report rule violations", "Cooperate with investigations"].map(
                    (rule, index) => (
                      <div key={index} className="flex gap-3 hover:text-white transition-colors group">
                        <span className="text-orange-500 font-bold">{index + 1}.</span>
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{rule}</span>
                      </div>
                    ),
                  )}
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={800}>
            <TiltCard>
              <Card className="bg-gradient-to-br from-black/80 via-orange-950/20 to-black/80 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-500 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl text-orange-400">
                    <Heart className="h-6 w-6" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Help new players", "Participate in events", "Build positive relationships"].map((rule, index) => (
                    <div key={index} className="flex gap-3 hover:text-white transition-colors group">
                      <span className="text-orange-500 font-bold">{index + 1}.</span>
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{rule}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>
        </div>

        {/* Consequences Section - Full Width */}
        <AnimatedSection animation="scaleIn" delay={900}>
          <TiltCard>
            <Card className="bg-gradient-to-r from-orange-900/30 via-orange-800/20 to-orange-900/30 backdrop-blur-xl border border-orange-500/50 hover:bg-orange-900/40 transition-all duration-500">
              <CardContent className="p-12 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <AlertTriangle className="h-12 w-12 text-orange-400 animate-pulse" />
                  <h3 className="text-3xl font-bold text-orange-400">Rule Violations</h3>
                </div>
                <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
                  Breaking these rules may result in warnings, temporary bans, or permanent bans depending on the
                  severity of the violation. Our staff team reviews each case individually to ensure fair treatment.
                  Staff decisions are final.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="bg-orange-500/20 rounded-full px-6 py-2">
                    <span className="text-orange-300 font-semibold">Zero Tolerance Policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </AnimatedSection>
      </div>
    </div>
  )
}
