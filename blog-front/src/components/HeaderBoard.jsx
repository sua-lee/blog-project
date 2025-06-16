import { NavLink } from 'react-router-dom';
import { useGetIsLoggedInQuery } from '../features/protectedApi';
import { useSelector } from 'react-redux';

export default function HeaderBoard() {
  // Redux에서 accessToken 가져오기
  const accessToken = useSelector((state) => state.auth.accessToken);

  // accessToken이 있을 때만 요청 실행
  const { data, isLoading } = useGetIsLoggedInQuery(undefined, {
    skip: !accessToken,
    refetchOnMountOrArgChange: true,
  });
  const isLoggedIn = data?.email !== undefined;
  return (
    <div className="flex justify-between items-center px-3 pt-2 fixed top-0 w-5/6 bg-white">
      <div className="w-1/5 flex justify-center p-3 gap-3 items-center">
        <NavLink to="/" end>
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
        </NavLink>
        <NavLink to="/" end className="flex-1 text-left font-bold">
          Wave Blog
        </NavLink>
      </div>
      {isLoading ? null : isLoggedIn ? (
        <p className="flex-1 text-right text-gray-800 font-medium p-3">
          {data.email}
        </p>
      ) : (
        <NavLink to="/login" end className="flex-1 text-right p-3">
          Log In
        </NavLink>
      )}
    </div>
  );
}
