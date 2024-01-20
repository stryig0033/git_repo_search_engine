// GitHubリポジトリの型定義
// interface は、TypeScriptにおいてオブジェクトの形状（つまり、どのようなプロパティやメソッドを持っているか）を定義するために使用される構文です。
//　これはコマンドではなく、TypeScriptの型システムの一部で、オブジェクトの型を定義するために使います。
import axios from 'axios';

export interface GitHubRepo {
    id: number;
    html_url: string;
    name: string;
    description: string;
}

export async function searchGithubRepos(keyword: string, username: string): Promise<GitHubRepo[]> {
    try {
        const response = await axios.get(`http://localhost:8000/search_repos/?keyword=${keyword}&username=${username}`);
        return response.data.items;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // サーバーからのレスポンスがある場合の処理
            console.error('Error response:', error.response);
        } 
        throw error; // エラーを再スローし、呼び出し元に伝搬させる
    }
}