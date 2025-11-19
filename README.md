# AI Recipe Helper 🍳

AIが冷蔵庫の余り物から美味しいレシピを提案してくれるWebアプリケーションです。

> [!NOTE]
> このプロジェクトは、Google [Antigravity](https://deepmind.google/technologies/gemini/antigravity/)のplaygroundとして作成しました。

## ✨ 特徴

- **シンプルな操作**: 食材を入力するだけで、AIが3つのレシピ候補を提案
- **詳細なレシピ**: 材料、調味料、作り方を分かりやすく表示
- **フロントエンド**: Vite + React
- **スタイリング**: Tailwind CSS v4
- **状態管理**: Jotai
- **AI**: Google Gemini API
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React

## 📋 必要要件

- Docker & Docker Compose
- Google Gemini API キー（[こちら](https://ai.google.dev/)から取得）

## 🚀 クイックスタート

詳細な開発環境のセットアップ方法は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

1. リポジトリをクローン:
   ```bash
   git clone <repository-url>
   cd app-ai-recipe-helper
   ```

2. 環境変数を設定:
   ```bash
   cp .env.example .env
   # .env ファイルに Gemini API キーを設定
   ```

3. Dockerコンテナを起動:
   ```bash
   docker-compose up -d
   ```

4. コンテナ内で開発サーバーを起動:
   ```bash
   docker-compose exec app sh -c "cd /app && npm run dev"
   ```

5. ブラウザで開く:
   ```
   http://localhost:5173
   ```

## 📝 ライセンス

MIT

## 🤝 コントリビューション

コントリビューションは大歓迎です！詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください。
