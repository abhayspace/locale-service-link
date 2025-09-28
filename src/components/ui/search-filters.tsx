import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X, MapPin, DollarSign, Star, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  onFiltersChange?: (filters: SearchFilters) => void;
  onSearch?: (query: string) => void;
  className?: string;
}

export interface SearchFilters {
  query: string;
  serviceType: string;
  location: string;
  priceRange: [number, number];
  minRating: number;
  availability: string;
  skills: string[];
}

const serviceTypes = [
  'All Services',
  'Electrician',
  'Plumber',
  'Tutor',
  'Carpenter',
  'House Cleaning',
  'Painter',
  'Mechanic',
  'Gardener',
  'Handyman'
];

const commonSkills = [
  'Wiring', 'Plumbing', 'Math', 'English', 'Carpentry', 'Painting', 
  'Cleaning', 'Repair', 'Installation', 'Maintenance'
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onFiltersChange,
  onSearch,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    serviceType: 'All Services',
    location: '',
    priceRange: [0, 200],
    minRating: 0,
    availability: 'any',
    skills: []
  });

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill) 
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    handleFilterChange('skills', newSkills);
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: '',
      serviceType: 'All Services',
      location: '',
      priceRange: [0, 200],
      minRating: 0,
      availability: 'any',
      skills: []
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const activeFilterCount = [
    filters.serviceType !== 'All Services' ? 1 : 0,
    filters.location ? 1 : 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? 1 : 0,
    filters.minRating > 0 ? 1 : 0,
    filters.availability !== 'any' ? 1 : 0,
    filters.skills.length
  ].reduce((sum, count) => sum + count, 0);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <Card className="mobile-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search professionals or services..."
              value={filters.query}
              onChange={(e) => {
                handleFilterChange('query', e.target.value);
                onSearch?.(e.target.value);
              }}
              className="pl-10 rounded-full"
            />
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mobile-button"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expanded Filters */}
      {isExpanded && (
        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Search Filters
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Service Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Service Type</Label>
              <Select
                value={filters.serviceType}
                onValueChange={(value) => handleFilterChange('serviceType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter city or area"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Hourly Rate: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </Label>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange('priceRange', value)}
                  max={200}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Minimum Rating</Label>
              <div className="flex gap-2">
                {[0, 3, 4, 4.5, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={filters.minRating === rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('minRating', rating)}
                    className="flex-1"
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </Button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Availability</Label>
              <Select
                value={filters.availability}
                onValueChange={(value) => handleFilterChange('availability', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="today">Available today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="weekend">Weekends</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Skills</Label>
              <div className="flex flex-wrap gap-2">
                {commonSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={filters.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                    {filters.skills.includes(skill) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};