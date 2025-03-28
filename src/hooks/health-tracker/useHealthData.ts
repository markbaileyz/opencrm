
import { useState } from 'react';

export type VitalRecord = {
  id: string;
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  temperature: number | null;
  oxygenSaturation: number | null;
  glucoseLevel: number | null;
  notes: string | null;
};

export type NutritionRecord = {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
};

export type ActivityRecord = {
  id: string;
  date: string;
  activityType: string;
  duration: number;
  calories: number;
  distance: number | null;
  notes: string | null;
};

export type SleepRecord = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  notes: string | null;
};

export const useHealthData = () => {
  // Sample initial data
  const [vitalRecords, setVitalRecords] = useState<VitalRecord[]>([
    {
      id: '1',
      date: '2023-11-15',
      systolic: 120,
      diastolic: 80,
      heartRate: 72,
      temperature: 98.6,
      oxygenSaturation: 98,
      glucoseLevel: 85,
      notes: 'Morning reading'
    },
    {
      id: '2',
      date: '2023-11-14',
      systolic: 118,
      diastolic: 78,
      heartRate: 70,
      temperature: 98.4,
      oxygenSaturation: 99,
      glucoseLevel: 90,
      notes: 'After exercise'
    }
  ]);

  const [nutritionRecords, setNutritionRecords] = useState<NutritionRecord[]>([
    {
      id: '1',
      date: '2023-11-15',
      mealType: 'breakfast',
      calories: 450,
      protein: 20,
      carbs: 55,
      fat: 15,
      description: 'Oatmeal with banana and honey'
    },
    {
      id: '2',
      date: '2023-11-15',
      mealType: 'lunch',
      calories: 650,
      protein: 35,
      carbs: 65,
      fat: 22,
      description: 'Chicken salad with avocado'
    }
  ]);

  const [activityRecords, setActivityRecords] = useState<ActivityRecord[]>([
    {
      id: '1',
      date: '2023-11-15',
      activityType: 'Running',
      duration: 30,
      calories: 320,
      distance: 4.2,
      notes: 'Morning run in the park'
    },
    {
      id: '2',
      date: '2023-11-14',
      activityType: 'Weightlifting',
      duration: 45,
      calories: 250,
      distance: null,
      notes: 'Upper body workout'
    }
  ]);

  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([
    {
      id: '1',
      date: '2023-11-15',
      startTime: '22:30',
      endTime: '06:30',
      duration: 8,
      quality: 'good',
      notes: 'Fell asleep quickly'
    },
    {
      id: '2',
      date: '2023-11-14',
      startTime: '23:00',
      endTime: '06:00',
      duration: 7,
      quality: 'fair',
      notes: 'Woke up once during the night'
    }
  ]);

  // Functions to add new records
  const addVitalRecord = (newRecord: Omit<VitalRecord, 'id'>) => {
    const recordWithId = {
      ...newRecord,
      id: Math.random().toString(36).substring(2, 11)
    };
    setVitalRecords([recordWithId, ...vitalRecords]);
  };

  const addNutritionRecord = (newRecord: Omit<NutritionRecord, 'id'>) => {
    const recordWithId = {
      ...newRecord,
      id: Math.random().toString(36).substring(2, 11)
    };
    setNutritionRecords([recordWithId, ...nutritionRecords]);
  };

  const addActivityRecord = (newRecord: Omit<ActivityRecord, 'id'>) => {
    const recordWithId = {
      ...newRecord,
      id: Math.random().toString(36).substring(2, 11)
    };
    setActivityRecords([recordWithId, ...activityRecords]);
  };

  const addSleepRecord = (newRecord: Omit<SleepRecord, 'id'>) => {
    const recordWithId = {
      ...newRecord,
      id: Math.random().toString(36).substring(2, 11)
    };
    setSleepRecords([recordWithId, ...sleepRecords]);
  };

  return {
    vitalRecords,
    nutritionRecords,
    activityRecords,
    sleepRecords,
    addVitalRecord,
    addNutritionRecord,
    addActivityRecord,
    addSleepRecord
  };
};
