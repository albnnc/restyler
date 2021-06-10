import { TransitionOptions } from '../hooks';
import { ModalOptions, QuestionOptions } from '../components';
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
  };
  locale: Locale;
  registry: SystemRegistry;
  styled: Styled;
  theme: Theme;
}
