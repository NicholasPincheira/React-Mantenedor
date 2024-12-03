import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import './index.css';

// Páginas
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Dashboard from './pages/Admin/Dashboards';
import Sliders from './pages/Admin/Sliders';
import Cards from './pages/Admin/Cards';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/login"
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout>
                <Register />
              </MainLayout>
            }
          />

          {/* Rutas Protegidas */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sliders"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Sliders />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cards"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Cards />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Redirección si la ruta no existe */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
