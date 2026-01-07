import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Stack,
  TableContainer,
  Table,
  Checkbox,
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
import DailyAttendModifyModal from './DailyAttendModifyModal';
import FinalizeModal from './FinalizeModal';
import { dailyAttdEntity } from 'pages/hr/attendance/types/types';
import { dailyAttendAction } from 'store/slices/hr/attendancePractice/DailyAttendReducer';
import { RootState } from 'store';
import Swal from 'sweetalert2';

function DailyAttendManage() {
  const [handleOk, setHandleOk] = useState<boolean>(false);
  const [modifyModal, setModifyModal] = useState<boolean>(false);
  const [finalizeModal, setFinalizeModal] = useState<boolean>(false);

  // 선택된 사원 (일근태 행)
  const [selectedEmp, setSelectedEmp] = useState<dailyAttdEntity[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const selectRef = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch();

  // dayAttdlist / deptList
  const dayAttdlist = useSelector((state: RootState) => (state.dailyAttend.dayAttdlist !== undefined ? state.dailyAttend.dayAttdlist : []));
  const deptList = useSelector((state: any) => (state.dailyAttend.deptlist !== undefined ? state.dailyAttend.deptlist : []));

  // 부서코드 / 조회일
  const [deptCode, setDeptCode] = useState('');
  const [attdDate, setAttdDate] = useState('');

  // 수정 모달 on/off
  const onToggleModifyHandler = () => {
    setModifyModal((data) => !data);
  };

  // 마감 모달 on/off
  const onToggleFinalizeHandler = () => {
    setFinalizeModal((data) => !data);
  };

  // 수정 / 마감 버튼 클릭 핸들러
  const onClickHandler = (identifier: string) => {
    if (identifier === 'mod') {
      if (selectedEmp.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: '사원을 선택해 주세요.'
        });
        return;
      } else if (selectedEmp.length > 1) {
        Swal.fire({
          icon: 'warning',
          title: '사원 수정은 한번에 한명씩 가능합니다.'
        });
        return;
      }
      setModifyModal(true);
      return;
    } else if (identifier === 'finalize') {
      if (selectedEmp.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: '마감할 사원을 선택해 주세요.'
        });
        return;
      }
      setFinalizeModal(true);
    }
  };

  // 조회 버튼 클릭 핸들러
  const onSearchClickHandler = () => {
    if (!attdDate) {
      Swal.fire({
        icon: 'warning',
        title: '근태 조회 날짜를 선택해 주세요.'
      });
      return;
    }

    console.log('조회일: ' + attdDate);
    console.log('조회 부서: ' + deptCode);

    const data = {
      deptCode: deptCode,
      selectedDate: attdDate,
      type: 'all'
    };

    dispatch(dailyAttendAction.DAILY_ATTEND_SEARCH_FETCH_REQUESTED(data));

    setCheckedItems({});
    setSelectedEmp([]);
  };

  // 마감 모달 OK 처리
  useEffect(() => {
    console.log('handleOk 상태 바뀜!!');
    if (handleOk) {
      dispatch(dailyAttendAction.DAILY_ATTEND_FINALIZE_FETCH_REQUESTED(selectedEmp));
      setHandleOk(false);
    }
  }, [handleOk, dispatch, selectedEmp]);

  // 개별 체크박스 선택/해제
  const onCheckedChangeHandler = (emp: dailyAttdEntity, checked: boolean) => {
    const key = emp.empCode ?? emp.empName;

    setCheckedItems((prev) => ({
      ...prev,
      [key]: checked
    }));

    setSelectedEmp((prev) => {
      if (checked) {
        const exists = prev.find((e) => e.empCode === emp.empCode);
        if (exists) return prev;
        return [...prev, emp];
      } else {
        return prev.filter((e) => e.empCode !== emp.empCode);
      }
    });
  };

  // 전체 사원 선택
  const onCheckAllHandler = () => {
    const updatedCheckedItems: { [key: string]: boolean } = {};
    dayAttdlist.forEach((emp: dailyAttdEntity) => {
      const key = emp.empCode ?? emp.empName;
      updatedCheckedItems[key] = true;
    });
    setCheckedItems(updatedCheckedItems);
    setSelectedEmp([...dayAttdlist]);
  };

  // 최초 로딩 시 부서리스트 조회 + 일근태 초기화
  useEffect(() => {
    dispatch(dailyAttendAction.DEPT_LIST_SEARCH_FETCH_REQUESTED(''));
    dispatch(dailyAttendAction.CLEAR_ATTD_LIST());
  }, [dispatch]);

  // 부서 select 옵션
  const deptLists = deptList.map((item: any) => (
    <MenuItem value={item.deptCode} key={item.deptCode}>
      {item.deptName}
    </MenuItem>
  ));

  // 부서 선택
  const deptChangeHandler = (value: string) => {
    setDeptCode(value);
    console.log('선택 부서: ', value);
  };

  return (
    <Page title="일근태 관리">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard
            title="일근태 관리"
            secondary={
              <Stack direction="row" spacing={2} alignItems="center">
                {/* 전체 사원 선택 */}
                <Button variant="contained" color="primary" onClick={onCheckAllHandler}>
                  전체 사원 선택
                </Button>

                {/* 부서 선택 */}
                <Box sx={{ minWidth: 120 }}>
                  <InputLabel>부서</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      defaultValue="-1"
                      ref={selectRef}
                      value={deptCode || '-1'}
                      onChange={(e) => {
                        const value = String(e.target.value);
                        if (value === '-1') return;
                        deptChangeHandler(value);
                      }}
                    >
                      <MenuItem value="-1" disabled>
                        부서 선택
                      </MenuItem>
                      {deptLists}
                    </Select>
                  </FormControl>
                </Box>

                {/* 조회 날짜 */}
                <TextField
                  fullWidth
                  label="근태 조회일"
                  name="근태조회일"
                  type="date"
                  value={attdDate}
                  onChange={(event) => setAttdDate(event.target.value)}
                  InputLabelProps={{ shrink: true }}
                />

                {/* 조회 버튼 */}
                <Button variant="contained" color="primary" onClick={onSearchClickHandler}>
                  조회
                </Button>

                {/* 수정 */}
                {modifyModal && <DailyAttendModifyModal toggle={onToggleModifyHandler} emp={selectedEmp} />}
                <Button variant="contained" color="primary" onClick={() => onClickHandler('mod')}>
                  수정
                </Button>

                {/* 마감 */}
                {finalizeModal && <FinalizeModal toggle={onToggleFinalizeHandler} setHandleOk={setHandleOk} />}
                <Button variant="contained" color="primary" onClick={() => onClickHandler('finalize')}>
                  마감
                </Button>
              </Stack>
            }
          >
            {/* DAY_ATTD 테이블 */}
            <TableContainer>
              <Table sx={{ minWidth: 350 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      borderTop: '1px solid black',
                      borderBottom: '3px solid black',
                      backgroundColor: '#E8D9FF'
                    }}
                  >
                    <TableCell />
                    <TableCell>사원명</TableCell>
                    <TableCell>부서명</TableCell>
                    <TableCell>출근시간</TableCell>
                    <TableCell>퇴근시간</TableCell>
                    <TableCell>근무시간</TableCell>
                    <TableCell>연장근무</TableCell>
                    <TableCell>심야근무</TableCell>
                    <TableCell>외출시간</TableCell>
                    <TableCell>조퇴시간</TableCell>
                    <TableCell>지각</TableCell>
                    <TableCell>마감</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dayAttdlist.length > 0 ? (
                    dayAttdlist.map((emp: dailyAttdEntity) => {
                      const key = emp.empCode ?? emp.empName;
                      return (
                        <TableRow hover key={key}>
                          <TableCell>
                            <Checkbox
                              checked={checkedItems[key] || false}
                              onChange={(e) => onCheckedChangeHandler(emp, e.target.checked)}
                            />
                          </TableCell>
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
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12} align="center">
                        일근태 정보가 없습니다.
                      </TableCell>
                    </TableRow>
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

DailyAttendManage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DailyAttendManage;
