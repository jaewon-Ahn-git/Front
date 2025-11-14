import React, { ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { RootState } from 'store/reducer';
import { PositionTO } from '../types/types';
import { positionAction } from 'store/redux-saga/reducer/base/positionReducer';
import styles from 'styles/Home.module.css';
import { hobongAction } from 'store/redux-saga/reducer/base/hobongReducer';


type OnRowClickHandler = (positionCode: string) => void;

function PositionTable({ onRowClick }: { onRowClick: OnRowClickHandler }) {

  const dispatch = useDispatch();

  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const positionList = useSelector((state: RootState) => state.positionList.positionList);


  useEffect(() => {
    console.log('dispatch호출됨');
    dispatch(positionAction.POSITION_LIST_SEARCH_FETCH_REQUESTED(''));
  }, []);

  const handleRowClick = (positionCode: string | undefined) => {
    if (positionCode != undefined) {
      onRowClick(positionCode);
    }
  };


  return (
    <Page title="대상직급">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              title="대상직급"
              >
              {/* 아래의 코드도 리펙터링을 하자 */}
              {/* table */}
              <TableContainer>
                <Table sx={{ width: 'auto'}} aria-label="simple table">
                  <TableHead>
                    <TableRow
                      sx={{
                        borderTop: '1px solid black',
                        borderBottom: '3px solid black',
                        marginBottom: '3px',
                        backgroundColor: '#E8D9FF'
                      }}
                    >
                      <TableCell>코드</TableCell>
                      <TableCell>직급</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {positionList.length !== 0 ? (
                    positionList.map((position: PositionTO, index: number) => (
                      <TableRow hover 
                      key={position.positionCode}
                      className={selectedRowIndex === index ? styles['selected-row'] : ''}
                      onClick={() => {
                        setSelectedRowIndex(index); // 선택된 행의 인덱스를 상태에 저장
                        handleRowClick(position.positionCode); 
                        dispatch(hobongAction.HOBONG_LIST_SEARCH_FETCH_REQUESTED(position.positionCode));
                      }}
                      >
                        <TableCell>{position.positionCode}</TableCell>
                        <TableCell>{position.position}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableCell colSpan={11} align="center">
                      <p>직급 정보가 없습니다.</p>
                    </TableCell>
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

PositionTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default React.memo(PositionTable); 
