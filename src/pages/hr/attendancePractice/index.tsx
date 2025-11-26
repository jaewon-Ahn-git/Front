import Layout from 'layout';
import React, { ReactElement, useEffect, useState } from 'react';
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

const AttendancePractice = () => {
  const [empCode, setEmpCode] = useState<string>('');
  const [inOutType, setInOutType] = useState<'IN' | 'OUT'>('IN');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${day}`);

    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    setTime(`${hh}:${mm}`);
  }, []);

  const registHandler = () => {
    // 출입기록 등록에 필요한 payload 생성
    const attendancePracticeTO: AttendancePracticeTo = {
      empCode,
      date,
      time,
      inOutType
    };

    console.log('등록 payload:', attendancePracticeTO);

    // ↓↓↓ 나중에 여기 dispatch 넣으면 됨
    // dispatch(attdActions.registInOutRequest(attendancePracticeTO));
  };

  const submitHandler = () => {
    if (!empCode) {
      Swal.fire({
        icon: 'warning',
        text: '사원번호를 입력하세요.'
      });
    } else if (inOutType == 'IN') {
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
    } else if (inOutType == 'OUT') {
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
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <TextField
                    label="사원번호"
                    onChange={(e: any) => {
                      setEmpCode(String(e.target.value));
                    }}
                  ></TextField>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="날짜"
                type="date"
                value={date}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="시간"
                type="time"
                value={time}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 60 }} // 60초 단위 → 분단위 입력
                onChange={(e) => setTime(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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

            <Divider />
            <CardActions>
              <Grid container justifyContent="space-between" spacing={0}>
                <Grid item>
                  <AnimateButton>
                    <Button variant="contained" size="large" onClick={() => submitHandler()}>
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
