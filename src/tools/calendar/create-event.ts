import { createTool } from '@mastra/core'
import { z } from 'zod'
import type { CalendarEvent } from '../../types/index.js'

export const createEventTool: any = createTool({
  id: 'createCalendarEvent',
  description: 'カレンダーに新しい予定を作成します',
  inputSchema: z.object({
    summary: z.string().describe('予定のタイトル'),
    description: z.string().optional().describe('予定の詳細説明'),
    startTime: z.string().describe('開始時刻（ISO 8601形式）'),
    endTime: z.string().describe('終了時刻（ISO 8601形式）'),
    location: z.string().optional().describe('場所'),
    attendees: z.array(z.string()).optional().describe('参加者のメールアドレス'),
  }),
  execute: async (context: any) => {
    const { summary, description, startTime, endTime, location, attendees } = context
    // TODO: 実際のGoogle Calendar APIを使用して予定を作成
    const event: CalendarEvent = {
      id: `event-${Date.now()}`,
      summary,
      description,
      start: new Date(startTime),
      end: new Date(endTime),
      location,
      attendees,
    }

    console.log('Creating calendar event:', event)

    return {
      success: true,
      event,
      message: `予定「${summary}」を作成しました。`,
    }
  },
})
