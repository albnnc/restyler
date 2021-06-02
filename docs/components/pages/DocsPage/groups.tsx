import React from 'react';
import {
  AnchorPage,
  ButtonPage,
  CardPage,
  CarouselPage,
  CollapsePage,
  ContainerPage,
  FormPage,
  InputPage,
  ModalPage,
  NotificationPage,
  ProgressPage,
  SelectPage,
  TablePage,
  TabPage
} from './componentPages';

const TodoComponent = () => <>TODO</>;

export const groups = [
  {
    title: 'General',
    path: '/docs/general',
    items: [
      {
        title: 'Introduction',
        path: '/docs/general/introduction',
        component: TodoComponent
      },
      {
        title: 'Installation',
        path: '/docs/general/installation',
        component: TodoComponent
      },
      {
        title: 'Theming',
        path: '/docs/general/theming',
        component: TodoComponent
      }
    ]
  },
  {
    title: 'Components',
    path: '/docs/components',
    items: [
      {
        title: 'Global',
        path: '/docs/components/global',
        component: TodoComponent
      },
      {
        title: 'Button',
        path: '/docs/components/button',
        component: ButtonPage
      },
      {
        title: 'Anchor',
        path: '/docs/components/anchor',
        component: AnchorPage
      },
      {
        title: 'Box',
        path: '/docs/components/box',
        component: TodoComponent
      },
      {
        title: 'Card',
        path: '/docs/components/card',
        component: CardPage
      },
      {
        title: 'Modal',
        path: '/docs/components/modal',
        component: ModalPage
      },
      {
        title: 'Notification',
        path: '/docs/components/notification',
        component: NotificationPage
      },
      {
        title: 'Collapse',
        path: '/docs/components/collapse',
        component: CollapsePage
      },
      {
        title: 'Container',
        path: '/docs/components/container',
        component: ContainerPage
      },
      {
        title: 'Heading',
        path: '/docs/components/heading',
        component: TodoComponent
      },
      {
        title: 'Table',
        path: '/docs/components/table',
        component: TablePage
      },
      {
        title: 'Input',
        path: '/docs/components/input',
        component: InputPage
      },
      {
        title: 'Select',
        path: '/docs/components/select',
        component: SelectPage
      },
      {
        title: 'Form',
        path: '/docs/components/form',
        component: FormPage
      },
      {
        title: 'Progress',
        path: '/docs/components/progress',
        component: ProgressPage
      },
      {
        title: 'Carousel',
        path: '/docs/components/carousel',
        component: CarouselPage
      },
      {
        title: 'Tabs',
        path: '/docs/components/tab',
        component: TabPage
      }
    ]
  }
];
