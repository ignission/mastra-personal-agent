import { describe, expect, it, beforeEach, vi } from 'vitest'
import { createSlackApp } from '../../../src/slack/app'
import type { App } from '@slack/bolt'

vi.mock('@slack/bolt')

describe('Slack App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create a Slack app instance', () => {
    const app = createSlackApp()
    expect(app).toBeDefined()
    expect(app).toHaveProperty('start')
    expect(app).toHaveProperty('stop')
  })

  it('should register schedule command handler', () => {
    const app = createSlackApp()
    const commandSpy = vi.spyOn(app, 'command')

    expect(commandSpy).toHaveBeenCalledWith('/schedule', expect.any(Function))
  })

  it('should register home tab handler', () => {
    const app = createSlackApp()
    const eventSpy = vi.spyOn(app, 'event')

    expect(eventSpy).toHaveBeenCalledWith('app_home_opened', expect.any(Function))
  })

  it('should handle errors gracefully', async () => {
    const app = createSlackApp()
    const errorSpy = vi.spyOn(app, 'error')

    expect(errorSpy).toHaveBeenCalled()
  })
})
