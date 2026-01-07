import { createSlice } from '@reduxjs/toolkit';

type dayAttdlist = { dayAttdlist: any[]; empCode: string; empList: any[]; deptlist: any[] };

let initialState: dayAttdlist = { dayAttdlist: [], empCode: '', empList: [], deptlist: [] };

const dailyAttendSlice = createSlice({
  name: 'dailyAttendReducer',
  initialState: initialState,
  reducers: {
    DAILY_ATTEND_INSERT_FETCH_REQUESTED(state, action) {
      console.log('This is Reducer!! DAILY_ATTEND_INSERT_FETCH_REQUESTED called!!!');
    },
    DAILY_ATTEND_MODIFY_FETCH_REQUESTED(state, action) {
      console.log('This is Reducer!! DAILY_ATTEND_MODIFY_FETCH_REQUESTED called!!!');
      console.log('data from reducer is: ', action.payload);
    },
    DAILY_ATTEND_SEARCH_FETCH_REQUESTED(state, action) {
      console.log('This is Reducer!! DAILY_ATTEND_SEARCH_FETCH_REQUESTED called!!!');
      console.log('data from reducer is: ', action.payload);
    },
    DAILY_ATTEND_SEARCH_FETCH_STATUS(state, action) {
      console.warn('일근태 조회', action.payload);
      state.dayAttdlist = action.payload;
    },
    DAILY_ATTEND_SEARCH_EMPLIST_FETCH_REQUESTED(state, action) {
      console.log('This is Reducer!! DAILY_ATTEND_SEARCH_EMPLIST_FETCH_REQUESTED called!!!');
      console.log('data from reducer is: ', action.payload);
    },
    DAILY_ATTEND_SEARCH_EMPLIST_FETCH_STATUS(state, action) {
      console.warn('부서에 따른 사원 조회', action.payload);
      state.empList = action.payload;
    },
    DAILY_ATTEND_FINALIZE_FETCH_REQUESTED(state, action) {
      console.log('This is Reducer!! DAILY_ATTEND_FINALIZE_FETCH_REQUESTED called!!!');
    },

    DEPT_LIST_SEARCH_FETCH_REQUESTED(state, action) {
      console.log('This is Reducer!! DEPT_LIST_SEARCH_FETCH_REQUESTED called!!!');
    },

    DEPT_LIST_SEARCH_FETCH_STATUS(state, action) {
      console.log('This is Reducer!! DEPT_LIST_SEARCH_FETCH_STATUS called!!!', action.payload);
      state.deptlist = action.payload;
    },

    CLEAR_ATTD_LIST(state) {
      console.log('This is Reducer!! CLEAR_ATTD_LIST called!!!');
      state.dayAttdlist = [];
    }
  }
});

export const dailyAttendAction = dailyAttendSlice.actions;

export default dailyAttendSlice.reducer;
