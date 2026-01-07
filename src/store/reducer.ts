// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import contactReducer from './slices/contact';
import productReducer from './slices/product';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
import menuReducer from './slices/menu';
import InsureReducer from './slices/hr/salary/Insure';
import baseSalaryReducer from './slices/hr/salary/BaseSalary';
import positionReducer from 'store/redux-saga/reducer/base/positionReducer';
import positionReducer2 from 'store/slices/hr/base/position';
import hobongReducer from 'store/redux-saga/reducer/base/hobongReducer';
import holidayReducer from './slices/hr/base/holiday';
import empManagementReducer from '../pages/hr/empManagement/slices/index';
import attdReducer from './redux-saga/reducer/attendance/attendanceReducer';
import dailyAttendReducer from './slices/hr/attendancePractice/DailyAttendReducer';
import commonReducer from './redux-saga/reducer/common/commonReducer';
import baseReducer from './redux-saga/reducer/base/baseReducer';
import salReducer from './redux-saga/reducer/salary/salaryReducer';
import empcardReducer from 'pages/hr/empManagement/slices/empCardReducer';
import certificateIssuanceReducer from 'store/redux-saga/reducer/base/certificateIssuanceReducer';
import certificationsNameReducer from './redux-saga/reducer/base/certificationsNameReducer';
import languageSkillsReducer from './redux-saga/reducer/base/languageSkillsReducer';
import attdPracticeReducer from './slices/hr/attendancePractice/attendancePracticeReducer';
import restAttdReducer from './slices/hr/attendancePractice/restattdPracticeReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'berry-'
    },
    cartReducer
  ),
  kanban: kanbanReducer,
  customer: customerReducer,
  contact: contactReducer,
  product: productReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  mail: mailReducer,
  user: userReducer,
  menu: menuReducer,
  Insure: InsureReducer, //리듀서 등록
  baseSalary: baseSalaryReducer,
  positionList: positionReducer,
  positionList2: positionReducer2,
  hobong: hobongReducer,
  certificationsName: certificationsNameReducer,
  languageSkills: languageSkillsReducer,
  holidayList: holidayReducer,
  empManagement: empManagementReducer,
  attdPractice: attdPracticeReducer,
  restAttdPractice: restAttdReducer,
  attdReducer: attdReducer, // 근태리듀서
  dailyAttend: dailyAttendReducer, // 일근태등록리듀서
  baseReducer: baseReducer, // 권한리듀서
  commonReducer: commonReducer, // 로그인리듀서
  salReducer: salReducer, // 급여리듀서
  empcardReducer: empcardReducer,
  certificateIssuanceReducer: certificateIssuanceReducer //증명서 리듀서
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
