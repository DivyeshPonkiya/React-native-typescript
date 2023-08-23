import LoginRequest from '@/networking/apis/Login';
import {apiConfig} from '@/networking/networkService';

const apisauce = apiConfig();

const Apis = {
  LoginRequest: LoginRequest(apisauce),
};

export default Apis;
