import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModalController } from "./useFiltersModalController";
import { cn } from "../../../../../../utils/cn";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApply(bankAccountId: string | undefined, year: number): void;
}

export function FiltersModal({ open, onClose, onApply } : FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleSelectYear,
    accounts,
  } = useFiltersModalController();

  return (
    <Modal title="Filtros" onClose={onClose} open={open}>
      <div>
        <span className="text-gray-800 text-lg font-bold tracking-[-1px]">Conta</span>

        <div className="mt-2 space-y-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                'p-2 text-gray-800 text-sm text-start rounded-2xl w-full hover:bg-gray-50 transition-colors',
                account.id === selectedBankAccountId && '!bg-gray-200',
              )}
            >
              { account.name }
            </button>
          ))}
        </div>
      </div>

      <div className="text-gray-800">
        <span className="text-lg font-bold tracking-[-1px]">Ano</span>

        <div className="w-52 flex mt-2 items-center justify-between">
          <button
            onClick={() => handleSelectYear(-1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6"/>
          </button>

          <span className="text-sm font-medium tracking-[-0.5px]">
            { selectedYear }
          </span>

          <button
            onClick={() => handleSelectYear(1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronRightIcon className="w-6 h-6"/>
          </button>
        </div>
      </div>

      <Button className="w-full" onClick={() => onApply(selectedBankAccountId, selectedYear)}>
        Aplicar Filtros
      </Button>
    </Modal>
  )
}