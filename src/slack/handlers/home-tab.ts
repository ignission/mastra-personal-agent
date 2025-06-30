import type { SlackEventMiddlewareArgs, AllMiddlewareArgs } from '@slack/bolt'

export const handleHomeTab = async ({
  event,
  client,
}: SlackEventMiddlewareArgs<'app_home_opened'> & AllMiddlewareArgs) => {
  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
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
              text: 'Slackから簡単にカレンダーを管理できるボットです。',
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*🔗 カレンダー連携状態*',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '• Google Calendar: _未接続_\n• Outlook Calendar: _未接続_',
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'カレンダーを連携',
              },
              action_id: 'connect_calendar',
              style: 'primary',
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*📋 今日の予定*',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '_カレンダーを連携すると、ここに今日の予定が表示されます_',
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '予定を更新',
                },
                action_id: 'refresh_events',
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '新規予定作成',
                },
                action_id: 'create_event',
                style: 'primary',
              },
            ],
          },
        ],
      },
    })
  } catch (error) {
    console.error('Error publishing home tab:', error)
  }
}
