import { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../utils/cn";
import { formatCurrency } from "../../../../../utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data } : AccountCardProps) {
  const { name, color, currentBalance, type } = data;
  const { areValuesVisible, handleEditAccountModalOpen } = useDashboard();

  return (
    <div
      className="bg-white rounded-2xl p-4 h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
      role="button"
      onClick={() => handleEditAccountModalOpen(data)}
    >
      <div>
        <BankAccountTypeIcon type={ type } />
        <span className="block text-gray-800 font-medium tracking-[-0.5px] mt-4">
          { name }
        </span>
      </div>

      <div>
        <span
          className={cn(
            'text-gray-800 font-medium tracking-[-0.5px] block',
            !areValuesVisible && 'blur-sm'
          )}
        >
          { formatCurrency(currentBalance) }
        </span>
        <small className="text-gray-600 text-sm">
          Saldo atual
        </small>
      </div>
    </div>
  )
}