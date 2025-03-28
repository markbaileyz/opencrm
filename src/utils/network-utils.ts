
/**
 * Utility functions for network status detection and management
 */

/**
 * Check if the connection is metered (pay-per-use)
 * This helps determine if we should limit data usage
 */
export const isConnectionMetered = (): boolean => {
  // The navigator.connection API is not fully supported in all browsers
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn && 'saveData' in conn) {
      return conn.saveData || (conn.effectiveType && ['slow-2g', '2g'].includes(conn.effectiveType));
    }
  }
  return false;
};

/**
 * Get the connection quality based on effective type
 * @returns A string representing the connection quality: 'slow', 'medium', 'fast', or 'unknown'
 */
export const getConnectionQuality = (): 'slow' | 'medium' | 'fast' | 'unknown' => {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn && 'effectiveType' in conn) {
      switch (conn.effectiveType) {
        case 'slow-2g':
        case '2g':
          return 'slow';
        case '3g':
          return 'medium';
        case '4g':
          return 'fast';
        default:
          return 'unknown';
      }
    }
  }
  return 'unknown';
};

/**
 * Detect if the browser supports background sync
 */
export const supportsBackgroundSync = (): boolean => {
  return 'serviceWorker' in navigator && 'SyncManager' in window;
};

/**
 * Test the actual connection by making a small request
 * More reliable than just checking navigator.onLine
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    // Try to fetch a small file to test the connection
    // Use Date.now() to prevent caching
    const response = await fetch(`/ping?_=${Date.now()}`, {
      method: 'HEAD',
      cache: 'no-store',
      // Set a short timeout to avoid hanging
      signal: AbortSignal.timeout(3000)
    });
    return response.ok;
  } catch (error) {
    console.log('Connection test failed:', error);
    return false;
  }
};

/**
 * Get the estimated bandwidth (if available)
 * @returns Bandwidth in Mbps or null if not available
 */
export const getEstimatedBandwidth = (): number | null => {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn && 'downlink' in conn) {
      return conn.downlink; // Mbps
    }
  }
  return null;
};

/**
 * Add a listener for connection changes
 */
export const addConnectionChangeListener = (callback: () => void): (() => void) => {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn) {
      conn.addEventListener('change', callback);
      return () => conn.removeEventListener('change', callback);
    }
  }
  return () => {}; // Return empty cleanup function if not supported
};
