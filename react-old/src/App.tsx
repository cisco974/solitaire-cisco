import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ContentListPage } from './pages/admin/ContentListPage';
import { ContentEditorPage } from './pages/admin/ContentEditorPage';
import { KlondikePage } from './pages/KlondikePage';
import { SpiderPage } from './pages/SpiderPage';
import { FreeCellPage } from './pages/FreeCellPage';
import { AboutUs } from './pages/AboutUs';
import { TermsOfUse } from './pages/TermsOfUse';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Articles } from './pages/Articles';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/operation/login" element={<LoginPage />} />
        <Route path="/operation" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="guides" element={<ContentListPage type="guide" />} />
          <Route path="guides/:id" element={<ContentEditorPage type="guide" />} />
          <Route path="articles" element={<ContentListPage type="article" />} />
          <Route path="articles/:id" element={<ContentEditorPage type="article" />} />
          <Route path="pages" element={<ContentListPage type="page" />} />
          <Route path="pages/:id" element={<ContentEditorPage type="page" />} />
        </Route>

        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route index element={<KlondikePage />} />
          <Route path="/spider" element={<SpiderPage />} />
          <Route path="/freecell" element={<FreeCellPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/articles" element={<Articles />} />
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;