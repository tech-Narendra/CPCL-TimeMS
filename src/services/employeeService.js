import { getAuthHeaders } from './apiUtil';

export const fetchEmployees = async () => {
  const response = await fetch('/o/c/cpclemployees/', {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch employees: ${response.status}`);
  }

  const data = await response.json();
  return data.items || [];
};

export const fetchEmployeeByERC = async (erc) => {
  const response = await fetch(
    `/o/c/cpclemployees/by-external-reference-code/${erc}`,
    { headers: getAuthHeaders() }
  );

  if (!response.ok) return null;
  return response.json();
};

export const deleteEmployeeByERC = async (employeeERC) => {
  const response = await fetch(
    `/o/c/cpclemployees/by-external-reference-code/${employeeERC}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return true;
};

export const createEmployee = async (payload) => {
  const response = await fetch('/o/c/cpclemployees/', {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export const updateEmployeeByERC = async (employeeERC, payload) => {
  const response = await fetch(
    `/o/c/cpclemployees/by-external-reference-code/${employeeERC}`,
    {
      method: 'PUT', // PATCH also works
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};
