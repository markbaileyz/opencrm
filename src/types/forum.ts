
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  replies: number;
  views: number;
  tags: string[];
  isPinned: boolean;
  isAnswered: boolean;
  category: string;
}

export interface ForumComment {
  id: string;
  postId: string;
  parentId?: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  likes: number;
  isAnswer: boolean;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  postsCount: number;
}
