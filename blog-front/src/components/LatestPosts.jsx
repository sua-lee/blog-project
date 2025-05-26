import { useGetPostListQuery } from '../features/protectedApi';
import { useNavigate } from 'react-router-dom';

export default function LastestPosts() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetPostListQuery(1, {
    refetchOnMountOrArgChange: true,
  }); // id는 임의 값

  if (isLoading) return <p className="text-center">로딩 중...</p>;
  if (error) return <p className="text-center">오류 발생: {error.message}</p>;

  const posts = data?.boards
    ?.filter((post) => post.title)
    ?.sort((a, b) => b.id - a.id)
    ?.slice(0, 10); // 최대 10개까지 보여주기

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        아직 작성된 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="fade-scroll-inner flex flex-row gap-5 overflow-y-auto">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/board/reading/${post.id}`)}
          className="min-w-3xs max-w-xs h-32 border p-4 rounded shadow bg-white cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-300"
        >
          <h3 className="font-bold truncate">{post.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
