import { AttendancePracticeTo, RestAttdTO } from 'types/attendance/types';

export const registInoutApi = async (data: AttendancePracticeTo) => {
  const response = await fetch('/hr/attendancePractice/inout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

export const getEmpList = async () => {
  try {
    const response = await fetch('/hr/empinfomgmt/empAllList', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    // JSON으로 변환
    const data = await response.json();

    // 서버에서 errorCode를 반환하는 경우 추가 체크
    if (data.errorCode && data.errorCode !== 0) {
      throw new Error(data.errorMsg || '사원 목록 조회 실패');
    }

    return { data: data }; // saga에서 response.data.list 형태로 접근 가능
  } catch (error: any) {
    console.error('getEmpList fetch error:', error);
    throw error; // saga에서 catch 블록으로 전달
  }
};

//근태외 신청
export const insertRestAttd = async (data: RestAttdTO) => {
  const response = await fetch('/hr/attendancePractice/restAttd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const responseData = await response.json();

  // 💡 수정된 부분: { data: responseData } 형태로 래핑하여 반환
  return { data: responseData };
};

//휴가 신청
export const insertBreakAttd = async (data: RestAttdTO) => {
  const response = await fetch('/hr/attendancePractice/breakAttd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const responseData = await response.json();

  // 💡 수정된 부분: { data: responseData } 형태로 래핑하여 반환
  return { data: responseData };
};

//초과근무 신청
export const insertOvertimeAttd = async (data: RestAttdTO) => {
  const response = await fetch('/hr/attendancePractice/overtimeAttd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const responseData = await response.json();

  // 💡 수정된 부분: { data: responseData } 형태로 래핑하여 반환
  return { data: responseData };
};

//일근태 관리
// 일근태 관리 조회 API (GET)
export const searchDailyAttend = async (deptCode: string, selectedDate: string, type: string) => {
  try {
    // 1) QueryString 생성
    const query = new URLSearchParams({
      deptCode: deptCode,
      selectedDate: selectedDate,
      type: type
    }).toString();

    // 2) GET 요청
    const response = await fetch(`/hr/attendancePractice/dailyAttdMgmt?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // 3) 응답 JSON 변환
    if (!response.ok) {
      throw new Error('조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('searchDailyAttend error:', error);
    throw error;
  }
};
