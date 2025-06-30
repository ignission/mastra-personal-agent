import { Agent } from '@mastra/core'
import {
  listEventsTool,
  createEventTool,
  deleteEventTool,
  findAvailableSlotsTool,
} from '../tools/index.js'

export const createSchedulerAgent = (): any => {
  return new Agent({
    name: 'scheduler',
    description: 'AIスケジューラーエージェント。カレンダーの管理と予定の調整を行います。',
    instructions: `
      あなたはユーザーのスケジュール管理を支援するAIアシスタントです。
      以下のタスクを実行できます：
      
      1. カレンダーに予定を追加する
      2. 既存の予定を表示する
      3. 予定を削除する
      4. 空いている時間枠を見つける
      5. 会議の時間を提案する
      
      常に丁寧で親切な対応を心がけ、ユーザーの要望を正確に理解してください。
      日時の指定があいまいな場合は、確認を求めてください。
    `,
    model: {
      provider: 'OPENAI',
      name: 'gpt-4-turbo-preview',
    } as any,
    tools: {
      listEvents: listEventsTool,
      createEvent: createEventTool,
      deleteEvent: deleteEventTool,
      findAvailableSlots: findAvailableSlotsTool,
    },
  })
}
