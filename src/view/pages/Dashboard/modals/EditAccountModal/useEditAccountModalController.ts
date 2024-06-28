import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório.'),
    z.number(),
  ]),
  name: z.string().min(1, 'É obrigatório informar o nome.'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], { required_error: 'É obrigatório informar o tipo' }),
  color: z.string().min(1, 'É obrigatório informar uma cor.'),
})

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    isEditAccountModalOpen,
    handleEditAccountModalClose,
    accountBeingEdited,
  } = useDashboard();

  const {
    register,
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
      color: accountBeingEdited?.color,
    }
  });

  const queryClient = useQueryClient();

  const {mutateAsync: updateAccount, isLoading } = useMutation(bankAccountService.update);
  const {mutateAsync: deleteAccount, isLoading: isLoadingDelete } = useMutation(bankAccountService.delete);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      handleEditAccountModalClose();
      toast.success('A conta foi editada com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao salvar as alterações!')
    }
  })

  async function handleDeleteAccount() {
    try {
      await deleteAccount(accountBeingEdited!.id)

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      handleEditAccountModalClose();
      toast.success('Conta foi deletada com sucesso!')
    } catch {
      toast.error('Ocorreu um erro ao deletar a conta')
    }
  }

  function handleOpenDeleteModal () {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal () {
    setIsDeleteModalOpen(false);
  }

  return {
    isEditAccountModalOpen,
    handleEditAccountModalClose,
    register,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    errors,
    control,
    isLoading,
    isLoadingDelete,
    isDeleteModalOpen,
  }
}