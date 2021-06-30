import React, { Fragment, ReactNode } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export interface Measurements {
  width: number;
  height: number;
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export const measureChildren = (
  children: ReactNode
): Promise<Measurements[]> => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '1000vh';
  container.style.left = '1000vw';
  document.body.appendChild(container);
  return new Promise(resolve =>
    render(<Fragment>{children}</Fragment>, container, () => {
      const sizes = Array.from(container.childNodes).map((el: HTMLElement) => {
        const style = getComputedStyle(el);
        return {
          width: el.offsetWidth,
          height: el.offsetHeight,
          margin: {
            top: parseFloat(style.getPropertyValue('margin-top')),
            bottom: parseFloat(style.getPropertyValue('margin-bottom')),
            left: parseFloat(style.getPropertyValue('margin-left')),
            right: parseFloat(style.getPropertyValue('margin-right'))
          }
        };
      });
      unmountComponentAtNode(container);
      document.body.removeChild(container);
      resolve(sizes);
    })
  );
};
