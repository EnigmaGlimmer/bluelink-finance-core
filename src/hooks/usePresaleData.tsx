
import { useState, useEffect } from 'react';

interface PresaleData {
  endDate?: string;
  phase?: string;
  price?: string;
  target?: string;
  raised?: string;
}

export const usePresaleData = () => {
  const [data, setData] = useState<PresaleData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresaleData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxe9HC6oU4byPzHJax8LAsU2Eh0TmREKW7kL5i7ZSUfrTfyvQedNOsXc4gKl0YCM2USzA/exec'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch presale data');
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching presale data:', err);
        setError('Failed to load presale data');
      } finally {
        setLoading(false);
      }
    };

    fetchPresaleData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchPresaleData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
