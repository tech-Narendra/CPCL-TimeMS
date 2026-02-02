import { getAuthHeaders } from './apiUtil';

/**
 * Fetch attendance punches
 */
export const fetchAttendance = async () => {
  const response = await fetch(
    '/o/c/cpclattendancepunches',
    {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include'
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch attendance');
  }

  return response.json(); 
};
