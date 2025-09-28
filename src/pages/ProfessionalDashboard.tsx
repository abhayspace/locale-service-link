import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Settings,
  LogOut,
  User,
  Star,
  TrendingUp,
  DollarSign,
  Award,
  Edit
} from 'lucide-react';

interface ProfessionalDashboardProps {
  onLogout: () => void;
}

const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ onLogout }) => {
  const [profileData, setProfileData] = useState({
    hourlyRate: '',
    skills: '',
    bio: '',
    availability: ''
  });

  const stats = {
    totalJobs: 0,
    rating: 0.0,
    monthlyEarnings: 0,
    responseRate: 0
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
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to ProConnect</h2>
          <p className="text-muted-foreground">Complete your profile to start receiving client requests</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

        {/* Profile Setup */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Professional Profile
            </CardTitle>
            <CardDescription>
              Complete your profile information to attract more clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Hourly Rate ($)</label>
                <Input
                  placeholder="Enter your hourly rate"
                  value={profileData.hourlyRate}
                  onChange={(e) => setProfileData({...profileData, hourlyRate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Availability</label>
                <Input
                  placeholder="e.g., Monday-Friday 9AM-5PM"
                  value={profileData.availability}
                  onChange={(e) => setProfileData({...profileData, availability: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Skills</label>
              <Input
                placeholder="Enter your skills separated by commas"
                value={profileData.skills}
                onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Bio</label>
              <Textarea
                placeholder="Tell clients about your experience and expertise"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={4}
              />
            </div>
            
            <Button className="w-full">
              <Edit className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;