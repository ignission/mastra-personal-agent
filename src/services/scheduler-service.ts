import { createSchedulerAgent } from '../agents/scheduler-agent.js'
import { GoogleCalendarService } from '../integrations/google-calendar.js'
import type { CalendarEvent } from '../types/index.js'

export class SchedulerService {
  private agent = createSchedulerAgent()
  private googleCalendar = new GoogleCalendarService()

  async processNaturalLanguageRequest(_userId: string, request: string): Promise<string> {
    try {
      // Mastraエージェントに自然言語リクエストを処理させる
      const response = await this.agent.generate([
        {
          role: 'user',
          content: request,
        },
      ])

      return response.text || 'リクエストを処理できませんでした。'
    } catch (error) {
      console.error('Error processing natural language request:', error)
      return 'エラーが発生しました。もう一度お試しください。'
    }
  }

  async listTodayEvents(_userId: string): Promise<CalendarEvent[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    try {
      // TODO: ユーザーのトークンを取得して設定
      // this.googleCalendar.setCredentials(userTokens)
      
      return await this.googleCalendar.listEvents(today, tomorrow)
    } catch (error) {
      console.error('Error listing events:', error)
      // モックデータを返す（開発用）
      return [
        {
          id: 'mock-1',
          summary: '開発ミーティング',
          start: new Date(today.getTime() + 10 * 60 * 60 * 1000), // 10:00
          end: new Date(today.getTime() + 11 * 60 * 60 * 1000), // 11:00
          attendees: ['dev@example.com'],
        },
        {
          id: 'mock-2',
          summary: 'ランチ',
          start: new Date(today.getTime() + 12 * 60 * 60 * 1000), // 12:00
          end: new Date(today.getTime() + 13 * 60 * 60 * 1000), // 13:00
        },
      ]
    }
  }

  async createEvent(
    _userId: string,
    event: Omit<CalendarEvent, 'id'>,
  ): Promise<CalendarEvent | null> {
    try {
      // TODO: ユーザーのトークンを取得して設定
      // this.googleCalendar.setCredentials(userTokens)
      
      return await this.googleCalendar.createEvent(event)
    } catch (error) {
      console.error('Error creating event:', error)
      // モックレスポンスを返す（開発用）
      return {
        id: `mock-${Date.now()}`,
        ...event,
      }
    }
  }

  getGoogleAuthUrl(userId: string): string {
    return this.googleCalendar.getAuthUrl(userId)
  }

  async handleGoogleCallback(userId: string, code: string): Promise<void> {
    const tokens = await this.googleCalendar.handleCallback(code)
    // TODO: トークンをデータベースに保存
    console.log('Received tokens for user:', userId, tokens)
  }
}