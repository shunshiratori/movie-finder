import { useState } from "react";
import "./App.css";
import { Results } from "./components/results";
export type Movie = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

type MovieResult = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
};

export default function App() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResult, setSearchResult] = useState<Movie | undefined>(
    undefined
  );
  const [errorMessage, setErrorMassage] = useState("");

  async function fetchMovie(searchTitle: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      searchTitle
    )}&language=ja`;
    const options = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchResult(data);
      if (data.total_results === 0) {
        setErrorMassage("検索結果がありません");
      }
    } catch (error) {
      console.error("リクエストに失敗しました:", error);
    }

    if (!searchTitle.trim()) {
      alert("検索ワードを入力してください");
      setErrorMassage("検索ワードを入力してください");
      return;
    }
  }

  return (
    <>
      <div className="App">
        <h1>映画検索</h1>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
          }}
        />
        <button onClick={() => fetchMovie(searchTitle)}>検索</button>
      </div>

      <Results searchResult={searchResult} errorMessage={errorMessage} />
    </>
  );
}
