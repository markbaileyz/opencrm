
export interface ComplianceTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed" | "overdue";
  assignee: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  resource: string;
  details: string;
  severity: "low" | "medium" | "high" | "critical";
}

export interface RiskAssessmentItem {
  id: number;
  area: string;
  score: number;
  impact: "low" | "medium" | "high" | "critical";
  status: "resolved" | "in-progress" | "attention-needed" | "planned";
  description?: string;
  recommendedActions?: string[];
}

export interface ComplianceMetrics {
  overallComplianceScore: number;
  pendingTasks: number;
  highRiskFindings: number;
  upcomingDeadlines: number;
  lastAssessmentDate?: string;
  regulatoryFrameworks?: { name: string; compliancePercentage: number }[];
}
