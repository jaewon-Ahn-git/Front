import { AttendancePracticeTo } from 'types/attendance/types';

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
