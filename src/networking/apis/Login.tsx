import {requestAccessToken} from '../config';
import {
  requestBodyFormData,
  requestTransformMultipart,
} from '../networkService';
import urlEndPoints from '../urlEndPoints';

interface Payload {
  // Define the payload type based on your requirements
  // For example: { username: string; password: string; }
}

interface LoginApi {
  login: ({payload}: {payload: Payload}) => Promise<any>; // Adjust the return type as needed
  SignUp: ({payload}: {payload: Payload}) => Promise<any>; // Adjust the return type as needed
  logout: () => Promise<any>; // Adjust the return type as needed
}

const LoginRequest = (api: any): LoginApi => {
  const login = ({payload}: {payload: Payload}) => {
    api.addAsyncRequestTransform(requestTransformMultipart);
    const param = requestBodyFormData(payload);
    return api.post(urlEndPoints.login, param);
  };

  const SignUp = ({payload}: {payload: Payload}) => {
    api.addAsyncRequestTransform(requestTransformMultipart);
    const param = requestBodyFormData(payload);
    return api.post(urlEndPoints.signup, param);
  };

  const logout = () => {
    api.addAsyncRequestTransform(requestAccessToken);

    return api.post(urlEndPoints.logout);
  };

  return {
    login,
    SignUp,
    logout,
  };
};

export default LoginRequest;
