import { Register } from '@loonflow/common-tools';
import { Field } from '@loonflow/schema';
import InputItem from './Input';
import MultiTextItem from './MultiText';
import PlaceholderItem from './Placeholder';
import { FactoryItem } from './types';

export const UIFactory = new Register<Field, FactoryItem>();

UIFactory.set(Field.input, InputItem);
UIFactory.set(Field.textarea, MultiTextItem);
UIFactory.set(Field.placeholder, PlaceholderItem);
