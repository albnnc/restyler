/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback } from 'react';
import { compact } from 'docs/decorators';
import { Box } from '../Box';
import { Autocomplete } from './Autocomplete';

export default {
  title: 'Forms/Autocomplete',
  decorators: [compact('300px')]
} as Meta;

export const Basics = () => {
  const getOptions = useCallback((query: string) => {
    return new Array(5).fill(undefined).map(() => {
      const x = Math.random().toString().slice(-4);
      return {
        key: x,
        query: `${query}/${x}`,
        value: x
      };
    });
  }, []);
  return <Autocomplete getOptions={getOptions} />;
};

export const WithoutValues = () => {
  const getOptions = useCallback((query: string) => {
    return new Array(5).fill(undefined).map(() => {
      const x = Math.random().toString().slice(-4);
      return {
        key: x,
        query: `${query}/${x}`
      };
    });
  }, []);
  return <Autocomplete getOptions={getOptions} />;
};

export const NoOptions = () => {
  const getOptions = useCallback((query: string) => {
    return query.length > 4
      ? []
      : [
          {
            key: 0,
            query: 'No options for length > 4'
          }
        ];
  }, []);
  return <Autocomplete getOptions={getOptions} />;
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
  const getOptions = useCallback((query: string) => {
    return [
      {
        key: 0,
        query: query + '0',
        render: () => renderBadge(0)
      },
      {
        key: 1,
        query: query + 1,
        render: () => renderBadge(1)
      }
    ];
  }, []);
  return <Autocomplete getOptions={getOptions} />;
};
