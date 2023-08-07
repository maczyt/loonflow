import { makeAutoObservable } from 'mobx';
import { injectStores } from '@mobx-devtools/tools';

class FlowStore {
  name = '';
  description =
    '<p>asdadasd</p><p>sdfjshkfjshdf</p><p><br></p><p>sdjkfhkjsdfh</p><p><br></p>';
  constructor() {
    makeAutoObservable(this);
  }

  formChange<T extends keyof FlowStore>(
    this: FlowStore,
    key: T,
    value: FlowStore[T]
  ) {
    this[key] = value;
  }
}
export const store = new FlowStore();

injectStores({
  flowStore: store,
});
