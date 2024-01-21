from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのHTTPヘッダーを許可
)

#rootの設定
@app.get("/")
def read_root():
    return {"Hello": "World"}

# GitHub APIへのリクエストを行うエンドポイントの設定
@app.get("/search-repos/")
async def search_repos(keyword: str, username: str):
    url = f"https://api.github.com/search/repositories?q={keyword}+user:{username}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

'''
このコードでは以下のことを行っています：

①FastAPIインスタンスの作成：
FastAPIアプリケーションのインスタンスを作成します。

②GitHubリポジトリ検索用のエンドポイント：
クエリパラメータとしてkeywordとusernameを受け取り、GitHub APIを使用してリポジトリを検索する/search-repos/エンドポイントを定義します。

③GitHub APIへのリクエスト：
requestsライブラリを使用してGitHub APIにリクエストを送信し、レスポンスを取得します。

④エラーハンドリング：
リクエストが失敗した場合、適切なHTTPエラーを返します。

このコードを実行するには、FastAPIとrequestsライブラリをインストールする必要があります。
poetryを使用している場合は、プロジェクトのルートディレクトリでpoetry add fastapi requestsを実行してください。
また、このAPIサーバーを実行するには、uvicornコマンド（例：uvicorn main:app --reload）を使用します。ここでmainはPythonファイル名（拡張子なし）で、appはFastAPIインスタンスの変数名です。
'''