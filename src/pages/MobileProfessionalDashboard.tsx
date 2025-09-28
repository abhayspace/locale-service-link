import React, { useState } from 'react';
import { MobileHeader } from '@/components/ui/mobile-header';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { MessagesList } from '@/components/messaging/MessagesList';
import { ChatInterface } from '@/components/messaging/ChatInterface';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Calendar, 
  Settings,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Star,
  TrendingUp,
  DollarSign,
  Award,
  Edit,
  Plus,
  Activity as ActivityIcon,
  Home,
  Briefcase,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileProfessionalDashboardProps {
  onLogout: () => void;
}

const bookingRequests = [
  {
    id: 1,
    customer: 'Alice Johnson',
    service: 'Electrical Panel Upgrade',
    date: '2024-01-18',
    time: '10:00 AM',
    location: '789 Pine St',
    description: 'Need to upgrade electrical panel for new appliances',
    budget: '$500-800',
    status: 'pending',
    urgency: 'high'
  },
  {
    id: 2,
    customer: 'Bob Wilson',
    service: 'Outlet Installation',
    date: '2024-01-16',
    time: '2:00 PM',
    location: '321 Elm Ave',
    description: 'Install 3 new outlets in home office',
    budget: '$200-300',
    status: 'pending',
    urgency: 'medium'
  }
];

const upcomingJobs = [
  {
    id: 1,
    customer: 'Carol Davis',
    service: 'Lighting Installation',
    date: '2024-01-15',
    time: '9:00 AM',
    location: '456 Oak Blvd',
    status: 'confirmed',
    payment: '$350'
  },
  {
    id: 2,
    customer: 'David Brown',
    service: 'Wiring Repair',
    date: '2024-01-17',
    time: '1:00 PM',
    location: '654 Main St',
    status: 'confirmed',
    payment: '$225'
  }
];

const MobileProfessionalDashboard: React.FC<MobileProfessionalDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedChat, setSelectedChat] = useState<{
    conversationId: string;
    recipientName: string;
    recipientType: 'user' | 'professional';
  } | null>(null);
  const [profileData, setProfileData] = useState({
    hourlyRate: '75',
    skills: 'Wiring, Lighting, Panel Upgrades, Troubleshooting',
    bio: 'Licensed electrician with 10+ years of experience. Specializing in residential and commercial electrical work.',
    availability: 'Monday-Friday 8AM-6PM'
  });

  const stats = {
    totalJobs: 127,
    rating: 4.9,
    monthlyEarnings: 3250,
    responseRate: 98
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, badge: bookingRequests.length },
    { id: 'schedule', label: 'Schedule', icon: Calendar, badge: upcomingJobs.length },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: 2 },
    { id: 'activity', label: 'Activity', icon: ActivityIcon, badge: 3 },
  ];

  const handleAcceptJob = (jobId: number) => {
    console.log('Accepting job:', jobId);
    // TODO: Implement job acceptance
  };

  const handleRejectJob = (jobId: number) => {
    console.log('Rejecting job:', jobId);
    // TODO: Implement job rejection
  };

  const handleSelectConversation = (conversationId: string, recipientName: string, recipientType: 'user' | 'professional') => {
    setSelectedChat({ conversationId, recipientName, recipientType });
  };

  const handleBackFromChat = () => {
    setSelectedChat(null);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  const renderHomeContent = () => (
    <div className="mobile-container space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="mobile-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-5 w-5 text-success mr-2" />
              <span className="text-2xl font-bold text-foreground">{stats.totalJobs}</span>
            </div>
            <p className="text-xs text-muted-foreground">Jobs Completed</p>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-warning mr-2" />
              <span className="text-2xl font-bold text-foreground">{stats.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold text-foreground">${stats.monthlyEarnings}</span>
            </div>
            <p className="text-xs text-muted-foreground">This Month</p>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-accent mr-2" />
              <span className="text-2xl font-bold text-foreground">{stats.responseRate}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="mobile-button h-auto py-3 flex-col gap-2">
            <Plus className="h-5 w-5" />
            <span className="text-xs">Block Time</span>
          </Button>
          <Button variant="outline" className="mobile-button h-auto py-3 flex-col gap-2">
            <Edit className="h-5 w-5" />
            <span className="text-xs">Edit Profile</span>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="text-base">Today's Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">New Requests</span>
            <Badge variant="secondary">{bookingRequests.length}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Scheduled Jobs</span>
            <Badge variant="secondary">{upcomingJobs.length}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Unread Messages</span>
            <Badge variant="secondary">2</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderJobsContent = () => (
    <div className="mobile-container space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Job Requests</h2>
        <Badge variant="secondary">{bookingRequests.length} pending</Badge>
      </div>

      <div className="space-y-4">
        {bookingRequests.map((request) => (
          <Card key={request.id} className={cn("mobile-card border-l-4", getUrgencyColor(request.urgency))}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{request.service}</CardTitle>
                  <CardDescription className="text-sm">from {request.customer}</CardDescription>
                </div>
                <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-medium">Date:</span> {request.date}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {request.time}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Location:</span> {request.location}
                </div>
                <div>
                  <span className="font-medium">Budget:</span> {request.budget}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">{request.description}</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleAcceptJob(request.id)}
                  className="mobile-button flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRejectJob(request.id)}
                  className="mobile-button flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Decline
                </Button>
                <Button variant="outline" size="sm" className="mobile-button">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderScheduleContent = () => (
    <div className="mobile-container space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">My Schedule</h2>
        <Button variant="outline" size="sm" className="mobile-button">
          <Plus className="h-4 w-4 mr-2" />
          Block Time
        </Button>
      </div>

      <div className="space-y-4">
        {upcomingJobs.map((job) => (
          <Card key={job.id} className="mobile-card border-l-4 border-l-success">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{job.service}</CardTitle>
                  <CardDescription className="text-sm">with {job.customer}</CardDescription>
                </div>
                <Badge className="bg-success/10 text-success border-success/20 text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Confirmed
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-medium">Date:</span> {job.date}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {job.time}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Location:</span> {job.location}
                </div>
                <div>
                  <span className="font-medium">Payment:</span> {job.payment}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="mobile-button flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="mobile-button">
                  Directions
                </Button>
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
        <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Your job history will appear here
        </h3>
        <p className="text-muted-foreground">
          Track completed jobs and earnings
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'jobs':
        return renderJobsContent();
      case 'schedule':
        return renderScheduleContent();
      case 'messages':
        return renderMessagesContent();
      case 'activity':
        return renderActivityContent();
      default:
        return renderHomeContent();
    }
  };

  const getHeaderTitle = () => {
    if (selectedChat) return selectedChat.recipientName;
    switch (activeTab) {
      case 'home':
        return 'LocalConnect Pro';
      case 'jobs':
        return 'Job Requests';
      case 'schedule':
        return 'My Schedule';
      case 'messages':
        return 'Messages';
      case 'activity':
        return 'Activity';
      default:
        return 'LocalConnect Pro';
    }
  };

  const getHeaderBadge = () => {
    if (selectedChat) return undefined;
    if (activeTab === 'home') {
      return { text: 'Professional', variant: 'professional' as const };
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
        rightActions={!selectedChat && activeTab === 'home' ? [
          {
            icon: Settings,
            onClick: onLogout,
            label: 'Settings'
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

export default MobileProfessionalDashboard;