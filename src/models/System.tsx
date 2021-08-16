import {
  MeterOptions,
  TransitionOptions,
  StandaloneTransitionOptions,
  ModalOptions,
  QuestionOptions
} from '../hooks';
import { Locale } from './Locale';
import { Styled } from './Styled';
import { SystemRegistry } from './SystemRegistry';
import { Theme } from './Theme';

export interface System<T = any> {
  defaults?: {
    modalOptions?: Partial<ModalOptions>;
    notificationOptions?: Partial<NotificationOptions>;
    questionOptions?: Partial<QuestionOptions>;
    transitionOptions?: Partial<TransitionOptions>;
    standaloneTransitionOptions?: Partial<StandaloneTransitionOptions>;
    meterOptions?: Partial<MeterOptions>;
  };
  locale: Locale;
  registry: SystemRegistry;
  styled: Styled<T>;
  theme: Theme<T>;
}
