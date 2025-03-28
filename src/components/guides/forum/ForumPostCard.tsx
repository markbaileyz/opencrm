
import React from 'react';
import { ForumPost } from '@/types/forum';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, MessageCircle, Eye } from 'lucide-react';

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

export default ForumPostCard;
