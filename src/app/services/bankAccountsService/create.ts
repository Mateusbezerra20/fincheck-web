import { httpClient } from "../httpClient";

interface CreateBankAccountParams {
  name: string;
  initialBalance: number;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  color: string;
}

export async function create(params: CreateBankAccountParams) {
  const { data } = await httpClient.post('bank-accounts', params);

  return data;
}
