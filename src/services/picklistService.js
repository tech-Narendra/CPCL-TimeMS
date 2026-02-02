import { getAuthHeaders } from './apiUtil';

/**
 * Fetch picklist entries by Picklist ERC
 */
export const fetchPicklistEntriesByERC = async (picklistERC) => {
  const response = await fetch(
    `/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/${picklistERC}/list-type-entries`,
    {
      method: 'GET',
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch picklist: ${picklistERC}`);
  }

  const data = await response.json();
  return data.items || [];
};
