import React, { useEffect, useState, useRef, ChangeEventHandler } from 'react';

import { gridSpacing } from 'store/constant';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, TextField } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { empCardAction } from 'pages/hr/empManagement/slices/empCardReducer';
import { ModifyEmpInfoEntity } from '../types/empManagementTypes';
import { RootState } from 'store/reducer';

// 코드가 긴 관계로 각각의 입력값에 따른 유효성 검사 로직은 작성하지 않았습니다.
export default function EmpModifyModal(props: { toggle: () => void; empCode: string }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  // 모달은 항상 열려있음
  // ---> 부모 컴포넌트의 state를 통해서 보여주거나, 보여주지 않게 할수 있음
  const [open, setOpen] = React.useState(true);

  const empCardTO = useSelector((state: RootState) => (state.empcardReducer.empCard !== undefined ? state.empcardReducer.empCard : []));

  // 타입스크립트 지정 ModifyEmpInfoEntity함
  // state의 초기값으로 empCardTO에 전달
  const [empCard, setEmpCard] = useState<ModifyEmpInfoEntity>(empCardTO);

  // 이거는 화면을 처음 그릴 때 즉, 마운트 할 때 dispatch를 해서 사원에 대한 정보를 인사기록카드에 기재해주기 위함이다.
  //그니까 사용자가 사원을 선택하고 인사기록카드버튼을 누르면 이 화면이 뜨는데 화면에 바로 그 사원에 대한 상세 정보가 인사기록카드에 보이게 됨.
  useEffect(() => {
    console.log('dispatch호출됨');
    dispatch(empCardAction.EMP_CARD_REQUESTED(props.empCode));
  }, []);

  // empCardTO 상태가 변경될 때마다 'empCardTO' 상태를 업데이트하고, 변경된 상태를 확인하는 로그를 찍어봄.
  useEffect(() => {
    setEmpCard(empCardTO);
    console.log('empCard 상태 바뀜', empCard);
    console.log('empCardTO 상태 바뀜', empCardTO);
  }, [empCardTO]);

  // handleInputChange 이벤트는 인사기록카드에 입력값을 변경하는 이벤트
  // modifyEmpBean 객체에 기존의 empCard 상태를 복사한 후 입력창에 값이 바뀌게 되면
  // setEmpCard(modifyEmpBean); 통해서 modifyEmpBean 객체에 새로 값이 저장이 된다.
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const modifyEmpBean = {
      ...empCard,
      [e.target.name]: e.target.value
    };
    console.log('modifyEmpBean:  ', modifyEmpBean);
    setEmpCard(modifyEmpBean);
  };

  // 인사기록카드를 수정후 저장하기 위한 이벤트
  // 수정후 저장하기위해 saga호출
  const handleSave = () => {
    console.log('handleSave : ', handleSave);
    dispatch(empCardAction.EMP_CARD_UPDATE_REQUESTED(empCard));
    props.toggle();
  };

  // 인사기록카드를 수정후 모달창을 닫기위한 이벤트
  const handleClose = () => {
    props.toggle();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        sx={{ border: '5px solid black', marginBottom: '20px', margin: 'auto' }}
        scroll={'paper'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {open && (
          <>
            <Box>
              <DialogTitle id="form-dialog-title">인사기록카드</DialogTitle>
              <DialogContent>
                <Grid container spacing="auto" item xs>
                  <Grid container spacing={gridSpacing}>
                    {/* <Grid item xs={6} pr={70} md={1.5}>
                      <Grid container xs={8} spacing={2} md={18}>
                        <Grid item xs={10} md={16}>
                          <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                            <img src={Image} alt="employee" style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto' }} />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid> */}
                    <Grid item md={6} xs={12}>
                      <InputLabel>사원명</InputLabel>
                      <TextField name="empName" id="outlined-basic1" value={empCard.empName} fullWidth />
                    </Grid>
                    {/* <Grid item md={6} xs={12}>
                      <InputLabel>호봉</InputLabel>
                      <TextField id="outlined-basic5" name='date' fullWidth onChange={fieldChangeHandler} />
                    </Grid> */}
                    <Grid item md={6} xs={12}>
                      <InputLabel>취업날짜</InputLabel>
                      <TextField
                        id="outlined-basic5"
                        name="hiredate"
                        onChange={handleInputChange}
                        value={empCard.hiredate}
                        type="date"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>직종</InputLabel>
                      <TextField id="outlined-basic5" name="occupation" onChange={handleInputChange} value={empCard.occupation} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>취업타입</InputLabel>
                      <TextField
                        id="outlined-basic5"
                        name="employmentType"
                        onChange={handleInputChange}
                        value={empCard.employmentType}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>생년월일</InputLabel>
                      <TextField
                        id="outlined-basic16"
                        name="birthDate"
                        onChange={handleInputChange}
                        value={empCard.birthDate}
                        type="date"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>성별</InputLabel>
                      <TextField
                        aria-readonly={true}
                        name="gender"
                        onChange={handleInputChange}
                        value={empCard.gender}
                        id="outlined-basic1"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>휴대폰 번호</InputLabel>
                      <TextField
                        id="outlined-basic5"
                        name="mobileNumber"
                        onChange={handleInputChange}
                        value={empCard.mobileNumber}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>주소</InputLabel>
                      <TextField id="outlined-basic6" name="address" onChange={handleInputChange} value={empCard.address} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>세부주소</InputLabel>
                      <TextField
                        id="outlined-basic7"
                        name="detailAddress"
                        onChange={handleInputChange}
                        value={empCard.detailAddress}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>우편번호</InputLabel>
                      <TextField id="outlined-basic8" name="postNumber" onChange={handleInputChange} value={empCard.postNumber} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>이메일</InputLabel>
                      <TextField
                        id="outlined-basic9"
                        name="email"
                        onChange={handleInputChange}
                        value={empCard.email}
                        type="email"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>최종학력</InputLabel>
                      <TextField id="outlined-basic8" name="lastSchool" onChange={handleInputChange} value={empCard.lastSchool} fullWidth />
                    </Grid>

                    {/* 학력사항 */}

                    <Grid item md={6} xs={12}>
                      <InputLabel>고등학교이름</InputLabel>
                      <TextField
                        id="outlined-basic10"
                        name="highSchoolName"
                        onChange={handleInputChange}
                        value={empCard.highSchoolName}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>전공</InputLabel>
                      <TextField id="outlined-basic12" name="major" onChange={handleInputChange} value={empCard.major} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>입학날자</InputLabel>
                      <TextField
                        id="outlined-basic11"
                        name="entranceDate"
                        onChange={handleInputChange}
                        value={empCard.entranceDate}
                        type="date"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>졸업날자</InputLabel>
                      <TextField
                        id="outlined-basic13"
                        name="graduateDate"
                        onChange={handleInputChange}
                        value={empCard.graduateDate}
                        type="date"
                        fullWidth
                      />
                    </Grid>

                    {/* 가족관계 */}

                    <Grid item md={6} xs={12}>
                      <InputLabel>가족이름</InputLabel>
                      <TextField
                        id="outlined-basic14"
                        name="familyName"
                        onChange={handleInputChange}
                        value={empCard.familyName}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>관계</InputLabel>
                      <TextField id="outlined-basic15" name="relation" onChange={handleInputChange} value={empCard.relation} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>가족생일</InputLabel>
                      <TextField
                        id="outlined-basic16"
                        name="familyBirthdate"
                        onChange={handleInputChange}
                        value={empCard.familyBirthdate}
                        fullWidth
                        type="date"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>동거여부</InputLabel>
                      <TextField
                        id="outlined-basic17"
                        name="liveTogether"
                        onChange={handleInputChange}
                        value={empCard.liveTogether}
                        fullWidth
                      />
                    </Grid>

                    {/* 경력사항 */}

                    <Grid item md={6} xs={12}>
                      <InputLabel>근무처</InputLabel>
                      <TextField
                        id="outlined-basic18"
                        name="placeOfEmployment"
                        onChange={handleInputChange}
                        value={empCard.placeOfEmployment}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>근무경력</InputLabel>
                      <TextField
                        id="outlined-basic19"
                        name="employmentPeriod"
                        onChange={handleInputChange}
                        value={empCard.employmentPeriod}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>직위</InputLabel>
                      <TextField
                        id="outlined-basic20"
                        name="employmentPosition"
                        onChange={handleInputChange}
                        value={empCard.employmentPosition}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>직무</InputLabel>
                      <TextField id="outlined-basic21" name="jobDuties" onChange={handleInputChange} value={empCard.jobDuties} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>직장주소</InputLabel>
                      <TextField
                        id="outlined-basic22"
                        name="workAddress"
                        onChange={handleInputChange}
                        value={empCard.workAddress}
                        fullWidth
                      />
                    </Grid>

                    {/* 어학능력 */}

                    <Grid item md={6} xs={12}>
                      <InputLabel>시험과목</InputLabel>
                      <TextField
                        id="outlined-basic23"
                        name="testSubject"
                        onChange={handleInputChange}
                        value={empCard.testSubject}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>외국어명</InputLabel>
                      <TextField id="outlined-basic24" name="subject" onChange={handleInputChange} value={empCard.subject} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>점수</InputLabel>
                      <TextField id="outlined-basic25" name="score" onChange={handleInputChange} value={empCard.score} fullWidth />
                    </Grid>
                    {/* 자격증 */}
                    <Grid item md={6} xs={12}>
                      <InputLabel>자격증</InputLabel>
                      <TextField
                        id="outlined-basic26"
                        name="certificationsName"
                        onChange={handleInputChange}
                        value={empCard.certificationsName}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>취득일</InputLabel>
                      <TextField
                        id="outlined-basic27"
                        name="acquisitionDate"
                        onChange={handleInputChange}
                        value={empCard.acquisitionDate}
                        fullWidth
                        type="date"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>만료일</InputLabel>
                      <TextField
                        id="outlined-basic28"
                        name="expirationDate"
                        onChange={handleInputChange}
                        value={empCard.expirationDate}
                        fullWidth
                        type="date"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* </Grid> */}
              </DialogContent>
              <DialogActions sx={{ pr: 2.5, transform: 'translateX(-80px)' }}>
                <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                  취소
                </Button>
                <Button variant="contained" size="small" onClick={handleSave}>
                  수정
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>
    </div>
  );
}