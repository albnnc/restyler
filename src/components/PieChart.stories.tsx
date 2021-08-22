/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { PieChart } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Data/PieChart'
} as Meta;

export const Basics = () => {
  return (
    <PieChart
      angleGap={0.1}
      data={[
        { value: 1, color: 'grey' },
        { value: 2, color: 'rebeccapurple' },
        { value: 3, color: 'green' }
      ]}
      radiusGap={0.7}
      sx={{ width: '200px', height: '200px' }}
    />
  );
};

export const Blueprint = createBlueprint('pieChart');
