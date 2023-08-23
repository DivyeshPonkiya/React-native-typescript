import {AsyncKeys} from '@/constants';
import {getData} from '../storage';

export const baseURL = 'http://64.227.145.36/api/'; //Happy Home API LIVE

export const headers = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
};

export const requestAccessToken = (request: any) => async () => {
  const token = await getData(AsyncKeys.accessToken);

  delete request.headers.Authorization;
  request.headers.Authorization = token;
};

export const requestAPIAccessToken = (request: any) => async () => {
  const token = 'base64:GVz9HeOxQwWhIJA27a4MzetW3wIZ6pWlJyU/D9x0rKg=';

  delete request.headers.accessToken;
  request.headers.accessToken = token;
};
