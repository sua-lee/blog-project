import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MemberLayout from './layouts/MemberLayout';
import BoardLayout from './layouts/BoardLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import PostListPage from './pages/PostListPage';
import CreatingArticlePage from './pages/CreatingArticlePage';
import ReadingArticlePage from './pages/ReadingArticlePage';
import UpdatingArticlePage from './pages/UpdatingArticlePage';

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
          <Route path='/create' element={<CreatingArticlePage/>}/>
        </Route>
        <Route path="/board" element={<BoardLayout />}>
          <Route path="create" element={<CreatingArticlePage />} />
          <Route path="reading/:id" element={<ReadingArticlePage />} />
          <Route path="updating/:id" element={<UpdatingArticlePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
