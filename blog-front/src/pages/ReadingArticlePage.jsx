import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../features/protectedApi';

export default function PostReadingPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetPostByIdQuery(id);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  const {
    title,
    content,
    nickname,
    createdAt,
    viewCount,
    likeCount,
    comments = [],
  } = data;

  return (
    <div className="w-3xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-600 mt-1">
        작성자: {nickname} | 작성일: {new Date(createdAt).toLocaleString()}
      </p>
      <div className="mt-6 prose min-h-[50vh]">{content}</div>
      <div className="mt-2 text-sm text-gray-500">
        조회수: {viewCount} | 좋아요: {likeCount}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">댓글</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">댓글이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment, idx) => (
              <li key={idx} className="border p-3 rounded bg-gray-50 text-sm">
                <p className="font-medium">{comment.nickname || '익명'}</p>
                <p className="text-gray-800">{comment.content}</p>
                <p className="text-gray-400 text-xs">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
