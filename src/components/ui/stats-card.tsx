import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  variant?: 'default' | 'success' | 'warning' | 'premium';
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'success-card text-white';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'premium':
        return 'premium-card text-white';
      default:
        return 'mobile-card';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'success':
        return 'text-white/90';
      case 'warning':
        return 'text-warning';
      case 'premium':
        return 'text-white/90';
      default:
        return 'text-primary';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success':
      case 'premium':
        return 'text-white';
      default:
        return 'text-foreground';
    }
  };

  const getSubtitleColor = () => {
    switch (variant) {
      case 'success':
      case 'premium':
        return 'text-white/80';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn(getVariantClasses(), className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className={cn("text-sm font-medium", getSubtitleColor())}>
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <span className={cn("text-2xl font-bold", getTextColor())}>
                {value}
              </span>
              {trend && (
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? 'text-success' : 'text-destructive',
                  (variant === 'success' || variant === 'premium') && 'text-white/90'
                )}>
                  {trend.isPositive ? '+' : ''}{trend.value}% {trend.period}
                </span>
              )}
            </div>
            {subtitle && (
              <p className={cn("text-xs", getSubtitleColor())}>
                {subtitle}
              </p>
            )}
          </div>
          
          {Icon && (
            <div className={cn(
              "p-2 rounded-lg",
              variant === 'success' && "bg-white/20",
              variant === 'premium' && "bg-white/20",
              variant === 'warning' && "bg-warning/10",
              variant === 'default' && "bg-primary/10"
            )}>
              <Icon className={cn("h-6 w-6", getIconColor())} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};