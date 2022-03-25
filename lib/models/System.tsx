import {
  DropOptions,
  MeterOptions,
  ModalOptions,
  QuestionOptions,
  StandaloneTransitionOptions,
  ThemedOptions,
  TransitionOptions
} from '../hooks';
import { Locale } from './Locale';
import { Styled } from './Styled';
import { SystemRegistry } from './SystemRegistry';

export interface System<Theme = any> {
  defaults?: {
    dropOptions?: Partial<DropOptions>;
    meterOptions?: Partial<MeterOptions>;
    modalOptions?: Partial<ModalOptions>;
    notificationOptions?: Partial<NotificationOptions>;
    questionOptions?: Partial<QuestionOptions>;
    standaloneTransitionOptions?: Partial<StandaloneTransitionOptions>;
    themedOptions?: Partial<ThemedOptions>;
    transitionOptions?: Partial<TransitionOptions>;
  };
  locale: Locale;
  registry: SystemRegistry;
  styled: Styled;
  theme: Theme;
}
