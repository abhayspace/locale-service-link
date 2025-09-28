import React, { useState } from 'react';
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
  Plus
} from 'lucide-react';

interface ProfessionalDashboardProps {
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
    status: 'pending'
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
    status: 'pending'
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

const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'schedule' | 'profile'>('requests');
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

  const handleAcceptJob = (jobId: number) => {
    console.log('Accepting job:', jobId);
    // TODO: Implement job acceptance
  };

  const handleRejectJob = (jobId: number) => {
    console.log('Rejecting job:', jobId);
    // TODO: Implement job rejection
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">ProConnect</h1>
            <Badge variant="professional">Professional</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Award className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.totalJobs}</div>
                  <div className="text-sm text-muted-foreground">Jobs Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Star className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.rating}</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">${stats.monthlyEarnings}</div>
                  <div className="text-sm text-muted-foreground">This Month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.responseRate}%</div>
                  <div className="text-sm text-muted-foreground">Response Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'requests' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('requests')}
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Job Requests
            <Badge variant="secondary" className="ml-1">
              {bookingRequests.length}
            </Badge>
          </Button>
          <Button
            variant={activeTab === 'schedule' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('schedule')}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            My Schedule
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
        </div>

        {/* Job Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">New Job Requests</h2>
              <Badge variant="secondary">{bookingRequests.length} pending</Badge>
            </div>

            <div className="grid gap-4">
              {bookingRequests.map((request) => (
                <Card key={request.id} className="shadow-soft border-l-4 border-l-warning">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{request.service}</CardTitle>
                        <CardDescription>Request from {request.customer}</CardDescription>
                      </div>
                      <Badge className="bg-warning/10 text-warning border-warning/20">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Date & Time:</strong> {request.date} at {request.time}
                      </div>
                      <div>
                        <strong>Location:</strong> {request.location}
                      </div>
                      <div>
                        <strong>Budget:</strong> {request.budget}
                      </div>
                      <div>
                        <strong>Customer:</strong> {request.customer}
                      </div>
                    </div>

                    <div>
                      <strong>Description:</strong>
                      <p className="text-muted-foreground mt-1">{request.description}</p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button 
                        variant="success" 
                        onClick={() => handleAcceptJob(request.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept Job
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleRejectJob(request.id)}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Upcoming Jobs</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Block Time
              </Button>
            </div>

            <div className="grid gap-4">
              {upcomingJobs.map((job) => (
                <Card key={job.id} className="shadow-soft border-l-4 border-l-success">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{job.service}</CardTitle>
                        <CardDescription>with {job.customer}</CardDescription>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Confirmed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong>Date & Time:</strong> {job.date} at {job.time}
                      </div>
                      <div>
                        <strong>Location:</strong> {job.location}
                      </div>
                      <div>
                        <strong>Payment:</strong> {job.payment}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message Customer
                      </Button>
                      <Button variant="outline" size="sm">
                        Get Directions
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Professional Profile</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            <div className="grid gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Service Type</label>
                      <Input value="Electrician" disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Hourly Rate</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                        <Input 
                          value={profileData.hourlyRate}
                          onChange={(e) => setProfileData({...profileData, hourlyRate: e.target.value})}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Skills & Specializations</label>
                    <Input 
                      value={profileData.skills}
                      onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                      placeholder="e.g., Wiring, Lighting, Panel Upgrades"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Professional Bio</label>
                    <Textarea 
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="Describe your experience and specialties"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Availability</label>
                    <Input 
                      value={profileData.availability}
                      onChange={(e) => setProfileData({...profileData, availability: e.target.value})}
                      placeholder="e.g., Monday-Friday 8AM-6PM"
                    />
                  </div>

                  <Button variant="default" className="w-full">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">{stats.totalJobs}</div>
                      <div className="text-sm text-muted-foreground">Jobs Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">{stats.rating}</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">{stats.responseRate}%</div>
                      <div className="text-sm text-muted-foreground">Response Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">24h</div>
                      <div className="text-sm text-muted-foreground">Avg Response</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;