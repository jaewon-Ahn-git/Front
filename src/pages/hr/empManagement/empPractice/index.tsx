import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Layout from 'layout';
import { ReactElement, useEffect, useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Page from 'ui-component/Page';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classes from '../../../../styles/hr/empmanagement/empInfo.module.css';
import { empInfoAction } from 'pages/hr/empManagement/slices/empInfoReducer';
import { useDispatch, useSelector } from 'react-redux';
import { EmpInfoEntity } from 'pages/hr/empManagement/types/empManagementTypes';
import EmpInfoPractice from './empInfoPractice';
import DetailModal from './DetailModalTab/DetailModal';

const selectData: { deptCode: string; deptName: string }[] = [
  { deptCode: '000000', deptName: '전체부서' },
  { deptCode: 'DEP000', deptName: '회계팀' },
  { deptCode: 'DEP001', deptName: '인사팀' },
  { deptCode: 'DEP002', deptName: '전산팀' },
  { deptCode: 'DEP003', deptName: '보안팀' },
  { deptCode: 'DEP004', deptName: '개발팀' }
];

function Practice1() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedEmpCode, setSelectedEmpCode] = useState<string | null>(null);
  // ✅ 기본값 없음: 사용자가 선택하기 전엔 조회 안 함
  const [deptCode, setDeptCode] = useState<string>('');
  const [modal, setModal] = useState(false);
  // ✅ 안전한 접근
  const empList = useSelector((state: any) => state.empManagement?.empInfo?.empList ?? []);

  useEffect(() => {
    console.log('empList from selector: ', empList);
    console.log('empList.length: ', empList.length);
  }, [empList]);

  const selectedEmp = useMemo(() => empList.find((e: EmpInfoEntity) => e.empCode === selectedEmpCode) ?? null, [empList, selectedEmpCode]);

  const onSearch = () => {
    console.log('CLICK deptCode =', deptCode);
    if (!deptCode) return; // 선택 전이면 아무 것도 안 함(또는 토스트/알림)
    dispatch(empInfoAction.EMP_FETCH_REQUESTED(deptCode));
  };

  return (
    <Page title="사원정보 조회 및 등록">
      <Grid>
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="사원정보 조회 및 등록"
            secondary={
              <Stack direction="row" spacing={1}>
                <Button onClick={() => router.push('/hr/empManagement/empPractice/empRegisterPractice')}>등록</Button>
                <Button>수정</Button>
                <Button>삭제</Button>
                <Button onClick={onSearch} disabled={!deptCode}>
                  조회
                </Button>
                <Button
                  onClick={() => {
                    setModal(true);
                  }}
                  disabled={!selectedEmpCode}
                >
                  상세조회
                </Button>
                <div>
                  <select
                    value={deptCode}
                    onChange={(e) => setDeptCode(e.target.value)} // ✅ 상태만 변경, dispatch 안 함
                    className={classes.select}
                  >
                    <option value="" disabled>
                      부서 선택
                    </option>{' '}
                    {/* ✅ placeholder */}
                    {selectData.map((data) => (
                      <option key={data.deptCode} className={classes.option} value={data.deptCode}>
                        {data.deptName}
                      </option>
                    ))}
                  </select>
                </div>
              </Stack>
            }
          >
            <TableContainer>
              <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow
                    sx={{
                      borderTop: '1px solid black',
                      borderBottom: '3px solid black',
                      marginBottom: '3px',
                      backgroundColor: '#E8D9FF'
                    }}
                  >
                    <TableCell>선택</TableCell>
                    <TableCell>사원코드</TableCell>
                    <TableCell>사원명</TableCell>
                    <TableCell>이메일</TableCell>
                    <TableCell>휴대폰</TableCell>
                    <TableCell>성별</TableCell>
                    <TableCell>주소</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ background: 'white' }}>
                  {empList.map((emp: EmpInfoEntity) => (
                    <EmpInfoPractice
                      key={emp.empCode}
                      emp={emp}
                      selectedEmpCode={selectedEmpCode}
                      setSelectedEmpCode={setSelectedEmpCode}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
          {modal === true ? <DetailModal selectedEmp={selectedEmp} onClose={() => setModal(false)} /> : null}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Page>
  );
}

Practice1.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Practice1;
