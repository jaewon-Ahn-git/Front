import React, { ReactElement, useEffect, useState } from 'react';
import {
  Box,
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
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { RootState, useDispatch } from 'store';

import { restAttdTO } from '../attendance/types/types';
import { restAttdActions } from 'store/slices/hr/attendancePractice/restattdPracticeReducer';

// ==============================|| PROFILE 2 ||============================== //

const BreakAttendancePage = () => {
  const dispatch = useDispatch();
  const rawList = useSelector((state: RootState) => state.restAttdPractice.empList); //사원 조회용도

  // 사원코드
  const [empCode, setEmpCode] = useState('');
  // 연차 구분 코드
  const [attdCode, setAttdCode] = useState('');
  // 연차 구분 이름
  const [attdType, setAttdType] = useState('');
  // 시작일
  const [startDate, setStartDate] = useState('');
  // 종료일
  const [endDate, setEndDate] = useState('');
  // 일수
  const [numberOfDays, setNumberOfDays] = useState(0);
  // 사유
  const [cause, setCause] = useState('');
  // 시작 시간
  const [startTime, setStartTime] = useState('');
  // 종료 시간
  const [endTime, setEndTime] = useState('');

  // 사원리스트
  const [empList, setEmpList] = useState<any[]>([]);

  //사원조회하기위함
  useEffect(() => {
    dispatch(restAttdActions.getEmpListRequest());
  }, [dispatch]);

  useEffect(() => {
    setEmpList(rawList);
  }, [rawList]);

  const empLists = empList.map((item) => {
    return (
      <MenuItem value={item.empCode} key={item.empCode}>
        {item.empName}
      </MenuItem>
    );
  });

  const insertEXAttd = () => {
    // 유효성 검사
    if (!attdType) {
      alert('근태구분을 선택 해주세요.');
      return;
    }
    if (!startDate) {
      alert('시작일을 선택 해주세요.');
      return;
    }
    if (!endDate) {
      alert('종료일을 선택 해주세요.');
      return;
    }
    // 연차(전일) 선택 시 시간은 필요 없지만, 유효성 검사를 임시로 비활성화하거나 조건부로 처리해야 할 수 있습니다.
    // 현재는 모든 경우에 시간을 요구하는 유효성 검사를 유지합니다.
    if (!startTime) {
      alert('시작시간을 선택 해주세요.');
      return;
    }
    if (!endTime) {
      alert('종료시간을 선택 해주세요.');
      return;
    }
    if (!numberOfDays) {
      alert('일수계산을 진행 해주세요.');
      return;
    }
    if (!cause) {
      alert('사유를 작성 해주세요.');
      return;
    }

    // 현재 날짜 및 시간 (백엔드의 'YYYY-MM-DD HH24:MI:SS' 포맷에 맞춤)
    const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const restAttdTO = {
      empCode,
      attdCode,
      attdType,
      requestDate: currentTimestamp, // 👈 수정된 부분: 현재 시간까지 포함
      startDate,
      endDate,
      startTime,
      endTime,
      cause
    } as restAttdTO;

    //연차 신청을 하기위해 restAttdTO에 데이터를 담아 api로 보냄
    dispatch(restAttdActions.registBreakAttdRequest(restAttdTO));

    alert('신청이 완료 되었습니다.');
  };

  /* 일수 계산 함수  */
  function calculateNumberOfDays() {
    const startMs = Number(new Date(startDate).getTime());
    //startMs 구하면 밀리초(milliseconds)로 나오게됨.
    console.log('startMs는 몇시', startMs);
    const endMs = Number(new Date(endDate).getTime());
    if (attdType === '오전반차' || attdType === '오후반차') setNumberOfDays(0.5);
    //시간이 밀리초로 나오기 때문에  1000밀리초 * 60초 * 60분 * 24시로 구하게됨
    // +1을 하는 이유는 첫날과 마지막 날을 포함하여 계산하기 때문
    else setNumberOfDays((endMs - startMs) / (1000 * 60 * 60 * 24) + 1);
  }

  return (
    <Page title="연차신청">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard title="연차신청" secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <CardContent>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">연차구분</InputLabel>
                          <Select
                            id="연차구분"
                            value={attdType}
                            label="atdType"
                            onChange={(event) => {
                              setAttdType(event.target.value);
                              if (event.target.value === '오전반차') {
                                setAttdCode('ASC006');
                              } else if (event.target.value === '오후반차') {
                                setAttdCode('ASC007');
                              } else if (event.target.value === '연차') {
                                setAttdCode('ASC005');
                              }
                            }}
                          >
                            <MenuItem value={'오전반차'}>오전반차</MenuItem>
                            <MenuItem value={'오후반차'}>오후반차</MenuItem>
                            <MenuItem value={'연차'}>연차</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">신청자</InputLabel>
                          <Select
                            label="신청자"
                            onChange={(e) => {
                              setEmpCode(String(e.target.value));
                            }}
                          >
                            {empLists}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="시작날짜"
                          type={'date'}
                          onChange={(event) => {
                            setStartDate(event.target.value);
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="종료날짜"
                          type={'date'}
                          onChange={(event) => {
                            setEndDate(event.target.value);
                          }}
                          defaultValue="xxxx-xx-xx"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            value={startTime}
                            label="시작시간"
                            type={'time'}
                            onChange={(e: any) => {
                              setStartTime(e.target.value);
                            }}
                            defaultValue="xx-xx"
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            value={endTime}
                            label="종료시간"
                            type={'time'}
                            onChange={(e: any) => {
                              setEndTime(e.target.value);
                            }}
                            defaultValue="xxxx-xx-xx"
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="일수" value={numberOfDays} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="사유"
                        onChange={(event) => {
                          setCause(event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
            <Divider />
            <CardActions>
              <Grid container justifyContent="space-between" spacing={0}>
                <Grid item>
                  <AnimateButton>
                    <Button variant="contained" size="large" onClick={calculateNumberOfDays}>
                      일수계산
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item>
                  <AnimateButton>
                    <Button variant="contained" size="large" onClick={insertEXAttd}>
                      등록
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </CardActions>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
};

BreakAttendancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BreakAttendancePage;
