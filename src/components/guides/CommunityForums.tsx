
import React, { useState } from 'react';
import { useForums } from '@/hooks/useForums';
import { ForumPost } from '@/types/forum';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Search,
  ThumbsUp,
  Eye,
  MessageCircle,
  Bell,
  HelpCircle,
  Lightbulb,
  PlusCircle,
  Calendar,
  Filter
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'MessageSquare': <MessageSquare className="h-5 w-5" />,
  'Lightbulb': <Lightbulb className="h-5 w-5" />,
  'HelpCircle': <HelpCircle className="h-5 w-5" />,
  'Bell': <Bell className="h-5 w-5" />
};

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
  const [activeTab, setActiveTab] = useState('trending');

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
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
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search forum discussions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="mr-2">
                    {iconMap[category.icon]}
                  </div>
                  <div className="flex-1 text-left">
                    {category.name}
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {category.postsCount}
                  </Badge>
                </Button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-3">Forum Statistics</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-md p-3 text-center">
                  <div className="text-2xl font-bold">{posts.length}</div>
                  <div className="text-xs text-muted-foreground">Discussions</div>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <div className="text-2xl font-bold">79</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <div className="text-2xl font-bold">28</div>
                  <div className="text-xs text-muted-foreground">Solved</div>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <div className="text-2xl font-bold">13</div>
                  <div className="text-xs text-muted-foreground">Today</div>
                </div>
              </div>
            </div>
          </div>

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
        </div>
      </CardContent>
    </Card>
  );
};

interface ForumPostCardProps {
  post: ForumPost;
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="hover:bg-accent/10 transition-colors">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.authorAvatar} alt={post.authorName} />
            <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium line-clamp-1">{post.title}</h3>
              {post.isPinned && (
                <Badge variant="secondary" className="text-xs">Pinned</Badge>
              )}
              {post.isAnswered && (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                  Solved
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {post.content}
            </p>

            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0 h-5">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>Posted by {post.authorName}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {post.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {post.replies}
                </span>
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {post.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityForums;
