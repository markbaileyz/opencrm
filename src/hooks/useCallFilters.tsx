
import { useState, useMemo } from 'react';
import { CallRecord } from '@/types/call';
import { CallFiltersState } from '@/components/call-tracking/CallAdvancedFilters';
import { isAfter, isBefore, parseISO } from 'date-fns';

export function useCallFilters(calls: CallRecord[]) {
  const [filters, setFilters] = useState<CallFiltersState>({
    search: '',
    dateRange: {},
    callTypes: [],
    tags: [],
  });

  // Extract all unique tags from call records
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    calls.forEach(call => {
      if (call.tags && Array.isArray(call.tags)) {
        call.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet);
  }, [calls]);

  // Apply filters to calls
  const filteredCalls = useMemo(() => {
    return calls.filter(call => {
      // Search filter
      const searchLower = filters.search.toLowerCase();
      const searchMatches = !filters.search ? true : (
        (call.name?.toLowerCase().includes(searchLower) || false) ||
        (call.contactName?.toLowerCase().includes(searchLower) || false) ||
        (call.patientName?.toLowerCase().includes(searchLower) || false) ||
        (call.phone?.includes(filters.search) || false) ||
        (call.phoneNumber?.includes(filters.search) || false) ||
        (call.purpose?.toLowerCase().includes(searchLower) || false) ||
        (call.notes?.toLowerCase().includes(searchLower) || false)
      );
      
      // Call type filter
      const typeMatches = filters.callTypes.length === 0 || filters.callTypes.includes(call.type);
      
      // Date range filter
      let dateMatches = true;
      const callDate = parseISO(call.timestamp || call.date);
      
      if (filters.dateRange.from) {
        dateMatches = dateMatches && isAfter(callDate, filters.dateRange.from);
      }
      
      if (filters.dateRange.to) {
        // Add one day to include the end date fully
        const endDate = new Date(filters.dateRange.to);
        endDate.setDate(endDate.getDate() + 1);
        dateMatches = dateMatches && isBefore(callDate, endDate);
      }
      
      // Duration filter
      let durationMatches = true;
      if (filters.minDuration !== undefined) {
        durationMatches = durationMatches && call.duration >= filters.minDuration;
      }
      if (filters.maxDuration !== undefined) {
        durationMatches = durationMatches && call.duration <= filters.maxDuration;
      }
      
      // Tags filter
      const tagsMatch = filters.tags.length === 0 || (
        call.tags && filters.tags.some(tag => call.tags?.includes(tag))
      );
      
      // Follow-up filter
      const followUpMatches = filters.hasFollowUp === undefined ? true : 
        (filters.hasFollowUp ? !!call.followUp : !call.followUp);
      
      return searchMatches && typeMatches && dateMatches && durationMatches && tagsMatch && followUpMatches;
    });
  }, [calls, filters]);

  return {
    filters,
    setFilters,
    filteredCalls,
    availableTags,
  };
}
