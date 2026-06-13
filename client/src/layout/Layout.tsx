import { Outlet, Link, useNavigate } from "react-router"
import { useContext, useState } from 'react';
import {AuthContext} from '../context/AuthContext';

export const Layout = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await context?.logout();
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col">

      <header className="bg-sky-600 p-2 flex items-center justify-around">
        <h1 className="text-white text-2xl font-semibold">TaskJS</h1>

        {context?.isAuthenticated && (
          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button className="flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white px-3 py-2 rounded-md transition-colors cursor-pointer">
              <span>{context.username}</span><span className="text-xs">▼</span>
            </button>

            {menuOpen && (
              <ul className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <li>
                  <Link to="/changePassword" className="block px-4 py-3 hover:bg-sky-50 transition-colors">
                    Change Password
                  </Link>
                </li>

                <li onClick={handleLogout} className="px-4 py-3 cursor-pointer hover:bg-red-50 text-red-600 transition-colors">
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}

      </header>

      <div className="flex-1 bg-gray-200 overflow-hidden">
        <Outlet/>
      </div>

    </div>
  )
}