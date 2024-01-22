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
async def search_repos(keyword: str, username: str, page: int = 1, per_page: int = 50):
    url = f"https://api.github.com/search/repositories?q={keyword}+user:{username}+in:name&sort=stars&page={page}&per_page={per_page}"# noqa: E501
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

