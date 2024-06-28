import { httpClient } from "../httpClient";
import { Transaction } from "../../entities/Transaction";
import sleep from "../../../utils/sleep";

type TransactionsResponse = Array<Transaction>;

export type TransactionsFilters = {
  year: number;
  month: number;
  bankAccountId?: string;
  type?: Transaction['type'];
}

export async function getAll(filters: TransactionsFilters) {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', {
    params: filters,
  })

  return data;
}
