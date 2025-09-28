import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchFilters } from '@/components/ui/search-filters';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { ChatInterface } from '@/components/messaging/ChatInterface';
import { useProfessionals } from '@/hooks/useProfessionals';
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
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileUserDashboardProps {
  onLogout: () => void;
}

const MobileUserDashboard: React.FC<MobileUserDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
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
      {/* Mobile Header */}
      <header className="bg-card border-b sticky top-0 z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <h1 className="font-bold text-foreground">ProConnect</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {activeTab === 'home' && (
          <div className="p-4 space-y-4">
            {/* Search Section */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Quick Categories */}
            <div className="grid grid-cols-2 gap-3">
              {['Electrician', 'Plumber', 'Tutor', 'Cleaner'].map((category) => (
                <Card key={category} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <div className="text-2xl mb-1">
                      {category === 'Electrician' && '⚡'}
                      {category === 'Plumber' && '🔧'}
                      {category === 'Tutor' && '📚'}
                      {category === 'Cleaner' && '🧽'}
                    </div>
                    <div className="text-sm font-medium">{category}</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Professionals List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Available Professionals</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-destructive">{error}</div>
              ) : filteredProfessionals.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No professionals found
                </div>
              ) : (
                filteredProfessionals.map((professional) => (
                  <ProfessionalCard
                    key={professional.id}
                    professional={professional}
                    onMessage={() => {
                      setSelectedChat({
                        conversationId: `${professional.user_id}`,
                        recipientName: professional.full_name || 'Professional',
                        recipientType: 'professional'
                      });
                    }}
                  />
                ))
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