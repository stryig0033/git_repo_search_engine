import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのHTTPヘッダーを許可
)


# rootの設定
@app.get("/")
def read_root():
    return {"Hello": "World"}


# GitHub APIへのリクエストを行うエンドポイントの設定
@app.get("/search-repos/")
async def search_repos(keyword: str, username: str):
    url = f"https://api.github.com/search/repositories?q={keyword}+user:{username}"# noqa: E501 #isortのエラーを無視する
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
