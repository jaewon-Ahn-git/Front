import Layout from 'layout';
import React, { ReactElement, useEffect, useState } from 'react';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import {
  Alert,
  Button,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { RootState, useDispatch } from 'store';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { restAttdTO } from '../attendance/types/types';
import { restAttdActions } from 'store/slices/hr/attendancePractice/restattdPracticeReducer';
import moment from 'moment';

const RestAttdRegistPage = () => {
  const dispatch = useDispatch();
  const rawList = useSelector((state: RootState) => state.restAttdPractice.empList);

  const [empList, setEmpList] = useState<any[]>([]);
  const [empCode, setEmpCode] = useState<string>('');
  const [attdCode, setAttdCode] = useState<string>('');
  const [attdType, setAttdType] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [cause, setCause] = useState<string>('');

  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);

  const reset = () => {
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
    setCause('');
  };

  // 사원리스트 세팅 및 초기 로직 정리
  useEffect(() => {
    dispatch(restAttdActions.getEmpListRequest());
  }, [dispatch]); // dispatch 의존성 추가

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

  // 근태코드 세팅
  const attdTypeSetting = (e: any) => {
    setAttdCode(e.target.value);
    if (e.target.value === 'ADC006') setAttdType('외출');
    else if (e.target.value === 'DAC004') setAttdType('조퇴');
    else if (e.target.value === 'ASC001') setAttdType('병가');
    else if (e.target.value === 'ASC004') setAttdType('공가');
  };

  // 근태외 등록
  const restAttdRegist = () => {
    if (!empCode || !attdCode) {
      Swal.fire({
        icon: 'warning',
        text: '신청자와 근태구분은 필수선택입니다.'
      });
    } else if (!startDate || !endDate) {
      Swal.fire({
        icon: 'warning',
        text: '신청날짜를 선택해주세요.'
      });
    } else if (startDate === endDate && startTime === endTime) {
      Swal.fire({
        icon: 'warning',
        text: '신청 시간이 잘못되었습니다.'
      });
    } else {
      // 💡 신청 버튼 클릭 시 현재 시각을 포함한 신청일시 (requestDate) 계산
      const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');

      const restAttdTO = {
        empCode,
        attdCode,
        attdType,
        requestDate: currentTimestamp, // 💡 시각 포함 값으로 대체
        startDate,
        endDate,
        startTime,
        endTime,
        cause
      } as restAttdTO;
      console.log('추가 폼 :', restAttdTO);

      // restAttdTO에 데이터를 담아 사가->api->리듀서순으로 가게됨
      dispatch(restAttdActions.registRestAttdRequest(restAttdTO));
      // setSnackBarVisible를 보여줌
      setSnackBarVisible(true);
      // 창을 리셋
      reset();
    }
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarVisible(false);
  };

  return (
    <Page title="근태외 신청">
      <MainCard title="근태외 신청" secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}>
        <CardContent>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">신청자</InputLabel>
                  <Select
                    label="신청자"
                    onChange={(e: any) => {
                      setEmpCode(String(e.target.value));
                    }}
                  >
                    {empLists}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 60 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">근태구분</InputLabel>
                  <Select label="근태구분" onChange={(e: any) => attdTypeSetting(e)}>
                    <MenuItem value={'ADC006'}>외출</MenuItem>
                    <MenuItem value={'DAC004'}>조퇴</MenuItem>
                    <MenuItem value={'ASC001'}>병가</MenuItem>
                    <MenuItem value={'ASC004'}>공가</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item>
                <TextField
                  fullWidth
                  value={startDate}
                  label="시작날짜"
                  type={'date'}
                  onChange={(e: any) => {
                    setStartDate(e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item>
                <TextField
                  fullWidth
                  value={endDate}
                  label="종료날짜"
                  type={'date'}
                  onChange={(e: any) => {
                    setEndDate(e.target.value);
                  }}
                  defaultValue="xxxx-xx-xx"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item>
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
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item>
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
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item>
                <TextField
                  fullWidth
                  value={cause}
                  label="사유"
                  type={'text'}
                  onChange={(e: any) => {
                    setCause(e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Divider />
            <CardActions>
              <Grid container justifyContent="space-between" spacing={0}>
                <Grid item>
                  <AnimateButton>
                    <Button variant="contained" size="large" onClick={() => restAttdRegist()}>
                      신청
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </CardContent>
      </MainCard>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackBarVisible}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert severity="success">근태외 신청완료</Alert>
      </Snackbar>
    </Page>
  );
};

RestAttdRegistPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RestAttdRegistPage;
