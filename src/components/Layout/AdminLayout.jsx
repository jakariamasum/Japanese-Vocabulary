"use client";

import { useState, useEffect, useRef } from "react";
import { BiLogOut } from "react-icons/bi";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    },
    {
      path: "/admin/user-management",
      label: "Manage Users",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      path: "/admin/lesson-management",
      label: "Lesson Management",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
    {
      path: "/admin/vocabulary-management",
      label: "Vocabulary Management",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block md:w-64 bg-gray-900 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="mt-auto p-4">
              <div className="flex flex-col gap-2 items-center space-x-4 cursor-pointer">
                {user?.img ? (
                  <img
                    src={user.img}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-indigo-600 bg-indigo-100 border border-indigo-500 font-semibold text-lg flex items-center justify-center w-10 h-10 rounded-full">
                    {user?.name?.[0]?.toUpperCase()}
                  </span>
                )}
                <div className="text-center">
                  <p className="font-medium">{user?.name || ""}</p>
                  <p className="text-sm text-gray-400">{user?.email || ""}</p>
                </div>
              </div>
            </div>

            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center py-2 px-4 rounded transition duration-200 ease-in-out ${
                        isActive(item.path)
                          ? "bg-gray-800 text-white"
                          : "hover:bg-gray-800"
                      }`}
                      onClick={closeMenu}
                    >
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={item.icon}
                        />
                      </svg>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-16 text-red-500 hover:text-white hover:bg-gray-800 flex items-center gap-2 py-2 px-4 rounded shadow">
              <BiLogOut size={24} />
              <button onClick={logout}>Log out</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
