import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Star, 
  Shield, 
  Clock, 
  Users, 
  Award,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  CheckCircle,
  Zap,
  Calendar,
  CreditCard,
  Filter
} from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';

const serviceCategories = [
  { 
    id: 'plumbing', 
    name: 'Plumbing', 
    icon: '🔧', 
    description: 'Plumbing repairs & maintenance',
    count: 47,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop'
  },
  { 
    id: 'electrical', 
    name: 'Electrical', 
    icon: '⚡', 
    description: 'Electrical repairs & installations',
    count: 32,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop'
  },
  { 
    id: 'cleaning', 
    name: 'Home Cleaning', 
    icon: '🧽', 
    description: 'Deep cleaning services',
    count: 89,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
  },
  { 
    id: 'tutoring', 
    name: 'Tutoring', 
    icon: '📚', 
    description: 'Academic & skill tutoring',
    count: 56,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
  }
];

const featuredProfessionals = [
  {
    id: '1',
    name: 'Sarah Martinez',
    service: 'Home Cleaning',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332446c?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviews: 127,
    distance: 1.2,
    hourlyRate: 35,
    verified: true,
    availableToday: true
  },
  {
    id: '2',
    name: 'Mike Johnson',
    service: 'Plumbing',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviews: 89,
    distance: 0.8,
    hourlyRate: 75,
    verified: true,
    availableToday: true
  }
];

interface LandingProps {
  onRoleSelect: (role: 'user' | 'professional') => void;
}

const Landing: React.FC<LandingProps> = ({ onRoleSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const { location, loading: locationLoading } = useGeolocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-first design based on reference images */}
      <div className="max-w-md mx-auto bg-background min-h-screen">
        {/* Header Section */}
        <section className="relative py-8 px-4">
          <div className="space-y-6">
            {/* Location Header */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {locationLoading ? 'Detecting location...' : location?.city ? `${location.city}, ${location.state}` : 'San Francisco, CA'}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-left text-foreground">
                Find Local Professionals
              </h1>
              <p className="text-muted-foreground text-sm">
                4 professionals near you
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 h-12 bg-card border-border"
              />
              <Button size="icon" variant="outline" className="absolute right-1 top-1 h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['All', 'Highest Rated', 'Nearest', 'Lowest Price'].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap rounded-full"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={() => onRoleSelect('user')} 
                className="flex-1 h-12"
              >
                Find Services
              </Button>
              <Button 
                onClick={() => onRoleSelect('professional')} 
                variant="outline" 
                className="flex-1 h-12"
              >
                Join as Pro
              </Button>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-4 px-4">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Service Categories</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {serviceCategories.map((category) => (
                <Card
                  key={category.id}
                  className="relative overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
                  onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
                >
                  <div 
                    className="aspect-[4/3] bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${category.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                        <h3 className="font-semibold text-sm">{category.name}</h3>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{category.rating} ({category.count} pros)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Professionals */}
        <section className="py-4 px-4">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Featured Professionals</h2>
            
            <div className="space-y-4">
              {featuredProfessionals.map((professional) => (
                <Card key={professional.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <img 
                      src={professional.avatar}
                      alt={professional.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{professional.name}</h3>
                        {professional.verified && (
                          <CheckCircle className="h-4 w-4 text-primary fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{professional.service}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{professional.rating} ({professional.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{professional.distance} miles</span>
                        </div>
                      </div>
                      {professional.availableToday && (
                        <Badge variant="secondary" className="mb-2 text-xs bg-green-50 text-green-700">
                          <Clock className="h-3 w-3 mr-1" />
                          Available Today
                        </Badge>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">${professional.hourlyRate}/hour</span>
                        <Button size="sm" onClick={() => onRoleSelect('user')}>Book Now</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-4 px-4 pb-8">
          <Card className="bg-primary text-primary-foreground p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Join as a Professional</h3>
            <p className="text-sm opacity-90 mb-4">
              Start earning by offering your services to local customers
            </p>
            <Button 
              variant="secondary" 
              onClick={() => onRoleSelect('professional')}
              className="w-full"
            >
              Get Started
            </Button>
          </Card>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t px-4 py-8 mt-8">
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="font-bold text-lg mb-2">ProConnect</h4>
              <p className="text-muted-foreground text-sm">
                Connecting professionals with local customers
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="font-semibold mb-2">For Customers</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Find Services</li>
                  <li>Book Online</li>
                  <li>Customer Support</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">For Professionals</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Join Now</li>
                  <li>Pro Resources</li>
                  <li>Success Stories</li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-border">
              <p className="text-muted-foreground text-xs">
                © 2024 ProConnect. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;