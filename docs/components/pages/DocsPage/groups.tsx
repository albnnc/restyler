import React from 'react';
import {
  MdExtension,
  MdFeedback,
  MdFontDownload,
  MdInfo,
  MdNavigation,
  MdViewQuilt
} from 'react-icons/md';
import {
  AnchorPage,
  ButtonPage,
  CardPage,
  CarouselPage,
  CollapsePage,
  ContainerPage,
  FileInputPage,
  FormPage,
  InputPage,
  ModalPage,
  NotificationPage,
  ProgressPage,
  ScrollPage,
  SelectPage,
  TablePage,
  TabPage
} from './componentPages';

const TodoComponent = () => <>TODO</>;

export const groups = [
  {
    title: (
      <>
        <MdInfo /> General
      </>
    ),
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
    title: (
      <>
        <MdViewQuilt /> Layout
      </>
    ),
    path: '/docs/layout',
    items: [
      {
        title: 'Box',
        path: '/docs/layout/box',
        component: TodoComponent
      },
      {
        title: 'Card',
        path: '/docs/layout/card',
        component: CardPage
      },
      {
        title: 'Collapse',
        path: '/docs/layout/collapse',
        component: CollapsePage
      },
      {
        title: 'Container',
        path: '/docs/layout/container',
        component: ContainerPage
      },
      {
        title: 'Scroll',
        path: '/docs/layout/scroll',
        component: ScrollPage
      }
    ]
  },
  {
    title: (
      <>
        <MdFontDownload /> Inputs
      </>
    ),
    path: '/docs/inputs',
    items: [
      {
        title: 'Button',
        path: '/docs/inputs/button',
        component: ButtonPage
      },
      {
        title: 'Input',
        path: '/docs/inputs/input',
        component: InputPage
      },
      {
        title: 'TextArea',
        path: '/docs/inputs/textarea',
        component: TodoComponent
      },
      {
        title: 'Select',
        path: '/docs/inputs/select',
        component: SelectPage
      },
      {
        title: 'Checkbox',
        path: '/docs/inputs/checkbox',
        component: TodoComponent
      },
      {
        title: 'Radio',
        path: '/docs/inputs/radio',
        component: TodoComponent
      },
      {
        title: 'File',
        path: '/docs/inputs/file',
        component: FileInputPage
      },
      {
        title: 'Form',
        path: '/docs/inputs/form',
        component: FormPage
      }
    ]
  },
  {
    title: (
      <>
        <MdNavigation /> Navigation
      </>
    ),
    path: '/docs/navigation',
    items: [
      {
        title: 'Anchor',
        path: '/docs/navigation/anchor',
        component: AnchorPage
      },
      {
        title: 'Tabs',
        path: '/docs/navigation/tab',
        component: TabPage
      }
    ]
  },
  {
    title: (
      <>
        <MdFeedback /> Feedback
      </>
    ),
    path: '/docs/feedback',
    items: [
      {
        title: 'Modal',
        path: '/docs/feedback/modal',
        component: ModalPage
      },
      {
        title: 'Notification',
        path: '/docs/feedback/notification',
        component: NotificationPage
      },
      {
        title: 'Progress',
        path: '/docs/feedback/progress',
        component: ProgressPage
      }
    ]
  },
  {
    title: (
      <>
        <MdExtension /> Others
      </>
    ),
    path: '/docs/others',
    items: [
      {
        title: 'Heading',
        path: '/docs/others/heading',
        component: TodoComponent
      },
      {
        title: 'Table',
        path: '/docs/others/table',
        component: TablePage
      },
      {
        title: 'Carousel',
        path: '/docs/others/carousel',
        component: CarouselPage
      }
    ]
  }
];
