
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ForumCategory } from '@/types/forum';

interface ForumStatisticsProps {
  categories: ForumCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
  iconMap: Record<string, React.ReactNode>;
}

const ForumStatistics: React.FC<ForumStatisticsProps> = ({ 
  categories,
  selectedCategory,
  onCategorySelect,
  iconMap
}) => {
  return (
    <div className="md:col-span-1">
      <h3 className="font-medium mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onCategorySelect(category.id)}
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
            <div className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.postsCount, 0)}</div>
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
  );
};

export default ForumStatistics;
