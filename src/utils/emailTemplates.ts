/**
 * Predefined email templates for common scenarios
 */
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  description: string;
  category: 'business' | 'personal' | 'follow-up' | 'other';
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'meeting-request',
    name: 'Meeting Request',
    subject: 'Request for Meeting: [Topic]',
    body: `
Dear [Recipient],

I hope this email finds you well. I would like to request a meeting to discuss [Topic].

Proposed date and time: [Date and Time]
Location/Platform: [Location or Platform]

Please let me know if this works for you or if you would prefer an alternative time.

Looking forward to our discussion.

Best regards,
[Your Name]
    `,
    description: 'Request a meeting with a client or colleague',
    category: 'business'
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    subject: 'Thank You for [Occasion]',
    body: `
Dear [Recipient],

I wanted to take a moment to express my sincere thanks for [reason for thanks].

[Add a personal note or specific details about what you're thankful for]

Your support/help/kindness is greatly appreciated.

Best regards,
[Your Name]
    `,
    description: 'Express gratitude to someone',
    category: 'personal'
  },
  {
    id: 'follow-up',
    name: 'Follow-up After Meeting',
    subject: 'Follow-up: [Meeting Topic]',
    body: `
Dear [Recipient],

Thank you for taking the time to meet with me regarding [Topic] on [Date].

Key points discussed:
- [Point 1]
- [Point 2]
- [Point 3]

Next steps:
- [Action item 1]
- [Action item 2]

Should you have any questions or need further clarification, please don't hesitate to reach out.

Best regards,
[Your Name]
    `,
    description: 'Follow up after a meeting to summarize points discussed',
    category: 'follow-up'
  },
  {
    id: 'introduction',
    name: 'Introduction',
    subject: 'Introduction: [Your Name]',
    body: `
Dear [Recipient],

My name is [Your Name] and I am reaching out to introduce myself as [your role/position].

[Brief background about yourself or your company]

I would appreciate the opportunity to connect with you to discuss [potential topic of mutual interest].

Looking forward to your response.

Best regards,
[Your Name]
[Your Contact Information]
    `,
    description: 'Introduce yourself to a new contact',
    category: 'business'
  },
  {
    id: 'project-update',
    name: 'Project Update',
    subject: 'Project Update: [Project Name]',
    body: `
Dear [Recipient],

I'm writing to provide you with an update on the status of [Project Name].

Current status:
- [Status update 1]
- [Status update 2]

Achievements:
- [Achievement 1]
- [Achievement 2]

Challenges:
- [Challenge 1]
- [Challenge 2]

Next steps:
- [Next step 1]
- [Next step 2]

Timeline: [Updated timeline]

Please let me know if you need any additional information or have any questions.

Best regards,
[Your Name]
    `,
    description: 'Provide stakeholders with a project update',
    category: 'business'
  }
];

/**
 * Get all templates
 */
export function getAllTemplates(): EmailTemplate[] {
  return emailTemplates;
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: EmailTemplate['category']): EmailTemplate[] {
  return emailTemplates.filter(template => template.category === category);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): EmailTemplate | undefined {
  return emailTemplates.find(template => template.id === id);
}

/**
 * Apply template placeholders with actual values
 */
export function applyTemplatePlaceholders(
  content: string, 
  values: Record<string, string> = {}
): string {
  // Replace placeholders with provided values or keep them if no value is provided
  let result = content;
  
  // Find all placeholders like [Placeholder]
  const placeholderMatches = content.match(/\[([^\]]+)\]/g);
  
  // Replace each placeholder with its value if there are matches
  if (placeholderMatches) {
    placeholderMatches.forEach(placeholder => {
      // Remove the brackets to get the key (for example, convert "[Name]" to "Name")
      const key = placeholder.substring(1, placeholder.length - 1);
      
      // Replace if value exists, otherwise keep the placeholder
      if (values[key]) {
        result = result.replace(placeholder, values[key]);
      }
    });
  }
  
  return result;
}
