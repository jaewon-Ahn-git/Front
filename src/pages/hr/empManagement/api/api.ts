import { SUCCEED, FAILED } from '../constant/const';
import { apiClient } from './apiClient';

type typeAction = { payload: any; type: string };
// 사원 정보관리

//사원 전체 조회
// ---> 전체 사원 혹은 부서에 따른 사원을 조회할수 있다.
const getEmpList = async (data: any) => {
  console.log('data.payload at api', data.payload); // payload로 값을 받을수 있다.
  const url = `/hr/empinfomgmt/empAllList?value=${data.payload}`;

  const obj = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(url, obj).catch((err) => err);

  try {
    const data = await response.json();
    console.log('data form api is : ', data.list);
    console.log();
    return { empList: data.list, message: SUCCEED };
  } catch (err) {
    console.log('error from api.getEmpList  : ');
    return { empList: [], message: FAILED }; // 에러가 나면은 빈배열을 반환해서 사원정보 페이지에서 사용할수 있게한다.
  }
};

//사원 등록
type ApiOk = { errorCode: 0; errorMsg: string } & Record<string, any>;
type ApiErr = { errorCode: number; errorMsg: string };

const registerEmp = async (bean: any): Promise<ApiOk> => {
  const url = '/hr/empinfomgmt/register'; // ← 절대경로 유지

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bean)
    });
  } catch (e: any) {
    // 네트워크 자체 실패 (ECONNREFUSED 등)
    const err: ApiErr = { errorCode: 0, errorMsg: e?.message || 'Network error' };
    throw err;
  }

  // 한 번만 읽고 재사용
  const contentType = res.headers.get('content-type') || '';
  const text = await res.text(); // 바디가 비어 있어도 에러 안 남음

  // 가능하면 JSON으로 파싱
  let data: any = null;
  if (text && contentType.includes('application/json')) {
    try {
      data = JSON.parse(text);
    } catch {
      /* 무시: JSON 아님 */
    }
  }

  if (!res.ok) {
    // 서버가 JSON으로 내려줬으면 그 메시지 우선 사용, 아니면 원문/상태문구
    const err: ApiErr = {
      errorCode: res.status,
      errorMsg: (data && (data.errorMsg || data.message)) || text || res.statusText || 'Request failed'
    };
    throw err;
  }

  // 성공인데 바디가 비었으면 기본 성공 응답 구성
  if (!data) {
    data = { errorCode: 0, errorMsg: 'success' };
  }
  return data as ApiOk;
};

export const uploadFile = async (action: any) => {
  const file = action.payload.image;
  console.log('action.payload.residentId', action.payload.combinedBean.residentId);
  const residentId = action.payload.combinedBean.residentId;
  console.log('api에서 받은 file:');

  if (file) {
    console.log('file.entries():', file.entries());
  } else {
    console.log('file is undefined or null.');
  }

  for (let [key, value] of file.entries()) {
    console.log(key, value);
  }
  try {
    const { data } = await apiClient.post('empinfomgmt/employee-pic', file, {
      params: {
        residentId: residentId,
        token: localStorage.getItem('access')
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

//사원정보 수정
const updateEmpInfo = async (action: typeAction) => {
  console.log('updateEmpInfo api called!!!', action.payload);
  console.log('이건 뭐냐', JSON.stringify(action.payload));
  const url = new URL('http://localhost:9101/empinfomgmt/empdetail/empcode');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.payload)
  };

  try {
    const response = await fetch(url, obj).catch((err) => err);
    console.log(response);
    const data = await response;
    console.log('data is : ', data);
    return data;
  } catch (err) {
    console.log('err is : ', err);
  }
};

// 사원을 삭제
const deleteEmpInfo = async (action: typeAction) => {
  const url = new URL('http://localhost:9101/empinfomgmt/empdetail/empcode');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.payload)
  };

  const response = await fetch(url, obj).catch((err) => err);

  const data = await response.json();

  return data;
  console.log(data);
};

////////////// 사원 고과

// 사원고과 등록
const registerEmpEval = async (action: typeAction) => {
  console.log('log from empEval', action.payload);
  const url = new URL('http://localhost:9101/empinfomgmt/evaluation');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.payload)
  };

  const response = await fetch(url, obj).catch((err) => err);

  try {
    const data = await response.json();
    return data;
  } catch (err) {
    return { errorCode: -1, errorMsg: 'failed' };
  }
};

