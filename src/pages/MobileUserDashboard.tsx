import React, { useState } from 'react';
import { MobileHeader } from '@/components/ui/mobile-header';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { MessagesList } from '@/components/messaging/MessagesList';
import { ChatInterface } from '@/components/messaging/ChatInterface';
import { useProfessionals } from '@/hooks/useProfessionals';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { BookingCard } from '@/components/ui/booking-card';
import { SearchFilters, SearchFilters as FilterType } from '@/components/ui/search-filters';
import { StatsCard } from '@/components/ui/stats-card';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  MessageCircle, 
  Calendar, 
  Settings,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  Activity as ActivityIcon,
  Home,
  User,
  ArrowLeft,
  Loader2,
  DollarSign,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileUserDashboardProps {
  onLogout: () => void;
}


const bookings = [
  {
    id: 1,
    professional: 'John Smith',
    service: 'Electrical Repair',
    date: '2024-01-15',
    time: '2:00 PM',
    status: 'confirmed',
    location: '123 Main St'
  },
  {
    id: 2,
    professional: 'Sarah Johnson',
    service: 'Pipe Installation',
    date: '2024-01-12',
    time: '10:00 AM',
    status: 'completed',
    location: '456 Oak Ave'
  }
];

const MobileUserDashboard: React.FC<MobileUserDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterType>({
    query: '',
    serviceType: 'All Services',
    location: '',
    priceRange: [0, 200],
    minRating: 0,
    availability: 'any',
    skills: []
  });
  const [selectedChat, setSelectedChat] = useState<{
    conversationId: string;
    recipientName: string;
    recipientType: 'user' | 'professional';
  } | null>(null);
  const { professionals, loading, error } = useProfessionals();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Calendar, badge: 2 },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: 3 },
    { id: 'activity', label: 'Activity', icon: ActivityIcon, badge: 5 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending': return <Clock className="h-4 w-4 text-warning" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSelectConversation = (conversationId: string, recipientName: string, recipientType: 'user' | 'professional') => {
    setSelectedChat({ conversationId, recipientName, recipientType });
  };

  const handleBackFromChat = () => {
    setSelectedChat(null);
  };

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    // TODO: Apply filters to professionals list
  };

  const handleProfessionalAction = (action: string, professionalId: string) => {
    console.log(`${action} professional:`, professionalId);
    // TODO: Implement professional actions
  };

  const renderHomeContent = () => (
    <div className="mobile-container space-y-6">
      {/* Enhanced Search */}
      <SearchFilters 
        onFiltersChange={handleFiltersChange}
        onSearch={(query) => setSearchQuery(query)}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Active Bookings"
          value={bookings.length}
          subtitle="This month"
          icon={Calendar}
          variant="default"
        />
        <StatsCard
          title="Total Spent"
          value="$0"
          subtitle="This month"
          icon={DollarSign}
          variant="success"
        />
      </div>

      {/* Featured Professionals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Available Now</h2>
          <Badge variant="secondary">{professionals.length} online</Badge>
        </div>
        
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : error ? (
            <Card className="mobile-card">
              <CardContent className="p-4 text-center">
                <p className="text-destructive text-sm mb-2">{error}</p>
                <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : professionals.length === 0 ? (
            <Card className="mobile-card">
              <CardContent className="p-4 text-center">
                <p className="text-muted-foreground text-sm">No professionals available at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Featured Professional */}
              {professionals[0] && (
                <ProfessionalCard
                  professional={professionals[0]}
                  variant="featured"
                  onBook={(id) => handleProfessionalAction('book', id)}
                  onMessage={(id) => handleProfessionalAction('message', id)}
                  onViewProfile={(id) => handleProfessionalAction('view', id)}
                />
              )}
              
              {/* Other Professionals */}
              {professionals.slice(1).map((pro) => (
                <ProfessionalCard
                  key={pro.id}
                  professional={pro}
                  variant="default"
                  onBook={(id) => handleProfessionalAction('book', id)}
                  onMessage={(id) => handleProfessionalAction('message', id)}
                  onViewProfile={(id) => handleProfessionalAction('view', id)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderBookingsContent = () => {
    // Transform mock data to match booking interface
    const transformedBookings = bookings.map(booking => ({
      id: booking.id.toString(),
      user_id: 'current-user',
      professional_id: 'pro-id',
      service_type: booking.service,
      location: booking.location,
      scheduled_date: booking.date,
      scheduled_time: booking.time,
      status: booking.status as 'pending' | 'confirmed' | 'completed' | 'cancelled',
      professional_name: booking.professional,
      created_at: new Date().toISOString()
    }));

    return (
      <div className="mobile-container space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatsCard
            title="Total"
            value={bookings.length}
            subtitle="bookings"
            variant="default"
          />
          <StatsCard
            title="Pending"
            value={bookings.filter(b => b.status === 'pending').length}
            subtitle="awaiting"
            variant="warning"
          />
          <StatsCard
            title="Completed"
            value={bookings.filter(b => b.status === 'completed').length}
            subtitle="finished"
            variant="success"
          />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">My Bookings</h2>
          <Button size="sm" className="mobile-button">
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>

        <div className="space-y-4">
          {transformedBookings.length === 0 ? (
            <Card className="mobile-card">
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No bookings yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start by booking a service from our professionals
                </p>
                <Button className="mobile-button">
                  Browse Services
                </Button>
              </CardContent>
            </Card>
          ) : (
            transformedBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                userRole="user"
                onMessage={(id) => console.log('Message booking:', id)}
                onCancel={(id) => console.log('Cancel booking:', id)}
                onRate={(id) => console.log('Rate booking:', id)}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  const renderMessagesContent = () => {
    if (selectedChat) {
      return (
        <ChatInterface
          conversationId={selectedChat.conversationId}
          recipientName={selectedChat.recipientName}
          recipientType={selectedChat.recipientType}
          onBack={handleBackFromChat}
        />
      );
    }

    return <MessagesList onSelectConversation={handleSelectConversation} />;
  };

  const renderActivityContent = () => (
    <div className="mobile-container space-y-6">
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Your bookings will appear here
        </h3>
        <p className="text-muted-foreground">
          Track your service appointments and history
        </p>
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className="mobile-container space-y-6">
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="text-center">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="mobile-button w-full justify-start">
            <Settings className="h-4 w-4 mr-3" />
            Account Settings
          </Button>
          <Button variant="outline" className="mobile-button w-full justify-start">
            <User className="h-4 w-4 mr-3" />
            Edit Profile
          </Button>
          <Button 
            variant="outline" 
            className="mobile-button w-full justify-start text-destructive hover:text-destructive"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'bookings':
        return renderBookingsContent();
      case 'messages':
        return renderMessagesContent();
      case 'activity':
        return renderActivityContent();
      case 'profile':
        return renderProfileContent();
      default:
        return renderHomeContent();
    }
  };

  const getHeaderTitle = () => {
    if (selectedChat) return selectedChat.recipientName;
    switch (activeTab) {
      case 'home':
        return 'LocalConnect';
      case 'bookings':
        return 'My Bookings';
      case 'messages':
        return 'Messages';
      case 'activity':
        return 'Activity';
      case 'profile':
        return 'Profile';
      default:
        return 'LocalConnect';
    }
  };

  const getHeaderBadge = () => {
    if (selectedChat) return undefined;
    if (activeTab === 'home') {
      return { text: 'Customer', variant: 'user' as const };
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <MobileHeader
        title={getHeaderTitle()}
        badge={getHeaderBadge()}
        leftAction={selectedChat ? {
          icon: () => <ArrowLeft className="h-5 w-5" />,
          onClick: handleBackFromChat,
          label: 'Back'
        } : undefined}
        rightActions={!selectedChat ? [
          {
            icon: Search,
            onClick: () => {},
            label: 'Search'
          }
        ] : []}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-auto smooth-scroll">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      {!selectedChat && (
        <BottomNavigation
          items={navigationItems}
          activeItem={activeTab}
          onItemSelect={setActiveTab}
        />
      )}
    </div>
  );
};

export default MobileUserDashboard;