import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, User, MessageCircle, Star, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Booking {
  id: string;
  user_id: string;
  professional_id: string;
  service_type: string;
  location: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price?: number;
  notes?: string;
  description?: string;
  professional_name?: string;
  customer_name?: string;
  professional_avatar?: string;
  created_at: string;
}

interface BookingCardProps {
  booking: Booking;
  userRole?: 'user' | 'professional';
  onMessage?: (bookingId: string) => void;
  onCall?: (bookingId: string) => void;
  onCancel?: (bookingId: string) => void;
  onComplete?: (bookingId: string) => void;
  onRate?: (bookingId: string) => void;
  onAccept?: (bookingId: string) => void;
  onReject?: (bookingId: string) => void;
  className?: string;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  userRole = 'user',
  onMessage,
  onCall,
  onCancel,
  onComplete,
  onRate,
  onAccept,
  onReject,
  className
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-warning/10 text-warning border-warning/20',
          icon: Clock,
          label: 'Pending'
        };
      case 'confirmed':
        return {
          color: 'bg-success/10 text-success border-success/20',
          icon: CheckCircle,
          label: 'Confirmed'
        };
      case 'completed':
        return {
          color: 'bg-primary/10 text-primary border-primary/20',
          icon: CheckCircle,
          label: 'Completed'
        };
      case 'cancelled':
        return {
          color: 'bg-destructive/10 text-destructive border-destructive/20',
          icon: XCircle,
          label: 'Cancelled'
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground',
          icon: Clock,
          label: status
        };
    }
  };

  const statusConfig = getStatusConfig(booking.status);
  const StatusIcon = statusConfig.icon;
  
  const otherPersonName = userRole === 'user' ? booking.professional_name : booking.customer_name;
  const isUpcoming = new Date(booking.scheduled_date) > new Date();
  const isPending = booking.status === 'pending';
  const isCompleted = booking.status === 'completed';

  return (
    <Card className={cn(
      "mobile-card transition-all duration-300 hover:shadow-medium",
      isPending && "border-l-4 border-l-warning",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base line-clamp-1">
              {booking.service_type}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User className="h-3 w-3" />
                <span className="truncate">
                  {userRole === 'user' ? 'with' : 'for'} {otherPersonName || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
          
          <Badge className={cn("text-xs", statusConfig.color)}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        {booking.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {booking.description}
          </p>
        )}

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>{new Date(booking.scheduled_date).toLocaleDateString()} at {booking.scheduled_time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{booking.location}</span>
          </div>

          {booking.price && (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">${booking.price}</span>
            </div>
          )}
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="p-2 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Notes:</p>
            <p className="text-sm">{booking.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {/* Pending actions for professionals */}
          {userRole === 'professional' && isPending && (
            <>
              <Button 
                size="sm"
                className="mobile-button flex-1"
                onClick={() => onAccept?.(booking.id)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="mobile-button flex-1"
                onClick={() => onReject?.(booking.id)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline
              </Button>
            </>
          )}

          {/* Confirmed booking actions */}
          {booking.status === 'confirmed' && (
            <>
              <Button 
                variant="outline"
                size="sm"
                className="mobile-button flex-1"
                onClick={() => onMessage?.(booking.id)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              
              {userRole === 'professional' && isUpcoming && (
                <Button 
                  size="sm"
                  className="mobile-button"
                  onClick={() => onComplete?.(booking.id)}
                >
                  Complete
                </Button>
              )}
            </>
          )}

          {/* Completed booking actions */}
          {isCompleted && userRole === 'user' && (
            <Button 
              variant="outline"
              size="sm"
              className="mobile-button flex-1"
              onClick={() => onRate?.(booking.id)}
            >
              <Star className="h-4 w-4 mr-2" />
              Rate Service
            </Button>
          )}

          {/* Common actions */}
          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
            <Button 
              variant="outline"
              size="sm"
              className="mobile-button"
              onClick={() => onCancel?.(booking.id)}
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Booking date */}
        <div className="text-xs text-muted-foreground border-t border-border/50 pt-2">
          Booked {new Date(booking.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};