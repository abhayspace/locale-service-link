import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Shield, Clock, MapPin, Search, User, Wrench, Zap, Users, CheckCircle, Award } from 'lucide-react';
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
    description: 'Background-checked and verified service providers you can trust',
    color: 'text-emerald-500'
  },
  {
    icon: Star,
    title: 'Quality Guaranteed',
    description: 'Real reviews and ratings from satisfied customers',
    color: 'text-amber-500'
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    description: 'Book services in seconds or schedule for your convenience',
    color: 'text-blue-500'
  },
  {
    icon: Users,
    title: 'Local Network',
    description: 'Connect with trusted professionals in your community',
    color: 'text-purple-500'
  }
];

const stats = [
  { number: '10K+', label: 'Happy Customers', icon: Users },
  { number: '5K+', label: 'Professionals', icon: Award },
  { number: '50K+', label: 'Jobs Completed', icon: CheckCircle },
  { number: '4.9★', label: 'Average Rating', icon: Star }
];

interface LandingProps {
  onRoleSelect: (role: 'user' | 'professional') => void;
}

const Landing: React.FC<LandingProps> = ({ onRoleSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-glass backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ServiceConnect</h1>
              <p className="text-xs text-muted-foreground">Professional Services Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => onRoleSelect('user')} className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="hero" onClick={() => onRoleSelect('professional')}>
              <span className="hidden sm:inline">Join as </span>Professional
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <Badge className="bg-glass border-primary/30 text-primary backdrop-blur-sm">
              <Star className="h-3 w-3 mr-1" />
              Trusted by 10,000+ customers
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              Connect with
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Local Professionals
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto">
              From home repairs to tutoring, find trusted professionals in your area. 
              Instant booking, verified providers, guaranteed quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => onRoleSelect('user')}
                className="group shadow-elegant"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Services
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="professional" 
                size="lg" 
                onClick={() => onRoleSelect('professional')}
                className="shadow-elegant"
              >
                <Wrench className="h-5 w-5 mr-2" />
                Join as Professional
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-border/50">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mt-20 animate-scale-in max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-3xl transform scale-110" />
            <img 
              src={heroImage} 
              alt="Professional service providers at work" 
              className="rounded-3xl shadow-massive w-full h-auto relative z-10"
            />
            <div className="absolute -top-6 -right-6 bg-glass backdrop-blur-xl border border-border/20 p-6 rounded-2xl shadow-elegant">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Quality Guaranteed</div>
                  <div className="text-sm text-muted-foreground">Verified professionals</div>
                </div>
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-glass border-primary/30 text-primary backdrop-blur-sm mb-4">
              Why ServiceConnect?
            </Badge>
            <h3 className="text-4xl font-bold text-foreground mb-6">Built for trust and convenience</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've created the safest and easiest way to connect with local service professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group animate-fade-in-up bg-glass backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-4">
                  <div className={`p-3 rounded-xl w-fit ${feature.color.replace('text-', 'bg-')}/10`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-glass border-primary/30 text-primary backdrop-blur-sm">
              <Zap className="h-3 w-3 mr-1" />
              Get started in minutes
            </Badge>
            
            <h3 className="text-4xl lg:text-5xl font-bold text-foreground">
              Your next great service experience
              <span className="block text-primary">starts here</span>
            </h3>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands who trust ServiceConnect for quality home services and professional opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => onRoleSelect('user')}
                className="shadow-elegant group"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Services Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="professional" 
                size="lg" 
                onClick={() => onRoleSelect('professional')}
                className="shadow-elegant"
              >
                <Award className="h-5 w-5 mr-2" />
                Start Earning Today
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-12 opacity-60">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                Fully Insured
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                Background Checked
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4" />
                4.9/5 Rating
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                10K+ Happy Customers
              </div>
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