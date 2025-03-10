import { Movie } from "../App";

interface ResultsProps {
  searchResult: Movie | null;
  errorMessage: string | null;
}

export const Results: React.FC<ResultsProps> = ({
  searchResult,
  errorMessage,
}) => {
  if (!searchResult) return null;
  // console.log(searchResult);
  if (searchResult.total_results === 0) {
    return <h2 style={{ textAlign: "center" }}>{errorMessage}</h2>;
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
