import { describe, expect, it, beforeEach, vi } from 'vitest'
import { listEventsTool } from '../../../../src/tools/calendar/list-events'
import type { CalendarEvent } from '../../../../src/types'

vi.mock('../../../../src/integrations/google-calendar')

describe('List Events Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should list events for a given date range', async () => {
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        summary: 'Team Meeting',
        start: new Date('2024-01-15T10:00:00'),
        end: new Date('2024-01-15T11:00:00'),
        attendees: ['alice@example.com', 'bob@example.com'],
      },
      {
        id: '2',
        summary: 'Client Call',
        start: new Date('2024-01-15T14:00:00'),
        end: new Date('2024-01-15T15:00:00'),
        attendees: ['client@example.com'],
      },
    ]

    const result = await listEventsTool.execute({
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      calendarId: 'primary',
    })

    expect(result).toBeDefined()
    expect(result.events).toHaveLength(2)
    expect(result.events[0].summary).toBe('Team Meeting')
  })

  it('should handle empty calendar', async () => {
    const result = await listEventsTool.execute({
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      calendarId: 'primary',
    })

    expect(result).toBeDefined()
    expect(result.events).toHaveLength(0)
  })

  it('should validate date inputs', async () => {
    await expect(
      listEventsTool.execute({
        startDate: 'invalid-date',
        endDate: '2024-01-15',
        calendarId: 'primary',
      }),
    ).rejects.toThrow('Invalid date format')
  })

  it('should filter events by search query', async () => {
    const result = await listEventsTool.execute({
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      calendarId: 'primary',
      query: 'Team',
    })

    expect(result.events).toHaveLength(1)
    expect(result.events[0].summary).toContain('Team')
  })
})
