import { useAddTagsToPostMutation } from '../features/protectedApi';
import { useState } from 'react';

export default function TagAdder({ postId }) {
  const [tagsInput, setTagsInput] = useState('');
  const [addTagsToPost] = useAddTagsToPostMutation();

  const handleAddTags = async () => {
    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      const res = await addTagsToPost({ id: postId, tags }).unwrap();
      alert(res?.message || '태그가 추가되었습니다.');
      console.log('✅ 태그 추가 성공:', res);
      alert(res.message); // "태그가 성공적으로 추가되었습니다."
      setTagsInput('');
    } catch (err) {
      console.error('❌ 태그 추가 실패:', err);
      console.log('📌 postId:', postId);
      console.log('📦 tags:', tags);
      alert(err.data?.error || '태그 추가 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">태그 추가</h3>
      <input
        type="text"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="예: Java, Spring, Programming"
        className="border px-2 py-1 rounded w-72 mr-2"
      />
      <button
        onClick={handleAddTags}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        추가
      </button>
    </div>
  );
}