// response에서 json()을 한번 소모하면은 response의 status 정보를 사용할수 없는거 같다.
// 사원고과가 진행된 사원의 정보를 가져오는 api
// ---> 코드의 통일성을 주기위해 코드 리펙터링을 하자.
// 너무 헷갈리게 만들어놨어..............후
const getEmpEvalEndedList = async () => {
  const url = new URL('http://localhost:9101/empinfomgmt/evaluation/list/approvalStatus');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(url, obj).catch((err) => err);

  try {
    const { list, errorCode } = await response.json();
    console.log('fetched empEvalData is : ', list, errorCode);
    console.log('response: ', response);

    return { errorCode: errorCode, errorMsg: '', empList: list };
  } catch (err) {
    return { errorCode: '-1', errorMsg: '', empList: [] };
  }
};

// 사원고과 삭제
// 로직 테스트가 필요하다.
//---> 코드의 통일성을 주기 위해 코드 리펙터링을 하자.
const deleteEmpEval = async (action: typeAction) => {
  console.log('deleteEmpEval called', action.payload);
  const url = new URL('http://localhost:9101/empinfomgmt/evaluation');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.payload)
  };

  const response = await fetch(url, obj).catch((err) => err);
  console.log('status code form delete empeval before try catch', response.status);
  console.log(response);
  console.log('response is  :', response);

  try {
    const data = await response.json();
    const { errorMsg, errorCode } = data;
    console.log('data is :', data);
    console.log(errorMsg, errorCode);
    return data;
  } catch (err) {
    return { errorCode: -1, errorMsg: FAILED, empList: [] };
  }
};

//승인된 사원 고과 수정
const modifyApprovedEmpEval = async (action: typeAction) => {
  console.log('modifyApprovedEmpEval : ', action.payload);
  const url = new URL('http://localhost:9101/empinfomgmt/evaluation-approval/approved');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.payload)
  };

  const response = await fetch(url, obj).catch((err) => err);

  console.log('response is :', response);
  const { errorCode, errorMsg } = await response.json();

  return { errorCode: errorCode, errorMsg: errorMsg, empList: [] };
};

//반려된 사원 고과 수정
const modifyRejectedEmpEval = async (action: typeAction) => {
  const url = new URL('http://localhost:9101/empinfomgmt/evaluation-approval/rejected?');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.payload)
  };

  const response = await fetch(url, obj).catch((err) => err);

  console.log('response is :', response);

  const { errorCode, errorMsg } = await response.json();

  return { errorCode: errorCode, errorMsg: errorMsg, empList: [] };
};

//모든 사원고과결과 조회
const getEmpEvalResult = async () => {
  console.log('getEmpEvalResult called from api.');
  const url = new URL('http://localhost:9101/empinfomgmt/evaluation/list/all');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(url, obj).catch((err) => err);

  try {
    const { list, errorCode } = await response.json();
    console.log('empEvalResult is :', list, errorCode);
    console.log('data from getEmpEvalResult :', response);
    return { errorCode: errorCode, empList: list };
  } catch (err) {
    return { errorCode: '-1', empList: [] };
  }
};

// 결재 상태에 따른 사원고과 결과 조회
const getEmpEvalResultByApprovalCondition = async (action: typeAction) => {
  console.log('action.payload from api:', action.payload);
  const url = new URL('http://localhost:9101/empinfomgmt/evaluation/list/approvalStatus');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ approvalStatus: action.payload })
  };

  const response = await fetch(url, obj).catch((err) => err);

  try {
    const { list, errorCode } = await response.json();
    console.log('empEvalResultByApprovalCondition', list, errorCode);
    console.log('response from getEmpEvalByApprovalStatus : ', response);
    return { errorCode: errorCode, empList: list };
  } catch (err) {}
};

