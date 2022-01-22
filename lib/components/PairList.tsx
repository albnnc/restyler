import React, { HTMLAttributes, ReactNode } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';

interface PairListProps extends HTMLAttributes<HTMLDivElement>, ThemeProps {
  pairs: ReactNode[][];
}

export const PairList = ({ pairs, ...rest }: PairListProps) => {
  const ThemedPairList = useThemed('div', 'pairList');
  const ThemedItem = useThemed('div', 'pairList.item');
  const ThemedItemLeft = useThemed('div', 'pairList.item.left');
  const ThemedItemRight = useThemed('div', 'pairList.item.right');
  return (
    <ThemedPairList {...rest}>
      {pairs.map(([left, right], i) => (
        <ThemedItem key={i}>
          <ThemedItemLeft>{left}</ThemedItemLeft>
          <ThemedItemRight>
            {Array.isArray(right) ? right.join(', ') : right || '—'}
          </ThemedItemRight>
        </ThemedItem>
      ))}
    </ThemedPairList>
  );
};
