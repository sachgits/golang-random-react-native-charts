import { combineReducers } from 'redux';

import { appReducer } from './App';
import { navReducer } from './Nav';
import { graphReducer} from './Graph';

const rootReducer = combineReducers({
  app: appReducer,
  nav: navReducer,
  graph: graphReducer,
});

export default rootReducer;
