import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Users, 
  Award,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  CheckCircle,
  Zap,
  Calendar,
  CreditCard
} from 'lucide-react';

interface LandingProps {
  onRoleSelect: (role: 'user' | 'professional') => void;
}

const Landing: React.FC<LandingProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">ProConnect</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with trusted local professionals or offer your services to customers in your area
          </p>
        </header>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onRoleSelect('user')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Find Services</CardTitle>
              <CardDescription className="text-base">
                Browse and book trusted local professionals for your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Verified professionals</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Real reviews & ratings</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Secure booking & payment</span>
                </li>
              </ul>
              <Button className="w-full" size="lg">
                Get Started as Customer
              </Button>
            </CardContent>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onRoleSelect('professional')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Offer Services</CardTitle>
              <CardDescription className="text-base">
                Join our network and start earning from your professional skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span>Flexible scheduling</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span>Guaranteed payments</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span>Build your reputation</span>
                </li>
              </ul>
              <Button variant="secondary" className="w-full" size="lg">
                Join as Professional
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose ProConnect?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We make it easy to find trusted professionals or grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted & Verified</h3>
            <p className="text-muted-foreground">All professionals are background checked and verified</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
            <p className="text-muted-foreground">Book services or find customers in just a few clicks</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-muted-foreground">Safe and secure payment processing for all transactions</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Button variant="ghost" size="icon">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            © 2024 ProConnect. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;