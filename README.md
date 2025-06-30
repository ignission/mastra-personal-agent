# Mastra Slack Scheduler Bot

AIを活用したSlackベースのスケジュール管理ボット。[Mastra](https://mastra.ai)フレームワークを使用して、自然言語でSlackからGoogle CalendarやOutlookを簡単に操作できます。

## 🌟 主な機能

- 📅 **Slackコマンドでカレンダーを操作** - `/schedule`コマンドで簡単アクセス
- 🤖 **AI による自然言語処理** - 「明日の14時から会議を予約」のような自然な表現に対応
- 🔄 **Google Calendar連携** - OAuthによる安全な認証と双方向同期
- 📊 **スケジュールの可視化** - Slack Block KitによるリッチなUI表示
- 🔍 **空き時間の自動検索** - AIが最適な会議時間を提案
- 🏠 **ホームタブ対応** - Slackアプリのホームタブから直感的に操作

## 🏗️ アーキテクチャ

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Slack     │────▶│  Scheduler   │────▶│  Mastra Agent   │
│   Bot       │     │  Service     │     │  (AI Engine)    │
└─────────────┘     └──────────────┘     └─────────────────┘
                            │                      │
                            ▼                      ▼
                    ┌──────────────┐     ┌─────────────────┐
                    │   Google     │     │   Calendar      │
                    │   Calendar   │     │   Tools         │
                    └──────────────┘     └─────────────────┘
```

## 📋 必要な環境

- **Node.js** 18.0.0以上
- **pnpm** (推奨パッケージマネージャー)
- **Slack ワークスペース** (管理者権限)
- **Google Cloud Console アカウント** (Calendar API用)
- **ngrok** (ローカル開発用、オプション)

## 🛠️ セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd mastra-personal-agent
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 3. 環境変数の設定

```bash
cp .env.example .env.local
```

`.env.local` ファイルを編集し、以下の環境変数を設定:

```env
# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_APP_TOKEN=xapp-your-app-token

# Google Calendar Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Database Configuration
DATABASE_URL=sqlite://./dev.db

# Application Configuration
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
```

### 4. Slack App の詳細設定

1. **[Slack API](https://api.slack.com/apps)** にアクセス
2. **"Create New App"** → **"From scratch"** を選択
3. **Socket Mode** を有効化（Settings → Socket Mode）
4. **OAuth & Permissions** で以下のBot Token Scopesを追加:
   - `app_mentions:read` - メンション読み取り
   - `chat:write` - メッセージ送信
   - `commands` - スラッシュコマンド
   - `users:read` - ユーザー情報読み取り
   - `im:history` - DM履歴読み取り
5. **Event Subscriptions** を有効化し、以下のイベントを追加:
   - `app_home_opened` - ホームタブ表示
   - `app_mention` - メンション受信
6. **Slash Commands** で `/schedule` コマンドを追加
7. **App Home** でHome Tabを有効化

### 5. Google Calendar API の詳細設定

1. **[Google Cloud Console](https://console.cloud.google.com/)** にアクセス
2. **新しいプロジェクトを作成** または既存のプロジェクトを選択
3. **APIとサービス** → **ライブラリ** から **Google Calendar API** を有効化
4. **認証情報** → **認証情報を作成** → **OAuth クライアント ID**
5. アプリケーションの種類: **ウェブアプリケーション**
6. 承認済みのリダイレクトURI:
   - `http://localhost:3000/auth/google/callback` (開発用)
   - `https://your-domain.com/auth/google/callback` (本番用)

## 🚀 起動方法

### 開発環境

```bash
# TypeScriptをwatchモードで実行
pnpm dev

# 別ターミナルでngrokを起動（外部公開が必要な場合）
pnpm ngrok
```

### ビルド & 本番環境

```bash
# TypeScriptをビルド
pnpm build

# 本番モードで起動
pnpm start
```

### その他のコマンド

```bash
# コードフォーマット
pnpm format

# Lintチェック
pnpm lint

# 型チェック
pnpm typecheck

# 設定確認
pnpm run setup
```

## 📝 使い方

### Slackコマンド

#### 基本コマンド
- `/schedule list` - 今日の予定を表示
- `/schedule create` - 予定作成ダイアログを表示
- `/schedule help` - ヘルプを表示

#### 自然言語での操作
```
/schedule 明日の14時から会議を予約
/schedule 来週月曜日の午前中に打ち合わせ
/schedule 今週の空いている時間を教えて
```

### ホームタブ機能

Slackアプリのホームタブから:
- 📅 今日の予定一覧を確認
- 🔗 カレンダー連携状態を確認
- ➕ 新規予定を作成
- 🔄 予定を更新

## 🧪 テスト

```bash
# 全テスト実行
pnpm test

# ウォッチモード
pnpm test:watch

# カバレッジレポート付き
pnpm test -- --coverage
```

## 📁 プロジェクト構造

```
mastra-personal-agent/
├── src/
│   ├── agents/           # Mastraエージェント定義
│   │   └── scheduler-agent.ts
│   ├── slack/           # Slack Bot実装
│   │   ├── app.ts
│   │   └── handlers/
│   │       ├── home-tab.ts
│   │       └── schedule-command.ts
│   ├── integrations/    # 外部API統合
│   │   └── google-calendar.ts
│   ├── services/        # ビジネスロジック
│   │   └── scheduler-service.ts
│   ├── tools/           # Mastraツール定義
│   │   └── calendar/
│   │       ├── create-event.ts
│   │       ├── delete-event.ts
│   │       ├── find-slots.ts
│   │       └── list-events.ts
│   ├── types/           # TypeScript型定義
│   ├── config/          # 設定管理
│   └── index.ts         # エントリーポイント
├── tests/               # テストファイル
├── scripts/             # ユーティリティスクリプト
├── docs/                # ドキュメント
└── dist/                # ビルド出力

```

## 🔧 技術スタック

- **[Mastra](https://mastra.ai)** - AIエージェントフレームワーク
- **[Slack Bolt](https://slack.dev/bolt-js/)** - Slack Bot開発フレームワーク
- **[Google APIs](https://github.com/googleapis/google-api-nodejs-client)** - Google Calendar連携
- **TypeScript** - 型安全な開発
- **Vitest** - 高速なテストランナー
- **Biome** - 高速なLinter/Formatter
- **Zod** - ランタイム型検証

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

コミットメッセージは[Conventional Commits](https://www.conventionalcommits.org/)形式に従ってください。

## 🐛 トラブルシューティング

### Slack接続エラー
- `SLACK_APP_TOKEN`が`xapp-`で始まることを確認
- Socket Modeが有効になっていることを確認

### Google Calendar認証エラー
- リダイレクトURIが正しく設定されていることを確認
- Google Cloud ConsoleでAPIが有効になっていることを確認

### TypeScriptエラー
- `pnpm typecheck`でエラー詳細を確認
- `node_modules`を削除して`pnpm install`を再実行

## 📄 ライセンス

MIT License - 詳細は[LICENSE](./LICENSE)ファイルを参照してください。

## 🙏 謝辞

- [Mastra](https://mastra.ai) - 素晴らしいAIフレームワーク
- [Slack](https://slack.com) - 優れたコラボレーションプラットフォーム
- すべてのコントリビューターとサポーター

---

**注意**: このプロジェクトは開発中です。本番環境での使用前に十分なテストを行ってください。