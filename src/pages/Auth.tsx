import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Wrench, Mail, Lock, Phone, Upload, X, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthProps {
  role: 'user' | 'professional';
  onBack: () => void;
  onAuthSuccess: (role: 'user' | 'professional') => void;
}

const Auth: React.FC<AuthProps> = ({ role, onBack, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    serviceType: '',
    bio: '',
    hourlyRate: '',
    skills: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });

        onAuthSuccess(role);
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.name,
              phone: formData.phone,
              user_type: role,
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          // Create profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              user_id: data.user.id,
              full_name: formData.name,
              phone: formData.phone,
              user_type: role,
            });

          if (profileError) throw profileError;

          // If professional, create professional profile and upload photos
          if (role === 'professional') {
            let photoUrls: string[] = [];

            // Upload photos if any
            if (uploadedPhotos.length > 0) {
              for (const photo of uploadedPhotos) {
                const fileExt = photo.name.split('.').pop();
                const fileName = `${data.user.id}/${Date.now()}.${fileExt}`;
                
                const { error: uploadError } = await supabase.storage
                  .from('professional-photos')
                  .upload(fileName, photo);

                if (!uploadError) {
                  const { data: urlData } = supabase.storage
                    .from('professional-photos')
                    .getPublicUrl(fileName);
                  photoUrls.push(urlData.publicUrl);
                }
              }
            }

            const { error: professionalError } = await supabase
              .from('professional_profiles')
              .insert({
                user_id: data.user.id,
                service_type: formData.serviceType,
                bio: formData.bio,
                hourly_rate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
                skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
                photos: photoUrls,
              });

            if (professionalError) throw professionalError;
          }

          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
          });

          onAuthSuccess(role);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (uploadedPhotos.length + newFiles.length > 5) {
        toast({
          title: "Too many photos",
          description: "You can upload a maximum of 5 photos.",
          variant: "destructive",
        });
        return;
      }
      setUploadedPhotos(prev => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
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

                {!isLogin && role === 'professional' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Input
                        id="serviceType"
                        placeholder="e.g., Electrician, Plumber, Tutor"
                        value={formData.serviceType}
                        onChange={(e) => handleInputChange('serviceType', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio (Optional)</Label>
                      <Input
                        id="bio"
                        placeholder="Brief description of your services"
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate (Optional)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="Enter your hourly rate"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (Optional)</Label>
                      <Input
                        id="skills"
                        placeholder="Comma-separated skills (e.g., electrical, plumbing)"
                        value={formData.skills}
                        onChange={(e) => handleInputChange('skills', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Photos (Optional - Max 5)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4">
                        <div className="text-center">
                          <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <Label htmlFor="photos" className="cursor-pointer">
                            <span className="text-sm text-primary hover:text-primary/80">
                              Click to upload photos
                            </span>
                            <Input
                              id="photos"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Upload photos of your work or profile (JPG, PNG)
                          </p>
                        </div>

                        {uploadedPhotos.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mt-4">
                            {uploadedPhotos.map((photo, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-20 object-cover rounded border"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute -top-2 -right-2 h-6 w-6 p-0"
                                  onClick={() => removePhoto(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
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
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
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