import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import {
  useUpdatePostMutation,
  useGetPostByIdQuery,
} from '../features/protectedApi';

export default function UpdatingArticlePage() {
  const { id } = useParams();
  const [updatePost] = useUpdatePostMutation();
  const { data, isLoading } = useGetPostByIdQuery(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const response = await updatePost({ id, title, content }).unwrap();
      console.log('글 수정 성공:', response);
      navigate(`/board/reading/${id}`);
    } catch (err) {
      console.error('글 수정 실패:', err);
      alert('글 수정 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div className="container flex flex-col w-4/5 top-0 mt-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">글 수정하기</h2>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <MDEditor value={content} onChange={setContent} />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded w-20"
        >
          수정
        </button>
      </div>
    </div>
  );
}
