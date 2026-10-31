import { Outlet } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './layout.css';

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
