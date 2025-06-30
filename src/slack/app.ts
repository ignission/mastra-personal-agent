import pkg from '@slack/bolt'
const { App } = pkg
import { config } from '../config/index.js'
import { handleScheduleCommand } from './handlers/schedule-command.js'
import { handleHomeTab } from './handlers/home-tab.js'

export const createSlackApp = () => {
  const app = new App({
    token: config.slack.botToken,
    signingSecret: config.slack.signingSecret,
    socketMode: true,
    appToken: config.slack.appToken,
  })

  // Slash command handler
  app.command('/schedule', handleScheduleCommand)

  // Home tab handler
  app.event('app_home_opened', handleHomeTab)

  // Message handler
  app.message(async ({ message, say }: any) => { // eslint-disable-line
    if ('text' in message && message.text) {
      await say(`You said: ${message.text}`)
    }
  })

  return app
}
