import { DOMAttributes, ReactNode } from 'react';

export interface IToolbarConfig extends DOMAttributes<HTMLElement> {
  title?: ReactNode;
  label?: ReactNode;
  icon?: ReactNode;
}
