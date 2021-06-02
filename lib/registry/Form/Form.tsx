import React, { forwardRef, useEffect, HTMLAttributes } from 'react';
import { useFormManager } from '../../hooks';
import { ComponentFactory, FormManager, StyleProps } from '../../models';
import { FormContext } from './FormContext';

export interface FormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit'>,
    StyleProps {
  manager?: FormManager;
  onChange?: (manager: FormManager) => void;
  onSubmit?: (manager: FormManager) => void;
}

export const createForm: ComponentFactory<HTMLFormElement, FormProps> = ({
  themed
}) => {
  const ThemedForm = themed('form', { path: 'form' });
  return forwardRef(({ manager, onChange, onSubmit, ...rest }, ref) => {
    const innerManager = useFormManager();
    const targetManager = manager ?? innerManager;
    useEffect(() => {
      onChange?.(targetManager);
    }, [targetManager.values]);
    return (
      <FormContext.Provider value={targetManager}>
        <ThemedForm
          ref={ref}
          onSubmit={e => {
            e.preventDefault();
            onSubmit?.(targetManager);
          }}
          {...rest}
        />
      </FormContext.Provider>
    );
  });
};
