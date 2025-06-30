import { createSlackApp } from './slack/app.js'
import { config } from './config/index.js'

const main = async () => {
  try {
    const app = createSlackApp()

    await app.start(config.server.port)

    console.log(`⚡️ Slack scheduler bot is running on port ${config.server.port}!`)
    console.log('📅 Ready to manage your calendar from Slack')
  } catch (error) {
    console.error('Failed to start the application:', error)
    process.exit(1)
  }
}

main()
