import MovieItem from '@/components/MovieItem';

export default function MovieList({ movies }) {
  return movies?.length > 0 ? (
    <ul className="grid grid-cols-2 mt-[20px] gap-x-[15px] gap-y-[30px]">
      {movies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  ) : (
    <p className="mt-[20px]">영화 데이터 없음</p>
  );
}
