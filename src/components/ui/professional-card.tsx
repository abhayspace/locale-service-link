import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, MessageCircle, Calendar, Eye } from 'lucide-react';
import { Professional } from '@/hooks/useProfessionals';
import { cn } from '@/lib/utils';

interface ProfessionalCardProps {
  professional: Professional;
  onMessage?: (professionalId: string) => void;
  onBook?: (professionalId: string) => void;
  onViewProfile?: (professionalId: string) => void;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  onMessage,
  onBook,
  onViewProfile,
  variant = 'default',
  className
}) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <Card className={cn(
      "mobile-card transition-all duration-300 hover:shadow-medium group",
      isFeatured && "premium-card text-white",
      className
    )}>
      <CardContent className={cn("p-4", isCompact && "p-3")}>
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {professional.avatar_url ? (
              <img 
                src={professional.avatar_url} 
                alt={professional.full_name || 'Professional'} 
                className={cn(
                  "rounded-full object-cover border-2",
                  isCompact ? "w-12 h-12" : "w-16 h-16",
                  isFeatured ? "border-white/20" : "border-primary/20"
                )}
              />
            ) : (
              <div className={cn(
                "rounded-full flex items-center justify-center font-semibold",
                isCompact ? "w-12 h-12 text-lg" : "w-16 h-16 text-xl",
                isFeatured ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
              )}>
                {professional.full_name?.charAt(0) || '?'}
              </div>
            )}
            
            {/* Online Status */}
            <div className={cn(
              "absolute -bottom-1 -right-1 rounded-full border-2",
              isCompact ? "w-4 h-4" : "w-5 h-5",
              isFeatured ? "bg-white border-white/20" : "bg-success border-card"
            )} />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className={cn(
                  "font-semibold truncate",
                  isCompact ? "text-sm" : "text-base",
                  isFeatured ? "text-white" : "text-foreground"
                )}>
                  {professional.full_name}
                </h3>
                <p className={cn(
                  "font-medium truncate",
                  isCompact ? "text-xs" : "text-sm",
                  isFeatured ? "text-white/90" : "text-primary"
                )}>
                  {professional.service_type}
                </p>
              </div>
              
              {/* Price */}
              <div className="text-right flex-shrink-0">
                <div className={cn(
                  "font-bold",
                  isCompact ? "text-sm" : "text-lg",
                  isFeatured ? "text-white" : "text-foreground"
                )}>
                  ${professional.hourly_rate || 0}
                </div>
                <div className={cn(
                  isCompact ? "text-xs" : "text-xs",
                  isFeatured ? "text-white/70" : "text-muted-foreground"
                )}>
                  per hour
                </div>
              </div>
            </div>

            {/* Rating & Location */}
            <div className={cn(
              "flex items-center gap-4",
              isCompact ? "text-xs" : "text-sm",
              isFeatured ? "text-white/80" : "text-muted-foreground"
            )}>
              <div className="flex items-center gap-1">
                <Star className={cn(
                  "fill-current",
                  isCompact ? "h-3 w-3" : "h-4 w-4",
                  isFeatured ? "text-yellow-300" : "text-yellow-400"
                )} />
                <span className="font-medium">{professional.rating || 0}</span>
                <span>({professional.total_jobs || 0})</span>
              </div>
              
              <div className="flex items-center gap-1 min-w-0">
                <MapPin className={cn(
                  isCompact ? "h-3 w-3" : "h-4 w-4",
                  "flex-shrink-0"
                )} />
                <span className="truncate">
                  {professional.location || 'Location not specified'}
                </span>
              </div>
            </div>

            {/* Skills */}
            {!isCompact && professional.skills && professional.skills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {professional.skills.slice(0, 3).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant={isFeatured ? "secondary" : "outline"} 
                    className={cn(
                      "text-xs px-2 py-0.5",
                      isFeatured && "bg-white/20 text-white border-white/30"
                    )}
                  >
                    {skill}
                  </Badge>
                ))}
                {professional.skills.length > 3 && (
                  <Badge 
                    variant={isFeatured ? "secondary" : "outline"} 
                    className={cn(
                      "text-xs px-2 py-0.5",
                      isFeatured && "bg-white/20 text-white border-white/30"
                    )}
                  >
                    +{professional.skills.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Bio */}
            {!isCompact && professional.bio && (
              <p className={cn(
                "text-sm line-clamp-2",
                isFeatured ? "text-white/80" : "text-muted-foreground"
              )}>
                {professional.bio}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button 
                size={isCompact ? "sm" : "default"}
                className={cn(
                  "mobile-button flex-1",
                  isFeatured && "bg-white text-black hover:bg-white/90"
                )}
                onClick={() => onBook?.(professional.id)}
              >
                <Calendar className={cn(
                  "mr-2",
                  isCompact ? "h-3 w-3" : "h-4 w-4"
                )} />
                Book Now
              </Button>
              
              <Button 
                variant={isFeatured ? "secondary" : "outline"}
                size={isCompact ? "sm" : "default"}
                className={cn(
                  "mobile-button",
                  isFeatured && "bg-white/20 text-white border-white/30 hover:bg-white/30"
                )}
                onClick={() => onMessage?.(professional.id)}
              >
                <MessageCircle className={cn(
                  isCompact ? "h-3 w-3" : "h-4 w-4"
                )} />
              </Button>
              
              <Button 
                variant={isFeatured ? "secondary" : "outline"}
                size={isCompact ? "sm" : "default"}
                className={cn(
                  "mobile-button",
                  isFeatured && "bg-white/20 text-white border-white/30 hover:bg-white/30"
                )}
                onClick={() => onViewProfile?.(professional.id)}
              >
                <Eye className={cn(
                  isCompact ? "h-3 w-3" : "h-4 w-4"
                )} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};