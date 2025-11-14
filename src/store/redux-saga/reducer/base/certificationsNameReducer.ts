// third-party
import { createSlice } from '@reduxjs/toolkit';

type certificationsNameList = { certificationsNameList : any[]; };

let initialState: certificationsNameList = { certificationsNameList: [] };

const certificationsNameSlice = createSlice({
  name: 'certificationsName',
  initialState: initialState,
  reducers: {
    // 자격증 조회
    CERTIFICATIONS_NAME_SEARCH_FETCH_REQUESTED(state, action) {
      console.log("This is Reducer!! CERTIFICATIONS_NAME_SEARCH_FETCH_REQUESTED called!!!");
    },

    // 자격증리스트 업데이트
    CERTIFICATIONS_NAME_SEARCH_FETCH_STATUS(state, action) {
      console.log("This is Reducer!! CERTIFICATIONS_NAME_SEARCH_FETCH_STATUS called!!!", action.payload);
      state.certificationsNameList = action.payload;
      console.log("This is Reducer!! CERTIFICATIONS_NAME_SEARCH_FETCH_STATUS called!!! state.positionList: ", state.certificationsNameList);
   
    }
  }
});

export const certificationsNameAction = certificationsNameSlice.actions;

export default certificationsNameSlice.reducer;