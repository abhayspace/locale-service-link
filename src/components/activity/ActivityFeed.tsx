import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Calendar, 
  CheckCircle, 
  MessageCircle, 
  User, 
  Star,
  Clock,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Activity {
  id: string;
  activity_type: string;
  title: string;
  description: string | null;
  metadata: any;
  read_at: string | null;
  created_at: string;
}

interface ActivityFeedProps {
  className?: string;
}

const getActivityIcon = (activityType: string) => {
  switch (activityType) {
    case 'booking_created':
      return Calendar;
    case 'booking_accepted':
      return CheckCircle;
    case 'booking_completed':
      return CheckCircle;
    case 'message_received':
      return MessageCircle;
    case 'profile_updated':
      return User;
    case 'review_received':
      return Star;
    default:
      return AlertCircle;
  }
};

const getActivityColor = (activityType: string) => {
  switch (activityType) {
    case 'booking_created':
      return 'text-primary';
    case 'booking_accepted':
      return 'text-success';
    case 'booking_completed':
      return 'text-success';
    case 'message_received':
      return 'text-accent';
    case 'profile_updated':
      return 'text-warning';
    case 'review_received':
      return 'text-warning';
    default:
      return 'text-muted-foreground';
  }
};

const getActivityBadgeVariant = (activityType: string) => {
  switch (activityType) {
    case 'booking_created':
      return 'secondary';
    case 'booking_accepted':
    case 'booking_completed':
      return 'success' as any;
    case 'message_received':
      return 'secondary';
    case 'profile_updated':
      return 'secondary';
    case 'review_received':
      return 'secondary';
    default:
      return 'secondary';
  }
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ className }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadActivities();
    
    // Subscribe to new activities
    const channel = supabase
      .channel('activities-feed')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activities',
        },
        (payload) => {
          const newActivity = payload.new as Activity;
          setActivities(prev => [newActivity, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadActivities = async () => {
    try {
      const { data: currentUser } = await supabase.auth.getUser();
      if (!currentUser.user) return;

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', currentUser.user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
      toast({
        title: "Error",
        description: "Failed to load activities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (activityId: string) => {
    try {
      const { error } = await supabase
        .from('activities')
        .update({ read_at: new Date().toISOString() })
        .eq('id', activityId);

      if (error) throw error;

      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityId 
            ? { ...activity, read_at: new Date().toISOString() }
            : activity
        )
      );
    } catch (error) {
      console.error('Error marking activity as read:', error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[1, 2, 3, 4, 5].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
        <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No activity yet
        </h3>
        <p className="text-muted-foreground">
          Your recent activity will appear here
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="space-y-3 p-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.activity_type);
          const isUnread = !activity.read_at;
          
          return (
            <Card
              key={activity.id}
              className={cn(
                "cursor-pointer hover:shadow-medium transition-shadow",
                isUnread && "border-primary/50 bg-primary/5"
              )}
              onClick={() => isUnread && markAsRead(activity.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-full shrink-0",
                    isUnread ? "bg-primary/10" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "h-5 w-5",
                      isUnread ? "text-primary" : getActivityColor(activity.activity_type)
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={cn(
                        "font-medium truncate",
                        isUnread ? "text-foreground font-semibold" : "text-foreground"
                      )}>
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        {isUnread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(activity.created_at)}
                        </span>
                      </div>
                    </div>
                    
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.description}
                      </p>
                    )}
                    
                    <Badge 
                      variant={getActivityBadgeVariant(activity.activity_type)}
                      className="text-xs"
                    >
                      {activity.activity_type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default ActivityFeed;