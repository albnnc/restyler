import { PieChart } from 'docs/components/shared';

export const SmallDemo = () => (
  <PieChart
    css={{ width: '40px', height: '40px' }}
    data={[
      { value: 1, color: '#4980CC' },
      { value: 5, color: '#32588C' }
    ]}
  />
);
