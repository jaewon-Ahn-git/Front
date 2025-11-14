// third-party
import { createSlice } from '@reduxjs/toolkit';

type positionList = { positionList: any[]; };

let initialState: positionList = { positionList: []};

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    // 직급 조회
    POSITION_LIST_SEARCH_FETCH_REQUESTED(state, action) {
      console.log("This is Reducer!! POSITION_LIST_SEARCH_FETCH_REQUESTED called!!!");
    },

    // 직급리스트 업데이트
    POSITION_LIST_SEARCH_FETCH_STATUS(state, action) {
      console.log("This is Reducer!! POSITION_LIST_SEARCH_FETCH_STATUS called!!!", action.payload);
      state.positionList = action.payload;
      console.log("This is Reducer!! POSITION_LIST_SEARCH_FETCH_STATUS called!!! state.positionList: ", state.positionList);
   
    }
  }
});

export const positionAction = positionSlice.actions;

export default positionSlice.reducer;
