import React, { forwardRef, ReactNode, SVGProps } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';

export interface PieChartDatum {
  color: string;
  value: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface PieChartProps
  extends Omit<SVGProps<SVGSVGElement>, 'ref' | keyof StyleProps>,
    StyleProps {
  angleGap?: number;
  data: PieChartDatum[];
  radiusGap?: number;
}

export const PieChart = forwardRef<SVGSVGElement, PieChartProps>(
  ({ data, radiusGap = 0, angleGap = 0, ...rest }, ref) => {
    const ThemedPieChart = useThemed('svg', {
      path: 'pieChart',
      style: {
        width: '100%',
        verticalAlign: 'middle'
      }
    });
    const ThemedPieChartSegment = useThemed('circle', {
      path: 'pieChart.segment'
    });

    const totalCount = data.reduce(
      (prev, curr) => prev + (curr.value > 0 ? 1 : 0),
      0
    );
    const totalValue = data.reduce(
      (prev, curr) => prev + (curr.value > 0 ? curr.value : 0),
      0
    );

    const surfaceSize = 100;
    const circleRadiusMax = surfaceSize / 2;
    const circleRadiusMin = circleRadiusMax * radiusGap;
    const strokeWidth = circleRadiusMax - circleRadiusMin;
    const circleRadius = circleRadiusMin + strokeWidth / 2;
    const circleX = surfaceSize / 2;
    const circleY = surfaceSize / 2;
    const totalLength = circleRadius * 2 * Math.PI;

    let segments = [] as ReactNode[];

    // Equals to rotate(-90deg),
    // we want pie chart to begin from the top.
    let ratioOffset = -0.25;

    if (totalValue) {
      for (let i in data) {
        const { color, value, onClick, onMouseEnter, onMouseLeave } = data[i];
        if (value < 1) {
          continue;
        }
        const hasAnythingElse = value < totalValue;
        const ratio = value / totalValue;
        const ratioGap = hasAnythingElse ? angleGap / (2 * Math.PI) : 0;
        const ratioLoss = ratio * ratioGap * totalCount;
        const ratioDelta = ratio - ratioLoss;
        const dashOffset = -ratioOffset * totalLength;
        const dashLength = ratioDelta * totalLength;
        segments.push(
          <ThemedPieChartSegment
            key={`segment-${i}-${value}-${color}`}
            fill={'none'}
            cx={circleX}
            cy={circleY}
            r={circleRadius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDashoffset={dashOffset}
            strokeDasharray={`${dashLength} ${totalLength - dashLength}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        );
        ratioOffset += ratioDelta + ratioGap;
      }
    } else {
      segments.push(
        <ThemedPieChartSegment
          key={`segment`}
          fill={'none'}
          cx={circleX}
          cy={circleY}
          r={circleRadius}
          stroke={'rgba(0, 0, 0, 0.1)'}
          strokeWidth={strokeWidth}
          strokeDasharray={`100 0`}
        />
      );
    }

    return (
      <ThemedPieChart
        ref={ref}
        viewBox={`0 0 ${surfaceSize} ${surfaceSize}`}
        {...rest}
      >
        {segments}
      </ThemedPieChart>
    );
  }
);

PieChart.displayName = 'PieChart';
