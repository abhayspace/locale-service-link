import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  Loader2
} from 'lucide-react';

interface UserDashboardProps {
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { professionals, loading, error } = useProfessionals();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">ProConnect</h1>
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
        {/* Navigation */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Browse Services</h2>
          <p className="text-muted-foreground">Find and connect with verified professionals in your area</p>
        </div>

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
                            <Star className="h-4 w-4 text-warning fill-current" />
                            <span>{pro.rating ? pro.rating.toFixed(1) : '0.0'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{pro.total_jobs || 0} jobs</span>
                          </div>
                          {pro.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{pro.location}</span>
                            </div>
                          )}
                        </div>

                        {pro.bio && (
                          <p className="text-muted-foreground text-sm">{pro.bio}</p>
                        )}

                        {pro.skills && pro.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {pro.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {pro.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{pro.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book
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
    </div>
  );
};

export default UserDashboard;