import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css'

import Navigation from './components/Navbar';

//Pages
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Dashboard from './pages/Admin/Dashboards';
import Sliders from './pages/Admin/Sliders';
import Cards from './pages/Admin/Cards';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/PortfolioProject">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/sliders" element={<Sliders />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <Navigation />
                <main className="container mx-auto px-4 pt-20 pb-12">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
