import { createSlice } from '@reduxjs/toolkit';
import { restAttdTO } from 'pages/hr/attendance/types/types';

type RestAttdPracticeState = {
  loading: boolean;
  errorCode: string;
  errorMsg: string | null;
  empList: any[];
  restAttdList: restAttdTO[];
};

const initialState: RestAttdPracticeState = {
  empList: [], // 사원 목록
  restAttdList: [] as restAttdTO[], // 근태외 내역
  loading: false,
  errorCode: '',
  errorMsg: null
};

const restAttdSlice = createSlice({
  name: 'restAttdReducer',
  initialState,
  reducers: {
    getEmpListRequest(state, action) {
      console.log('근태외신청 사원리스트 요청', action.payload);
      state.loading = true;
      state.errorMsg = null;
      state.errorCode = '';
    },
    getEmpListSuccess: (state, action) => {
      // <-- 성공 시 리듀서 추가
      state.empList = action.payload; // 상태 업데이트
      console.log('사원목록 조회 성공', action.payload);
      state.loading = false;
      state.errorMsg = null;
      state.errorCode = '';
    },
    getEmpListFailure: (state, action) => {
      // <-- 실패 시 리듀서 추가
      state.loading = false;
      state.errorMsg = action.payload.errorMsg;
      state.errorCode = action.payload.errorCode;
      console.error('사원리스트 조회 실패:', {
        loading: state.loading,
        errorMsg: state.errorMsg,
        errorCode: state.errorCode
      });
    },
    registRestAttdRequest(state, action) {
      console.log('근태외신청 등록 요청', action.payload);
    },
    registRestAttdSuccess(state, action) {
      state.restAttdList = action.payload;
      console.log('근태외신청 등록 성공', action.payload);
    },
    registRestAttdFailure(state, action) {
      console.log('근태외신청 등록 실패', action.payload);
    }
  }
});

export const restAttdActions = restAttdSlice.actions;
export default restAttdSlice.reducer;
