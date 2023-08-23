import {baseURL, headers} from '@/networking/config';
import apisauce, {ApisauceInstance} from 'apisauce';

interface apiSauceDeclare {
  baseURL: string;
  timeout: number;
  headers: any;
}

export const apiConfig = (): ApisauceInstance =>
  apisauce.create({
    baseURL,
    timeout: 10000,
    headers,
  });

export const defaultTokenTransform = (request: any) => async () => {
  delete request.headers.Authorization;
};

export const requestTransformMultipart = (request: any) => async () => {
  request.headers['Content-Type'] = 'multipart/form-data';
};

export const requestTransformXWWW = (request: any) => () => {
  request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
};

export const requestBodyFormData = (param: any) => {
  const params = new FormData();

  for (const key in param) {
    if (Object.hasOwnProperty.call(param, key)) {
      const element = param[key];

      params.append(key, element);
    }
  }

  return params;
};
