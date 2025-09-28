import React, { useState, useEffect } from 'react';
import Landing from './Landing';
import Auth from './Auth';
import MobileUserDashboard from './MobileUserDashboard';
import MobileProfessionalDashboard from './MobileProfessionalDashboard';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

type AppState = 'landing' | 'auth' | 'user-dashboard' | 'professional-dashboard';
type UserRole = 'user' | 'professional';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // Get user profile to determine role
        getUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session) {
          getUserProfile(session.user.id);
        } else {
          setAppState('landing');
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setUserRole(data.user_type as UserRole);
        setAppState(data.user_type === 'user' ? 'user-dashboard' : 'professional-dashboard');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setAppState('auth');
  };

  const handleAuthSuccess = (role: UserRole) => {
    setUserRole(role);
    setAppState(role === 'user' ? 'user-dashboard' : 'professional-dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAppState('landing');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
