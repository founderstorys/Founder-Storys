import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Apply from './pages/Apply';
import Studio from './pages/Studio';
import AdminDashboard from './pages/AdminDashboard';
import VideoPlayer from './pages/VideoPlayer';
import Auth from './pages/Auth';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';
import Videos from './pages/Videos';
import { DataProvider } from './context/DataContext';

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleView />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/watch/:id" element={<VideoPlayer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </DataProvider>
  );
};

export default App;