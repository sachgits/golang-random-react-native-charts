import { createStore } from 'redux';
import reducers from 'mobileapp/src/modules/reducers';

export default () => createStore(reducers);
