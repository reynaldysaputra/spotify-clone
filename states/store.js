import { createStore } from 'redux';
import { allReducer } from './allReducer';

export const MyStore = createStore(
  allReducer,
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)