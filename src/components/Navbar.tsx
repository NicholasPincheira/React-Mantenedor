import React from "react";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react"; // Iconos de Lucide
import { useAuth } from "../contexts/AuthContext";

function Navigation() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-700">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="hover:text-blue-500">
            <img src="/img/NpLogo.png" alt="Logo" className="h-8 w-8" />
          </Link>
            <span className="font-bold text-xl">Landing</span>
          
        </div>

        {/* Links de navegación */}
        <div className="hidden md:flex space-x-6">



          {currentUser && (
            <>
              <Link to="/admin/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
              <Link to="/admin/sliders" className="hover:text-blue-500">
                Sliders
              </Link>
              <Link to="/admin/cards" className="hover:text-blue-500">
                Cards
              </Link>
            </>
          )}
        </div>

        {/* Avatar o botones de login/registro */}
        <div className="flex items-center space-x-4">
          {!currentUser ? (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <LogIn className="w-5 h-5" />

              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <UserPlus className="w-5 h-5" />

              </Link>
            </>
          ) : (
            <div className="relative group">
              <img
                src={
                  currentUser.photoURL || // Foto del usuario
                  "https://via.placeholder.com/150?text=Avatar" // Predeterminado
                }
                alt="User Avatar"
                className="h-10 w-10 rounded-full border-2 border-blue-500 cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="block px-4 py-2 text-sm text-white">
                  {currentUser.email}
                </div>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Configuraciones
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
