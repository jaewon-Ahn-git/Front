import { createSlice } from '@reduxjs/toolkit';

type AttdPracticeState = {
  loading: boolean;
  errorCode: string;
  errorMsg: string | null;
};

const initialState: AttdPracticeState = {
  loading: false,
  errorCode: '',
  errorMsg: null
};

const attdPracticeSlice = createSlice({
  name: 'attdPracticeReducer',
  initialState,
  reducers: {
    REGIST_INOUT_REQUEST(state, action) {
      console.log('출입 기록 등록 시작: ', action.payload);
      state.loading = true;
      state.errorMsg = null;
      state.errorCode = '';
    },
    REGIST_INOUT_SUCCESS(state, action) {
      console.log('출입 기록 등록 성공', action.payload);
      state.loading = false;
      state.errorCode = 'SUCCESS';
      state.errorMsg = null;
    },

    // Saga가 API 호출 실패 후 디스패치하는 액션
    REGIST_INOUT_FAILURE(state, action) {
      state.loading = false;
      state.errorMsg = action.payload.errorMsg || '알 수 없는 오류가 발생했습니다.';
      state.errorCode = action.payload.errorCode || 'ERROR';
      console.error('출입기록 등록 실패:', {
        loading: state.loading,
        errorMsg: state.errorMsg,
        errorCode: state.errorCode
      });
    }
  }
});

export const attdPracticeActions = attdPracticeSlice.actions;
export default attdPracticeSlice.reducer;
