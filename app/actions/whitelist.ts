"use server"

import { executeQuery } from "@/lib/db"

export async function submitWhitelistApplication(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const age = formData.get("age") as string
    const discord = formData.get("discord") as string
    const experience = formData.get("experience") as string
    const character = formData.get("character") as string
    const backstory = formData.get("backstory") as string

    // Validate required fields
    if (!name || !age || !discord || !experience || !character || !backstory) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    // Insert into database
    const query = `
      INSERT INTO whitelist_applications 
      (name, age_range, discord_username, experience_level, character_name, character_backstory)
      VALUES (?, ?, ?, ?, ?, ?)
    `

    await executeQuery(query, [name, age, discord, experience, character, backstory])

    return {
      success: true,
      message: "Application submitted successfully! You will receive a response within 24-48 hours.",
    }
  } catch (error) {
    console.error("Whitelist submission error:", error)
    return {
      success: false,
      message: "Failed to submit application. Please try again.",
    }
  }
}

export async function getWhitelistApplications() {
  try {
    const query = `
      SELECT * FROM whitelist_applications 
      ORDER BY submitted_at DESC
    `
    const applications = await executeQuery(query)
    return applications
  } catch (error) {
    console.error("Error fetching applications:", error)
    return []
  }
}
