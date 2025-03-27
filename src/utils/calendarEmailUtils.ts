
import { format, addDays, getDay, parse, isSameDay } from "date-fns";
import type { Email } from "@/types/email";
import type { Appointment } from "@/types/appointment";

// Extract possible date information from email
export const extractDatesFromEmail = (email: Email): Date[] => {
  const dateRegex = /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/g;
  const matches = [...email.body.matchAll(dateRegex)];
  
  const extractedDates: Date[] = [];
  
  for (const match of matches) {
    const [fullMatch, day, month, year] = match;
    const normalizedYear = year.length === 2 ? `20${year}` : year;
    
    try {
      const date = new Date(`${normalizedYear}-${month}-${day}`);
      if (!isNaN(date.getTime())) {
        extractedDates.push(date);
      }
    } catch (e) {
      // Skip invalid dates
    }
  }
  
  return extractedDates;
};

// Extract possible time information from email
export const extractTimesFromEmail = (email: Email): string[] => {
  const timeRegex = /(\d{1,2}):(\d{2})\s*(am|pm|AM|PM)?/g;
  const matches = [...email.body.matchAll(timeRegex)];
  
  const extractedTimes: string[] = [];
  
  for (const match of matches) {
    let [fullMatch, hours, minutes, ampm] = match;
    
    // Normalize to 12-hour format with AM/PM
    if (ampm) {
      extractedTimes.push(`${hours}:${minutes} ${ampm.toUpperCase()}`);
    } else {
      const hour = parseInt(hours);
      if (hour >= 0 && hour < 12) {
        extractedTimes.push(`${hours}:${minutes} AM`);
      } else {
        const pm = hour === 12 ? 12 : hour - 12;
        extractedTimes.push(`${pm}:${minutes} PM`);
      }
    }
  }
  
  return extractedTimes;
};

// Suggest next business day
export const suggestNextBusinessDay = (): Date => {
  let nextDay = addDays(new Date(), 1);
  const dayOfWeek = getDay(nextDay);
  
  // Skip weekends
  if (dayOfWeek === 0) { // Sunday
    nextDay = addDays(nextDay, 1);
  } else if (dayOfWeek === 6) { // Saturday
    nextDay = addDays(nextDay, 2);
  }
  
  return nextDay;
};

// Format appointment for email reminder
export const formatAppointmentForEmail = (appointment: Appointment): string => {
  const dateStr = format(
    typeof appointment.date === 'string' ? new Date(appointment.date) : appointment.date, 
    'EEEE, MMMM d, yyyy'
  );
  
  const durationStr = appointment.duration 
    ? formatDuration(appointment.duration)
    : "1 hour";
  
  return `
Appointment Details:
-------------------
Title: ${appointment.title}
Date: ${dateStr}
Time: ${appointment.time}
Duration: ${durationStr}
With: ${appointment.name}
Type: ${appointment.type}
${appointment.location ? `Location: ${appointment.location}\n` : ''}
${appointment.notes ? `\nNotes: ${appointment.notes}` : ''}
`;
};

// Format duration for display
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (minutes === 60) {
    return "1 hour";
  } else if (minutes === 90) {
    return "1.5 hours";
  } else if (minutes === 120) {
    return "2 hours";
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
    }
  }
};

// Check if an appointment conflicts with existing ones
export const checkAppointmentConflicts = (
  newAppointment: Appointment,
  existingAppointments: Appointment[]
): boolean => {
  const newDate = format(
    typeof newAppointment.date === 'string' ? new Date(newAppointment.date) : newAppointment.date,
    'yyyy-MM-dd'
  );
  
  // Convert time strings to minutes since midnight for comparison
  const getTimeInMinutes = (timeStr: string): number => {
    const timeParts = timeStr.match(/(\d+):(\d+)\s*(am|pm|AM|PM)/i);
    if (!timeParts) return 0;
    
    let [_, hours, minutes, ampm] = timeParts;
    let hour = parseInt(hours);
    
    // Convert to 24-hour format
    if (ampm.toLowerCase() === 'pm' && hour < 12) {
      hour += 12;
    } else if (ampm.toLowerCase() === 'am' && hour === 12) {
      hour = 0;
    }
    
    return hour * 60 + parseInt(minutes);
  };
  
  const newStartTime = getTimeInMinutes(newAppointment.time);
  // Use specified duration or default to 60 minutes
  const newEndTime = newStartTime + (newAppointment.duration || 60);
  
  // Check for conflicts with existing appointments
  return existingAppointments.some(appointment => {
    // Skip if not on the same day or it's the same appointment being edited
    if (
      appointment.id === newAppointment.id ||
      !isSameDay(
        typeof appointment.date === 'string' ? new Date(appointment.date) : appointment.date,
        typeof newAppointment.date === 'string' ? new Date(newAppointment.date) : newAppointment.date
      )
    ) {
      return false;
    }
    
    const existingStartTime = getTimeInMinutes(appointment.time);
    const existingEndTime = existingStartTime + (appointment.duration || 60);
    
    // Check for overlap
    return (
      (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
      (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
      (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
    );
  });
};
