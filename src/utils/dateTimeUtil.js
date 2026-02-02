export const formatDate = (isoDate) => {
  if (!isoDate) return '-';
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-IN'); // 01/02/2026
};

export const formatTime = (isoDateTime) => {
  if (!isoDateTime) return '-';
  const d = new Date(isoDateTime);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }); // 12:00 PM
};
