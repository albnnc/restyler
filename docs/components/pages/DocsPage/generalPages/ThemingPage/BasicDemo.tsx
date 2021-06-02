import { Box, Button, Form, FormField } from 'docs/components/shared';
import { setTheme, useTheme } from 'docs/core';
import { mergeTheme } from 'lib';
import React from 'react';

export const BasicDemo = () => {
  const theme = useTheme();
  return (
    <>
      <Form
        onSubmit={({ values }) => {
          setTheme(
            mergeTheme({}, theme, {
              variables: {
                palette: { primary: values.primary }
              }
            })
          );
        }}
      >
        <FormField
          name="primary"
          label="Primary color"
          validate={v =>
            v.match(/^#([\da-f]{3}|[\da-f]{6})$/) ? [] : ['Wrong format']
          }
        />
        <Button type="submit" kind="primary" margin={{ top: 'medium' }}>
          Apply
        </Button>
      </Form>
      <Box margin={{ top: 'medium' }}>
        Primary color is{' '}
        <Box weight="bold" color="primary" extend={{ display: 'inline-block' }}>
          {theme.variables?.palette?.primary ?? 'unknown'}
        </Box>
      </Box>
    </>
  );
};
