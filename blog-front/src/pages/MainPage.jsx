import whaleImage from '../assets/whale.png';

export default function MainPage() {
  return (
    <main className="flex justify-between items-center px-20 py-24">
      {/* Text content */}
      <div className="w-1/2">
        <h1 className="text-4xl font-bold leading-tight mb-6">
          Welcome to our World of <br /> Creativity
        </h1>
        <p className="text-gray-600 mb-8">
          당신의 이야기가 머무는 공간, 지금 바로 시작하세요.
        </p>
        <button className="bg-black text-white px-6 py-2 rounded ">
          Discover More
        </button>
      </div>

      {/* Image placeholder */}
      <img src={whaleImage} alt="whale" className="w-1/2 h-64 rounded-3xl" />
    </main>
  );
}
