# プロジェクト構造ガイド - Slack スケジューラーボット

## 📁 完全なディレクトリ構造

```
slack-scheduler-bot/
├── 📁 .claude/                    # Claude Code設定
│   ├── commands/                  # カスタムスラッシュコマンド
│   │   ├── test.md               # /test コマンド
│   │   ├── lint.md               # /lint コマンド
│   │   └── build.md              # /build コマンド
│   └── context/                   # 追加コンテキスト
├── 📁 src/                        # メインソースコード
│   ├── 📁 agents/                 # Mastraエージェント
│   │   ├── scheduler.ts          # メインスケジューラーエージェント
│   │   ├── calendar-agent.ts     # カレンダー専用エージェント
│   │   └── team-agent.ts         # チーム調整エージェント
│   ├── 📁 slack/                  # Slack関連実装
│   │   ├── app.ts                # Slack Botメインアプリ
│   │   ├── 📁 commands/           # スラッシュコマンド実装
│   │   │   ├── schedule.ts       # /schedule コマンド
│   │   │   ├── free-time.ts      # 空き時間検索
│   │   │   └── help.ts           # ヘルプコマンド
│   │   ├── 📁 events/             # Slackイベント処理
│   │   │   ├── mentions.ts       # @scheduler メンション
│   │   │   ├── messages.ts       # DM対応
│   │   │   └── interactions.ts   # ボタン・モーダル
│   │   ├── 📁 blocks/             # Block Kit UI
│   │   │   ├── calendar-view.ts  # カレンダー表示
│   │   │   ├── event-form.ts     # イベント作成フォーム
│   │   │   ├── free-time-display.ts # 空き時間表示
│   │   │   └── error-blocks.ts   # エラー表示
│   │   └── 📁 middleware/         # Slackミドルウェア
│   │       ├── auth.ts           # 認証チェック
│   │       ├── error-handler.ts  # エラーハンドリング
│   │       └── rate-limit.ts     # レート制限
│   ├── 📁 integrations/           # 外部API統合
│   │   ├── google-calendar.ts    # Google Calendar API
│   │   ├── outlook-calendar.ts   # Microsoft Graph API
│   │   ├── slack-api.ts          # Slack Web API
│   │   └── notifications.ts      # 通知システム
│   ├── 📁 tools/                  # Mastraツール
│   │   ├── calendar-tools.ts     # カレンダー操作
│   │   ├── event-parser.ts       # 自然言語解析
│   │   ├── time-utils.ts         # 時間計算
│   │   ├── team-scheduler.ts     # チーム調整
│   │   └── ai-analyzer.ts        # AI分析ツール
│   ├── 📁 types/                  # TypeScript型定義
│   │   ├── calendar.ts           # カレンダー関連型
│   │   ├── slack.ts              # Slack関連型
│   │   ├── agent.ts              # エージェント型
│   │   └── api.ts                # API型定義
│   ├── 📁 workflows/              # Mastraワークフロー
│   │   ├── create-team-event.ts  # チームイベント作成
│   │   ├── find-team-free-time.ts # チーム空き時間検索
│   │   ├── daily-summary.ts      # 日次サマリー
│   │   ├── reminder-workflow.ts  # リマインダー送信
│   │   └── conflict-resolution.ts # スケジュール競合解決
│   ├── 📁 utils/                  # ユーティリティ
│   │   ├── logger.ts             # ログ設定
│   │   ├── validation.ts         # バリデーション
│   │   ├── formatting.ts         # データ整形
│   │   └── crypto.ts             # 暗号化処理
│   ├── 📁 database/               # データベース
│   │   ├── models/               # データモデル
│   │   │   ├── user.ts          # ユーザーモデル
│   │   │   ├── calendar.ts      # カレンダーモデル
│   │   │   └── event.ts         # イベントモデル
│   │   ├── migrations/          # マイグレーション
│   │   └── connection.ts        # DB接続
│   └── main.ts                   # アプリケーションエントリー
├── 📁 config/                     # 設定ファイル
│   ├── slack-config.ts           # Slack設定
│   ├── calendar-config.ts        # カレンダー設定
│   ├── database-config.ts        # DB設定
│   └── env.ts                    # 環境変数設定
├── 📁 tests/                      # テストファイル
│   ├── 📁 unit/                   # 単体テスト
│   │   ├── agents/               # エージェントテスト
│   │   ├── tools/                # ツールテスト
│   │   └── utils/                # ユーティリティテスト
│   ├── 📁 integration/            # 統合テスト
│   │   ├── slack/                # Slack統合テスト
│   │   ├── calendar/             # カレンダー統合テスト
│   │   └── workflows/            # ワークフローテスト
│   ├── 📁 e2e/                    # E2Eテスト
│   │   ├── user-scenarios.test.ts # ユーザーシナリオ
│   │   └── team-scenarios.test.ts # チームシナリオ
│   ├── 📁 fixtures/               # テストデータ
│   │   ├── calendar-events.json # サンプルイベント
│   │   └── slack-messages.json  # サンプルメッセージ
│   └── setup.ts                 # テスト環境設定
├── 📁 docs/                       # ドキュメント
│   ├── api/                      # API仕様書
│   ├── deployment/               # デプロイガイド
│   ├── troubleshooting/          # トラブルシューティング
│   └── examples/                 # 使用例
├── 📁 scripts/                    # ビルドスクリプト
│   ├── setup.sh                 # 初期セットアップ
│   ├── deploy.sh                # デプロイスクリプト
│   └── test.sh                  # テスト実行
├── 📄 CLAUDE.md                   # Claude Code設定（重要）
├── 📄 README.md                   # プロジェクト説明
├── 📄 package.json                # 依存関係・スクリプト
├── 📄 tsconfig.json               # TypeScript設定
├── 📄 .eslintrc.js                # ESLint設定
├── 📄 .prettierrc                 # Prettier設定
├── 📄 jest.config.js              # Jest設定
├── 📄 .env.example                # 環境変数テンプレート
├── 📄 .gitignore                  # Git無視ファイル
└── 📄 docker-compose.yml          # 開発環境Docker
```

