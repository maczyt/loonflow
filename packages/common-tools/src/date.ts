import dayjs from 'dayjs';

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS ZZ';

export const transformToBackendDate = (...date: Parameters<typeof dayjs>) => {
  return dayjs(...date).format(DATE_FORMAT);
};
