
// Export the formatDuration function
export const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

// Re-export analytics functions from the individual files
export * from './categoryStats';
export * from './timelineStats';
export * from './branchStats';
export * from './executionStats';
export * from './workflowStats';