## 🎯 主要ファイルの責任

### `/src/agents/` - Mastraエージェント
```typescript
// scheduler.ts - メインエージェント
export class SchedulerAgent {
  tools = ['calendar-read', 'calendar-write', 'time-parser'];
  
  async run(input: string): Promise<SchedulerResponse> {
    // 自然言語解析 → カレンダー操作 → 結果整形
  }
}
```

### `/src/slack/app.ts` - Slackボットコア
```typescript
// Slack Boltアプリケーションの中核
import { App } from '@slack/bolt';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// イベントハンドラー登録
app.message(/@scheduler/, mentionHandler);
app.command('/schedule', scheduleCommand);
```

### `/src/slack/blocks/` - Block Kit UI
```typescript
// calendar-view.ts - 美しいカレンダー表示
export const createCalendarView = (events: CalendarEvent[]) => ({
  "type": "section",
  "text": { "type": "mrkdwn", "text": "*📅 今日の予定*" },
  "accessory": {
    "type": "button",
    "text": { "type": "plain_text", "text": "予定追加" }
  }
});
```

### `/src/tools/` - 専門ツール
```typescript
// event-parser.ts - 自然言語解析
export async function parseNaturalLanguageEvent(
  text: string
): Promise<ParsedEvent> {
  // "明日15時から1時間でチーム会議" → 構造化データ
}
```

### `/src/workflows/` - 複雑なワークフロー
```typescript
// create-team-event.ts - チームイベント作成
export async function createTeamEventWorkflow(
  participants: User[],
  duration: number,
  preferences: SchedulingPreferences
): Promise<TeamEventResult> {
  // 1. 全員の空き時間取得
  // 2. 最適な時間計算
  // 3. イベント作成
  // 4. 通知送信
}
```

