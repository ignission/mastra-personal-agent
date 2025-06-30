import { describe, expect, it, beforeEach, vi } from 'vitest'
import { createSchedulerAgent } from '../../../src/agents/scheduler-agent'
import type { Agent } from '@mastra/core'

vi.mock('@mastra/core')

describe('Scheduler Agent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create a scheduler agent', () => {
    const agent = createSchedulerAgent()
    expect(agent).toBeDefined()
    expect(agent.name).toBe('scheduler')
    expect(agent.description).toBeDefined()
  })

  it('should have calendar tools attached', () => {
    const agent = createSchedulerAgent()
    const tools = agent.tools

    expect(tools).toContain('listEvents')
    expect(tools).toContain('createEvent')
    expect(tools).toContain('deleteEvent')
    expect(tools).toContain('findAvailableSlots')
  })

  it('should handle schedule parsing correctly', async () => {
    const agent = createSchedulerAgent()
    const result = await agent.generate({
      messages: [
        {
          role: 'user',
          content: 'Schedule a meeting tomorrow at 2pm for 1 hour',
        },
      ],
    })

    expect(result).toBeDefined()
    expect(result).toHaveProperty('text')
  })

  it('should handle natural language date parsing', async () => {
    const agent = createSchedulerAgent()
    const result = await agent.generate({
      messages: [
        {
          role: 'user',
          content: 'What is my schedule for next Monday?',
        },
      ],
    })

    expect(result).toBeDefined()
    expect(result).toHaveProperty('text')
  })
})
