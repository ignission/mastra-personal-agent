# Mastra Slack スケジューラーボット

このプロジェクトは、Mastraフレームワークを使用してSlackからGoogle CalendarやOutlookを操作できるAIスケジューラーボットです。

## 🚀 テクノロジースタック

- **フレームワーク**: Mastra (最新版)
- **言語**: TypeScript/Node.js
- **UI**: Slack Bot (Bolt for JavaScript)
- **API統合**: Google Calendar API, Microsoft Graph API, Slack API
- **認証**: OAuth 2.0 (Calendar) + Slack App Token
- **データベース**: SQLite (開発) / PostgreSQL (本番)
- **パッケージマネージャー**: pnpm
- **Linter/Formatter**: Biome

## 📁 プロジェクト構造

```
slack-scheduler-bot/
├── src/
│   ├── agents/           # Mastraエージェント
│   ├── slack/           # Slack Bot実装
│   ├── integrations/    # 外部API統合
│   ├── tools/          # カレンダー操作ツール
│   ├── types/          # TypeScript型定義
│   └── workflows/      # Mastraワークフロー
├── config/             # 設定ファイル
├── tests/             # テストファイル
├── .claude/           # Claude Code設定
└── docs/              # ドキュメント
```

## 🔧 開発コマンド

```bash
# プロジェクトセットアップ
pnpm install                   # 依存関係インストール
pnpm run setup                 # 初期セットアップ

# 開発
pnpm run dev                   # 開発サーバー起動
pnpm run build                 # プロダクションビルド
pnpm run start                 # 本番起動

# テスト
pnpm test                      # 全テスト実行
pnpm run test:unit            # 単体テスト
pnpm run test:integration     # 統合テスト
pnpm run test:watch           # テストウォッチモード

# 品質管理
pnpm run lint                  # Biome実行
pnpm run lint:fix             # Biome自動修正
pnpm run typecheck            # TypeScript型チェック
pnpm run format               # Biomeフォーマット実行

# Slack開発
pnpm run ngrok                 # ngrokでローカル公開
pnpm run slack:validate       # Slack設定検証
```

## 📝 コーディング規約

### TypeScript
- **ESModules使用**: `import/export`構文（CommonJS禁止）
- **関数コンポーネント**: アロー関数推奨 `const Component = () => {}`
- **型安全性**: `any`禁止、厳密な型定義
- **分割代入**: インポート時は分割代入推奨 `import { fn } from 'module'`

### ファイル命名
- **ケバブケース**: ファイル名は `kebab-case.ts`
- **コンポーネント**: PascalCase `SchedulerAgent.ts`
- **ユーティリティ**: camelCase `timeUtils.ts`

### Git規約
- **ブランチ**: `feature/`, `fix/`, `docs/` プレフィックス
- **コミット**: Conventional Commits形式
  - `feat:` 新機能
  - `fix:` バグ修正
  - `docs:` ドキュメント
  - `test:` テスト
  - `refactor:` リファクタリング

## 🏗️ アーキテクチャガイドライン

### Mastraエージェント
- **単一責任**: 1エージェント = 1つの明確な責任
- **ツール分離**: 複雑なロジックは別ツールに分離
- **エラーハンドリング**: 必ず適切なエラー処理を実装

### Slack統合
- **Block Kit**: UIは必ずBlock Kit使用
- **3秒ルール**: Slack応答は3秒以内
- **インタラクティブ**: ボタン・モーダル活用
- **エラー表示**: ユーザーフレンドリーなエラーメッセージ

### API統合
- **レート制限**: 必ずレート制限対応
- **リトライ**: 指数バックオフでリトライ
- **キャッシュ**: 適切なキャッシュ戦略
- **セキュリティ**: トークン安全な保存

## 🧪 テスト戦略

### 必須テスト
- **単体テスト**: 全関数・クラスにテスト
- **統合テスト**: API連携テスト（モック使用）
- **E2Eテスト**: 主要ユーザーフロー

### テストパターン
- **TDD推奨**: テストファースト開発
- **モック活用**: 外部API依存を排除
- **データベース**: テスト用SQLite使用

## 🔐 セキュリティ要件

### 認証・認可
- **OAuth実装**: 標準的なOAuth 2.0フロー
- **トークン管理**: 暗号化してデータベース保存
- **権限最小化**: 必要最小限の権限のみ要求

### データ保護
- **機密情報**: ログ出力禁止
- **HTTPS**: 本番環境では必須
- **環境変数**: 秘密情報は環境変数で管理

## 🚨 禁止事項

### 絶対にしてはいけないこと
- **src/legacy/**: レガシーディレクトリは絶対に編集禁止
- **main直接コミット**: mainブランチへの直接コミット禁止
- **ハードコード**: API キー・シークレットのハードコード禁止
- **console.log**: 本番コードでのconsole.log使用禁止

### 避けるべきパターン
- **長大な関数**: 1関数50行以下推奨
- **深いネスト**: 3レベル以下推奨
- **マジックナンバー**: 定数として定義
- **any型**: TypeScriptのany型使用禁止

## 🔧 開発環境セットアップ

### 必要なツール
```bash
# Node.js (LTS推奨)
node --version  # v18.x以上

# Package Manager
pnpm --version  # pnpm推奨

# Git
git --version

# ngrok (Slack開発用)
ngrok --version
```

### 環境変数設定
```bash
# .env.local を作成
cp .env.example .env.local

# 必要な値を設定
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
GOOGLE_CLIENT_ID=your-google-client-id
# ... 他の環境変数
```

## 📊 パフォーマンス指標

### 応答時間目標
- **Slack応答**: 3秒以内
- **カレンダーAPI**: 5秒以内
- **データベースクエリ**: 100ms以内

### リソース使用量
- **メモリ**: 256MB以下
- **CPU**: 軽負荷時10%以下
- **API呼び出し**: レート制限内

## 🐛 デバッグガイド

### ログレベル
- **ERROR**: エラー・例外
- **WARN**: 警告・注意事項
- **INFO**: 重要な処理
- **DEBUG**: 開発時詳細ログ

### トラブルシューティング
- **Slack接続**: Signing Secret確認
- **カレンダーAPI**: OAuth トークン有効期限確認
- **データベース**: 接続文字列確認

## 📚 参考資料

- [Mastra Documentation](https://docs.mastra.ai/)
- [Slack Bolt Framework](https://slack.dev/bolt-js/)
- [Google Calendar API](https://developers.google.com/calendar/api)
- [Microsoft Graph API](https://docs.microsoft.com/graph/)

## 🎯 開発優先順位

### Phase 1: 基本機能（MVP）
1. Slack Bot基本セットアップ
2. Google Calendar基本連携
3. シンプルなスケジュール表示
4. 基本的な予定作成

### Phase 2: 高度な機能
1. Block Kit UI実装
2. インタラクティブ機能
3. チーム機能
4. Outlook統合

### Phase 3: 最適化
1. パフォーマンス改善
2. エラーハンドリング強化
3. ユーザビリティ向上
4. 監視・ログ機能

---

**重要**: このプロジェクトはTDD（テスト駆動開発）を採用しています。新機能開発時は必ずテストから書き始めてください。

**Claude Code使用時のヒント**: 
- `/test` - テスト実行
- `/lint` - Biome品質チェック
- `/build` - ビルド確認
- `#` キーで重要な指示をこのファイルに自動追加
