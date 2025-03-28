
import { useState, useEffect } from 'react';
import { ForumPost, ForumCategory, ForumComment } from '@/types/forum';

// Sample data - in a real app, this would come from an API
const sampleCategories: ForumCategory[] = [
  {
    id: '1',
    name: 'General Discussion',
    description: 'General topics related to the healthcare application',
    icon: 'MessageSquare',
    postsCount: 24
  },
  {
    id: '2',
    name: 'Feature Requests',
    description: 'Suggest and discuss new features',
    icon: 'Lightbulb',
    postsCount: 15
  },
  {
    id: '3',
    name: 'Help & Support',
    description: 'Get help with using the application',
    icon: 'HelpCircle',
    postsCount: 32
  },
  {
    id: '4',
    name: 'Announcements',
    description: 'Official announcements about updates and changes',
    icon: 'Bell',
    postsCount: 8
  }
];

const samplePosts: ForumPost[] = [
  {
    id: '1',
    title: 'How to customize the dashboard for different roles',
    content: 'I\'m trying to set up custom dashboards for different staff roles. Has anyone done this successfully?',
    authorId: 'user1',
    authorName: 'Sarah Johnson',
    authorAvatar: '/placeholder.svg',
    createdAt: '2023-10-28T14:48:00Z',
    updatedAt: '2023-10-28T14:48:00Z',
    likes: 12,
    replies: 5,
    views: 230,
    tags: ['dashboard', 'customization', 'roles'],
    isPinned: false,
    isAnswered: true,
    category: '1'
  },
  {
    id: '2',
    title: 'Feature request: Integration with lab systems',
    content: 'It would be great if we could integrate directly with lab systems to import test results automatically.',
    authorId: 'user2',
    authorName: 'Michael Chen',
    authorAvatar: '/placeholder.svg',
    createdAt: '2023-10-25T09:22:00Z',
    updatedAt: '2023-10-25T09:22:00Z',
    likes: 34,
    replies: 8,
    views: 412,
    tags: ['integration', 'labs', 'feature-request'],
    isPinned: true,
    isAnswered: false,
    category: '2'
  },
  {
    id: '3',
    title: 'How to use the new health tracker with patients',
    content: 'The new health tracker feature looks great, but I\'m not sure how to get patients to use it effectively. Any tips?',
    authorId: 'user3',
    authorName: 'Lisa Rodriguez',
    authorAvatar: '/placeholder.svg',
    createdAt: '2023-10-22T16:35:00Z',
    updatedAt: '2023-10-22T16:35:00Z',
    likes: 18,
    replies: 12,
    views: 356,
    tags: ['health-tracker', 'patients', 'best-practices'],
    isPinned: false,
    isAnswered: true,
    category: '3'
  },
  {
    id: '4',
    title: 'Office management staff scheduling problem',
    content: 'I\'m having an issue with the staff scheduling feature in the office management module. When I try to assign multiple staff to the same time slot, it\'s not working correctly.',
    authorId: 'user4',
    authorName: 'Robert Williams',
    authorAvatar: '/placeholder.svg',
    createdAt: '2023-10-20T11:12:00Z',
    updatedAt: '2023-10-20T11:12:00Z',
    likes: 7,
    replies: 3,
    views: 180,
    tags: ['office-management', 'scheduling', 'bug'],
    isPinned: false,
    isAnswered: false,
    category: '3'
  },
];

const sampleComments: ForumComment[] = [
  {
    id: '1',
    postId: '1',
    content: 'You can set this up in Settings > User Roles. Each role can have a custom dashboard layout.',
    authorId: 'admin1',
    authorName: 'Admin User',
    authorAvatar: '/placeholder.svg',
    createdAt: '2023-10-28T15:20:00Z',
    likes: 8,
    isAnswer: true
  },
  {
    id: '2',
    postId: '1',
    content: 'Thanks! That worked perfectly for me.',
    authorId: 'user1',
    authorName: 'Sarah Johnson',
    authorAvatar: '/placeholder.svg',
    createdAt: '2023-10-28T16:05:00Z',
    likes: 3,
    isAnswer: false
  }
];

export const useForums = () => {
  const [categories, setCategories] = useState<ForumCategory[]>(sampleCategories);
  const [posts, setPosts] = useState<ForumPost[]>(samplePosts);
  const [comments, setComments] = useState<ForumComment[]>(sampleComments);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Get comments for a specific post
  const getPostComments = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  return {
    categories,
    posts: filteredPosts,
    comments,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    getPostComments
  };
};
