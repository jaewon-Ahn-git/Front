import { createSlice } from '@reduxjs/toolkit';

// 1. 상태 타입에 로딩 상태를 추가
type RegisterStatus = {
  isLoading: boolean;
  errorCode: string;
  errorMsg: string | null;
  data: any | null; // 성공 시 받을 데이터
};

// 2. 초기 상태에 로딩 상태 추가
const initialState: RegisterStatus = {
  isLoading: false,
  errorCode: '',
  errorMsg: null,
  data: null
};

const registerEmpSlice = createSlice({
  name: 'registerEmp',
  initialState,
  reducers: {
    // Saga가 API 호출을 시작하도록 요청하는 액션
    // 이 액션은 리듀서에서 상태를 변경하지 않음 (Saga가 처리)
    REGISTER_EMP_REQUESTED(state, action) {
      console.log('사원 등록 api 요청 시작', action.payload);
      // 로딩 상태를 여기서 변경해도 되지만, Saga가 별도로 액션을 디스패치하는 경우가 많음
      state.isLoading = true;
      state.errorMsg = null;
      state.errorCode = '';
    },

    // Saga가 API 호출 성공 후 디스패치하는 액션
    REGISTER_EMP_SUCCESS(state, action) {
      console.log('사원 등록 api 요청 성공', action.payload);
      state.isLoading = false;
      state.data = action.payload; // Saga로부터 받은 데이터를 상태에 저장
      state.errorCode = 'SUCCESS';
      state.errorMsg = null;
    },

    // Saga가 API 호출 실패 후 디스패치하는 액션
    REGISTER_EMP_FAILURE(state, action) {
      console.log('사원 등록 api 요청 실패', action.payload);
      state.isLoading = false;
      state.data = null;
      // 실패 시 받은 에러 데이터를 상태에 저장
      state.errorMsg = action.payload.errorMsg || '알 수 없는 오류가 발생했습니다.';
      state.errorCode = action.payload.errorCode || 'ERROR';
    },

    // UI에서 상태를 초기화하고 싶을 때 사용하는 액션
    REGISTER_EMP_RESET(state) {
      console.log('사원 등록 상태 초기화');
      state.isLoading = false;
      state.errorCode = '';
      state.errorMsg = null;
      state.data = null;
    }
  }
});

export const { REGISTER_EMP_REQUESTED, REGISTER_EMP_SUCCESS, REGISTER_EMP_FAILURE, REGISTER_EMP_RESET } = registerEmpSlice.actions;

export default registerEmpSlice;
