import React, { ReactNode } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { SideMap } from 'src/models';

export interface BoxMeasurements {
  width: number;
  height: number;
  margin: SideMap<number>;
}

export const measureElementBox = (element: HTMLElement): BoxMeasurements => {
  const style = getComputedStyle(element);
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
    margin: {
      top: parseFloat(style.getPropertyValue('margin-top')),
      bottom: parseFloat(style.getPropertyValue('margin-bottom')),
      left: parseFloat(style.getPropertyValue('margin-left')),
      right: parseFloat(style.getPropertyValue('margin-right'))
    }
  };
};

export function measureChildren(
  children: ReactNode
): Promise<BoxMeasurements[]>;

export function measureChildren<Measurements extends object>(
  children: ReactNode,
  measureElement: (element: HTMLElement) => Measurements
): Promise<BoxMeasurements[]>;

export function measureChildren<Measurements extends object>(
  children: ReactNode,
  measureElement?: (element: HTMLElement) => Measurements
): Promise<Measurements[]> {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '1000vh';
  container.style.left = '1000vw';
  document.body.appendChild(container);
  return new Promise(resolve =>
    render(
      <div
        ref={element => {
          if (!element) {
            return;
          }
          const measurements = Array.from(element.childNodes).map(
            (measureElement ?? measureElementBox) as (
              element: HTMLElement
            ) => Measurements
          );
          unmountComponentAtNode(container);
          document.body.removeChild(container);
          resolve(measurements);
        }}
      >
        {children}
      </div>,
      container
    )
  );
}
