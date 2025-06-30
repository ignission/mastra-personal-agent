export interface SlackEvent {
  type: string
  user: string
  channel: string
  text?: string
  ts: string
}

export interface CalendarEvent {
  id: string
  summary: string
  description?: string
  start: Date
  end: Date
  attendees?: string[]
  location?: string
}

export interface ScheduleRequest {
  userId: string
  action: 'create' | 'update' | 'delete' | 'list'
  event?: Partial<CalendarEvent>
  dateRange?: {
    start: Date
    end: Date
  }
}
