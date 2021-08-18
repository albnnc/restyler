import {
  MeterOptions,
  TransitionOptions,
  StandaloneTransitionOptions,
  ModalOptions,
  QuestionOptions,
  ThemedOptions
} from '../hooks';
import { Locale } from './Locale';
import { Styled } from './Styled';
import { SystemRegistry } from './SystemRegistry';

export interface System<Theme = any> {
  defaults?: {
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
