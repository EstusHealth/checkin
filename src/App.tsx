import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { CheckInForm } from './components/check-in/CheckInForm';
import { HistoryPage } from './pages/HistoryPage';
import { TrendsPage } from './pages/TrendsPage';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-text-muted">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <LoginPage onSignIn={signIn} />;
  }

  return (
    <BrowserRouter>
      <Layout onSignOut={signOut}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/check-in" element={<CheckInForm />} />
          <Route path="/check-in/:id/edit" element={<CheckInForm />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
