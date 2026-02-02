export const getAuthHeaders = () => {
  const authToken = window.Liferay ? window.Liferay.authToken : '';
  return {
    Accept: 'application/json',
    'x-csrf-token': authToken
  };
};
