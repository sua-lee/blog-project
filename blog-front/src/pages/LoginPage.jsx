import { NavLink } from 'react-router-dom';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center px-6 py-16">
      <h1 className="text-3xl font-bold mb-12">Login</h1>

      <form className="w-full max-w-md space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            이메일
          </label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          로그인
        </button>
      </form>
      <div className="flex m-5 items-center justify-center gap-5">
        <p>계정이 없으신가요?</p>
        <NavLink to="/signup" end className=" flex-1 text-center underline">
          회원가입
        </NavLink>
      </div>
    </main>
  );
}
