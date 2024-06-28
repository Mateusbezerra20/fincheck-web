import { User } from "../../entities/User";
import { httpClient } from "../httpClient";

type ResponseData = User;

export async function me() {
  const { data } = await httpClient.get<ResponseData>('/users/me');

  return data;
}