// third-party
import { createSlice } from '@reduxjs/toolkit';


type hobongList = { hobongList: any[];  };

let initialState: hobongList = { hobongList: []};

const hobongSlice = createSlice({
  name: 'hobong',
  initialState,
  reducers: {
    //호봉리스트 조회
    HOBONG_LIST_SEARCH_FETCH_REQUESTED(state, action) {
      console.log("This is Reducer!! HOBONG_LIST_SEARCH_FETCH_REQUESTED called!!!");
    },

    // 호봉리스트 업데이트
    HOBONG_LIST_SEARCH_FETCH_STATUS(state, action) {
      console.log("This is Reducer!! HOBONG_LIST_SEARCH_FETCH_STATUS called!!!");
      console.log("리듀서에서 받은 호봉리스트: " + action.payload);
      state.hobongList = action.payload;
    },

    // 호봉리스트 등록 
    HOBONG_LIST_INSERT_FETCH_REQUESTED(state, action) {
      console.log("This is Reducer!! HOBONG_LIST_INSERT_FETCH_REQUESTED called!!!");
    },

    // 호봉 정률 방식 인상 
    HOBONG_LIST_PERCENTAGE_UPDATE_FETCH_REQUESTED(state, action) {
      console.log("This is Reducer!! HOBONG_LIST_PERCENTAGE_UPDATE_FETCH_REQUESTED called!!!");
    },
    // 호봉 정액 방식 인상
    HOBONG_LIST_FIXED_UPDATE_FETCH_REQUESTED(state, action) {
      console.log("This is Reducer!! HOBONG_LIST_FIXED_UPDATE_FETCH_REQUESTED called!!!");
    }
  }
});

export default hobongSlice.reducer;
export const hobongAction = hobongSlice.actions;

