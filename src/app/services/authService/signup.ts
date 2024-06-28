import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface ResponseData { accessToken: string }

export async function signup(params: SignupParams) {
  const { data } = await httpClient.post<ResponseData>('auth/signup', params);

  return data;
}
