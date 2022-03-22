import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
    reducer: reducer
  })


