import hrApi from '../intercepter';

const AUTHLIST_URL = 'base/authLevel';
const DETAIL_CODE_URL = 'base/detailCode';
const HOBONG_URL = 'foudinfomgmt/hobonglist';
const HOBONG_UPDATE_BY_PERCENTAGE_URL = 'foudinfomgmt/hobong_percentage';
const HOBONG_UPDATE_BY_FIXED_URL = 'foudinfomgmt/hobong_fixed';

const EMP_CARD_URL = 'empinfomgmt/empcard';
const EMP_DETAIL_LIST_URL = 'foudinfomgmt/certificate-issuance';

// 권한 조회
export const getAuthList = async () => {
  try {
    return await hrApi.get(AUTHLIST_URL, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 코드 조회
export const getCodeList = async () => {
  try {
    return await hrApi.get(DETAIL_CODE_URL, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

//인사기록카드
export const getEmpCard = async (param: string) => {
  console.log('api에서 받아온 param: ', param);
  try {
    return await hrApi.get(EMP_CARD_URL, {
      params: {
        token: localStorage.getItem('access'),
        empCode: param
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

//인사기록카드 수정
export const getEmpCardModify = async (body: any) => {
  console.log('api까지는 오는걸까 : ', body);
  try {
    return await hrApi.put(EMP_CARD_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 호봉 조회
export const getHobongList = async (param: string) => {
  try {
    return await hrApi.get(HOBONG_URL, {
      params: {
        token: localStorage.getItem('access'),
        positionCode: param
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 호봉 등록
export const insertHobongList = async (body: any) => {
  try {
    return await hrApi.post(HOBONG_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 호봉 정률 인상
export const updatePercentageHobongList = async (body: any) => {
  try {
    return await hrApi.put(HOBONG_UPDATE_BY_PERCENTAGE_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 호봉 정액 인상
export const updateFixedHobongList = async (body: any) => {
  try {
    return await hrApi.put(HOBONG_UPDATE_BY_FIXED_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 재직증명서에 기재될 사원코드에 따른 사원의 주소, 주민등록번호, 직위 조회하기
export const searchEmpDeatilInfo = async (param: string) => {
  try {
    return await hrApi.get(EMP_DETAIL_LIST_URL, {
      params: {
        empCode: param,
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};
