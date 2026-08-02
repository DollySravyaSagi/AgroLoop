import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TrackingPage from './pages/TrackingPage';
import ContactPage from './pages/ContactPage';
import FeedbackPage from './pages/FeedbackPage';

import FarmerDashboard from './pages/dashboards/FarmerDashboard';
import CollectorDashboard from './pages/dashboards/CollectorDashboard';
import CompostUnitDashboard from './pages/dashboards/CompostUnitDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

function MainContent() {
  const { activeTab } = useApp();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'register':
        return <RegisterPage />;
      case 'login':
        return <LoginPage />;
      case 'tracking':
        return <TrackingPage />;
      case 'contact':
        return <ContactPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'farmer-dashboard':
        return <FarmerDashboard />;
      case 'collector-dashboard':
        return <CollectorDashboard />;
      case 'compost-dashboard':
        return <CompostUnitDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Toast />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
