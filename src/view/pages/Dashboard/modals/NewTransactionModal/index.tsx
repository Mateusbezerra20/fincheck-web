import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    handleNewTransactionModalClose,
    handleSubmit,
    register,
    accounts,
    categories,
    control,
    errors,
    isLoading,
  } = useNewTransactionModalController();

  const isIncome = newTransactionType === 'INCOME';

  return (
    <Modal
      title={ isIncome ? 'Nova Receita' : 'Nova Despesa' }
      open={ isNewTransactionModalOpen }
      onClose={handleNewTransactionModalClose}
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
              defaultValue=""
              render={({ field: { onChange }}) => (
                <InputCurrency
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
            render={({ field: { onChange }}) => (
              <Select
                onChange={onChange}
                placeholder="Categoria"
                error={errors.categoryId?.message}
                options={categories.filter((category) => category.type === newTransactionType).map((account) => ({
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
            render={({ field: { onChange }}) => (
              <Select
                onChange={onChange}
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
