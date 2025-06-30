import type { SlackCommandMiddlewareArgs, AllMiddlewareArgs } from '@slack/bolt'
import { SchedulerService } from '../../services/scheduler-service.js'

const schedulerService = new SchedulerService()

export const handleScheduleCommand = async ({
  command,
  ack,
  respond,
}: SlackCommandMiddlewareArgs & AllMiddlewareArgs) => {
  await ack()

  const { text } = command

  if (!text) {
    await respond({
      text: 'スケジュールコマンドの使い方:',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              '*スケジュールコマンドの使い方:*\n' +
              '• `/schedule list` - 今日の予定を表示\n' +
              '• `/schedule create "会議" 14:00-15:00` - 予定を作成\n' +
              '• `/schedule help` - ヘルプを表示',
          },
        },
      ],
    })
    return
  }

  const args = text.trim().split(' ')
  const action = args[0]

  switch (action) {
    case 'list': {
      const events = await schedulerService.listTodayEvents(command.user_id)
      
      if (events.length === 0) {
        await respond({
          text: '今日の予定はありません',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '📅 *今日の予定*\n\n予定がありません。',
              },
            },
          ],
        })
      } else {
        const eventBlocks = events.map((event) => ({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${event.summary}*\n${new Date(event.start).toLocaleTimeString(
              'ja-JP',
            )} - ${new Date(event.end).toLocaleTimeString('ja-JP')}${
              event.location ? `\n📍 ${event.location}` : ''
            }`,
          },
        }))
        
        await respond({
          text: `今日の予定: ${events.length}件`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '📅 *今日の予定*',
              },
            },
            ...eventBlocks,
          ],
        })
      }
      break
    }

    case 'create':
      await respond({
        text: '予定を作成します',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '✨ 新しい予定を作成します',
            },
          },
        ],
      })
      break

    default: {
      // 自然言語処理を試みる
      if (text && text.trim() !== 'help') {
        const response = await schedulerService.processNaturalLanguageRequest(
          command.user_id,
          text,
        )
        await respond({
          text: response,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: response,
              },
            },
          ],
        })
      } else {
        // ヘルプを表示
        await respond({
          text: 'スケジュールボットのヘルプ',
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: '📅 スケジュールボット',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '*利用可能なコマンド:*',
              },
            },
            {
              type: 'section',
              fields: [
                {
                  type: 'mrkdwn',
                  text: '*`/schedule list`*\n今日の予定を表示',
                },
                {
                  type: 'mrkdwn',
                  text: '*`/schedule create`*\n新しい予定を作成',
                },
                {
                  type: 'mrkdwn',
                  text: '*`/schedule delete`*\n予定を削除',
                },
                {
                  type: 'mrkdwn',
                  text: '*`/schedule help`*\nヘルプを表示',
                },
              ],
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '*💡 ヒント:*\n自然言語でのリクエストも可能です！\n例: `/schedule 明日の14時から会議を予約`',
              },
            },
          ],
        })
      }
      break
    }
  }
}
