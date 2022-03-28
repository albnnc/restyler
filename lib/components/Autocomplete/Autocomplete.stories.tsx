/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback } from 'react';
import { compact } from 'docs/decorators';
import { Autocomplete } from './Autocomplete';

export default {
  title: 'Forms/Autocomplete',
  decorators: [compact('300px')]
} as Meta;

export const Basics = () => {
  const getOptions = useCallback((title: string) => {
    return new Array(5).fill(undefined).map(() => {
      const x = Math.random().toString().slice(-4);
      return {
        key: x,
        title: `${title} + ${x}`,
        value: x
      };
    });
  }, []);
  return <Autocomplete getOptions={getOptions} />;
};
