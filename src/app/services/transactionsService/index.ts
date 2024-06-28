import { create } from "./create"
import { del } from "./delete"
import { getAll } from "./getAll"
import { update } from "./update"

export const transactionsService = {
  create,
  getAll,
  update,
  delete: del,
}