// 인사발령관련

// 본인 직급 이하 사원 조회
const getEmpInfo = async (action: typeAction) => {
  console.log('data.payload at api', action.payload); // payload로 값을 받을수 있다.
  const url = new URL('http://localhost:9101/hr/empinfomgmt/emplist?value=' + action.payload);
  url.searchParams.append('token', localStorage.getItem('access') as string);
  url.searchParams.append('authLevel', localStorage.getItem('authLevel') as string);

  const obj = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(url, obj).catch((err) => err);
  try {
    const { list, errorCode, errorMsg } = await response.json();
    console.log('data at geEmpInfo api : ', response, list, errorCode);
    return { empList: list, errorCode: errorCode, errorMsg: errorMsg };
  } catch (err) {
    return { empList: [], errorCode: -1, errorMsg: FAILED };
  }
};

// 인사발령 등록시 필요한 hosu를 받아오는 코드
const getHosu = async () => {
  const url = new URL('http://localhost:9101/empinfomgmt/gethosu');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(url, obj).catch((err) => err);

  try {
    console.log(response);
    const data = await response.json();
    console.log('hosu is : ', data);
    return data;
  } catch (err) {}
};

//인사발령 등록
const registerEmpAppointment = async (action: typeAction) => {
  const url = new URL('http://localhost:9101/empinfomgmt/registAppoint');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.payload)
  };

  const response = await fetch(url, obj).catch((err) => err);

  try {
    const data = await response.json();
    console.log('data is :', data);
    return data;
  } catch (err) {
    return { errorCode: -1, errorMsg: FAILED };
  }
};

//인사발령 조회
const getEmpAppointment = async () => {
  const url = new URL('http://localhost:9101/empinfomgmt/appointmentEmpList');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(url, obj).catch((err) => err);
  console.log('response is :', response);

  try {
    const { errorCode, errorMsg, list } = await response.json();
    console.log('data from api', list);
    return { errorCode: errorCode, errorMsg: errorMsg, empList: list };
  } catch (err) {
    return { errorCode: -1, errorMsg: FAILED, empList: [] };
  }
};

// 승인된 인사발령 수정
const modifyApprovedEmpAppointment = async (action: typeAction) => {
  const url = 'http://localhost:9101/empinfomgmt/appointment/approve';
  const obj = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.payload)
  };

  const response = await fetch(url, obj).catch((err) => err);

  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return { errorCode: -1, errorMsg: FAILED };
  }
};

// 반려된 인사발령 수정
const modifyRejectedEmpAppointment = async (action: typeAction) => {
  const url = new URL('http://localhost:9101/empinfomgmt/appointment/reject');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.payload)
  };

  const response = await fetch(url, obj).catch((err) => err);

  console.log('response is ', response);
  try {
    const data = await response.json();
    console.log('response is :', data);
    return data;
  } catch (err) {
    return { errorCode: -1, errorMsg: FAILED };
  }
};

//인사발령 결과조회
const getAppointmentResult = async () => {
  const url = new URL('http://localhost:9101/empinfomgmt/appointment/approved_rejected');
  url.searchParams.append('token', localStorage.getItem('access') as string);

  const obj = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(url, obj).catch((err) => err);
  console.log('response is :', response);

  try {
    const data = await response.json();
    console.log('data is :', data);
    return data;
  } catch (err) {
    return { errorCode: -1, errorMsg: FAILED, empList: [] };
  }
};

export {
  getEmpList,
  registerEmp,
  updateEmpInfo,
  deleteEmpInfo,
  getEmpEvalResult,
  registerEmpEval,
  modifyApprovedEmpEval,
  modifyRejectedEmpEval,
  deleteEmpEval,
  getEmpEvalEndedList,
  getEmpEvalResultByApprovalCondition,
  getEmpInfo,
  getHosu,
  registerEmpAppointment,
  getEmpAppointment,
  modifyApprovedEmpAppointment,
  modifyRejectedEmpAppointment,
  getAppointmentResult
};
