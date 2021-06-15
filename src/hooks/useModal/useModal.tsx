import { useModalOpener } from './useModalOpener';
import { useQuestionOpener } from './useQuestionOpener';

// export { ModalOptions, ModalRendererProps } from './useModalOpener';
// export { QuestionOptions, QuestionRendererProps } from './useQuestionOpener';

export const useModal = () => {
  const openModal = useModalOpener();
  const openQuestion = useQuestionOpener();
  return { openModal, openQuestion };
};
