import { createTool } from '@mastra/core'
import { z } from 'zod'

export const findAvailableSlotsTool: any = createTool({
  id: 'findAvailableSlots',
  description: '指定された期間内で空いている時間枠を検索します',
  inputSchema: z.object({
    startDate: z.string().describe('検索開始日（ISO 8601形式）'),
    endDate: z.string().describe('検索終了日（ISO 8601形式）'),
    duration: z.number().describe('必要な時間の長さ（分）'),
    workingHoursOnly: z.boolean().optional().default(true).describe('営業時間内のみ検索'),
  }),
  execute: async (context: any) => {
    const { startDate, endDate, duration } = context
    // TODO: 実際のカレンダーデータを使用して空き時間を検索
    const availableSlots = [
      {
        start: new Date(startDate).toISOString(),
        end: new Date(new Date(startDate).getTime() + duration * 60 * 1000).toISOString(),
      },
      {
        start: new Date(new Date(startDate).getTime() + 3 * 60 * 60 * 1000).toISOString(),
        end: new Date(
          new Date(startDate).getTime() + (3 * 60 + duration) * 60 * 1000,
        ).toISOString(),
      },
    ]

    console.log(`Finding ${duration}分の空き時間 from ${startDate} to ${endDate}`)

    return {
      success: true,
      slots: availableSlots,
      count: availableSlots.length,
      message: `${availableSlots.length}個の空き時間が見つかりました。`,
    }
  },
})
