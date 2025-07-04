import { SetupGuide } from "@/components/setup-guide"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Setup Your Authentication System</h1>
        <p className="text-xl text-gray-600">Follow these steps to get your system running</p>
      </div>
      <SetupGuide />
    </div>
  )
}
