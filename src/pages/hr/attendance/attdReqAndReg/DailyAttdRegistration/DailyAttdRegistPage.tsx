import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Stack,
  TableContainer,
  Table,
  TextField,
  Button,
  TableBody,
  TableCell,
  TableHead,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableRow
} from '@mui/material';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DailyAttendInsertModal from './DailyAttendInsertModal';
import { dailyAttdEntity } from 'pages/hr/attendance/types/types';
import { dailyAttendAction } from 'store/slices/hr/attendancePractice/DailyAttendReducer';
import Swal from 'sweetalert2';

function DailyAttendRegist() {
  const [insertModal, setInsertModal] = useState<boolean>(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const dispatch = useDispatch();

  const dayAttdlist = useSelector((state: any) => (state.dailyAttend.dayAttdlist !== undefined ? state.dailyAttend.dayAttdlist : []));
  const deptList = useSelector((state: any) => (state.dailyAttend.deptlist !== undefined ? state.dailyAttend.deptlist : []));

  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  //페이지 접근 권한 체크후 true일경우 화면 보여줌
  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 3) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
    }
  }, []);

  // 부서
  const [deptName, setDeptName] = useState('');
  // 부서코드
  const [deptCode, setDeptCode] = useState('');
  // 시작일
  const [startDate, setStartDate] = useState('');
  // 종료일
  const [endDate, setEndDate] = useState('');

  //onToggleInsertHandler이벤트는 setInsertModal의 값이 false일경우 true로 변경해줌
  // 그렇게해서 setInsertModal 띄워줌
  const onToggleInsertHandler = () => {
    setInsertModal((data) => !data);
  };

  //setInsertModal 창을 띄움
  const onClickHandler = (identifier: string) => {
    if (identifier === 'insert') {
      setInsertModal(true);
      return;
    }
  };
  //부서 선택함
  const deptChangeHandler = (value: string) => {
    setDeptCode(value);
  };

  //일근태 조회 버튼 이벤트
  const onSearchClickHandler = () => {
    if (authCheck) {
      console.log('시작일: ' + startDate);
      console.log('완료일: ' + endDate);
      const data = {
        deptCode: deptCode,
        startDate: startDate,
        endDate: endDate,
        type: 'less',
        authLevel: localStorage.getItem('authLevel')
      };
      dispatch(dailyAttendAction.DAILY_ATTEND_SEARCH_FETCH_REQUESTED(data));
    } else {
      Swal.fire({
        icon: 'error',
        title: '권한이 없습니다.'
      });
    }
  };

  const deptLists = deptList.map((item: any) => {
    return (
      <MenuItem value={item.deptCode} key={item.deptCode}>
        {item.deptName}
      </MenuItem>
    );
  });

  //부서 list를 가져오는 액션생성함수
  useEffect(() => {
    console.log('dispatch호출됨');
    dispatch(dailyAttendAction.DEPT_LIST_SEARCH_FETCH_REQUESTED(''));
  }, []);

  return (
    <Page title="일근태 등록">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="일근태 등록"
            secondary={
              <Stack direction="row" spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  {/* <Button className={classes.button} onClick={onCheckAllHandler} sx={{ width: '200' }}>
                  전체 선택
                  </Button> */}
                  <Box sx={{ minWidth: 120, marginBottom: 1 }}>
                    <InputLabel>부서</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        defaultValue="-1"
                        ref={selectRef}
                        onChange={(e) => {
                          deptChangeHandler(String(e.target.value));
                        }}
                      >
                        {deptLists}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="근태조회시작일"
                    name="근태조회시작일"
                    type={'date'}
                    onChange={(event: any) => {
                      setStartDate(event.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="근태조회종료일"
                    name="근태조회종료일"
                    type={'date'}
                    onChange={(event) => {
                      setEndDate(event.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* 
                {modifyModal && <DailyAttendModifyModal toggle={onToggleModifyHandler} emp={selectedEmp} />}
                <Button className={classes.button} onClick={() => onClickHandler('mod')} sx={{ width: '200'}}>
                  일근태 수정
                </Button> 
                */}

                {insertModal && <DailyAttendInsertModal toggle={onToggleInsertHandler} />}
                <Button variant="contained" onClick={() => onSearchClickHandler()} sx={{ width: '200' }}>
                  조회
                </Button>
                <Button variant="contained" onClick={() => onClickHandler('insert')} style={{ width: '200' }}>
                  등록
                </Button>
              </Stack>
            }
          >
            {/* 아래의 코드도 리펙터링을 하자 */}
            {/* table */}
            <TableContainer>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      borderTop: '1px solid black',
                      borderBottom: '3px solid black',
                      marginBottom: '3px',
                      backgroundColor: '#E8D9FF'
                    }}
                  >
                    <TableCell>사원명</TableCell>
                    <TableCell>부서명</TableCell>
                    <TableCell>출근시간</TableCell>
                    <TableCell>퇴근시간</TableCell>
                    <TableCell>근무시간</TableCell>
                    <TableCell>연장근무시간</TableCell>
                    <TableCell>심야근무시간</TableCell>
                    <TableCell>외출시간</TableCell>
                    <TableCell>조퇴시간</TableCell>
                    <TableCell>지각여부</TableCell>
                    <TableCell>마감여부</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dayAttdlist.length !== 0 ? (
                    dayAttdlist.map((emp: dailyAttdEntity) => (
                      <TableRow hover key={emp.empName}>
                        {/* <TableCell sx={{ pl: 3 }} component="th" scope="row">
                          <Checkbox
                            value={emp.empName}
                            color="primary"
                            onChange={(e) => {
                              onCheckedChangeHandler(e);
                            }}
                          />
                        </TableCell> */}
                        <TableCell>{emp.empName}</TableCell>
                        <TableCell>{emp.deptName}</TableCell>
                        <TableCell>{emp.attendTime}</TableCell>
                        <TableCell>{emp.leaveTime}</TableCell>
                        <TableCell>{emp.workHour}</TableCell>
                        <TableCell>{emp.overWorkHour}</TableCell>
                        <TableCell>{emp.nightWorkHour}</TableCell>
                        <TableCell>{emp.briefLeaveTime}</TableCell>
                        <TableCell>{emp.earlyLeaveTime}</TableCell>
                        <TableCell>{emp.latenessStatus}</TableCell>
                        <TableCell>{emp.finalizeStatus}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableCell colSpan={11} align="center">
                      <p>일근태 정보가 없습니다.</p>
                    </TableCell>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
}

DailyAttendRegist.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DailyAttendRegist;
