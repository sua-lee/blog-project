import whaleImage from '../assets/whale.png';
import { useEffect } from 'react';
import { useGetIsLoggedInQuery } from '../features/protectedApi'; // ← 정확한 경로 확인
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LastestPosts from '../components/LatestPosts';

export default function MainPage() {
  const { data, error, isLoading, isSuccess } = useGetIsLoggedInQuery();
  const isLoggedIn = !!data?.email;
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleClick = () => {
    if (accessToken) {
      navigate('/board/create');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log('🔄 isLoggedIn: 요청 중...');
    } else if (isSuccess) {
      console.log('✅ isLoggedIn 응답 데이터:', data);
    } else if (error) {
      console.error('❌ isLoggedIn 에러:', error);
    }
  }, [data, error, isLoading, isSuccess]);

  return (
    <main className="flex-1 flex flex-col justify-between items-center px-20 py-24">
      <section className="flex">
        {/* Text content */}
        <div className="w-1/2">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Welcome to our World of <br /> Creativity
          </h1>
          <p className="text-gray-600 mb-8">
            당신의 이야기가 머무는 공간, 지금 바로 시작하세요.
          </p>
          <button
            className="bg-black text-white px-6 py-2 rounded "
            onClick={handleClick}
          >
            글 작성하기
          </button>
        </div>

        {/* Image placeholder */}
        <img src={whaleImage} alt="whale" className="w-1/2 h-64 rounded-3xl" />
      </section>
      <section className="p-5 mt-24">
        <h1 className="text-3xl text-center font-semibold p-5">
          10 Latest Posts
        </h1>
        {isLoading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : data?.email ? (
          <section className="max-w-5xl fade-scroll-wrapper">
            <LastestPosts />
          </section>
        ) : (
          <div className="text-center text-gray-500 py-10">
            로그인 시 이용 가능한 콘텐츠입니다.
          </div>
        )}
      </section>
    </main>
  );
}
