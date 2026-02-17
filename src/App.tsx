import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { CheckInForm } from './components/check-in/CheckInForm';
import { HistoryPage } from './pages/HistoryPage';
import { TrendsPage } from './pages/TrendsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
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
