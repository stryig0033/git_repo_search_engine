# python3.11のイメージをダウンロード
FROM python:3.11-buster
ENV PYTHONUNBUFFERED=1

WORKDIR /api

# pipを使ってpoetryをインストール
RUN pip install poetry

# poetryの定義ファイルをコピー (存在する場合)
COPY pyproject.toml* poetry.lock* /api/

# poetryでライブラリをインストール (pyproject.tomlが既にある場合)
# プロジェクト内に仮想環境を作成し、依存関係をインストール
RUN poetry config virtualenvs.in-project true \
  && poetry install --no-dev --no-interaction --no-ansi

# アプリケーションのソースコードをコピー
COPY . /api

# uvicornのサーバーを立ち上げる
ENTRYPOINT ["poetry", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--reload"]