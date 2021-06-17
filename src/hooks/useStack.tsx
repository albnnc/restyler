import { useEffect, useMemo, useState, Dispatch, SetStateAction } from 'react';

const registry = new Map<
  any,
  { entryId: any; setIsOnTop: Dispatch<SetStateAction<boolean>> }[]
>();

export const useStack = (id: any) => {
  const entryId = useMemo(() => Symbol(), []);
  const [isOnTop, setIsOnTop] = useState((registry.get(id)?.length ?? 0) === 0);

  useEffect(() => {
    if (!registry.has(id)) {
      registry.set(id, []);
    }
    let stack = registry.get(id)!;
    if (!stack.some(v => v.entryId === entryId)) {
      if (stack.length > 0) {
        stack[stack.length - 1].setIsOnTop(false);
      }
      stack.push({ entryId, setIsOnTop });
      setIsOnTop(true);
    }

    return () => {
      stack = registry.get(id)!;
      registry.set(
        id,
        stack.filter(v => v.entryId !== entryId)
      );
      stack = registry.get(id)!;
      if (stack.length > 0) {
        stack[stack.length - 1].setIsOnTop(true);
      } else {
        registry.delete(id);
      }
    };
  }, [id]);

  return isOnTop;
};

export const interactiveStackId = Symbol();
