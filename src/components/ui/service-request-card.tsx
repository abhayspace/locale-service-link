import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, DollarSign, Clock, User, Zap, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceRequest {
  id: string;
  user_id: string;
  service_type: string;
  title: string;
  description?: string;
  location: string;
  budget_min?: number;
  budget_max?: number;
  preferred_date?: string;
  preferred_time?: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  customer_name?: string;
}

interface ServiceRequestCardProps {
  request: ServiceRequest;
  onRespond?: (requestId: string) => void;
  onViewDetails?: (requestId: string) => void;
  showActions?: boolean;
  className?: string;
}

export const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({
  request,
  onRespond,
  onViewDetails,
  showActions = true,
  className
}) => {
  const getUrgencyConfig = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return {
          color: 'bg-destructive/10 text-destructive border-destructive/20',
          icon: AlertTriangle,
          label: 'Urgent',
          borderColor: 'border-l-destructive'
        };
      case 'medium':
        return {
          color: 'bg-warning/10 text-warning border-warning/20',
          icon: Clock,
          label: 'Medium',
          borderColor: 'border-l-warning'
        };
      case 'low':
        return {
          color: 'bg-success/10 text-success border-success/20',
          icon: Clock,
          label: 'Low',
          borderColor: 'border-l-success'
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground',
          icon: Clock,
          label: urgency,
          borderColor: 'border-l-muted'
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'open':
        return {
          color: 'bg-primary/10 text-primary border-primary/20',
          label: 'Open'
        };
      case 'in_progress':
        return {
          color: 'bg-warning/10 text-warning border-warning/20',
          label: 'In Progress'
        };
      case 'completed':
        return {
          color: 'bg-success/10 text-success border-success/20',
          label: 'Completed'
        };
      case 'cancelled':
        return {
          color: 'bg-destructive/10 text-destructive border-destructive/20',
          label: 'Cancelled'
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground',
          label: status
        };
    }
  };

  const urgencyConfig = getUrgencyConfig(request.urgency);
  const statusConfig = getStatusConfig(request.status);
  const UrgencyIcon = urgencyConfig.icon;

  const formatBudget = () => {
    if (request.budget_min && request.budget_max) {
      return `$${request.budget_min} - $${request.budget_max}`;
    } else if (request.budget_min) {
      return `From $${request.budget_min}`;
    } else if (request.budget_max) {
      return `Up to $${request.budget_max}`;
    }
    return 'Budget negotiable';
  };

  return (
    <Card className={cn(
      "mobile-card border-l-4 transition-all duration-300 hover:shadow-medium",
      urgencyConfig.borderColor,
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base line-clamp-1">
              {request.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {request.service_type}
              </Badge>
              {request.customer_name && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  {request.customer_name}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <Badge className={cn("text-xs", statusConfig.color)}>
              {statusConfig.label}
            </Badge>
            <Badge className={cn("text-xs", urgencyConfig.color)}>
              <UrgencyIcon className="h-3 w-3 mr-1" />
              {urgencyConfig.label}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        {request.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {request.description}
          </p>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-2 text-sm">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{request.location}</span>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>{formatBudget()}</span>
          </div>

          {/* Preferred Date & Time */}
          {(request.preferred_date || request.preferred_time) && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>
                {request.preferred_date && new Date(request.preferred_date).toLocaleDateString()}
                {request.preferred_date && request.preferred_time && ' at '}
                {request.preferred_time}
              </span>
            </div>
          )}
        </div>

        {/* Posted Time */}
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-2">
          <span>Posted {new Date(request.created_at).toLocaleDateString()}</span>
          {request.urgency === 'high' && (
            <div className="flex items-center gap-1 text-destructive">
              <Zap className="h-3 w-3" />
              <span className="font-medium">Urgent</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {showActions && request.status === 'open' && (
          <div className="flex gap-2 pt-2">
            <Button 
              className="mobile-button flex-1"
              size="sm"
              onClick={() => onRespond?.(request.id)}
            >
              Send Quote
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="mobile-button"
              onClick={() => onViewDetails?.(request.id)}
            >
              Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};