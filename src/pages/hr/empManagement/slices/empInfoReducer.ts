import { createSlice } from '@reduxjs/toolkit';
import { EmpInfoEntity } from '../types/empManagementTypes';

interface EmpListState {
  empList: EmpInfoEntity[];
  message: string | null;
  fetchStatus: boolean;
}

const initialState: EmpListState = {
  empList: [],
  message: '',
  fetchStatus: false
};

const empInfoSlice = createSlice({
  name: 'emp',
  initialState,
  reducers: {
    EMP_FETCH_REQUESTED(state, action) {
      console.log('EMP_FETCH_REQUESTED:', action.payload, action.type);
      // 요청만 트리거하므로 state 변화 없음
    },

    EMP_FETCH_STATUS(state, action) {
      console.log('action.payload at EMP_FETCH_STATUS:', action.payload);
      const { empList, message } = action.payload;

      state.empList = action.payload;
      state.message = message; // 여기서 받은 메세지는 empInfo 컴포넌트에서 사용하면은 될거 같다.
      console.log('EMP_FETCH_STATUS 상태값:', state.empList);

      console.log('log from emp_fetch_status', state.empList, state.message);

      //   EMP_FETCH_STATUS(state, action) {
      //   console.log('REDUCER HIT EMP_FETCH_STATUS:', action.payload);

      //   // ✅ payload가 null/undefined 대비 방어코드
      //   const empList = action.payload?.empList ?? [];
      //   const message = action.payload?.message ?? 'failed';

      //   // ✅ 정상 저장
      //   state.empList = empList;
      //   state.message = message;
      // } 이 방식으로 할 떄는 const { empList, message } = useSelector((state) => state.emp.empList); 페이지에서 이런식으로 데이터를 가져와야함
    },

    EMP_UPDATE_REQUESTED() {},

    EMP_UPDATE_STATUS(state) {
      state.fetchStatus = !state.fetchStatus;
    },

    EMP_DELETE_REQUESTED() {},

    EMP_DELETE_STATUS(state, action) {
      const { errorCode, errorMsg } = action.payload;
      console.log('DELETE status:', errorCode, errorMsg);

      state.fetchStatus = !state.fetchStatus;
    }
  }
});

export const empInfoAction = empInfoSlice.actions;
export default empInfoSlice;
