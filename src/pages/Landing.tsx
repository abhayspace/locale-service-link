import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Shield, Clock, MapPin, Search, User, Wrench } from 'lucide-react';
import heroImage from '@/assets/hero-services.jpg';

const serviceCategories = [
  { 
    id: 'electrician', 
    name: 'Electrician', 
    icon: '⚡', 
    description: 'Electrical repairs & installations',
    count: 'Available'
  },
  { 
    id: 'plumber', 
    name: 'Plumber', 
    icon: '🔧', 
    description: 'Plumbing repairs & maintenance',
    count: 'Available'
  },
  { 
    id: 'tutor', 
    name: 'Tutor', 
    icon: '📚', 
    description: 'Academic & skill tutoring',
    count: 'Available'
  },
  { 
    id: 'carpenter', 
    name: 'Carpenter', 
    icon: '🔨', 
    description: 'Furniture & woodwork',
    count: 'Available'
  },
  { 
    id: 'cleaner', 
    name: 'House Cleaning', 
    icon: '🧽', 
    description: 'Deep cleaning services',
    count: 'Available'
  },
  { 
    id: 'painter', 
    name: 'Painter', 
    icon: '🎨', 
    description: 'Interior & exterior painting',
    count: 'Available'
  },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All service providers are background-checked and verified'
  },
  {
    icon: Star,
    title: 'Rated & Reviewed',
    description: 'See real reviews from previous customers'
  },
  {
    icon: Clock,
    title: 'Quick Booking',
    description: 'Book services instantly or schedule for later'
  },
  {
    icon: MapPin,
    title: 'Local Services',
    description: 'Find professionals in your area'
  }
];

interface LandingProps {
  onRoleSelect: (role: 'user' | 'professional') => void;
}

const Landing: React.FC<LandingProps> = ({ onRoleSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">ServiceConnect</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => onRoleSelect('user')}>
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="hero" onClick={() => onRoleSelect('professional')}>
              Join as Professional
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-5" />
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                🌟 Connecting Local Communities
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Find <span className="text-primary">Local</span> Service Professionals
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect with verified electricians, plumbers, tutors, and more in your area. 
                Book services instantly or get quotes.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => onRoleSelect('user')}
                className="group"
              >
                Find Services
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="professional" 
                size="lg" 
                onClick={() => onRoleSelect('professional')}
              >
                Become a Pro
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">🚀</div>
                <div className="text-sm text-muted-foreground">Getting Started</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">⭐</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  Quality Service
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">🤝</div>
                <div className="text-sm text-muted-foreground">Local Community</div>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <img 
              src={heroImage} 
              alt="Local service professionals at work" 
              className="rounded-2xl shadow-strong w-full h-auto"
            />
            <div className="absolute -top-4 -right-4 bg-success text-success-foreground p-4 rounded-xl shadow-medium">
              <div className="text-sm font-medium">ServiceConnect</div>
              <div className="flex items-center gap-1">
                <Wrench className="h-4 w-4 fill-current" />
                <span className="font-bold">Pro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Popular Services</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our most requested service categories and find the right professional for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {serviceCategories.map((category, index) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-medium bg-card-gradient border-border/50 group hover:border-primary/30 ${
                  selectedCategory === category.id ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">{category.icon}</div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full group-hover:bg-primary/10 group-hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRoleSelect('user');
                    }}
                  >
                    View Professionals
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" onClick={() => onRoleSelect('user')}>
              <Search className="h-4 w-4 mr-2" />
              Browse All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose ServiceConnect?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find trusted professionals and get your projects done right.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-4xl font-bold text-foreground">Ready to Get Started?</h3>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers and professionals on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => onRoleSelect('user')}
              >
                Book a Service
              </Button>
              <Button 
                variant="professional" 
                size="lg" 
                onClick={() => onRoleSelect('professional')}
              >
                Offer Your Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-primary" />
                <span className="font-bold text-foreground">ServiceConnect</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting communities with trusted local service professionals.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">For Customers</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Find Services</li>
                <li>How It Works</li>
                <li>Safety</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">For Professionals</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Join as Pro</li>
                <li>Pro Resources</li>
                <li>Success Stories</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ServiceConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;