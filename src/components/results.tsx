import { Movie } from "../App";

interface ResultsProps {
  searchResult: Movie | undefined;
}

export const Results: React.FC<ResultsProps> = ({ searchResult }) => {
  if (!searchResult) return;
  if (searchResult.total_results === 0) {
    return (
      <h2 style={{ textAlign: "center" }}>
        {"一致する映画はありませんでした"}
      </h2>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {searchResult.results.map((movie) => (
        <div
          key={movie.id}
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.backdrop_path}`}
            alt={movie.title}
            style={{ width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
};
