import { createSlice } from '@reduxjs/toolkit';
import { EmpInfoEntity } from '../types/empManagementTypes';

type empCard = { empCard: any };

let initialState: empCard = { empCard: {} };

const empCardSlice = createSlice({
  name: 'emp',
  initialState: initialState,
  reducers: {
    EMP_CARD_STATUS(state, action) {
      console.log('action.payload at EMP_CARD_STATUS:', action.payload);
      state.empCard = action.payload;
      console.log('리듀서log from emp_card_status', action.payload);
    },
    EMP_CARD_REQUESTED(state, action) {
      console.log('리듀서로 옴!!!EMP_CARD_REQUESTED:', action.payload);
    },
    EMP_CARD_UPDATE_REQUESTED(state, action) {
      console.log('리듀서로 옴!!!EMP_CARD_UPDATE_REQUESTED:', action.payload);
      console.log('12312541515151616', action.payload);
    },
    EMP_CARD_UPDATE_STATUS(state, action) {
      console.log('리듀서로 옴!!!EMP_CARD_UPDATE_STATUS:', action.payload);
    }
  }
});

export const empCardAction = empCardSlice.actions;

export default empCardSlice.reducer;