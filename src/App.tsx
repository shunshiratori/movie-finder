import { useState } from "react";
import useSWR from "swr";
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

const fetcher = async (url: string): Promise<Movie> => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("データ取得に失敗しました");
  }

  return res.json();
};

export default function App() {
  const [searchTitle, setSearchTitle] = useState("");
  const [query, setQuery] = useState(""); // 実際に使うクエリ（検索ボタンで発火）

  const shouldFetch = query.trim() !== "";
  const url = shouldFetch
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&language=ja`
    : null;

  const { data, error } = useSWR<Movie>(url, fetcher);

  let errorMessage = "";
  if (!shouldFetch) {
    errorMessage = "";
  } else if (error) {
    errorMessage = "データの取得に失敗しました";
  } else if (data && data.total_results === 0) {
    errorMessage = "検索結果がありません";
  }

  return (
    <>
      <div className="App">
        <h1>映画検索</h1>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button
          onClick={() => {
            if (!searchTitle.trim()) {
              alert("検索ワードを入力してください");
              return;
            }
            setQuery(searchTitle);
          }}
        >
          検索
        </button>
      </div>

      <Results searchResult={data} errorMessage={errorMessage} />
    </>
  );
}
