import { httpClient } from "../httpClient"

export async function del(id: string ) {
  await httpClient.delete(`transactions/${id}`);
}
