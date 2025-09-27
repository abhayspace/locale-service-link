import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Menu, MoreVertical } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant: 'user' | 'professional' | 'secondary';
  };
  leftAction?: {
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    label?: string;
  };
  rightActions?: Array<{
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    label?: string;
    badge?: number;
  }>;
  className?: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  subtitle,
  badge,
  leftAction,
  rightActions = [],
  className,
}) => {
  return (
    <header className={cn(
      "sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border",
      "safe-area-pt-4 pt-2",
      className
    )}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {leftAction && (
            <Button
              variant="ghost"
              size="icon"
              onClick={leftAction.onClick}
              className="shrink-0 h-9 w-9"
              aria-label={leftAction.label}
            >
              <leftAction.icon className="h-5 w-5" />
            </Button>
          )}
          
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-bold text-foreground truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground truncate">
                  {subtitle}
                </p>
              )}
            </div>
            
            {badge && (
              <Badge variant={badge.variant} className="shrink-0">
                {badge.text}
              </Badge>
            )}
          </div>
        </div>

        {/* Right Actions */}
        {rightActions.length > 0 && (
          <div className="flex items-center gap-1 shrink-0">
            {rightActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={action.onClick}
                  className="relative h-9 w-9"
                  aria-label={action.label}
                >
                  <Icon className="h-5 w-5" />
                  {action.badge && action.badge > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs font-medium flex items-center justify-center min-w-[16px]"
                    >
                      {action.badge > 9 ? '9+' : action.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;