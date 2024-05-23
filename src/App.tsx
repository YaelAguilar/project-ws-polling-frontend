import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UploadMusicAlbumPage from './pages/UploadMusicAlbumPage';
import NotFoundPage from './pages/NotFoundPage';

import PrivateRoute from './components/organisms/guards/PrivateRoute';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/upload-album" element={
          <PrivateRoute>
            <UploadMusicAlbumPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
