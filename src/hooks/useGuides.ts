
import { useState, useEffect } from 'react';
import { Guide } from '@/types/guide';

// Sample guide data
const sampleGuides: Guide[] = [
  {
    id: '1',
    title: 'Getting Started with Organization Profiles',
    description: 'Learn how to set up comprehensive organization profiles with all essential information.',
    category: 'Organizations',
    difficulty: 'Beginner',
    estimatedTime: '5 min',
    coverImage: '/placeholder.svg',
    steps: [
      {
        title: 'Navigate to Organizations',
        content: 'From the main dashboard, locate and click on the "Organizations" section in the left sidebar menu.',
        image: '/placeholder.svg'
      },
      {
        title: 'Create a New Organization',
        content: 'Click the "+ New Organization" button in the top right corner to open the creation form.',
        image: '/placeholder.svg'
      },
      {
        title: 'Fill Organization Details',
        content: 'Enter the organization name, type, contact information, and other essential details.',
        image: '/placeholder.svg'
      },
      {
        title: 'Add Contacts and Relationships',
        content: 'In the organization detail view, navigate to the Contacts tab to add key contacts.',
        image: '/placeholder.svg'
      },
      {
        title: 'Review and Update',
        content: 'Regularly review organization profiles to ensure information remains current and accurate.',
        image: '/placeholder.svg'
      }
    ]
  },
  {
    id: '2',
    title: 'Setting Up Email Templates',
    description: 'Create professional email templates for consistent customer communication.',
    category: 'Communication',
    difficulty: 'Intermediate',
    estimatedTime: '10 min',
    coverImage: '/placeholder.svg',
    steps: [
      {
        title: 'Access Email Settings',
        content: 'Navigate to Settings > Communication > Email Templates from the main dashboard.',
        image: '/placeholder.svg'
      },
      {
        title: 'Create a New Template',
        content: 'Click "Create Template" and select the appropriate category for your new template.',
        image: '/placeholder.svg'
      },
      {
        title: 'Design Your Template',
        content: 'Use the rich text editor to design your email template. Add placeholders for dynamic content using the {{placeholder}} syntax.',
        image: '/placeholder.svg'
      },
      {
        title: 'Test Your Template',
        content: 'Use the preview function to see how your template looks, and send a test email to verify formatting.',
        image: '/placeholder.svg'
      },
      {
        title: 'Save and Categorize',
        content: 'Save your template with an appropriate name and assign it to relevant categories for easy access.',
        image: '/placeholder.svg'
      }
    ]
  },
  {
    id: '3',
    title: 'Advanced Deal Pipeline Configuration',
    description: 'Configure custom deal stages and probability scores for accurate forecasting.',
    category: 'Sales',
    difficulty: 'Advanced',
    estimatedTime: '15 min',
    coverImage: '/placeholder.svg',
    steps: [
      {
        title: 'Access Pipeline Settings',
        content: 'Navigate to Settings > Sales > Pipeline Configuration to begin customizing your sales pipeline.',
        image: '/placeholder.svg'
      },
      {
        title: 'Configure Deal Stages',
        content: 'Define the stages that deals progress through in your sales process. Click "Add Stage" to create new stages.',
        image: '/placeholder.svg'
      },
      {
        title: 'Set Win Probabilities',
        content: 'For each stage, set the probability percentage that represents likelihood of closing deals at that stage.',
        image: '/placeholder.svg'
      },
      {
        title: 'Define Stage Requirements',
        content: 'Establish criteria that must be met before a deal can move to the next stage in the pipeline.',
        image: '/placeholder.svg'
      },
      {
        title: 'Set Up Automation Rules',
        content: 'Create automation rules to move deals through stages based on specific actions or time-based triggers.',
        image: '/placeholder.svg'
      },
      {
        title: 'Test Your Configuration',
        content: 'Create a test deal and move it through the pipeline to ensure your configuration works as expected.',
        image: '/placeholder.svg'
      }
    ]
  },
  {
    id: '4',
    title: 'Creating Interactive Reports',
    description: 'Build customized, interactive reports to visualize your CRM data.',
    category: 'Analytics',
    difficulty: 'Intermediate',
    estimatedTime: '12 min',
    coverImage: '/placeholder.svg',
    steps: [
      {
        title: 'Navigate to Reports',
        content: 'From the dashboard, click on "Reports" in the main navigation menu.',
        image: '/placeholder.svg'
      },
      {
        title: 'Create a New Report',
        content: 'Click "New Report" and select the data type you want to analyze (Contacts, Deals, Organizations, etc.).',
        image: '/placeholder.svg'
      },
      {
        title: 'Select Report Type',
        content: 'Choose from available report types: tabular, summary, matrix, or visualization.',
        image: '/placeholder.svg'
      },
      {
        title: 'Configure Data Fields',
        content: 'Select the fields you want to include in your report. Drag and drop to arrange them in the desired order.',
        image: '/placeholder.svg'
      },
      {
        title: 'Add Filters',
        content: 'Set up filters to narrow down the data shown in your report based on specific criteria.',
        image: '/placeholder.svg'
      },
      {
        title: 'Add Charts',
        content: 'Select appropriate visualizations like bar charts, pie charts, or line graphs to represent your data.',
        image: '/placeholder.svg'
      },
      {
        title: 'Save and Schedule',
        content: 'Save your report with a descriptive name and set up a schedule for automatic report generation if needed.',
        image: '/placeholder.svg'
      }
    ]
  },
  {
    id: '5',
    title: 'Mobile CRM Essentials',
    description: 'Learn how to effectively use the CRM on mobile devices for on-the-go productivity.',
    category: 'Mobile',
    difficulty: 'Beginner',
    estimatedTime: '7 min',
    coverImage: '/placeholder.svg',
    steps: [
      {
        title: 'Install the Mobile App',
        content: 'Download and install the CRM mobile app from the App Store or Google Play Store.',
        image: '/placeholder.svg'
      },
      {
        title: 'Log in and Set Up',
        content: 'Log in with your credentials and configure your notification preferences.',
        image: '/placeholder.svg'
      },
      {
        title: 'Navigate the Mobile Interface',
        content: 'Learn how to use the bottom navigation menu to access key sections of the CRM.',
        image: '/placeholder.svg'
      },
      {
        title: 'Quick Actions',
        content: 'Use the quick action button to create new records or log activities while on the go.',
        image: '/placeholder.svg'
      },
      {
        title: 'Offline Access',
        content: 'Configure offline access to ensure you can view critical information even without internet connection.',
        image: '/placeholder.svg'
      }
    ]
  }
];

export const useGuides = () => {
  const [guides, setGuides] = useState<Guide[]>(sampleGuides);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract unique categories from guides
  const categories = Array.from(new Set(guides.map(guide => guide.category)));
  
  // All difficulties
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  // In a real app, you might fetch guides from an API
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      setGuides(sampleGuides);
      setLoading(false);
    }, 500);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const getGuideById = (id: string) => {
    return guides.find(guide => guide.id === id) || null;
  };

  return {
    guides,
    loading,
    error,
    categories,
    difficulties,
    getGuideById
  };
};
