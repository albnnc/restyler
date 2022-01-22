import { ForwardRefExoticComponent } from 'react';

export interface SystemRegistry {
  [key: string]: ForwardRefExoticComponent<any>;
}
