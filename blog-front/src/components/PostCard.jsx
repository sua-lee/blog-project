const PostCard = ({ title, content, createdAt, updatedAt }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">{content}</p>
      <p className="text-sm text-gray-500">작성일: {createdAt}</p>
      <p className="text-sm text-gray-500">수정일: {updatedAt}</p>
    </div>
  );
};

export default PostCard;
