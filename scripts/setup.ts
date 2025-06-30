#!/usr/bin/env node
import { config } from '../src/config/index.js'

console.log('🚀 Mastra Slack Scheduler Bot - Setup Check')
console.log('==========================================\n')

// Check environment variables
const requiredEnvVars = [
  'SLACK_BOT_TOKEN',
  'SLACK_SIGNING_SECRET',
  'SLACK_APP_TOKEN',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
]

const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName])

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:')
  missingEnvVars.forEach((varName) => {
    console.error(`   - ${varName}`)
  })
  console.error('\n📝 Please set these in your .env.local file')
  process.exit(1)
}

console.log('✅ All required environment variables are set!')
console.log('\n📋 Configuration:')
console.log(`   - Port: ${config.server.port}`)
console.log(`   - Environment: ${config.server.nodeEnv}`)
console.log(`   - Log Level: ${config.logging.level}`)
console.log('\n🎉 Setup complete! Run "pnpm dev" to start the bot.')