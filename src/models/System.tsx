import {
  TransitionOptions,
  StandaloneTransitionOptions,
  ModalOptions,
  QuestionOptions
} from '../hooks';
import { Locale } from './Locale';
import { Styled } from './Styled';
import { SystemRegistry } from './SystemRegistry';
import { Theme } from './Theme';

export interface System {
  defaults?: {
    modalOptions?: Partial<ModalOptions>;
    notificationOptions?: Partial<NotificationOptions>;
    questionOptions?: Partial<QuestionOptions>;
    transitionOptions?: Partial<TransitionOptions>;
    standaloneTransitionOptions?: Partial<StandaloneTransitionOptions>;
  };
  locale: Locale;
  registry: SystemRegistry;
  styled: Styled;
  theme: Theme;
}
