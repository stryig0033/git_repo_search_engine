## 起動方法

### バックエンド
shellにて
```
cd backend
docker-compose build
docker-compose up
```
`http://localhost:8000/`で起動していることを確認

### フロントエンド
shellにて
```
cd frontend/git-app
yarn install
yarn dev
```
`http://localhost:3000`に接続
