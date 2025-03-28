
import React from 'react';
import { useForums } from '@/hooks/useForums';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Lightbulb, HelpCircle, Bell } from 'lucide-react';
import ForumSearch from './forum/ForumSearch';
import ForumStatistics from './forum/ForumStatistics';
import ForumPostList from './forum/ForumPostList';

const CommunityForums: React.FC = () => {
  const { 
    categories, 
    posts, 
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useForums();

  const iconMap: Record<string, React.ReactNode> = {
    'MessageSquare': <MessageSquare className="h-5 w-5" />,
    'Lightbulb': <Lightbulb className="h-5 w-5" />,
    'HelpCircle': <HelpCircle className="h-5 w-5" />,
    'Bell': <Bell className="h-5 w-5" />
  };

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <MessageSquare className="mr-2 h-5 w-5 text-primary" />
          Community Forums
        </CardTitle>
        <CardDescription>
          Connect with other users, ask questions, and share your knowledge
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForumSearch 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ForumStatistics 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            iconMap={iconMap}
          />
          <ForumPostList 
            posts={posts}
            loading={loading}
            searchQuery={searchQuery}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityForums;
