import { PieChart, SystemContext } from 'docs/components/shared';
import { useContext } from 'react';

export const BasicDemo = () => {
  const { theme } = useContext(SystemContext);
  const palette = theme.variables?.palette ?? {};
  return (
    <PieChart
      radiusGap={0.7}
      angleGap={0.15}
      data={[
        { value: 1, color: palette.danger },
        { value: 2, color: palette.warning },
        { value: 3, color: palette.success },
        { value: 4, color: palette.primary }
      ]}
    />
  );
};
