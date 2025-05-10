import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderMember from '../components/HeaderMember';

export default function MemberLayout() {
  return (
    <div className="flex flex-col justify-center">
      <HeaderMember />
      <Outlet />
      <Footer />
    </div>
  );
}
