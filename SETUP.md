# Setup Guide

## 1. Generate Secret Keys

Run this command to generate your secret keys:

\`\`\`bash
node scripts/generate-secrets.js
\`\`\`

This will output something like:
\`\`\`
NEXTAUTH_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_SECRET=z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1
\`\`\`

## 2. Create Environment File

Create a `.env.local` file in your project root:

\`\`\`env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

# Discord OAuth
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=paste_generated_secret_here

# JWT Secret (optional, for custom operations)
JWT_SECRET=paste_generated_secret_here
\`\`\`

## 3. Discord OAuth Setup

1. Go to https://discord.com/developers/applications
2. Create a new application
3. Go to OAuth2 settings
4. Add redirect URL: `http://localhost:3000/api/auth/callback/discord`
5. Copy Client ID and Client Secret to your .env.local

## 4. Database Setup

Make sure your MySQL database is running and accessible with the credentials in your .env.local file.

## 5. Run the Application

\`\`\`bash
npm run dev
\`\`\`

The application will validate all environment variables on startup.
