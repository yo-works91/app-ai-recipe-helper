FROM node:22-slim

WORKDIR /app

# 基本的なツールをインストール
RUN apt-get update && apt-get install -y git

# packageファイルが存在する場合はコピー（初回実行時は存在しませんが、後々のために記述）
# COPY package*.json ./

# ボリュームをマウントしたいため、ここではまだ npm install を実行しません
# 開発環境では docker-compose で CMD が上書きされます
CMD ["npm", "run", "dev", "--", "--host"]
