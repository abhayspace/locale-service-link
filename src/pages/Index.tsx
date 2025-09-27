import React, { useState } from 'react';
import Landing from './Landing';
import Auth from './Auth';
import MobileUserDashboard from './MobileUserDashboard';
import MobileProfessionalDashboard from './MobileProfessionalDashboard';

type AppState = 'landing' | 'auth' | 'user-dashboard' | 'professional-dashboard';
type UserRole = 'user' | 'professional';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userRole, setUserRole] = useState<UserRole>('user');

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setAppState('auth');
  };

  const handleAuthSuccess = (role: UserRole) => {
    setUserRole(role);
    setAppState(role === 'user' ? 'user-dashboard' : 'professional-dashboard');
  };

  const handleLogout = () => {
    setAppState('landing');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  switch (appState) {
    case 'landing':
      return <Landing onRoleSelect={handleRoleSelect} />;
    case 'auth':
      return (
        <Auth 
          role={userRole} 
          onBack={handleBackToLanding} 
          onAuthSuccess={handleAuthSuccess} 
        />
      );
    case 'user-dashboard':
      return <MobileUserDashboard onLogout={handleLogout} />;
    case 'professional-dashboard':
      return <MobileProfessionalDashboard onLogout={handleLogout} />;
    default:
      return <Landing onRoleSelect={handleRoleSelect} />;
  }
};

export default Index;
