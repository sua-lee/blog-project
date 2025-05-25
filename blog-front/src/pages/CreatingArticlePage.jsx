import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useCreatePostMutation } from '../features/protectedApi';

export default function CreatingArticlePage() {
  const [createPost] = useCreatePostMutation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const response = await createPost({ title, content }).unwrap();
      console.log('글 작성 성공:', response);
      const { id } = response;
      navigate(`/board/reading/${id}`);
    } catch (err) {
      console.error('글 작성 실패:', err);
      alert('글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container flex flex-col w-4/5 top-0 mt-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">글 작성하기</h2>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <MDEditor
          value={content}
          onChange={setContent}
        />
      </div>
      <div className="mt-4 flex justify-end">
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded w-20"
      >
        글 작성
      </button>
    </div>
    </div>
  );
}