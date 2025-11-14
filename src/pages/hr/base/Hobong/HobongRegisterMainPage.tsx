import { ReactElement, useState } from 'react';

// project imports
import Layout from 'layout';
import Page1 from './HobongTable';
import Page2 from './PositionTable';
import styles from 'styles/Home.module.css';
import HobongRegisterModal from './HobongRegisterModal';
import HobongIncreaseModal from './HobongIncreaseModal';
import { Button, Grid, Stack, TextField } from '@mui/material';

const HobongRegisterMainPage = () => {
  //registerModal 에 대한 useState선언
  //HobongRegisterModal 모달창을 띄울때 bolean값이 true로 바뀌게됨
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  //increaseModal 에 대한 useState선언
  //HobongRegisterModal 모달창을 띄울때 bolean값이 true로 바뀌게됨
  const [increaseModal, setIncreaseModal] = useState<boolean>(false);

  const [handleApply, setHandleApply] = useState<boolean>(false);

  //얘는 안쓰는데 지워도 되지 않나..?
  const [open, setOpen] = useState<boolean>(true);
  //호봉등록페이지에서 '코드' ex) POS000, POS001 ...등등
  const [positionCode, setPositionCode] = useState<string>('');

  //적용시작일
  const [applyDate, setApplyDate] = useState<string>('');
  //적용종료일
  const [applyEndDate, setApplyEndDate] = useState<string>('');

  const handleRowClick = (positionCode: string) => {
    setPositionCode(positionCode);
  };

  //  eventHandler호출
  //  setRegisterModal(data) -> data값은 true or false
  //  (data) => !data     -------> 해석하면 true일 경우 false로 바꾸고 false일 경우 true로 바꿈
  const onToggleRegisterHandler = () => {
    setRegisterModal((data) => !data);
    //dispatch(hobongAction.HOBONG_LIST_SEARCH_FETCH_REQUESTED(positionCode));
  };

  //  위의 이벤트와 같은 형식이다.
  const onToggleIncreaseHandler = () => {
    setIncreaseModal((data) => !data);
    //dispatch(hobongAction.HOBONG_LIST_SEARCH_FETCH_REQUESTED(positionCode));
  };

  // onHobongRegisterHandler이벤트를 실행할때 applyDate와 applyEndDate가 빈값일경우 alert창을 띄워 값을 입력하게끔 유도
  // else 부문에서 빈값이 아닐경우 setRegisterModal를 실행할 수 있도록 함
  const onHobongRegisterHandler = () => {
    if (positionCode === undefined) {
      alert('직급을 먼저 선택해주세요.');
    } else if (applyDate === '' || applyEndDate === '') {
      alert('적용시작일과 적용종료일을 먼저 선택해주세요.');
    } else {
      setRegisterModal(true);
    }
  };

  //  위에 코드와 동일하다 생각하면됨
  //  모달창만 다름.
  const onHobongIncreaseHandler = () => {
    if (positionCode === undefined) {
      alert('직급을 먼저 선택해주세요.');
    } else if (applyDate === '' || applyEndDate === '') {
      alert('적용시작일과 적용종료일을 먼저 선택해주세요.');
    } else {
      setIncreaseModal(true);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: 'lightgray', padding: '10px' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* registerModal의 값이 참일때 HobongRegisterModal창이 랜더링됨 */}
          {/* 랜더링 될 때 setHandleApply, positionCode, applyDate, applyEndDate를 props로 넘겨줌 */}
          {registerModal && (
            <HobongRegisterModal
              toggle={onToggleRegisterHandler}
              setHandleApply={setHandleApply}
              positionCode={positionCode}
              applyDate={applyDate}
              applyEndDate={applyEndDate}
            />
          )}
          <Button variant="contained" color="primary" onClick={() => onHobongRegisterHandler()}>
            일괄등록
          </Button>
          {/* 위코드와 마찬가지 형태 */}
          {increaseModal && (
            <HobongIncreaseModal
              toggle={onToggleIncreaseHandler}
              positionCode={positionCode}
              applyDate={applyDate}
              applyEndDate={applyEndDate}
            />
          )}
          <Button variant="contained" color="primary" onClick={() => onHobongIncreaseHandler()}>
            일괄인상
          </Button>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="적용시작연월"
              name="적용시작연월"
              type={'date'}
              onChange={(event: any) => {
                setApplyDate(event.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="적용종료연월"
              name="적용종료연월"
              type={'date'}
              onChange={(event) => {
                setApplyEndDate(event.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Stack>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div className={styles['page-wrapper']}>
            <Page2 onRowClick={handleRowClick} />
          </div>
        </div>
        <div style={{ flex: 2 }}>
          <div className={styles['page-wrapper']}>
            <Page1 positionCode={positionCode} />
          </div>
        </div>
      </div>
    </div>
  );
};
HobongRegisterMainPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default HobongRegisterMainPage;
