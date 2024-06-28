import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { DeleteModal } from "../DeleteModal";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    errors,
    isLoading,
    isLoadingDelete,
    control,
    isDeleteModalOpen,
    handleEditAccountModalClose,
    register,
    handleSubmit,
    handleDeleteAccount,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        isLoading={isLoadingDelete}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos registros de receita e despesas relacionados."
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
      />
    )
  }

  return (
    <Modal
      title="Conta"
      open={isEditAccountModalOpen}
      onClose={handleEditAccountModalClose}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 h-6 w-6" />
        </button>
      )}
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
          Salvar
        </Button>
      </form>
    </Modal>
  )
}