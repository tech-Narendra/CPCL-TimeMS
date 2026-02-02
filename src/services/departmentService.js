import { getAuthHeaders } from './apiUtil';

export const fetchDepartmentByERC = async (erc) => {
  const response = await fetch(
    `/o/c/cpcldepartments/by-external-reference-code/${erc}`,
    { headers: getAuthHeaders() }
  );

  if (!response.ok) return null;
  return response.json();
};

export const fetchDepartments = async () => {
  const response = await fetch(
    `/o/c/cpcldepartments`,
    { headers: getAuthHeaders() }
  );

  if (!response.ok) return null;
  return response.json();
};
