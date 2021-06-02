import { useContext } from 'react';
import { SystemContext } from '../components';
import {
  openModal,
  openQuestion,
  ModalOptions,
  QuestionOptions
} from '../components';

export const useModal = () => {
  const system = useContext(SystemContext);
  return {
    openModal: (options: ModalOptions) => openModal({ ...options, system }),
    openQuestion: (options: QuestionOptions) =>
      openQuestion({ ...options, system })
  };
};
