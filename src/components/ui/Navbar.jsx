/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                JP
              </Link>
            </div>
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink to="/lessons" isActive={isActive("/lessons")}>
                  Lessons
                </NavLink>
                <NavLink to="/tutorials" isActive={isActive("/tutorials")}>
                  Tutorials
                </NavLink>
                {user.role === "admin" && (
                  <NavLink to="/admin" isActive={isActive("/admin")}>
                    Admin Dashboard
                  </NavLink>
                )}
              </div>
            )}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? <UserMenu user={user} logout={logout} /> : <AuthButtons />}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {user && (
              <>
                <MobileNavLink
                  to="/lessons"
                  isActive={isActive("/lessons")}
                  onClick={closeMenu}
                >
                  Lessons
                </MobileNavLink>
                <MobileNavLink
                  to="/tutorials"
                  isActive={isActive("/tutorials")}
                  onClick={closeMenu}
                >
                  Tutorials
                </MobileNavLink>
                {user.role === "admin" && (
                  <MobileNavLink
                    to="/admin"
                    isActive={isActive("/admin")}
                    onClick={closeMenu}
                  >
                    Admin Dashboard
                  </MobileNavLink>
                )}
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <MobileUserMenu
                user={user}
                logout={logout}
                closeMenu={closeMenu}
              />
            ) : (
              <MobileAuthButtons closeMenu={closeMenu} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, isActive, children }) => (
  <Link
    to={to}
    className={`${
      isActive
        ? "border-indigo-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, isActive, onClick, children }) => (
  <Link
    to={to}
    className={`${
      isActive
        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
        : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const UserMenu = ({ user, logout }) => (
  <div className="flex items-center space-x-4">
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
      {user?.img ? (
        <img
          src={user?.img}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-600 font-semibold">{user.name[0]}</span>
      )}
    </div>
    <span className="text-gray-700">{user.name}</span>
    <button
      onClick={logout}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Logout
    </button>
  </div>
);

const MobileUserMenu = ({ user, logout, closeMenu }) => (
  <div className="space-y-3">
    <div className="flex items-center px-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user?.img ? (
            <img
              src={user?.img}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 font-semibold text-lg">
              {user?.name[0]}
            </span>
          )}
        </div>
      </div>
      <div className="ml-3">
        <div className="text-base font-medium text-gray-800">{user.name}</div>
        <div className="text-sm font-medium text-gray-500">{user.email}</div>
      </div>
    </div>
    <div className="mt-3 px-2">
      <button
        onClick={() => {
          logout();
          closeMenu();
        }}
        className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Logout
      </button>
    </div>
  </div>
);

const AuthButtons = () => (
  <div className="space-x-4">
    <Link
      to="/login"
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="px-3 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Register
    </Link>
  </div>
);

const MobileAuthButtons = ({ closeMenu }) => (
  <div className="mt-3 px-2 space-y-3">
    <Link
      to="/login"
      className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={closeMenu}
    >
      Login
    </Link>
    <Link
      to="/register"
      className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={closeMenu}
    >
      Register
    </Link>
  </div>
);

const HamburgerIcon = ({ isOpen }) => (
  <svg
    className="h-6 w-6"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
    />
  </svg>
);

export default Navbar;
