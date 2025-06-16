import {
  useAddTagsToPostMutation,
  useGetPostByIdQuery,
} from '../features/protectedApi';
import { useState } from 'react';

export default function TagManager({ postId }) {
  const [tagsInput, setTagsInput] = useState('');
  const [addTagsToPost] = useAddTagsToPostMutation();
  const {
    data: postData,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetPostByIdQuery(postId);

  const handleAddTags = async () => {
    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (tags.length === 0) {
      alert('최소 하나 이상의 태그를 입력해주세요.');
      return;
    }

    try {
      const res = await addTagsToPost({ id: postId, tags }).unwrap();
      alert(res.message); // 예: "태그가 성공적으로 추가되었습니다."
      setTagsInput('');
      refetch(); // 태그 갱신
    } catch (err) {
      console.error('❌ 태그 추가 실패:', err);
      alert(err.data?.error || '태그 추가 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) return <p>태그 불러오는 중...</p>;
  if (isError) return <p>태그 오류: {error.message}</p>;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">태그 관리</h3>
      {/* 현재 태그 목록 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {postData.tags && postData.tags.length > 0 ? (
          postData.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
            >
              #{tag}
            </span>
          ))
        ) : (
          <p className="text-gray-400 text-sm">아직 등록된 태그가 없습니다.</p>
        )}
      </div>

      {/* 태그 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="예: Java, Spring, Programming"
          className="border px-2 py-1 rounded w-80"
        />
        <button
          onClick={handleAddTags}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          추가
        </button>
      </div>
    </div>
  );
}
