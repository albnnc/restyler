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
import { createFile } from './File';
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
import { createPieChart } from './PieChart';
import { createProgress } from './Progress';
import { createRadioGroup, createRadioOption } from './Radio';
import { createScroll } from './Scroll';
import {
  createSelect,
  createSelectDrop,
  createSelectDropTransition,
  createSelectOption
} from './Select';
import { createStack } from './Stack';
import { createTabGroup, createTabOption } from './Tab';
import {
  createSmartTable,
  createTable,
  createTableBody,
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
  Scroll: createScroll,
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
  TableCell: createTableCell,
  TableHead: createTableHead,
  TableRow: createTableRow,
  SmartTable: createSmartTable,

  Notification: createNotification,
  NotificationTransition: createNotificationTransition,
  openNotification: createOpenNotification,

  SelectOption: createSelectOption,
  SelectDrop: createSelectDrop,
  SelectDropTransition: createSelectDropTransition,
  Select: createSelect,

  RadioOption: createRadioOption,
  RadioGroup: createRadioGroup,

  Input: createInput,
  Checkbox: createCheckbox,
  TextArea: createTextArea,
  File: createFile,
  FormField: createFormField,
  FormRow: createFormRow,
  Form: createForm,

  Progress: createProgress,

  CarouselItem: createCarouselItem,
  CarouselItemTransition: createCarouselItemTransition,
  Carousel: createCarousel,

  TabOption: createTabOption,
  TabGroup: createTabGroup,

  Stack: createStack,
  PieChart: createPieChart
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
