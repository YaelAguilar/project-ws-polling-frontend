import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Header: React.FC = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Error: user context not available.</div>;
  }

  const { isLoggedIn, logout } = userContext;

  return (
    <header className="bg-gradient-to-r from-indigo-950 to-purple-950 text-white w-full p-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:w-3/4">
        <h1 className="text-lg md:text-xl font-bold">Melodic Bliss</h1>
        <div>
          {isLoggedIn ? (
            <>
              <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg mr-2 transition duration-300">
                Logout
              </button>
              <Link to="/upload-album" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                Upload Album
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg mr-2 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
