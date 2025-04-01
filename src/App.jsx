import { useEffect, useState } from 'react';
import MovieSearch from '@/components/MovieSearch';
import MovieType from '@/components/MovieType';
import MovieList from '@/components/MovieList';
import Pagination from '@/components/Pagination';

// ?파라메터=값&파라메터=값, 쿼리스트링을 통해 서버로 데이터 전송, get방식으로 데이터요청시 사용
// https여야 버셀 빌드됨
const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=16484246';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('bbc');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    async function searchMovies() {
      try {
        // throw new Error('에러 테스트');
        // 비동기 fetch로 응답을 json으로 받음
        const response = await fetch(
          `${API_URL}&s=${title}&type=${type}&page=${page}`
        );
        // json -> js객체로 변환
        const data = await response.json();
        // 검색결과가 없을 경우 data.Search가 undefined이므로 오류방지
        const sortData = data.Search?.sort((a, b) =>
          a.Year > b.Year ? -1 : 1
        );
        setMovies(sortData);
        setTotalPage(Math.ceil(data.totalResults / 10));
      } catch (err) {
        console.error('데이터전송오류: ', err);
      }
    }
    searchMovies();
  }, [title, type, page]);

  return (
    <div className="p-[20px]">
      <h2 className="text-[40px] text-gray-600">MovieLand</h2>
      <MovieSearch setTitle={setTitle} setType={setType} />
      <MovieType type={type} setType={setType} setPage={setPage} />
      <MovieList movies={movies} />
      {/* 데이터 있을때만 페이지네이션 나오게 */}
      {movies && (
        <Pagination page={page} totalPage={totalPage} setPage={setPage} />
      )}
    </div>
  );
}
