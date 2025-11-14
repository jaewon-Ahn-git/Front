import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import React, { useState } from 'react';
import Layout from 'layout';
import PropTypes from 'prop-types';
import Page from 'components/hr/Page';
import MainCard from 'components/hr/MainCard';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Swal from 'sweetalert2';
import EmpRegister from './EmpRegister';
import EducationInfo from './EducationInfo';
import FamilyInfo from './FamilyInfo';
import WorkExper from './WorkExper';
import Certification from './Certification';
import LanguageSkills from './LanguageSkills';
import { Grid, Avatar, Box, Tab, Tabs, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerEmpAction } from '../slices/registerEmpReducer';
import { ReactElement, useEffect, useRef } from 'react';
import { certificationTo, educationInfoTo, empRegisterTO, familyInfoTo, languageSkillsTo, workExperTo } from '../../base/types/types';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function RegisterEmp() {
  const dispatch = useDispatch();

  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크
  const [Image, setImage] = useState<string>('/assets/images/users/emp_img_1.avif');
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>();

  //EmpRegister에 넘겨줄 useState
  const [empRegisterBean, setEmpRegisterBean] = useState<empRegisterTO>({
    empName: '',
    birthDate: '',
    mobileNumber: '',
    address: '',
    detailAddress: '',
    employment: '',
    email: '',
    residentId: '',
    deptCode: '',
    gender: '',
    lastSchool: '',
    position: '',
    occupation: '',
    hiredate: '',
    hobong: '',
    postNumber: '',
    deptName: ''
  });

  //EducationInfo에 넘겨줄 useState
  const [educationInfoBean, setEducationInfoBean] = useState<educationInfoTo>({
    schoolName: '',
    major: '',
    entranceDate: '',
    graduateDate: ''
  });

  //FamilyInfo에 넘겨줄 useState
  const [familyInfoBean, setFamilyInfoBean] = useState<familyInfoTo>({
    familyName: '',
    relation: '',
    familyDate: '',
    liveTogether: ''
  });

  //WorkExper에 넘겨줄 useState
  const [workExperBean, setWorkExperBean] = useState<workExperTo>({
    placeOfEmployment: '',
    employmentPeriod: '',
    workedPosition: '',
    jobDuties: '',
    workAddress: ''
  });

  //Certification에 넘겨줄 useState
  const [certificationBean, setCertificationBean] = useState<certificationTo>({
    certificationsName: '',
    certificationsCode: '',
    acquisitionDate: '',
    expirationDate: ''
  });

  //LanguageSkills에 넘겨줄 useState
  const [languageSkillsBean, setLanguageSkillsBean] = useState<languageSkillsTo>({
    testSubject: '',
    testSubjectCode: '',
    subject: '',
    score: ''
  });

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 2) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      Swal.fire({
        icon: 'error',
        title: '접근 권한이 없습니다.'
      });
    }
  }, []);

  const [value, setValue] = useState<number>(0);
  type TabChangeHandler = (event: React.SyntheticEvent, newValue: number) => void;

  const handleChange: TabChangeHandler = (event, newValue) => {
    setValue(newValue);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      let image = window.URL.createObjectURL(file);
      setImage(image);
      setFile(file);
    }
  };

  const upload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append('file', file);

    console.log('empRegisterTO:  ', empRegisterBean);

    const combinedBean = {
      ...empRegisterBean,
      educationInfo: educationInfoBean,
      familyInfo: familyInfoBean,
      workExper: workExperBean,
      certification: certificationBean,
      languageSkills: languageSkillsBean
    };

    console.log(combinedBean);

    const modifiedEmpRegisterBean = {
      combinedBean: combinedBean,
      image: formData
    };

    console.log(' modifiedEmpRegisterTO:  ', modifiedEmpRegisterBean);

    dispatch(registerEmpAction.REGISTER_EMP_REQUSTED(modifiedEmpRegisterBean));
    window.location.reload();
  };

  return (
    <Page title="사원 등록">
      {authCheck ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard content={false} title="사원 등록">
              <Grid mt={3} mb={40} ml={3} pt={3} pl={3} pr={3} container width={1700} spacing={3}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={6} pr={1} md={1.5}>
                    <Grid container item xs={8} md={18}>
                      <Grid item xs={10} md={16}>
                        <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                          <Avatar src={Image} alt="employee" sx={{ width: 150, height: 150, margin: 'auto' }} />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <form encType="multipart/form-data" onSubmit={upload} method="post">
                    <input type="file" name="file" accept="image/jpg,impge/png,image/jpeg" onChange={onChange} ref={fileInput} />
                    {/*여기가 사원 사진을 넣을수 있는 곳이다.*/}
                    <MainCard>
                      <Tabs
                        value={value}
                        indicatorColor="secondary"
                        textColor="secondary"
                        onChange={handleChange}
                        variant="scrollable"
                        aria-label="simple tabs example"
                        sx={{
                          '& a': {
                            fontWeight: 'bold',
                            minHeight: 'auto',
                            minWidth: 10,
                            px: 1,
                            py: 1.5,
                            mr: 2.25,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                          },
                          '& a > svg': {
                            marginBottom: '0px !important',
                            marginRight: 1.25
                          },
                          mb: 3
                        }}
                      >
                        <Tab label="사원정보" {...a11yProps(0)} />
                        <Tab label="학력정보" {...a11yProps(1)} />
                        <Tab label="가족관계" {...a11yProps(2)} />
                        <Tab label="경력사항" {...a11yProps(3)} />
                        <Tab label="자격증" {...a11yProps(4)} />
                        <Tab label="어학능력" {...a11yProps(5)} />
                      </Tabs>

                      <TabPanel value={value} index={0}>
                        <EmpRegister empRegisterSetter={setEmpRegisterBean} />
                      </TabPanel>

                      <TabPanel value={value} index={1}>
                        <EducationInfo educationInfoSetter={setEducationInfoBean} />
                      </TabPanel>

                      <TabPanel value={value} index={2}>
                        <FamilyInfo familyInfoSetter={setFamilyInfoBean} />
                      </TabPanel>

                      <TabPanel value={value} index={3}>
                        <WorkExper workExperSetter={setWorkExperBean} />
                      </TabPanel>

                      <TabPanel value={value} index={4}>
                        <Certification certificationSetter={setCertificationBean} />
                      </TabPanel>

                      <TabPanel value={value} index={5}>
                        <LanguageSkills languageSkillsSetter={setLanguageSkillsBean} />
                      </TabPanel>
                    </MainCard>
                    <Grid item xs={12}>
                      <Stack direction="row">
                        <AnimateButton>
                          <Button sx={{ width: '100px' }} variant="contained" type="submit">
                            등록
                          </Button>
                        </AnimateButton>
                      </Stack>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      ) : (
        <MainCard
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DoDisturbIcon style={{ color: 'red', marginRight: '8px' }} /> {/* 아이콘을 title 옆에 추가합니다. */}
              접근 권한 없음
            </div>
          }
          style={{ textAlign: 'center' }}
        />
      )}
    </Page>
  );
}

RegisterEmp.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RegisterEmp;
