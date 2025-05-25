import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MemberLayout from './layouts/MemberLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import PostListPage from './pages/PostListPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center ">
      <Routes>
        <Route path="/" element={<MemberLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts" element={<PostListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
