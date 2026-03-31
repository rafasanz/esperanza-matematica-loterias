import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from './rootReducer';
import type { AppDispatch } from './store';

// IMPORTANT this needs to live outside store.ts or the app will break
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: unknown;
}>();
