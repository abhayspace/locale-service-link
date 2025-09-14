import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Wrench, Mail, Lock, Phone } from 'lucide-react';

interface AuthProps {
  role: 'user' | 'professional';
  onBack: () => void;
  onAuthSuccess: (role: 'user' | 'professional') => void;
}

const Auth: React.FC<AuthProps> = ({ role, onBack, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication with Supabase
    onAuthSuccess(role);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roleConfig = {
    user: {
      title: 'Customer',
      description: 'Book services from trusted professionals',
      icon: User,
      variant: 'user' as const,
      features: [
        'Browse local professionals',
        'Real-time chat with service providers',
        'Secure booking & payments',
        'Rate & review services'
      ]
    },
    professional: {
      title: 'Professional',
      description: 'Offer your services and grow your business',
      icon: Wrench,
      variant: 'professional' as const,
      features: [
        'Create detailed service profiles',
        'Receive booking requests',
        'Manage your schedule',
        'Build your reputation'
      ]
    }
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Role Info */}
        <div className="space-y-8 animate-fade-in-up">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${role === 'user' ? 'bg-user-badge/10' : 'bg-professional-badge/10'}`}>
                <Icon className={`h-8 w-8 ${role === 'user' ? 'text-user-badge' : 'text-professional-badge'}`} />
              </div>
              <div>
                <Badge variant={config.variant}>
                  {config.title}
                </Badge>
                <h1 className="text-4xl font-bold text-foreground mt-2">
                  Welcome {config.title}s
                </h1>
              </div>
            </div>

            <p className="text-xl text-muted-foreground">
              {config.description}
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">What you can do:</h3>
              <ul className="space-y-3">
                {config.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${role === 'user' ? 'bg-user-badge' : 'bg-professional-badge'}`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="animate-scale-in">
          <Card className="shadow-strong border-border/50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {isLogin ? 'Sign In' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin 
                  ? `Sign in to your ${config.title.toLowerCase()} account`
                  : `Create your ${config.title.toLowerCase()} account to get started`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant={config.variant}
                  className="w-full"
                  size="lg"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <Button
                    variant="link"
                    className="p-0 ml-1 h-auto font-normal"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </Button>
                </p>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;