import React, { useState } from 'react';
import { MobileHeader } from '@/components/ui/mobile-header';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { MessagesList } from '@/components/messaging/MessagesList';
import { ChatInterface } from '@/components/messaging/ChatInterface';
import { useProfessionals } from '@/hooks/useProfessionals';

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
  Loader2
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

  const renderHomeContent = () => (
    <div className="mobile-container space-y-6">
      {/* Quick Search */}
      <Card className="mobile-card">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Find services near you..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="mobile-button flex-1">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="mobile-button flex-1">
                <MapPin className="h-4 w-4 mr-2" />
                Near Me
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Professionals */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Available Now</h2>
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
            professionals.map((pro) => (
              <Card key={pro.id} className="mobile-card">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative">
                      {pro.avatar_url ? (
                        <img src={pro.avatar_url} alt={pro.full_name || 'Professional'} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                          {pro.full_name?.charAt(0) || '?'}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{pro.full_name}</h3>
                          <p className="text-primary font-medium text-sm">{pro.service_type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">${pro.hourly_rate || 0}</div>
                          <div className="text-xs text-muted-foreground">per hour</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{pro.rating || 0}</span>
                          <span>({pro.total_jobs || 0})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {pro.location || 'Location not specified'}
                        </div>
                      </div>

                      {pro.skills && pro.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {pro.skills.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                              {skill}
                            </Badge>
                          ))}
                          {pro.skills.length > 2 && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              +{pro.skills.length - 2} more
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button className="mobile-button flex-1" size="sm">
                          Book Now
                        </Button>
                        <Button variant="outline" size="sm" className="mobile-button">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderBookingsContent = () => (
    <div className="mobile-container space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">My Bookings</h2>
        <Badge variant="secondary">{bookings.length} active</Badge>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="mobile-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{booking.service}</CardTitle>
                <Badge className={cn("text-xs", getStatusColor(booking.status))}>
                  {getStatusIcon(booking.status)}
                  <span className="ml-1 capitalize">{booking.status}</span>
                </Badge>
              </div>
              <CardDescription className="text-sm">with {booking.professional}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.date} at {booking.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.location}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="mobile-button flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                {booking.status === 'completed' && (
                  <Button variant="outline" size="sm" className="mobile-button">
                    <Star className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

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