import React, { HTMLAttributes, ReactNode } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';

interface PairListProps extends HTMLAttributes<HTMLDivElement>, ThemeProps {
  pairs: (
    | ReactNode[]
    | {
        title: ReactNode;
        content: ReactNode;
        kind?: string;
      }
  )[];
}

export const PairList = ({ pairs, ...rest }: PairListProps) => {
  const ThemedPairList = useThemed('div', 'pairList');
  const ThemedItem = useThemed('div', 'pairList.item');
  const ThemedItemTitle = useThemed('div', 'pairList.item.title');
  const ThemedItemContent = useThemed('div', 'pairList.item.content');
  return (
    <ThemedPairList {...rest}>
      {pairs.map((pair, i) => {
        const {
          title,
          content,
          kind = undefined
        } = Array.isArray(pair) ? { title: pair[0], content: pair[1] } : pair;
        return (
          <ThemedItem key={i} kind={kind}>
            <ThemedItemTitle>{title}</ThemedItemTitle>
            <ThemedItemContent>
              {Array.isArray(content) ? content.join(', ') : content || '—'}
            </ThemedItemContent>
          </ThemedItem>
        );
      })}
    </ThemedPairList>
  );
};
