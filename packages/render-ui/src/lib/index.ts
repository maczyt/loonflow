import { Register } from '@loonflow/common-tools';
import { Field } from '@loonflow/schema';
import InputItem from './Input';
import PlaceholderItem from './Placeholder';
import { FactoryItem } from './types';

export const UIFactory = new Register<Field, FactoryItem>();

UIFactory.set(Field.input, InputItem);
UIFactory.set(Field.placeholder, PlaceholderItem);
