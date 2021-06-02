import { Fragment } from 'react';
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
  CollapsePage,
  ContainerPage,
  FilePage,
  FormPage,
  InputPage,
  LoaderPage,
  ModalPage,
  NotificationPage,
  OperationPage,
  PieChartPage,
  ProgressPage,
  ScrollPage,
  SelectPage,
  StackPage,
  TablePage,
  TabPage,
  TransitionPage
} from './componentPages';
import { ThemingPage } from './generalPages';

const TodoComponent = () => <Fragment>TODO</Fragment>;

export const groups = [
  {
    title: (
      <Fragment>
        <MdInfo /> General
      </Fragment>
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
        component: ThemingPage
      }
    ]
  },
  {
    title: (
      <Fragment>
        <MdViewQuilt /> Layout
      </Fragment>
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
      },
      {
        title: 'Stack',
        path: '/docs/layout/stack',
        component: StackPage
      }
    ]
  },
  {
    title: (
      <Fragment>
        <MdFontDownload /> Inputs
      </Fragment>
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
        path: '/docs/inputs/text-area',
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
        component: FilePage
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
      <Fragment>
        <MdNavigation /> Navigation
      </Fragment>
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
      <Fragment>
        <MdFeedback /> Feedback
      </Fragment>
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
      <Fragment>
        <MdExtension /> Others
      </Fragment>
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
        title: 'Pie Chart',
        path: '/docs/others/pie-chart',
        component: PieChartPage
      },
      {
        title: 'Loader',
        path: '/docs/others/loader',
        component: LoaderPage
      },
      {
        title: 'Operation',
        path: '/docs/others/operation',
        component: OperationPage
      },
      {
        title: 'Transition',
        path: '/docs/others/transition',
        component: TransitionPage
      }
    ]
  }
];
