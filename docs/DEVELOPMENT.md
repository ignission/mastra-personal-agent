# Claude Code開発指示書 - Mastra Slackスケジューラーボット

## 🎯 プロジェクト概要

**目標**: MastraフレームワークとSlack Boltを使用して、Slackから操作可能なAIスケジューラーボットを構築する

**想定ユーザー**: チームで働く開発者・ビジネスパーソン  
**コア価値**: Slackを離れることなく、自然言語でスケジュール管理

## 🚀 開発アプローチ（4フェーズ）

### Phase 1: 研究・計画 (Research & Plan)
1. **技術調査**: Mastra + Slack Bolt + Google Calendar APIの統合方法
2. **アーキテクチャ設計**: コンポーネント構成と責任分離
3. **プロジェクト構造**: ディレクトリ構成とファイル命名規則
4. **開発計画**: 実装順序と必要な準備作業

### Phase 2: 基盤構築 (Foundation)
1. **プロジェクト初期化**: package.json、tsconfig.json、設定ファイル
2. **Slackボット基本実装**: 認証、基本的なメッセージ応答
3. **Mastraエージェント**: 基本的なスケジューラーエージェント
4. **テスト環境**: Jest設定、基本的なテストケース

### Phase 3: 機能実装 (Implementation)
1. **Google Calendar統合**: OAuth認証、基本CRUD操作
2. **Slack UI**: Block Kit使用の美しいインターフェース
3. **自然言語処理**: イベント作成の言語解析
4. **エラーハンドリング**: 適切なエラー処理とユーザー通知

### Phase 4: 完成・最適化 (Polish)
1. **テスト充実**: 単体・統合・E2Eテスト
2. **パフォーマンス**: キャッシュ、レート制限対応
3. **ドキュメント**: README、API仕様書
4. **デプロイ準備**: 本番環境設定

## 🧪 TDD（テスト駆動開発）必須

Claude Codeはテスト駆動開発を非常に得意としており、まずテストを書いてから実装するアプローチを採用してください。

### TDDワークフロー
1. **Red**: まず失敗するテストを書く
2. **Green**: テストを通す最小限の実装
3. **Refactor**: 実装を改善（テストは維持）

### 具体例
```typescript
// 1. テストを先に書く
describe('SchedulerAgent', () => {
  it('should create calendar event from natural language', async () => {
    const agent = new SchedulerAgent();
    const result = await agent.createEventFromText(
      "明日15時から1時間でチーム会議"
    );
    expect(result.title).toBe("チーム会議");
    expect(result.duration).toBe(60);
  });
});

// 2. 実装は後で行う
```

## 📋 実装チェックリスト

### 事前準備
- [ ] Slack App作成（api.slack.com）
- [ ] Google Cloud Console設定
- [ ] ngrok設定（ローカル開発用）
- [ ] 環境変数設定

### Phase 1: 基盤
- [ ] `npm create mastra@latest slack-scheduler-bot`
- [ ] TypeScript設定
- [ ] ESLint + Prettier設定
- [ ] Jest設定
- [ ] 基本的なディレクトリ構造作成

### Phase 2: Slack統合
- [ ] `@slack/bolt`インストール
- [ ] 基本的なSlackボット実装
- [ ] メンション応答 (`@scheduler`)
- [ ] スラッシュコマンド (`/schedule`)
- [ ] Block Kit基本UI

### Phase 3: カレンダー統合
- [ ] Google Calendar API設定
- [ ] OAuth 2.0認証フロー
- [ ] 基本CRUD操作（作成・読み込み・更新・削除）
- [ ] エラーハンドリング

### Phase 4: AI機能
- [ ] Mastraエージェント実装
- [ ] 自然言語解析ツール
- [ ] スケジュール最適化ワークフロー
- [ ] チーム機能（複数人調整）

## 🎨 UI/UX要件

