import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Shield, Clock, MapPin, Search, User, Network, Zap, Users, CheckCircle, Award, Phone, Mail, MessageCircle, Heart, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-services.jpg';

const serviceCategories = [
  { 
    id: 'electrician', 
    name: 'Electrician', 
    icon: '⚡', 
    description: 'Electrical repairs & installations',
    count: '250+ Available',
    featured: true
  },
  { 
    id: 'plumber', 
    name: 'Plumber', 
    icon: '🔧', 
    description: 'Plumbing repairs & maintenance',
    count: '180+ Available',
    featured: true
  },
  { 
    id: 'tutor', 
    name: 'Tutor', 
    icon: '📚', 
    description: 'Academic & skill tutoring',
    count: '320+ Available',
    featured: false
  },
  { 
    id: 'carpenter', 
    name: 'Carpenter', 
    icon: '🔨', 
    description: 'Furniture & woodwork',
    count: '150+ Available',
    featured: true
  },
  { 
    id: 'cleaner', 
    name: 'House Cleaning', 
    icon: '🧽', 
    description: 'Deep cleaning services',
    count: '200+ Available',
    featured: false
  },
  { 
    id: 'painter', 
    name: 'Painter', 
    icon: '🎨', 
    description: 'Interior & exterior painting',
    count: '120+ Available',
    featured: false
  },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'Background-checked and certified service providers',
    color: 'text-blue-600'
  },
  {
    icon: Star,
    title: 'Quality Guarantee',
    description: 'Real reviews and 5-star rated professionals',
    color: 'text-amber-500'
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    description: 'Book services in under 60 seconds',
    color: 'text-emerald-500'
  },
  {
    icon: Users,
    title: 'Local Network',
    description: 'Connect with trusted professionals nearby',
    color: 'text-purple-500'
  }
];

const stats = [
  { number: '25K+', label: 'Happy Customers', icon: Users },
  { number: '8K+', label: 'Professionals', icon: Award },
  { number: '100K+', label: 'Jobs Completed', icon: CheckCircle },
  { number: '4.9★', label: 'Average Rating', icon: Star }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'Found an amazing electrician in minutes. Professional, quick, and fairly priced!',
    rating: 5
  },
  {
    name: 'Mike Chen',
    role: 'Professional',
    content: 'ProConnect helped me grow my business. I get quality leads every week.',
    rating: 5
  },
  {
    name: 'Emma Davis',
    role: 'Customer',
    content: 'The best platform for finding reliable home services. Highly recommended!',
    rating: 5
  }
];

interface LandingProps {
  onRoleSelect: (role: 'user' | 'professional') => void;
}

const Landing: React.FC<LandingProps> = ({ onRoleSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
              <Network className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ProConnect</h1>
              <p className="text-xs text-blue-600 font-medium">Professional Services Network</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => onRoleSelect('user')} className="hidden sm:flex text-gray-700 hover:text-blue-600">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button onClick={() => onRoleSelect('professional')} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              <span className="hidden sm:inline">Join as </span>Professional
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge className="bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200 transition-colors">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Trusted by 25,000+ customers nationwide
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Connect with
              <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Top Professionals
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From home repairs to personal tutoring, find verified professionals in your area. 
              Instant booking, transparent pricing, guaranteed quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                size="lg" 
                onClick={() => onRoleSelect('user')}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all group px-8 py-4"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Services
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => onRoleSelect('professional')}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all px-8 py-4"
              >
                <Network className="h-5 w-5 mr-2" />
                Join as Professional
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-12 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                Fully Insured
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Background Verified
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                5-Star Rated
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                Local Community
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mt-16 animate-scale-in max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-20 rounded-3xl blur-3xl transform scale-110" />
            <img 
              src={heroImage} 
              alt="Professional service providers at work" 
              className="rounded-3xl shadow-2xl w-full h-auto relative z-10 border border-blue-100"
            />
            <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-xl border border-blue-100 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Quality Guaranteed</div>
                  <div className="text-sm text-gray-600">100% satisfaction promise</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-blue-50">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 border-blue-200 text-blue-700 mb-4">
              Popular Services
            </Badge>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Browse by Category</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the right professional for your needs from our most requested service categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {serviceCategories.filter(cat => cat.featured).map((category, index) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg bg-white border-blue-100 group hover:border-blue-300 ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500 border-blue-500' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-4xl">{category.icon}</div>
                    <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                      {category.count}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors text-lg">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
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
            <Button variant="outline" size="lg" onClick={() => onRoleSelect('user')} className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Search className="h-4 w-4 mr-2" />
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 border-blue-200 text-blue-700 mb-4">
              Why ProConnect?
            </Badge>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Built for trust and convenience</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've created the safest and easiest way to connect with top-rated local professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group animate-fade-in bg-white rounded-2xl p-8 border border-blue-50 hover:border-blue-200 hover:shadow-lg transition-all"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6">
                  <div className="p-4 rounded-xl w-fit bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 border-blue-200 text-blue-700 mb-4">
              <Heart className="h-3 w-3 mr-1" />
              Customer Stories
            </Badge>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">What our community says</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-white/20 border-white/30 text-white backdrop-blur-sm">
              <Zap className="h-3 w-3 mr-1" />
              Get started in under 2 minutes
            </Badge>
            
            <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Your next great service experience
              <span className="block text-blue-200">starts here</span>
            </h3>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands who trust ProConnect for quality home services and professional opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                size="lg" 
                onClick={() => onRoleSelect('user')}
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all group px-8 py-4"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Services Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => onRoleSelect('professional')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4"
              >
                <Award className="h-5 w-5 mr-2" />
                Start Earning Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700">
                  <Network className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-gray-900 text-lg">ProConnect</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Connecting communities with trusted local service professionals nationwide.
              </p>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">For Customers</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Find Services</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">How It Works</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Safety & Trust</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Pricing</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">For Professionals</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Join as Pro</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Pro Resources</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Success Stories</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Support</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Company</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2024 ProConnect. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="h-4 w-4" />
              Available nationwide
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;