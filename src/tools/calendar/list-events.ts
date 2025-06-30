import { createTool } from '@mastra/core'
import { z } from 'zod'
import type { CalendarEvent } from '../../types/index.js'

export const listEventsTool: any = createTool({
  id: 'listCalendarEvents',
  description: '指定された期間のカレンダー予定を取得します',
  inputSchema: z.object({
    startDate: z.string().describe('開始日（ISO 8601形式）'),
    endDate: z.string().describe('終了日（ISO 8601形式）'),
  }),
  execute: async (context: any) => {
    const { startDate, endDate } = context
    try {
      // TODO: 実際のGoogle Calendar APIを使用して予定を取得
      const mockEvents: CalendarEvent[] = [
        {
          id: 'event-1',
          summary: 'チームミーティング',
          description: '週次のチーム定例会議',
          start: new Date(startDate),
          end: new Date(new Date(startDate).getTime() + 60 * 60 * 1000),
          location: '会議室A',
          attendees: [],
        },
      ]

      console.log(`Listing events from ${startDate} to ${endDate}`)

      return {
        success: true,
        events: mockEvents,
        count: mockEvents.length,
        message: `${mockEvents.length}件の予定が見つかりました。`,
      }
    } catch (error) {
      console.error('Error listing events:', error)
      return {
        success: false,
        events: [],
        count: 0,
        message: 'エラーが発生しました',
      }
    }
  },
})
