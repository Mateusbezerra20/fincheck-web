import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Transaction } from "../../../../../app/entities/Transaction";
import { DeleteModal } from "../DeleteModal";
import { TrashIcon } from "../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose(): void;
}

export function EditTransactionModal({ transaction, open, onClose}: EditTransactionModalProps) {
  const {
    register,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    accounts,
    categories,
    control,
    errors,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
  } = useEditTransactionModalController(transaction, onClose);

  const isIncome = transaction?.type === 'INCOME';

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja excluir esta ${isIncome ? 'receita' : 'despesa'}?`}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
      />
    )
  }

  return (
    <Modal
      title={ isIncome ? 'Editar Receita' : 'Editar Despesa' }
      open={open}
      onClose={onClose}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 h-6 w-6" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <small className="text-gray-600 text-xs">Valor {isIncome ? 'da receita' : 'da despesa'}</small>
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">
              R$
            </span>
            <Controller
              control={control}
              name="value"
              defaultValue={""}
              render={({ field: { onChange, value }}) => (
                <InputCurrency
                  value={value}
                  onChange={onChange}
                  error={errors.value?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            error={errors.name?.message}
            placeholder={isIncome ? 'Nome da Receita' : 'Nome da Despesa'}
            {...register("name")}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <Select
                onChange={onChange}
                value={value}
                placeholder="Categoria"
                error={errors.categoryId?.message}
                options={categories.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value }}) => (
              <Select
                onChange={onChange}
                value={value}
                placeholder={isIncome ? 'Receber na conta' : 'Pagar com'}
                error={errors.bankAccountId?.message}
                options={accounts?.map((account) => ({ value: account.id, label: account.name })) || []}
              />
            )}
          />


          <Controller
            control={control}
            name="date"
            defaultValue={new Date}
            render={({ field: { value, onChange }}) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

        </div>

        <Button type="submit" className="mt-6 w-full" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
