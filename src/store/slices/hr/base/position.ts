// third-party
import { createSlice } from '@reduxjs/toolkit';

// types
import { DefaultRootStateProps } from 'types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['Position'] = {
  error: null,
  positionList: [],
  isLoading: false,
  isDone: false
};

const slice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    getPosition1(state, action) {
      state.isLoading = true;
    },

    // GET POSITION
    getPositionSuccess(state, action) {
      console.log('getPositionSuccess호출됨');
      state.isLoading = false;
      state.positionList = action.payload;
      state.isDone = true;
    }
  }
});

export default slice.reducer;
export const PositionAction = slice.actions;
