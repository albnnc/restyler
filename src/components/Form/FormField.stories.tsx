import { Meta } from '@storybook/react';
import { compact } from 'storybook/decorators';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/FormField',
  decorators: [compact()]
} as Meta;

export const Blueprint = createBlueprint('form.field');
