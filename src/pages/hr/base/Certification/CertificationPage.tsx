import { ReactElement, useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { certificateIssuanceAction } from 'store/redux-saga/reducer/base/certificateIssuanceReducer';
import { dailyAttendAction } from 'store/redux-saga/reducer/attendance/DailyAttendReducer';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';

import CertificateOfEmployment from './CertificateOfEmployment';
import CertificateOfRetirement from './CertificateOfRetirement';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select
  } from '@mui/material';


function CertificationPage() {

  const dispatch = useDispatch();
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "@page { size: 210mm 297mm }",
    documentTitle: 'certificate'
  });

  const [empCode, setEmpCode] = useState<number | string>(-1);
  const [deptCode, setDeptCode] = useState<number | string>(-1);
  const [certificate, setCertificate] = useState<number | string>(-1);

  //재직증명서에 기재될 값들
  const [deptName, setDeptName] = useState<string>('');
  const [empName, setEmpName] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);


  const selectRef = useRef<HTMLSelectElement>(null);
  
  const empList = useSelector((state: any) => (state.dailyAttend.empList !== undefined ? state.dailyAttend.empList : []));
  const deptList = useSelector((state: any) => (state.dailyAttend.deptlist !== undefined ? state.dailyAttend.deptlist : []));


  const certificateList = ['재직증명서', '경력증명서', '퇴직증명서'];

  useEffect(() => {
    console.log('dispatch호출됨');
    dispatch(dailyAttendAction.DEPT_LIST_SEARCH_FETCH_REQUESTED(''));
  }, []);

  useEffect(() => {
    console.log('deptName값 바뀜');
  }, [deptName]);

  //부서 선택함
  const deptChangeHandler = (value: string) => {
    setDeptCode(value);
    console.log(value);
    const selectedDept = deptList.find((dept: { deptCode: any; }) => dept.deptCode === value);
    console.log('selectedDept: ' + selectedDept);
    const selectedDeptName = selectedDept ? selectedDept.deptName : ''; // 선택된 부서의 이름
    setDeptName(selectedDeptName);
    dispatch(dailyAttendAction.DAILY_ATTEND_SEARCH_EMPLIST_FETCH_REQUESTED(value));
    
  };

   //사원 선택함
   const empChangeHandler = (value: string) => {
    setEmpCode(value);
    console.log(value);
    const selectedEmp = empList.find((emp: { empCode: any; }) => emp.empCode === value);
    console.log('selectedEmp: ' + selectedEmp);
    const selectedEmpName = selectedEmp ? selectedEmp.empName : ''; // 선택된 부서의 이름
    setEmpName(selectedEmpName);
  };

  useEffect(() => {
    //증명서 선택하고 나면 사원코드에 따른 사원의 주소, 주민등록번호, 직위 가져오기
    if(empCode != -1){
    dispatch(certificateIssuanceAction.EMP_DETAIL_LIST_SEARCH_FETCH_REQUESTED(empCode));
    }
  }, [empCode]);


  //증명서 선택함
  const certificateChangeHandler = (value: string) => {
    setCertificate(value);
    console.log(value);
  };

  const empNameClickHandler = () => {
    console.log('empList: ' + empList);
    if (Number(deptCode) === -1) {
      alert('부서를 먼저 선택해주세요.');
    }
  };
  const empLists = empList.map((item: any) => {
      return (
        <MenuItem value={item.empCode} key={item.empCode}>
          {item.empName}
        </MenuItem>
      );
  });

  const deptLists = deptList.map((item: any) => {
      return (
        <MenuItem value={item.deptCode} key={item.deptCode}>
          {item.deptName}
        </MenuItem>
      );
  });

  const handlePreviewClick = () => {
    setVisible(true);
  };



  return (
    <Page style={{ display: 'flex'}} title="증명서 발급" >
    <div style={{ flex: 1 }}>
      <Grid container spacing={1} alignItems="left">
        <Grid item xs={9} sm={3}>
          <FormControl fullWidth style={{  width: '100%', marginBottom: '10px', fontSize: '14px' }}>
            <InputLabel>부서</InputLabel>
            <Select
              defaultValue="-1"
              ref={selectRef}
              onChange={(e) => {
                deptChangeHandler(String(e.target.value));
                console.log("이름:", e.target.name);
              }}
            >
              {deptLists}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} sm={3}>
          <FormControl fullWidth style={{  width: '100%',  marginBottom: '10px', fontSize: '14px' }}>
            <InputLabel>사원명</InputLabel>
            <Select
              defaultValue="-1"
              onChange={(e) => {
                empChangeHandler(String(e.target.value));
              }}
              onClick={empNameClickHandler}
            >
              {empLists}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} sm={3}>
          <FormControl fullWidth style={{  width: '100%', marginBottom: '10px', fontSize: '14px' }}>
            <InputLabel>증명서</InputLabel>
            <Select
              defaultValue="-1"
              onChange={(e) => {
                certificateChangeHandler(String(e.target.value));
              }}
            >
              {certificateList.map((certificate, index) => (
                <MenuItem value={certificate} key={index}>{certificate}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
       
      </Grid>
      <Button onClick={handlePreviewClick}>증명서 미리보기</Button>
      <Button onClick={handlePrint}>증명서 출력</Button>
    </div>
        <div ref={componentRef} style={{ width: '100%', height: window.innerHeight, overflow: 'visible', flex:2}}>
          {visible && certificate === certificateList[0] && (
            <CertificateOfEmployment deptName={deptName} empName={empName} />
          )}
          {visible && certificate === certificateList[2] && (
            <CertificateOfRetirement deptName={deptName} empName={empName} />
          )}
        </div>
   </Page> 
  );
}
CertificationPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CertificationPage;
