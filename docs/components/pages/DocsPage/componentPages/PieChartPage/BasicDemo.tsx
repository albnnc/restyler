import { PieChart } from 'docs/components/shared';
import { useTheme } from 'docs/core';

export const BasicDemo = () => {
  const theme = useTheme();
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
