import {useEffect, useState} from 'react';
// project imports
import Page from 'components/ui-component/Page';
import { gridSpacing } from 'store/constant';
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField
  } from '@mui/material';
import { useSelector } from 'react-redux';
import styles from '../types/CertificationPage.module.css'

function CertificateOfEmployment(props: { deptName: string, empName: string; }) {

  const empDetailList = useSelector((state: any) => (state.certificateIssuanceReducer.empDetailList !== undefined ? state.certificateIssuanceReducer.empDetailList : []));
  
  const [deptName, setDeptName] = useState<string>('');
  const [empName, setEmpName] = useState<string>('');
  const [residentId, setResidentId] = useState<string|undefined|null>('');
  const [address, setAddress] = useState<string|undefined|null>('');
  const [position, setPosition] = useState<string|undefined|null>('');
  const [hiredate, setHireDate] = useState<string|undefined|null>('');
  const [retiredate, setRetireDate] = useState<string|undefined|null>('');
  const [reasonOfRetirement, setReasonOfRetirement] = useState<string|undefined|null>('');
  const [companyAddress, setCompanyAddress] = useState<string|undefined|null>('경상남도 진주시 가좌길74번길 8 혜람빌딩 5층');

  const currentDate = new Date();
  const currentYear = String(currentDate.getFullYear());
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // 한 자리 숫자인 경우 앞에 0을 붙임
  const currentDay = String(currentDate.getDate()).padStart(2, '0');

  const [year, setYear] = useState<string>(currentYear);
  const [month, setMonth] = useState<string>(currentMonth);
  const [day, setDay] = useState<string>(currentDay);

  useEffect(() => {
    console.log('CertificateOfRetirement의 deptName이 리렌더링됨');
    setDeptName(props.deptName);
  }, [props.deptName]);
  useEffect(() => {
    console.log('CertificateOfRetirement의 empName이 리렌더링됨');
    setEmpName(props.empName);
  }, [props.empName]);

  
  useEffect(() => {
    console.log("empDetailList값 바뀜", empDetailList);
    if(empDetailList.length !== 0){
    setResidentId(empDetailList[0]?.residentId);
    setAddress(empDetailList[0]?.address);
    setPosition(empDetailList[0]?.position);
    const hiredate = empDetailList[0]?.hiredate;  // 고용된 날짜 가져오기
    const trimmedHireDate = hiredate.slice(0, 10); // 시간 부분을 제외하고 년월일만 나오게 함
    setHireDate(trimmedHireDate);
    setRetireDate(empDetailList[0]?.retiredate);
    }
   }, [empDetailList]);

  const handleAttrChange = (identifier: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // 이벤트 핸들러 내용
    if(identifier === 'empName'){
      setEmpName(event.target.value);
    }else if(identifier === 'residentId'){
      setResidentId(event.target.value);
    }else if(identifier === 'address'){
      setAddress(event.target.value);
    }else if(identifier === 'deptName'){
      setDeptName(event.target.value);
    }else if(identifier === 'position'){
      setPosition(event.target.value);
    }else if(identifier === 'hiredate'){
      setHireDate(event.target.value);
    }else if(identifier === 'year'){
      setYear(event.target.value);
    }else if(identifier === 'month'){
      setMonth(event.target.value);
    }else if(identifier === 'day'){
      setDay(event.target.value);
    }else if(identifier === 'retiredate'){
      setRetireDate(event.target.value);
    }else if(identifier === 'reason'){
      setReasonOfRetirement(event.target.value);
    }else if(identifier === 'companyAddress'){
      setCompanyAddress(event.target.value);
    }
  };

  return (
    <Page style={{textAlign: 'center'}} title="퇴직증명서" className={styles.page}>
      <Grid container spacing="auto" item xs>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}> {/* 전체 너비로 설정 */}
            <h1 style={{ textAlign: 'center' }}>
              퇴직증명서
            </h1>
          </Grid>
          <Grid item xs={12} style={{ width: '100%', overflowX: 'visible' }}>
          <TableContainer>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableBody>
                  <TableRow
                   sx={{
                    borderTop: '1px solid black',
                    borderBottom: '3px solid black',
                    marginBottom: '3px'
                  }}
                  >
                    <TableCell>성명</TableCell>
                    <TableCell>
                      <TextField value={empName} onChange={handleAttrChange('empName')} />
                    </TableCell>
                    <TableCell>주민등록번호</TableCell>
                    <TableCell>
                      <TextField value={residentId} onChange={handleAttrChange('residentId')}/>
                    </TableCell>
                  </TableRow>
                 
                  <TableRow
                   sx={{
                    borderTop: '1px solid black',
                    borderBottom: '3px solid black',
                    marginBottom: '3px'
                  }}>
                    <TableCell>소속</TableCell>
                    <TableCell>
                      <TextField value={deptName} onChange={handleAttrChange('deptName')}/>
                    </TableCell>
                    <TableCell>직위</TableCell>
                    <TableCell>
                      <TextField value={position} onChange={handleAttrChange('position')}/>
                    </TableCell>
                  </TableRow>
                  <TableRow
                   sx={{
                    borderTop: '1px solid black',
                    borderBottom: '3px solid black',
                    marginBottom: '3px'
                  }}>
                    <TableCell>입사년월일</TableCell>
                    <TableCell>
                      <TextField value={hiredate} onChange={handleAttrChange('hiredate')}/>
                    </TableCell>
                    <TableCell>퇴직일자</TableCell>
                    <TableCell>
                      <TextField value={retiredate} onChange={handleAttrChange('retiredate')}/>
                    </TableCell>
                  </TableRow>
                  <TableRow
                   sx={{
                    borderTop: '1px solid black',
                    borderBottom: '3px solid black',
                    marginBottom: '3px'
                  }}
                  >
                    <TableCell>퇴직사유</TableCell>
                    <TableCell>
                      <TextField value={reasonOfRetirement} onChange={handleAttrChange('reason')} sx={{ width: '140%' }}/>
                    </TableCell>
                  </TableRow>
                  <TableRow
                   sx={{
                    borderTop: '1px solid black',
                    borderBottom: '3px solid black',
                    marginBottom: '3px'
                  }}>
                    <TableCell>주소</TableCell>
                    <TableCell>
                      <TextField value={address} onChange={handleAttrChange('address')} sx={{ width: '140%' }}/>
                    </TableCell>
                  </TableRow>
                  <TableRow
                   sx={{
                    borderTop: '1px solid black',
                    borderBottom: '3px solid black',
                    marginBottom: '3px'
                  }}>
                    <TableCell>근무처주소</TableCell>
                    <TableCell>
                      <TextField value={companyAddress} onChange={handleAttrChange('companyAddress')} sx={{ width: '140%' }}/>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            </Grid>
            <Grid item xs={12}> {/* 전체 너비로 설정 */}
            <h4 style={{ textAlign: 'center' }}>
              상기와 같이 퇴직하였음을 증명합니다.
            </h4>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Grid justifyContent="flex-end">
            <TextField value={year} sx={{ height: '1%', width: '12%'}} onChange={handleAttrChange('year')}></TextField> 년
            <TextField value={month} sx={{ height: '1%', width: '8%'}} onChange={handleAttrChange('month')}></TextField> 월
            <TextField value={day} sx={{ height: '1%', width: '8%'}} onChange={handleAttrChange('day')}></TextField> 일
            </Grid>
            </Grid>
            <Grid item xs={12}> {/* 전체 너비로 설정 */}
            <h2 style={{ textAlign: 'center' }}>
              서울IT교육회사[직인]<br/><br/> 대표이사 진양철
            </h2>
            </Grid>
        </Grid>
      </Grid>
    </Page>
   );
}

export default CertificateOfEmployment;
