import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchFilters } from '@/components/ui/search-filters';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ChatInterface } from '@/components/messaging/ChatInterface';
import { useProfessionals } from '@/hooks/useProfessionals';
import { useGeolocation } from '@/hooks/useGeolocation';
import { 
  Search, 
  MessageCircle, 
  User, 
  Settings, 
  LogOut, 
  Home, 
  Filter,
  Bell,
  Phone,
  Mail,
  MapPin,
  Star,
  Calendar,
  Plus,
  Clock,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileUserDashboardProps {
  onLogout: () => void;
}

const MobileUserDashboard: React.FC<MobileUserDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
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
  const { location, loading: locationLoading } = useGeolocation();

  // Service categories with images
  const serviceCategories = [
    { 
      id: 'plumber', 
      name: 'Plumber', 
      icon: '🔧', 
      description: 'Plumbing repairs & maintenance',
      count: 47,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop'
    },
    { 
      id: 'electrician', 
      name: 'Electrician', 
      icon: '⚡', 
      description: 'Electrical repairs & installations',
      count: 32,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop'
    },
    { 
      id: 'cleaner', 
      name: 'Home Cleaning', 
      icon: '🧽', 
      description: 'Deep cleaning services',
      count: 89,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
    },
    { 
      id: 'tutor', 
      name: 'Tutoring', 
      icon: '📚', 
      description: 'Academic & skill tutoring',
      count: 56,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
    }
  ];

  const filteredProfessionals = professionals.filter(pro => {
    const matchesQuery = !searchQuery || 
      pro.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.service_type?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuery;
  });

  const handleBackToChat = useCallback(() => {
    setSelectedChat(null);
  }, []);

  if (selectedChat) {
    return (
      <ChatInterface
        conversationId={selectedChat.conversationId}
        recipientName={selectedChat.recipientName}
        recipientType={selectedChat.recipientType}
        onBack={handleBackToChat}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header - Design inspired by reference images */}
      <header className="bg-card border-b sticky top-0 z-50 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg">ProConnect</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Location Display */}
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">
            {locationLoading ? 'Detecting location...' : location?.city ? `${location.city}, ${location.state}` : 'San Francisco, CA'}
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 h-12 bg-background border-border rounded-xl"
          />
          <Button size="icon" variant="outline" className="absolute right-1 top-1 h-10 w-10 rounded-xl">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {activeTab === 'home' && (
          <div className="px-4 space-y-6">
            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['All', 'Highest Rated', 'Nearest', 'Lowest Price'].map((filter) => (
                <Button
                  key={filter}
                  variant={filter === 'All' ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap rounded-full"
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Service Categories - Inspired by reference images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Service Categories</h2>
                <span className="text-sm text-muted-foreground">{serviceCategories.reduce((acc, cat) => acc + cat.count, 0)} professionals</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {serviceCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                    onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
                  >
                    <div 
                      className="aspect-[4/3] bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${category.image})` }}
                    >
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute top-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                          {category.count} pros
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                          <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{category.rating}</span>
                            <span className="opacity-75">• Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Professionals List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Available Professionals</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-2">Finding professionals...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-destructive text-sm">{error}</div>
                </div>
              ) : filteredProfessionals.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground">No professionals found</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProfessionals.map((professional) => (
                    <Card key={professional.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img 
                            src={professional.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                            alt={professional.full_name || 'Professional'}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{professional.full_name || 'Professional'}</h3>
                            <CheckCircle className="h-4 w-4 text-primary fill-current" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{professional.service_type || 'General Service'}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>4.9 (127 reviews)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>1.2 miles</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="mb-3 text-xs bg-green-50 text-green-700">
                            <Clock className="h-3 w-3 mr-1" />
                            Available Today
                          </Badge>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">${professional.hourly_rate || 50}/hour</span>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedChat({
                                    conversationId: `${professional.user_id}`,
                                    recipientName: professional.full_name || 'Professional',
                                    recipientType: 'professional'
                                  });
                                }}
                              >
                                Message
                              </Button>
                              <Button size="sm">Book Now</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="p-4">
            <SearchFilters
              onFiltersChange={setFilters}
            />
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            <div className="text-center py-8 text-muted-foreground">
              No conversations yet
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="grid grid-cols-4 h-16">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'search', icon: Search, label: 'Search' },
            { id: 'messages', icon: MessageCircle, label: 'Messages' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
                activeTab === id 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileUserDashboard;