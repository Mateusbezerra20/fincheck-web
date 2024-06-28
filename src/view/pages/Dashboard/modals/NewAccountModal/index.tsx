import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    errors,
    isLoading,
    handleNewAccountModalClose,
    register,
    handleSubmit,
    control,
  } = useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={handleNewAccountModalClose}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <small className="text-gray-600 text-xs">Saldo inicial</small>
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">
              R$
            </span>
            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value }}) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                onChange={onChange}
                error={errors.type?.message}
                placeholder="Tipo"
                options={[
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente',
                  },
                  {
                    value: 'INVESTMENT',
                    label: 'Investimentos',
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro Físico',
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue="#40C057"
            render={({ field: { onChange, value }}) => (
              <ColorsDropdownInput
                onChange={onChange}
                value={value}
                error={errors.color?.message}
              />
            )}
          />
        </div>

        <Button type="submit" className="mt-6 w-full" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  )
}