### Slack Block Kit活用
```typescript
// 良い例: リッチなBlock Kit UI
const calendarView = {
  "type": "section",
  "text": {
    "type": "mrkdwn",
    "text": "*📅 今日の予定*\n🕐 10:00-11:00 チーム朝会"
  },
  "accessory": {
    "type": "button",
    "text": { "type": "plain_text", "text": "予定追加" },
    "action_id": "add_event"
  }
};

// 悪い例: プレーンテキスト
bot.say("今日の予定: 10:00-11:00 チーム朝会");
```

### ユーザー体験
- **応答速度**: 3秒以内の応答必須
- **エラー表示**: 分かりやすいエラーメッセージ
- **操作性**: 直感的なボタン・モーダル
- **視認性**: 絵文字・色分けで見やすく

## 🔧 技術実装ガイド

### Mastraエージェント設計
```typescript
class SchedulerAgent {
  tools = [
    'calendar-read',
    'calendar-write', 
    'time-parser',
    'team-coordinator'
  ];
  
  async run(input: string): Promise<SchedulerResponse> {
    // 自然言語解析
    // カレンダー操作
    // 結果整形
  }
}
```

### エラーハンドリング戦略
- **API制限**: レート制限検知・自動リトライ
- **認証エラー**: 自動再認証フロー
- **ネットワークエラー**: 指数バックオフリトライ
- **ユーザーエラー**: 分かりやすい説明とアクション提案

### セキュリティ要件
- **OAuth Token**: データベース暗号化保存
- **Slack Signing**: リクエスト検証必須
- **環境変数**: 秘密情報の適切な管理
- **権限最小化**: 必要最小限のAPI権限

## 📊 品質基準

### コード品質
- **カバレッジ**: テストカバレッジ80%以上
- **型安全性**: TypeScript strict mode
- **リント**: ESLintエラーゼロ
- **フォーマット**: Prettier自動適用

### パフォーマンス
- **応答時間**: Slack応答3秒以内
- **メモリ使用量**: 256MB以下
- **API効率**: 適切なキャッシュ戦略

## 🚨 注意事項・制限

### 絶対に避けること
- **mainブランチ直接コミット**: feature/ブランチ使用必須
- **ハードコード**: 設定値・秘密情報の埋め込み禁止
- **console.log**: 本番コードでのデバッグ出力禁止
- **any型**: TypeScriptのany型使用禁止

### Slack制限事項
- **メッセージサイズ**: 4000文字制限
- **Block要素数**: 50個まで
- **レート制限**: 1分間に数十回まで
- **ファイルサイズ**: アップロード制限

## 🔍 デバッグ・トラブルシューティング

### よくある問題
1. **Slack応答タイムアウト**: ngrokの接続確認
2. **Calendar API認証失敗**: OAuth設定確認
3. **Block Kit表示エラー**: JSON構造確認
4. **データベース接続**: 接続文字列確認

### ログ戦略
```typescript
// 良いログ例
logger.info('Calendar event created', { 
  eventId, 
  userId, 
  duration: endTime - startTime 
});

// 悪いログ例
console.log('event created'); // 情報不足
console.log(userToken); // セキュリティリスク
```

## 📈 成功の指標

### MVP成功基準
- [ ] Slackでメンション応答
- [ ] Google Calendar基本操作
- [ ] 自然言語での予定作成
- [ ] エラー時の適切な通知

### 完成時の目標
- [ ] 直感的なBlock Kit UI
- [ ] チーム機能（複数人調整）
- [ ] 90%以上のテストカバレッジ
- [ ] 本番環境デプロイ可能

## 🎯 期待される成果物

### 必須ファイル
- `README.md`: セットアップ・使用方法
- `package.json`: 依存関係・スクリプト
- `src/`: ソースコード（適切な構造）
- `tests/`: テストファイル
- `.env.example`: 環境変数テンプレート

### ドキュメント
- API仕様書
- デプロイガイド
- トラブルシューティング
- 今後の拡張計画

---

**開発開始コマンド**: `claude "このプロジェクトをPhase 1から開始してください"`

**重要**: このプロジェクトは段階的アプローチを採用し、各フェーズで検証しながら進めてください。テスト駆動開発を徹底し、品質の高いコードを心がけてください。
