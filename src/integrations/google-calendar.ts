import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { config } from '../config/index.js'
import type { CalendarEvent } from '../types/index.js'

export class GoogleCalendarService {
  private oauth2Client: OAuth2Client
  private calendar: any // eslint-disable-line

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      config.google.clientId,
      config.google.clientSecret,
      config.google.redirectUri,
    )

    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })
  }

  getAuthUrl(userId: string): string {
    const scopes = ['https://www.googleapis.com/auth/calendar']

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      state: userId,
    })
  }

  async handleCallback(code: string): Promise<any> { // eslint-disable-line
    const { tokens } = await this.oauth2Client.getToken(code)
    this.oauth2Client.setCredentials(tokens)
    return tokens
  }

  setCredentials(tokens: any): void { // eslint-disable-line
    this.oauth2Client.setCredentials(tokens)
  }

  async listEvents(timeMin: Date, timeMax: Date): Promise<CalendarEvent[]> {
    try {
      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      })

      const events = response.data.items || []

      return events.map((event: any) => ({
        id: event.id,
        summary: event.summary || 'No Title',
        description: event.description,
        start: new Date(event.start?.dateTime || event.start?.date),
        end: new Date(event.end?.dateTime || event.end?.date),
        location: event.location,
        attendees: event.attendees?.map((a: any) => a.email) || [],
      }))
    } catch (error) {
      console.error('Error listing events:', error)
      throw error
    }
  }

  async createEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    try {
      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: event.summary,
          description: event.description,
          location: event.location,
          start: {
            dateTime: event.start.toISOString(),
            timeZone: 'Asia/Tokyo',
          },
          end: {
            dateTime: event.end.toISOString(),
            timeZone: 'Asia/Tokyo',
          },
          attendees: event.attendees?.map((email) => ({ email })),
        },
      })

      return {
        id: response.data.id,
        summary: response.data.summary || 'No Title',
        description: response.data.description,
        start: new Date(response.data.start?.dateTime || response.data.start?.date),
        end: new Date(response.data.end?.dateTime || response.data.end?.date),
        location: response.data.location,
        attendees: response.data.attendees?.map((a: any) => a.email) || [],
      }
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      await this.calendar.events.delete({
        calendarId: 'primary',
        eventId,
      })
    } catch (error) {
      console.error('Error deleting event:', error)
      throw error
    }
  }
}
