import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { Nullable } from 'shared/types';

export const useLastLocation = () => {
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState<Nullable<string>>(null);
  const [previousPath, setPreviousPath] = useState<Nullable<string>>(null);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setPreviousPath(currentPath);
      setCurrentPath(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (currentPath) {
      window?.localStorage?.setItem('currentPath', currentPath);
    }
    if (previousPath) {
      window?.localStorage?.setItem('previousPath', previousPath);
    }
  }, [currentPath, previousPath]);

  useEffect(() => {
    const curr = window?.localStorage?.getItem('currentPath');
    if (curr) {
      setCurrentPath(curr);
    }
    const prev = window?.localStorage?.getItem('previousPath');
    if (prev) {
      setPreviousPath(prev);
    }
  }, []);

  return { currentPath, previousPath };
};
