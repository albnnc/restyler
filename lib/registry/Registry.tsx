import { ComponentFactoryOptions } from '../models';
import { createAnchor } from './Anchor';
import { createBox } from './Box';
import { createButton } from './Button';
import {
  createCard,
  createCardBody,
  createCardFooter,
  createCardHeader
} from './Card';
import {
  createCarousel,
  createCarouselItem,
  createCarouselItemTransition
} from './Carousel';
import { createCheckbox } from './Checkbox';
import { createCollapse } from './Collapse';
import { createContainer } from './Container';
import { createForm, createFormField, createFormRow } from './Form';
import { createHeading } from './Heading';
import { createImage } from './Image';
import { createInput } from './Input';
import { createLayer } from './Layer';
import { createMenu, createMenuGroup, createMenuItem } from './Menu';
import {
  createModal,
  createModalTransition,
  createOpenModal,
  createOpenQuestion
} from './Modal';
import {
  createNotification,
  createNotificationTransition,
  createOpenNotification
} from './Notification';
import { createProgress } from './Progress';
import { createRadioGroup, createRadioOption } from './Radio';
import {
  createSelect,
  createSelectOptions,
  createSelectOptionsTransition
} from './Select';
import { createTabGroup, createTabOption } from './Tab';
import {
  createSmartTable,
  createTable,
  createTableBody,
  createTableCaption,
  createTableCell,
  createTableHead,
  createTableRow
} from './Table';
import { createTextArea } from './TextArea';

const factories = {
  Anchor: createAnchor,
  Box: createBox,
  Button: createButton,
  Collapse: createCollapse,
  Container: createContainer,
  Heading: createHeading,
  Image: createImage,
  Layer: createLayer,

  Card: createCard,
  CardBody: createCardBody,
  CardFooter: createCardFooter,
  CardHeader: createCardHeader,

  Menu: createMenu,
  MenuGroup: createMenuGroup,
  MenuItem: createMenuItem,

  Modal: createModal,
  ModalTransition: createModalTransition,
  openModal: createOpenModal,
  openQuestion: createOpenQuestion,

  Table: createTable,
  TableBody: createTableBody,
  TableCaption: createTableCaption,
  TableCell: createTableCell,
  TableHead: createTableHead,
  TableRow: createTableRow,
  SmartTable: createSmartTable,

  Notification: createNotification,
  NotificationTransition: createNotificationTransition,
  openNotification: createOpenNotification,

  SelectOptions: createSelectOptions,
  SelectOptionsTransition: createSelectOptionsTransition,
  Select: createSelect,

  RadioOption: createRadioOption,
  RadioGroup: createRadioGroup,

  Input: createInput,
  Checkbox: createCheckbox,
  TextArea: createTextArea,
  FormField: createFormField,
  FormRow: createFormRow,
  Form: createForm,

  Progress: createProgress,

  CarouselItem: createCarouselItem,
  CarouselItemTransition: createCarouselItemTransition,
  Carousel: createCarousel,

  TabOption: createTabOption,
  TabGroup: createTabGroup
};

type Factories = typeof factories;

export type Registry = {
  [P in keyof Factories]: ReturnType<Factories[P]>;
};

export const createRegistry = (options: ComponentFactoryOptions): Registry => {
  const { registry } = options;
  Reflect.ownKeys(factories).forEach(
    k => (registry[k] = factories[k](options))
  );
  return registry;
};
