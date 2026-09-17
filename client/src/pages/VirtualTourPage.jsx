import React, { useState, useEffect } from 'react';
import { VirtualTourViewer } from '../components/VirtualTourViewer';
import { Eye, Sparkles, Compass, MapPin } from 'lucide-react';
import { api } from '../services/api';

export const VirtualTourPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await api.getVirtualTours();
        setTours(data || []);
      } catch (err) {
        console.error("Error fetching virtual tours:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-[#030c1b] pt-24 pb-20">
      <VirtualTourViewer tours={tours} />
    </div>
  );
};
