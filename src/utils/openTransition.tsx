import React, { useEffect, useState } from 'react';
import {
  render as renderComponentAtNode,
  unmountComponentAtNode
} from 'react-dom';
import { Transitioner, useTransition, useUpdateEffect } from '../hooks';
import { System } from '../models';
import { SystemContext } from '../components';

export const openTransition = (transitioner: Transitioner, system: System) => {
  const rootNode = document.body;
  const holderNode = document.createElement('div');
  const targetNode = rootNode; // TODO
  const handlers = {
    close: () => {
      // TBD
    },
    unmount: () => {
      unmountComponentAtNode(holderNode);
      targetNode.removeChild(holderNode);
    }
  };
  const Component = () => {
    const [isMounted, setIsMounted] = useState(false);
    const transition = useTransition(transitioner, { deps: [], isMounted });
    useEffect(() => {
      setIsMounted(true);
      handlers.close = () => setIsMounted(false);
    }, []);
    useUpdateEffect(() => {
      !transition && handlers.unmount();
    }, [transition]);
    return transition;
  };
  const open = () => {
    targetNode.appendChild(holderNode);
    renderComponentAtNode(
      <SystemContext.Provider value={system}>
        <Component />
      </SystemContext.Provider>,
      holderNode
    );
  };
  const close = () => handlers.close();
  open();
  return close;
};
