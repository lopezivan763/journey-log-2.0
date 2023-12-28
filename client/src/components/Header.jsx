import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import xLogo from "../assets/logo3.png"; 

import PostForm from '../components/PostForm';



const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const togglePostForm = () => {
    setShowPostForm(!showPostForm);
  };

  return (
    <header className="bg-[#0c0a09]">
      <div className="max-w[1040px] px-4 p-5 mx-auto flex items-center justify-between lg:px-8">
        <div className="flex lg:flex-items-center">
          <Link className="pb-0 mb-0" to="/">
            <img
              src={xLogo}
              alt="Xperience Logo"
              className="h-auto max-w-[150px] flex flex-wrap"
            />
          </Link>
        </div>
        <div className="relative">
          <button onClick={toggleMenu} className="text-[#86C232] hover:text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute top-12 right-0 z-20 bg-[#0c0a09]/90 text-white py-10 px-16 rounded-lg shadow-lg">
              <button onClick={toggleMenu} className="text-[#86C232] absolute top-3 right-3">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Additional menu items */}
              {Auth.loggedIn() ? (
                <div className="flex flex-col items-start">
                  <Link
                    className="text-[#86C232] hover:text-white font-semibold py-2"
                    to="/"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                  <Link
                    className="text-[#86C232] hover:text-white font-semibold py-2"
                    to="/me"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <button
                    className="text-[#86C232] hover:text-white font-semibold py-2"
                    onClick={togglePostForm}
                  >
                    Create
                  </button>
                  {showPostForm && <PostForm />}

                  <button
                    className="text-[#86C232] hover:text-white font-semibold py-2"
                    onClick={(e) => {
                      logout(e);
                      toggleMenu();
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <Link
                    className="text-[#86C232] hover:text-white font-semibold py-2"
                    to="/"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                  <Link className="text-[#86C232] hover:text-white font-semibold py-2" to="/login" onClick={toggleMenu}>
                    Login
                  </Link>
                  <Link className="text-[#86C232] hover:text-white font-semibold py-2" to="/signup" onClick={toggleMenu}>
                    Signup
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
