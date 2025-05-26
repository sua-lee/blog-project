import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLikePostMutation,
} from '../features/protectedApi';
import MDEditor from '@uiw/react-md-editor';

export default function PostReadingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetPostByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();

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

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await deletePost(id).unwrap();
      alert(response.message); // "게시글이 삭제되었습니다."
      navigate('/');
    } catch (err) {
      alert(err.data?.error || '삭제 중 오류가 발생했습니다.');
    }
  };

  const handleUpdate = async () => {
    navigate(`/board/updating/${id}`);
  };

  const handleLike = async () => {
    try {
      const res = await likePost(id).unwrap();
      console.log('좋아요 성공:', res);
      refetch();
    } catch (error) {
      console.error('좋아요 실패:', error);
      alert('좋아요 실패');
    }
  };

  return (
    <div className="w-3xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-600 mt-1">
        작성자: {nickname} | 작성일: {new Date(createdAt).toLocaleString()}
      </p>
      <div className="pt-5 flex space-x-3">
        <button
          onClick={handleDelete}
          className="text-sm  outline-1 outline-gray-600 hover:bg-gray-400 px-3 py-1 rounded"
        >
          삭제
        </button>
        <button
          onClick={handleUpdate}
          className="text-sm outline-1 outline-gray-600 hover:bg-gray-400 px-3 py-1 rounded"
        >
          수정
        </button>
      </div>
      <div className="mt-6 min-h-[50vh]">
        <MDEditor.Markdown
          source={content}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
      <div className="mt-4 text-sm text-gray-500 flex items-center gap-4">
        <span>조회수: {viewCount}</span>
        <span>좋아요: {likeCount}</span>
        <button
          onClick={handleLike}
          className="text-sm text-red-500 border border-red-400 px-2 py-1 rounded hover:bg-red-100 transition"
        >
          ❤️ 좋아요
        </button>
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
