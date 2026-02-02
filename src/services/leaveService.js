import { getAuthHeaders } from './apiUtil';

const BASE = '/o/c/cpclleaves';

export const fetchLeaves = async () => {
  console.log('[API] Fetch Leaves');
  const res = await fetch(BASE, { headers: getAuthHeaders() });
  const data = await res.json();
  console.log('[API] Leaves Response', data);
  return data;
};

export const applyLeave = async (payload) => {
  console.log('[API] Apply Leave Payload', payload);

  const res = await fetch(BASE, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log('[API] Apply Leave Response', data);

  if (!res.ok) throw data;
};

export const updateLeaveStatus = async (id, statusKey) => {
  console.log('[Update Status]', id, statusKey);

  const res = await fetch(`/o/c/cpclleaves/${id}`, {
    method: 'PATCH',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      leaveStatus: { key: statusKey }
    })
  });

  const data = await res.json();
  console.log('[Update Status Response]', data);

  if (!res.ok) throw data;
};

