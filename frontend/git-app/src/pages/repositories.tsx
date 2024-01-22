import React, { useState } from 'react';
import { searchGithubRepos, GitHubRepo } from './githubAPI';
import { TailSpin } from 'react-loader-spinner';

export const Repositories: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 50;

  const handleSearch = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await searchGithubRepos(keyword, username, page, perPage);
      setRepos(data.items);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.total_count / perPage));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePageChange = (newPage: number) => {
    handleSearch(newPage);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-left">
        <h1 className="text-3xl font-bold mb-4">GitHub Repository Search</h1>

          {/*検索フォーム_全体*/}
        <div className="flex space-x-2 mb-4">

          {/*検索フォーム_keyword*/}
          <input
            className="input-field border-2 border-r-gray-300 bg-white h-10 px-5 pr-16 rounded-l-lg text-sm focus:outline-none mr-[-8px]"
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Keyword"
          />

          {/*検索フォーム_username*/}
          <input
            className="input-field border-2 border-l-gray-300 bg-white h-10 px-5 pr-16 rounded-r-lg text-sm focus:outline-none"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />

          {/*検索フォーム_ボタン*/}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleSearch()}
          >
            Search
          </button>

        {/*検索フォーム_文言(Search Results)*/}
        </div>
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      </div>

      {/* ローディングインジケータの表示 */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      ) : repos.length > 0 ? (
        <div>
          <ul className="list-none space-y-4">
            {repos.map(repo => (
              <li key={repo.id} className="border-b border-white-700">
                <a
                  className="block p-4 hover:bg-gray-800"
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-semibold block text-lg">{repo.name}</span>
                  <span className="text-gray-500 text-sm">{repo.description}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* ページネーションの表示 */}
          <div className="flex justify-center items-center mt-4">
            {pageNumbers.map(number => (
              <button
                key={number}
                className={`px-4 py-2 border ${currentPage === number ? 'border-gray-500 text-blue-500' : 'border-gray-300'}`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
          </div>

        </div>
      ) : (
        <div className="text-center text-xl text-gray-600">No results found</div>
      )}
    </div>
  );
};

export default Repositories;
