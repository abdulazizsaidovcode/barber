export const config = {
  headers: {
    Authorization: sessionStorage.getItem('token')
  }
};

export const setConfig = (): string | null => config.headers.Authorization = sessionStorage.getItem('token')