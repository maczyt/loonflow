import { FieldProp, IField, Prop } from '@loonflow/schema';
import { observe } from 'mobx';
import { useEffect, useState } from 'react';
import { pickBy, isNil } from 'lodash-es';

const useWatchProp = (defaultValue: any, prop?: Prop) => {
  const [value, setValue] = useState<any>(defaultValue);
  useEffect(() => {
    if (prop) {
      setValue(prop.value);
      const dispose = observe(prop, (ev) => {
        // @ts-ignore
        setValue(ev.newValue);
      });
      return () => {
        dispose();
      };
    }
  }, [prop]);
  return value;
};

export const useLabel = (field: IField) => {
  const labelProp = field.props?.find((prop) => prop.type === FieldProp.title);
  const value = useWatchProp('', labelProp);
  return value;
};

export const useHelper = (field: IField) => {
  const prop = field.props?.find((prop) => prop.type === FieldProp.helper);
  return useWatchProp('', prop);
};

export const usePlaceholder = (field: IField) => {
  console.log(field);
  const prop = field.props?.find((prop) => prop.type === FieldProp.placeholder);
  return useWatchProp(null, prop);
};

export const useSpan = (field: IField) => {
  const spanProp = field.props?.find((prop) => prop.type === FieldProp.span);
  const value = useWatchProp(null, spanProp);
  return value;
};

export const useGutter = (field: IField) => {
  const gutterProp = field.props?.find(
    (prop) => prop.type === FieldProp.gutter
  );
  const value = useWatchProp(null, gutterProp);
  return value;
};

export const useProps = (field: IField) => {
  const span = useSpan(field);
  const gutter = useGutter(field);
  const placeholder = usePlaceholder(field);
  return pickBy(
    {
      span,
      gutter: gutter ? [gutter, gutter] : null,
      placeholder,
    },
    (v) => !isNil(v)
  );
};
