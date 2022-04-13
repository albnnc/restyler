/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback, useState } from 'react';
import { compact } from 'docs/decorators';
import { Box } from '../Box';
import { TextCompletion } from './TextCompletion';

export default {
  title: 'Forms/TextCompletion',
  decorators: [compact('300px')]
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState('');
  const getOptions = useCallback((value: string) => {
    return new Array(5).fill(undefined).map(() => {
      const x = Math.random().toString().slice(-4);
      return { value: `${value}/${x}` };
    });
  }, []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>Value: {value}</Box>
      <TextCompletion
        getOptions={getOptions}
        value={value}
        onChange={setValue}
      />
    </Box>
  );
};

export const NoOptions = () => {
  const getOptions = useCallback((value: string) => {
    return value.length > 4 ? [] : [{ value: 'No options for length > 4' }];
  }, []);
  return <TextCompletion getOptions={getOptions} />;
};

export const OptionRenderers = () => {
  const renderBadge = useCallback(
    (v: number) => (
      <Box
        sx={{
          px: 2,
          display: 'inline-block',
          backgroundColor: 'primary',
          color: 'onPrimary',
          borderRadius: 2
        }}
      >
        Add {v}
      </Box>
    ),
    []
  );
  const getOptions = useCallback((value: string) => {
    return [
      {
        value: value + '0',
        render: () => renderBadge(0)
      },
      {
        value: value + 1,
        render: () => renderBadge(1)
      }
    ];
  }, []);
  return <TextCompletion getOptions={getOptions} />;
};
