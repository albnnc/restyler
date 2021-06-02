import { useContext } from 'react';
import { SystemContext } from '../components';
import { openNotification, ModalOptions } from '../components';

export const useNotification = () => {
  const system = useContext(SystemContext);
  return {
    openNotification: (options: ModalOptions) =>
      openNotification({ ...options, system })
  };
};
