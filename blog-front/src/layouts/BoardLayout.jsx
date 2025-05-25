import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderBoard from '../components/HeaderBoard';

export default function BoardLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-center w-5/6">
      <HeaderBoard />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
