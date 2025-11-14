// third-party
import { createSlice } from '@reduxjs/toolkit';


type hobongList = { empDetailList: any[];  };

let initialState: hobongList = { empDetailList: []};

const certificateIssuanceSlice = createSlice({
  name: 'hobong',
  initialState,
  reducers: {
    //증명서에 필요한 사원의 상세 정보 요청
    EMP_DETAIL_LIST_SEARCH_FETCH_REQUESTED(state, action) {
      console.log("This is Reducer!! EMP_DETAIL_LIST_SEARCH_FETCH_REQUESTED called!!!", action.payload);
    },

    //증명서에 필요한 사원의 상세 정보 업데이트
    EMP_DETAIL_LIST_SEARCH_FETCH_STATUS(state, action) {
      console.log("This is Reducer!! EMP_DETAIL_LIST_SEARCH_FETCH_STATUS called!!!");
      console.log("리듀서에서 받은 호봉리스트: " + action.payload);
      state.empDetailList = action.payload;
    }
   
  }
});

export default certificateIssuanceSlice.reducer;
export const certificateIssuanceAction = certificateIssuanceSlice.actions;

