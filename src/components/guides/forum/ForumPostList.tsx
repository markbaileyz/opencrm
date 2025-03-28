
import React from 'react';
import { ForumPost } from '@/types/forum';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, MessageSquare } from 'lucide-react';
import ForumPostCard from './ForumPostCard';

interface ForumPostListProps {
  posts: ForumPost[];
  loading: boolean;
  searchQuery: string;
}

const ForumPostList: React.FC<ForumPostListProps> = ({ posts, loading, searchQuery }) => {
  const [activeTab, setActiveTab] = React.useState('trending');

  return (
    <div className="md:col-span-3">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading forum posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-md">
                <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">No discussions found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery 
                    ? "No discussions match your search criteria"
                    : "Be the first to start a discussion in this category"
                  }
                </p>
              </div>
            ) : (
              posts.map(post => (
                <ForumPostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default ForumPostList;
