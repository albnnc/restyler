import { useState } from 'react';

export const useTabManager = (defaultTabId: string) => {
  const [activeId, setActiveId] = useState<string>(defaultTabId);
  return {
    activeId,
    setActiveId
  };
};
