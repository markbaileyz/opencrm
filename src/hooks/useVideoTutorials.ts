
import { useState, useEffect } from 'react';

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  duration: string; // Format: "5:30"
  publishedAt: string; // ISO date string
  url?: string;
}

// Sample video tutorial data
const sampleTutorials: VideoTutorial[] = [
  {
    id: '1',
    title: 'Getting Started with the Dashboard',
    description: 'Learn how to navigate and use the main dashboard features effectively.',
    thumbnail: '/placeholder.svg',
    category: 'Basics',
    duration: '4:30',
    publishedAt: '2023-06-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Advanced Contact Management',
    description: 'Discover advanced techniques for organizing and managing your contacts.',
    thumbnail: '/placeholder.svg',
    category: 'Contacts',
    duration: '7:45',
    publishedAt: '2023-07-22T14:15:00Z'
  },
  {
    id: '3',
    title: 'Creating Custom Reports',
    description: 'Step-by-step guide on building and customizing reports for your business needs.',
    thumbnail: '/placeholder.svg',
    category: 'Analytics',
    duration: '10:20',
    publishedAt: '2023-08-05T09:00:00Z'
  },
  {
    id: '4',
    title: 'Setting Up Email Templates',
    description: 'Learn how to create and use email templates for consistent communication.',
    thumbnail: '/placeholder.svg',
    category: 'Communication',
    duration: '6:15',
    publishedAt: '2023-09-18T16:45:00Z'
  },
  {
    id: '5',
    title: 'Mobile App Features Overview',
    description: 'Explore the key features available in the mobile application.',
    thumbnail: '/placeholder.svg',
    category: 'Mobile',
    duration: '8:30',
    publishedAt: '2023-10-10T11:20:00Z'
  },
  {
    id: '6',
    title: 'Deal Pipeline Configuration',
    description: 'Configure your sales pipeline for maximum efficiency and visibility.',
    thumbnail: '/placeholder.svg',
    category: 'Sales',
    duration: '9:45',
    publishedAt: '2023-11-05T13:10:00Z'
  }
];

export const useVideoTutorials = () => {
  const [tutorials, setTutorials] = useState<VideoTutorial[]>(sampleTutorials);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract unique categories from tutorials
  const categories = Array.from(new Set(tutorials.map(tutorial => tutorial.category)));

  // In a real app, you might fetch tutorials from an API
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      setTutorials(sampleTutorials);
      setLoading(false);
    }, 500);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return {
    tutorials,
    loading,
    error,
    categories
  };
};
