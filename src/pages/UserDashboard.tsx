import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useProfessionals } from '@/hooks/useProfessionals';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  MessageCircle, 
  Calendar, 
  User,
  Settings,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

interface UserDashboardProps {
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
  },
  {
    id: 3,
    professional: 'Mike Chen',
    service: 'Math Tutoring',
    date: '2024-01-20',
    time: '4:00 PM',
    status: 'pending',
    location: 'Virtual Session'
  }
];

const UserDashboard: React.FC<UserDashboardProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'browse' | 'bookings'>('browse');
  const { professionals, loading, error } = useProfessionals();

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">ServiceConnect</h1>
            <Badge variant="user">Customer</Badge>
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
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'browse' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('browse')}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Browse Services
          </Button>
          <Button
            variant={activeTab === 'bookings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('bookings')}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            My Bookings
          </Button>
        </div>

        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for services (electrician, plumber, tutor...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Professionals List */}
            <div className="grid gap-4">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-destructive mb-4">{error}</p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              ) : professionals.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No professionals available at the moment.</p>
                </div>
              ) : (
                professionals.map((pro) => (
                  <Card key={pro.id} className="shadow-soft hover:shadow-medium transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="text-4xl">
                          {pro.avatar_url ? (
                            <img src={pro.avatar_url} alt={pro.full_name || 'Professional'} className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                              {pro.full_name?.charAt(0) || '?'}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{pro.full_name}</h3>
                              <p className="text-primary font-medium">{pro.service_type}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-foreground">
                                ${pro.hourly_rate || 0}
                              </div>
                              <div className="text-sm text-muted-foreground">per hour</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{pro.rating || 0}</span>
                              <span>({pro.total_jobs || 0} jobs)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {pro.location || 'Location not specified'}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {pro.availability || 'Contact for availability'}
                            </div>
                          </div>

                          {pro.skills && pro.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {pro.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-3 pt-2">
                            <Button variant="default" className="flex-1">
                              Book Service
                            </Button>
                            <Button variant="outline" size="icon">
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
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">My Bookings</h2>
              <Badge variant="secondary">{bookings.length} total</Badge>
            </div>

            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="shadow-soft">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{booking.service}</CardTitle>
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">{booking.status}</span>
                      </Badge>
                    </div>
                    <CardDescription>with {booking.professional}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.date} at {booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.professional}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                      {booking.status === 'confirmed' && (
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      )}
                      {booking.status === 'completed' && (
                        <Button variant="success" size="sm">
                          <Star className="h-4 w-4 mr-2" />
                          Rate Service
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;