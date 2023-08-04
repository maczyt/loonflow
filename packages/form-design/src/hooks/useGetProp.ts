import { FieldProp, IField } from '@loonflow/schema';
import { observe } from 'mobx';
import { useEffect, useState } from 'react';

export const useLabel = (field: IField) => {
  const [label, setLabel] = useState('');
  useEffect(() => {
    const labelProp = field.props?.find(
      (prop) => prop.type === FieldProp.title
    );
    setLabel(labelProp?.value);
    const dispose = observe(labelProp!, (ev) => {
      // @ts-ignore
      setLabel(ev.newValue);
    });
    return () => {
      dispose();
    };
  }, [field]);
  return label;
};