## 📋 実装順序ガイド

### Phase 1: 基盤構築
```bash
# 1. プロジェクト初期化
npm create mastra@latest slack-scheduler-bot
cd slack-scheduler-bot

# 2. 基本構造作成
mkdir -p src/{agents,slack/{commands,events,blocks,middleware},integrations,tools,types,workflows,utils,database/{models,migrations}}
mkdir -p tests/{unit,integration,e2e,fixtures}
mkdir -p docs/{api,deployment,troubleshooting,examples}
mkdir -p .claude/{commands,context}

# 3. 設定ファイル
touch CLAUDE.md README.md .env.example
```

### Phase 2: Slack統合
```typescript
// 実装順序
1. src/slack/app.ts          // 基本Slackボット
2. src/slack/events/mentions.ts // @scheduler応答
3. src/slack/commands/schedule.ts // /schedule コマンド
4. src/slack/blocks/calendar-view.ts // UI表示
```

### Phase 3: Mastraエージェント
```typescript
// 実装順序
1. src/agents/scheduler.ts    // メインエージェント
2. src/tools/calendar-tools.ts // カレンダー操作
3. src/tools/event-parser.ts  // 自然言語解析
4. src/workflows/create-team-event.ts // チーム機能
```

### Phase 4: 外部統合
```typescript
// 実装順序
1. src/integrations/google-calendar.ts // Google連携
2. src/integrations/slack-api.ts // Slack API
3. src/integrations/notifications.ts // 通知システム
4. src/integrations/outlook-calendar.ts // Outlook連携
```

## 🧪 テスト構造

### `/tests/unit/` - 単体テスト
```typescript
// agents/scheduler.test.ts
describe('SchedulerAgent', () => {
  it('should parse natural language event', async () => {
    const agent = new SchedulerAgent();
    const result = await agent.parseEvent("明日15時から会議");
    expect(result.startTime).toBeDefined();
  });
});
```

### `/tests/integration/` - 統合テスト
```typescript
// slack/app.test.ts
describe('Slack App Integration', () => {
  it('should respond to @scheduler mention', async () => {
    const response = await simulateSlackMention("@scheduler 今日の予定");
    expect(response.blocks).toBeDefined();
  });
});
```

### `/tests/e2e/` - E2Eテスト
```typescript
// user-scenarios.test.ts
describe('User Scenarios', () => {
  it('complete event creation flow', async () => {
    // 1. ユーザーがSlackでメンション
    // 2. ボットが応答
    // 3. ユーザーがボタンクリック
    // 4. モーダル表示
    // 5. イベント作成
    // 6. 確認通知
  });
});
```

## 🔧 設定ファイル詳細

### `package.json` 必須スクリプト
```json
{
  "scripts": {
    "dev": "tsx watch src/main.ts",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write src/**/*.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

### `tsconfig.json` 推奨設定
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "outDir": "./dist",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@/types/*": ["types/*"],
      "@/utils/*": ["utils/*"]
    }
  }
}
```

## 📚 重要な命名規則

### ファイル名
- **コンポーネント**: `PascalCase.ts` (例: `SchedulerAgent.ts`)
- **ユーティリティ**: `kebab-case.ts` (例: `time-utils.ts`)
- **設定**: `kebab-case.ts` (例: `slack-config.ts`)

### ディレクトリ名
- **すべて小文字**: `agents/`, `tools/`, `workflows/`
- **ハイフン区切り**: `slack-api/`, `team-events/`

### 変数・関数名
- **camelCase**: `createEvent()`, `parseTime()`
- **定数**: `UPPER_SNAKE_CASE` (例: `MAX_RETRY_COUNT`)

---

この構造に従って開発を進めることで、保守性が高く、拡張しやすいSlackスケジューラーボットが構築できます。
