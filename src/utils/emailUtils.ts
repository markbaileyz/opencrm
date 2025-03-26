
import type { Email } from "@/types/email";

/**
 * Check if an email matches the search query
 */
export const emailMatchesSearch = (email: Email, query: string): boolean => {
  const lowerCaseQuery = query.toLowerCase();
  return (
    email.subject.toLowerCase().includes(lowerCaseQuery) ||
    email.senderName.toLowerCase().includes(lowerCaseQuery) ||
    email.senderEmail.toLowerCase().includes(lowerCaseQuery) ||
    email.preview.toLowerCase().includes(lowerCaseQuery) ||
    email.body.toLowerCase().includes(lowerCaseQuery)
  );
};

/**
 * Sort emails based on the selected sort option
 */
export type SortOption = "newest" | "oldest" | "unread" | "sender";

export const sortEmails = (emails: Email[], sortOption: SortOption): Email[] => {
  switch (sortOption) {
    case "newest":
      return [...emails].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case "oldest":
      return [...emails].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case "unread":
      return [...emails].sort((a, b) => {
        if (a.read === b.read) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return a.read ? 1 : -1;
      });
    case "sender":
      return [...emails].sort((a, b) => a.senderName.localeCompare(b.senderName));
    default:
      return emails;
  }
};

/**
 * Filter emails based on criteria
 */
export const filterEmails = (
  emails: Email[],
  activeTab: string,
  searchQuery: string,
  activeFilters: string[]
): Email[] => {
  return emails.filter(email => {
    // First filter by folder (tab)
    if (email.folder !== activeTab) return false;
    
    // Then apply search query if present
    if (searchQuery && !emailMatchesSearch(email, searchQuery)) return false;
    
    // Then apply active filters
    if (activeFilters.includes("starred") && !email.starred) return false;
    if (activeFilters.includes("unread") && email.read) return false;
    if (activeFilters.includes("attachments") && !email.hasAttachments) return false;
    
    return true;
  });
};

/**
 * Calculate unread counts for each folder
 */
export const calculateUnreadCounts = (emails: Email[]): Record<string, number> => {
  return emails.reduce((counts, email) => {
    if (!email.read) {
      counts[email.folder] = (counts[email.folder] || 0) + 1;
    }
    return counts;
  }, {} as Record<string, number>);
};
