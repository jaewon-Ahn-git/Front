import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import React, { useState } from 'react';
import Layout from 'layout';
import PropTypes from 'prop-types';
import Page from 'components/hr/Page';
import MainCard from 'components/hr/MainCard';
import { Grid, Box, Tab, Tabs, Button, Stack } from '@mui/material';
import { ReactElement } from 'react';
import RegisterPractice from './EmpInfoRegister';
import { dispatch } from 'store';
import { REGISTER_EMP_REQUESTED } from '../../slices/registerEmpReducer';
import EducationRegister from './EducationInfoRegister';
import { EmpInfoEntity } from '../../types/empManagementTypes';

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
      <Box sx={{ p: 0, display: value === index ? 'block' : 'none' }}>{children}</Box>
    </div>
  );
}

function tabIndex(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function EmpRegisterPractice() {
  const [value, setValue] = useState<number>(0);
  type TabChangeHandler = (event: React.SyntheticEvent, newValue: number) => void;
  const handleChange: TabChangeHandler = (event, newValue) => {
    setValue(newValue);
  };

  const [empRegisterBean, setEmpRegisterBean] = useState<EmpInfoEntity>({
    empName: '',
    empCode: '',
    birthDate: '',
    residentId: '',
    gender: '',
    mobileNumber: '',
    address: '',
    detailAddress: '',
    postNumber: '',
    email: '',
    deptCode: '',

    educationInfoList: [
      {
        lastSchool: '',
        schoolName: '',
        major: '',
        entranceDate: '',
        graduateDate: ''
      }
    ]
  });

  const initialEmpRegisterBean: EmpInfoEntity = {
    empName: '',
    empCode: '',
    birthDate: '',
    residentId: '',
    gender: '',
    mobileNumber: '',
    address: '',
    detailAddress: '',
    postNumber: '',
    email: '',
    deptCode: '',

    educationInfoList: [
      {
        lastSchool: '',
        schoolName: '',
        major: '',
        entranceDate: '',
        graduateDate: ''
      }
    ]
  };

  const empalertHandler = () => {
    if (empRegisterBean.empName === '') {
      alert('사원명을 입력해 주세요.');
      return;
    } else if (empRegisterBean.empCode === '') {
      alert('사원번호를 입력해주세요.');
      return;
    } else if (empRegisterBean.deptCode === '') {
      alert('부서를 선택해 주세요.');
      return;
    } else if (empRegisterBean.residentId === '') {
      alert('주민등록번호를 입력해주세요.');
      return;
    } else if (empRegisterBean.gender === '') {
      alert('성별을 선택해 주세요.');
      return;
    } else if (empRegisterBean.mobileNumber === '') {
      alert('전화번호를 입력해주세요.');
      return;
    } else if (empRegisterBean.address === '') {
      alert('주소를 입력해 주세요.');
      return;
    } else if (empRegisterBean.detailAddress === '') {
      alert('세부주소를 입력해 주세요.');
      return;
    } else if (empRegisterBean.postNumber === '') {
      alert('우편번호를 입력해 주세요.');
      return;
    } else if (empRegisterBean.email === '') {
      alert('올바른 이메일을 입력해 주세요.');
      return;
    }
  };

  const edualertHandler = () => {
    if (empRegisterBean.educationInfoList?.[0]?.lastSchool === '') {
      alert('최종학력을 입력해 주세요.');
      return;
    } else if (empRegisterBean.educationInfoList?.[0]?.schoolName === '') {
      alert('학교명을 입력해주세요.');
      return;
    } else if (empRegisterBean.educationInfoList?.[0]?.major === '') {
      alert('전공을 입력해주세요.');
      return;
    } else if (empRegisterBean.educationInfoList?.[0]?.entranceDate === '') {
      alert('입학일을 선택해 주세요.');
      return;
    } else if (empRegisterBean.educationInfoList?.[0]?.graduateDate === '') {
      alert('졸업일을 선택해 주세요.');
      return;
    }
  };

  return (
    <Page title="사원 등록">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard content={false} title="사원 등록">
            <Grid mt={3} mb={40} ml={3} pt={3} pl={3} pr={3} container width={1700} spacing={3}>
              <Grid container spacing={gridSpacing}>
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
                    <Tab label="사원정보" {...tabIndex(0)} />
                    <Tab label="학력정보" {...tabIndex(1)} />
                  </Tabs>

                  <TabPanel value={value} index={0}>
                    <RegisterPractice empRegisterBean={empRegisterBean} setEmpRegisterBean={setEmpRegisterBean} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <EducationRegister empRegisterBean={empRegisterBean} setEmpRegisterBean={setEmpRegisterBean} />
                  </TabPanel>
                </MainCard>
                <Grid item xs={12}>
                  <Stack direction="row">
                    <AnimateButton>
                      <Button
                        sx={{ width: '100px' }}
                        variant="contained"
                        type="button"
                        onClick={() => {
                          if (value == 0) {
                            empalertHandler();
                          } else {
                            edualertHandler();
                          }
                          console.log(empRegisterBean);
                          dispatch(REGISTER_EMP_REQUESTED(empRegisterBean));
                          setEmpRegisterBean(initialEmpRegisterBean);
                        }}
                      >
                        등록
                      </Button>
                    </AnimateButton>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
}

EmpRegisterPractice.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EmpRegisterPractice;
