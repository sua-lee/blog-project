import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { useGetPostsByTagQuery } from '../features/publicApi';

const PostListPage = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useGetPostsByTagQuery(tag, {
    skip: !tag, // tag가 없으면 요청 보내지 않음
  });

  return (
    <main className="max-w-3xl mx-auto py-6 flex-1">
      <h1 className="text-2xl font-bold mb-4">태그: {tag} 검색 결과</h1>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : isError ? (
        <p>에러 발생: {error?.message || '불명확한 에러'}</p>
      ) : posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </main>
  );
};

export default PostListPage;
