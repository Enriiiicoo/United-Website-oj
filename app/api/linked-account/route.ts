import { NextResponse } from "next/server"
import { getLinkedAccount } from "@/app/actions/account-linking"

export async function GET() {
  try {
    const account = await getLinkedAccount()
    return NextResponse.json(account)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch account" }, { status: 500 })
  }
}
