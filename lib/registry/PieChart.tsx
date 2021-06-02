import React, { forwardRef, ReactNode, SVGProps } from 'react';
import { ComponentFactory, StyleProps } from '../models';

export interface PieChartDatum {
  color: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  value: number;
}

export interface PieChartProps
  extends Omit<SVGProps<SVGSVGElement>, 'ref' | keyof StyleProps>,
    StyleProps {
  angleGap?: number;
  data: PieChartDatum[];
  radiusGap?: number;
}

export const createPieChart: ComponentFactory<SVGSVGElement, PieChartProps> = ({
  themed
}) => {
  const ThemedPieChart = themed('svg', {
    path: 'pieChart',
    style: {
      width: '100%',
      verticalAlign: 'middle'
    }
  });
  const ThemedPieChartSegment = themed('circle', { path: 'pieChart.segment' });

  return forwardRef(({ data, radiusGap = 0, angleGap = 0, ...rest }, ref) => {
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

    // equal to rotate(-90deg),
    // we want pie chart to begin from the top
    let ratioOffset = -0.25;

    if (totalValue) {
      for (let i in data) {
        const { color, value, onMouseEnter, onMouseLeave } = data[i];
        if (value < 1) {
          continue;
        }
        const ratio = value / totalValue;
        const ratioGap = angleGap / (2 * Math.PI);
        const ratioLoss = ratio * ratioGap * totalCount;
        const ratioDelta = ratio - ratioLoss;
        const dashOffset = -ratioOffset * totalLength;
        const dashLength = ratioDelta * totalLength;
        segments.push(
          <ThemedPieChartSegment
            key={`segment-${i}-${value}-${color}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            fill={'none'}
            cx={circleX}
            cy={circleY}
            r={circleRadius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDashoffset={dashOffset}
            strokeDasharray={`${dashLength} ${totalLength - dashLength}`}
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
      <ThemedPieChart viewBox={`0 0 ${surfaceSize} ${surfaceSize}`} {...rest}>
        {segments}
      </ThemedPieChart>
    );
  });
};
