// import Layout from 'layout';
// import React, { ReactElement, useState } from 'react';
// import Page from 'components/ui-component/Page';
// import MainCard from 'ui-component/cards/MainCard';
// import {
//   Button,
//   CardActions,
//   CardContent,
//   Divider,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField
// } from '@mui/material';
// import { Box } from '@mui/system';
// import { gridSpacing } from 'store/constant';
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import Swal from 'sweetalert2';
// import { AttendancePracticeTo } from 'types/attendance/types';
// import { dispatch } from 'store/index';
// import { attdPracticeActions } from 'store/slices/hr/attendancePractice/attendancePracticeReducer';
// import moment from 'moment';

// const AttendancePractice = () => {
//   const [empCode, setEmpCode] = useState<string>('');
//   const [inOutType, setInOutType] = useState<'IN' | 'OUT'>('IN');

//   const registHandler = () => {
//     // 'YYYY-MM-DD' 형식의 날짜
//     const currentDate = moment().format('YYYY-MM-DD');
//     // 'HH:mm' 형식의 시간 (분 단위)
//     const currentTime = moment().format('HH:mm');

//     // 출입기록 등록에 필요한 payload 생성
//     const attendancePracticeTO: AttendancePracticeTo = {
//       empCode,
//       date: currentDate, // moment로 포맷된 현재 날짜 사용
//       time: currentTime, // moment로 포맷된 현재 시간 사용
//       inOutType
//     };

//     console.log('등록 payload:', attendancePracticeTO);
//     dispatch(attdPracticeActions.REGIST_INOUT_REQUEST(attendancePracticeTO));
//   };

//   const submitHandler = () => {
//     if (!empCode) {
//       Swal.fire({
//         icon: 'warning',
//         text: '사원번호를 입력하세요.'
//       });
//     } else if (inOutType == 'IN') {
//       Swal.fire({
//         title: '입실로 등록하시겠습니까?',
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonText: '예',
//         cancelButtonText: '아니오'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           registHandler();
//         }
//       });
//     } else if (inOutType == 'OUT') {
//       Swal.fire({
//         title: '퇴실로 등록하시겠습니까?',
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonText: '예',
//         cancelButtonText: '아니오'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           registHandler();
//         }
//       });
//     }
//   };

//   return (
//     <Page title="출입기록등록">
//       <MainCard title="출입기록등록" secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}>
//         <CardContent>
//           <Grid container spacing={gridSpacing}>
//             <Grid item xs={12} sm={6}>
//               <Box sx={{ minWidth: 120 }}>
//                 <FormControl fullWidth>
//                   <TextField
//                     label="사원번호"
//                     onChange={(e: any) => {
//                       setEmpCode(String(e.target.value));
//                     }}
//                   ></TextField>
//                 </FormControl>
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel id="inout-label">입퇴실 구분</InputLabel>
//                 <Select
//                   labelId="inout-label"
//                   label="입퇴실 구분"
//                   value={inOutType}
//                   onChange={(e) => setInOutType(e.target.value as 'IN' | 'OUT')}
//                 >
//                   <MenuItem value="IN">입실</MenuItem>
//                   <MenuItem value="OUT">퇴실</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Divider />
//             <CardActions>
//               <Grid container justifyContent="space-between" spacing={0}>
//                 <Grid item>
//                   <AnimateButton>
//                     <Button variant="contained" size="large" onClick={() => submitHandler()}>
//                       신청
//                     </Button>
//                   </AnimateButton>
//                 </Grid>
//               </Grid>
//             </CardActions>
//           </Grid>
//         </CardContent>
//       </MainCard>
//     </Page>
//   );
// };

// AttendancePractice.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

// export default AttendancePractice;

import Layout from 'layout';
import React, { ReactElement, useState } from 'react';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import {
  Button,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Swal from 'sweetalert2';
import { AttendancePracticeTo } from 'types/attendance/types';
import { dispatch } from 'store/index';
import { attdPracticeActions } from 'store/slices/hr/attendancePractice/attendancePracticeReducer';
import moment from 'moment';

const AttendancePractice = () => {
  const [empCode, setEmpCode] = useState<string>('');
  const [inOutType, setInOutType] = useState<'IN' | 'OUT'>('IN');

  // ✅ 날짜/시간을 사용자가 직접 설정할 수 있도록 state 추가
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD')); // 기본값: 오늘
  const [time, setTime] = useState<string>(moment().format('HH:mm')); // 기본값: 지금 시간

  const registHandler = () => {
    // ✅ 이제 moment()로 새로 뽑지 않고, 사용자가 입력한 date/time 사용
    const attendancePracticeTO: AttendancePracticeTo = {
      empCode,
      date, // 사용자가 선택한 날짜
      time, // 사용자가 선택한 시간
      inOutType
    };

    console.log('등록 payload:', attendancePracticeTO);
    dispatch(attdPracticeActions.REGIST_INOUT_REQUEST(attendancePracticeTO));
  };

  const submitHandler = () => {
    if (!empCode) {
      Swal.fire({
        icon: 'warning',
        text: '사원번호를 입력하세요.'
      });
    } else if (inOutType === 'IN') {
      Swal.fire({
        title: '입실로 등록하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '예',
        cancelButtonText: '아니오'
      }).then((result) => {
        if (result.isConfirmed) {
          registHandler();
        }
      });
    } else if (inOutType === 'OUT') {
      Swal.fire({
        title: '퇴실로 등록하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '예',
        cancelButtonText: '아니오'
      }).then((result) => {
        if (result.isConfirmed) {
          registHandler();
        }
      });
    }
  };

  return (
    <Page title="출입기록등록">
      <MainCard title="출입기록등록" secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}>
        <CardContent>
          <Grid container spacing={gridSpacing}>
            {/* 사원번호 */}
            <Grid item xs={12} sm={4}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <TextField
                    label="사원번호"
                    value={empCode}
                    onChange={(e) => {
                      setEmpCode(String(e.target.value));
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            {/* 입퇴실 구분 */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="inout-label">입퇴실 구분</InputLabel>
                <Select
                  labelId="inout-label"
                  label="입퇴실 구분"
                  value={inOutType}
                  onChange={(e) => setInOutType(e.target.value as 'IN' | 'OUT')}
                >
                  <MenuItem value="IN">입실</MenuItem>
                  <MenuItem value="OUT">퇴실</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* ✅ 날짜 입력 */}
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <TextField
                  label="날짜"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }} // 라벨 겹치는거 방지
                />
              </FormControl>
            </Grid>

            {/* ✅ 시간 입력 */}
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <TextField
                  label="시간"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 60 }} // 1분 단위
                />
              </FormControl>
            </Grid>

            <Divider />
            <CardActions>
              <Grid container justifyContent="space-between" spacing={0}>
                <Grid item>
                  <AnimateButton>
                    <Button variant="contained" size="large" onClick={submitHandler}>
                      신청
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </CardContent>
      </MainCard>
    </Page>
  );
};

AttendancePractice.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AttendancePractice;
