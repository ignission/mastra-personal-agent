import { createTool } from '@mastra/core'
import { z } from 'zod'

export const deleteEventTool: any = createTool({
  id: 'deleteCalendarEvent',
  description: 'カレンダーから予定を削除します',
  inputSchema: z.object({
    eventId: z.string().describe('削除する予定のID'),
  }),
  execute: async (context: any) => {
    const { eventId } = context
    // TODO: 実際のGoogle Calendar APIを使用して予定を削除
    console.log(`Deleting event with ID: ${eventId}`)

    return {
      success: true,
      eventId,
      message: `予定（ID: ${eventId}）を削除しました。`,
    }
  },
})
