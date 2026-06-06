import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import collegesData from '../data/colleges.json';

const SavedContext = createContext(null);

const STORAGE_KEY = 'collegefind:saved-colleges';
const colleges = collegesData.colleges;

export function SavedProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  const value = useMemo(() => {
    const savedSet = new Set(savedIds);
    const savedColleges = colleges.filter((college) => savedSet.has(college.id));

    return {
      savedIds,
      savedColleges,
      savedCount: savedIds.length,
      isSaved: (collegeId) => savedSet.has(Number(collegeId)),
      saveCollege: (collegeId) => {
        const id = Number(collegeId);
        setSavedIds((current) => (current.includes(id) ? current : [...current, id]));
      },
      unsaveCollege: (collegeId) => {
        const id = Number(collegeId);
        setSavedIds((current) => current.filter((savedId) => savedId !== id));
      },
      toggleSaved: (collegeId) => {
        const id = Number(collegeId);
        setSavedIds((current) =>
          current.includes(id)
            ? current.filter((savedId) => savedId !== id)
            : [...current, id],
        );
      },
    };
  }, [savedIds]);

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSavedColleges() {
  const context = useContext(SavedContext);

  if (!context) {
    throw new Error('useSavedColleges must be used within SavedProvider');
  }

  return context;
}
