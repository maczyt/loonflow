import { Register } from '@loonflow/common-tools';
import { Field } from '@loonflow/schema';
import ColItem from './Col';
import InputItem from './Input';
import MultiTextItem from './MultiText';
import RowItem from './Row';
import { FactoryItem } from './types';

export const UIFactory = new Register<Field, FactoryItem>();

UIFactory.set(Field.input, InputItem);
UIFactory.set(Field.textarea, MultiTextItem);

/** layout */
UIFactory.set(Field.row, RowItem);
UIFactory.set(Field.col, ColItem);
