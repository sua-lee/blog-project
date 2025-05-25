import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [tag, setTag] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (tag.trim()) {
      navigate(`/posts?tag=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 w-3/5 h-2/3"
    >
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="태그로 검색..."
        className="border px-3 py-1 rounded-3xl w-full"
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-3xl"
      >
        search
      </button>
    </form>
  );
};

export default SearchBar;
