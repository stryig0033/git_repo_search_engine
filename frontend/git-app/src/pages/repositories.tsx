// ページのレイアウトとロジックを記述する

import React, { useState } from 'react';
import { searchGithubRepos, GitHubRepo } from './githubAPI';

export const Repositories: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const handleSearch = async () => {
    try {
      const repos = await searchGithubRepos(keyword, username);
      setRepos(repos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">GitHub Repository Search</h1>
        <div className="flex space-x-2 mb-4">
          <input
            className="input-field border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Keyword"
          />
          <input
            className="input-field border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <ul className="list-none space-y-2">
        {repos.map(repo => (
          <li
            key={repo.id}
            className="border-b border-gray-300"
          >
            <a
              className="flex items-center justify-between p-4 hover:bg-gray-100"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-semibold">{repo.name}</span>
              <span>{repo.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repositories;
