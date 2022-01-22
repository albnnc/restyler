import { Meta } from '@storybook/react';
import { compact } from 'docs/decorators';
import { createBlueprint } from 'docs/utils';

export default {
  title: 'Forms/FormField',
  decorators: [compact()]
} as Meta;

export const Blueprint = createBlueprint('form.field');
