import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
}

interface GeolocationState {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: true,
    error: null,
  });

  const getCurrentLocation = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        location: null,
        loading: false,
        error: 'Geolocation is not supported by this browser.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Try to get city name from coordinates using a reverse geocoding API
          // For demo purposes, we'll use a mock location
          const locationData: LocationData = {
            latitude,
            longitude,
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
          };

          setState({
            location: locationData,
            loading: false,
            error: null,
          });
        } catch (error) {
          setState({
            location: {
              latitude,
              longitude,
              city: 'San Francisco',
              state: 'CA',
              country: 'USA',
            },
            loading: false,
            error: null,
          });
        }
      },
      (error) => {
        let errorMessage = 'An error occurred while retrieving location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }

        // Fallback to default location
        setState({
          location: {
            latitude: 37.7749,
            longitude: -122.4194,
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
          },
          loading: false,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    ...state,
    refetch: getCurrentLocation,
  };
};