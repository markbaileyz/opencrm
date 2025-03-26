
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface EmailKeyboardShortcutsProps {
  isDetailView: boolean;
  onBackToList: () => void;
  onComposeNew: () => void;
  onReply?: () => void;
  onForward?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onRefresh?: () => void;
  onStar?: () => void;
  selectedId?: string;
}

export function useEmailKeyboardShortcuts({
  isDetailView,
  onBackToList,
  onComposeNew,
  onReply,
  onForward,
  onArchive,
  onDelete,
  onRefresh,
  onStar,
  selectedId
}: EmailKeyboardShortcutsProps) {
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Common shortcuts
      if (e.key === 'c') {
        onComposeNew();
        e.preventDefault();
        toast({
          description: "New email composition started",
          duration: 1500,
        });
      } else if (e.key === 'r' && !e.shiftKey && !isDetailView && onRefresh) {
        onRefresh();
        toast({
          description: "Refreshing emails",
          duration: 1500,
        });
        e.preventDefault();
      }

      // Detail view specific shortcuts
      if (isDetailView && selectedId) {
        if (e.key === 'Escape') {
          onBackToList();
          e.preventDefault();
        } else if (e.key === 'r' && !e.shiftKey && onReply) {
          onReply();
          toast({
            description: "Reply to email",
            duration: 1500,
          });
          e.preventDefault();
        } else if (e.key === 'f' && onForward) {
          onForward();
          toast({
            description: "Forward email",
            duration: 1500,
          });
          e.preventDefault();
        } else if (e.key === 'a' && onArchive) {
          onArchive();
          toast({
            description: "Email archived",
            duration: 1500,
          });
          e.preventDefault();
        } else if (e.key === 'd' && onDelete) {
          onDelete();
          toast({
            description: "Email deleted",
            duration: 1500,
          });
          e.preventDefault();
        } else if (e.key === 's' && onStar) {
          onStar();
          toast({
            description: "Email starred/unstarred",
            duration: 1500,
          });
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isDetailView,
    onBackToList,
    onComposeNew,
    onReply,
    onForward,
    onArchive,
    onDelete,
    onRefresh,
    onStar,
    selectedId,
    toast
  ]);

  // Return an array of available keyboard shortcuts for the current view
  return {
    availableShortcuts: isDetailView
      ? [
          { key: 'Esc', action: 'Back to list' },
          { key: 'r', action: 'Reply' },
          { key: 'f', action: 'Forward' },
          { key: 'a', action: 'Archive' },
          { key: 'd', action: 'Delete' },
          { key: 's', action: 'Star/unstar' },
          { key: 'c', action: 'Compose new' },
        ]
      : [
          { key: 'c', action: 'Compose new' },
          { key: 'r', action: 'Refresh' },
        ],
  };
}
