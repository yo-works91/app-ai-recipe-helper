# コントリビューションガイド

AI Recipe Helperへのコントリビューションありがとうございます！🎉

## 📦 開発環境のセットアップ

### 必要要件

- Docker Desktop（Windows/Mac）または Docker Engine + Docker Compose（Linux）
- Git
- Google Gemini API キー

### 初回セットアップ

1. **リポジトリをクローン**

   ```bash
   git clone <repository-url>
   cd app-ai-recipe-helper
   ```

2. **環境変数を設定**

   ```bash
   cp .env.example .env
   ```

   `.env` ファイルを開き、以下のように設定します：

   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

   > **Note**: Gemini API キーは [Google AI Studio](https://ai.google.dev/) から無料で取得できます。

3. **Dockerコンテナをビルド・起動**

   ```bash
   docker-compose up -d
   ```

   コンテナが起動したら、以下のコマンドでコンテナ内に入ります：

   ```bash
   docker-compose exec app sh
   ```

4. **依存関係のインストール**

   コンテナ内で以下を実行：

   ```bash
   npm install
   ```

5. **開発サーバーを起動**

   コンテナ内で以下を実行：

   ```bash
   npm run dev
   ```

   以下のような出力が表示されれば成功です：

   ```
   VITE v7.2.2  ready in 235 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: http://172.22.0.2:5173/
   ```

6. **ブラウザでアクセス**

   ブラウザで `http://localhost:5173` を開きます。

## 🔄 日常的な開発フロー

### コンテナとViteの起動

開発を始める際は、以下の手順を実行します：

```bash
# 1. Dockerコンテナを起動（停止している場合）
docker-compose start

# 2. コンテナ内に入る
docker-compose exec app sh

# 3. 開発サーバーを起動
cd /app && npm run dev
```

### コンテナとViteの停止

```bash
# 1. Viteサーバーを停止（コンテナ内で Ctrl+C）

# 2. コンテナから抜ける
exit

# 3. Dockerコンテナを停止
docker-compose stop
```

### コンテナの再起動

コードやDockerfile、docker-compose.ymlを変更した場合：

```bash
# コンテナを再起動
docker-compose restart

# または、完全に再ビルド
docker-compose down
docker-compose up -d --build
```

## 🐛 トラブルシューティング

### ポート5173が既に使用されている場合

Viteは自動的に別のポート（5174など）を使用します。その場合、docker-compose.ymlのポートマッピングを調整してください：

```yaml
ports:
  - "5173:5174"  # ホスト:コンテナ
```

### ホットリロードが動作しない場合

`vite.config.js` にポーリング設定が含まれていることを確認してください：

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
})
```

### Tailwind CSSのエラーが発生する場合

Tailwind CSS v4では、任意の値を使ったユーティリティクラス（例: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`）をCSS内で直接定義できません。JSXでのみ使用するか、`src/index.css`でカスタムプロパティとして定義してください。

## 📁 プロジェクト構成

```
app-ai-recipe-helper/
├── src/
│   ├── components/      # Reactコンポーネント
│   ├── store/           # Jotai状態管理
│   ├── lib/             # Gemini API連携
│   ├── index.css        # グローバルスタイル
│   └── App.jsx          # メインアプリ
├── Dockerfile           # Dockerイメージ定義
├── docker-compose.yml   # Docker Compose設定
└── vite.config.js       # Vite設定
```

## 🎨 デザイン原則

このプロジェクトは **Muted Neubrutalism（くすみニューブルータリズム）** デザインを採用しています：

- **太い黒枠線**（2px）
- **ハードシャドウ**（ぼかしなし）
- **くすみカラー**（セージグリーン、テラコッタ、マスタードイエローなど）
- **レトロでポップな印象**

デザイン変更の際は、`src/index.css` のカスタムプロパティとユーティリティクラスを活用してください。

## 🤝 プルリクエストのガイドライン

1. フィーチャーブランチを作成
2. わかりやすいコミットメッセージを書く
3. 変更内容を説明したプルリクエストを作成
4. レビューを待つ

## 📞 質問がある場合

Issueを立てるか、ディスカッションで質問してください！
