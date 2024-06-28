import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { Transaction } from "../../../../../app/entities/Transaction";

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Valor é obrigatório!'),
    z.number(),
  ]),
  name: z.string().min(1, 'Descrição é obrigatória!'),
  categoryId: z.string().min(1, 'Categoria é obrigatória!'),
  bankAccountId: z.string().min(1, 'Informe a conta!'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(transaction: Transaction | null, onClose: () => void) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    handleSubmit: hookFormSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: transaction?.value,
      name: transaction?.name,
      categoryId: transaction?.categoryId,
      bankAccountId: transaction?.bankAccountId,
      date: transaction ? new Date(transaction.date) : new Date(),
    }
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === transaction?.type);
  }, [categoriesList, transaction?.type]);

  const { mutateAsync, isLoading } = useMutation(transactionsService.update);
  const {mutateAsync: deleteTransaction, isLoading: isLoadingDelete } = useMutation(transactionsService.delete);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions']});
      toast.success(
        transaction?.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!'
      );
      onClose();
    } catch {
      toast.error(
        transaction?.type === 'EXPENSE'
          ? 'Ocorreu um erro ao editar a despesa!'
          : 'Ocorreu um erro ao editar a receita!'
      );
    }
  })

  async function handleDeleteTransaction() {
    try {
      await deleteTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      onClose();
      toast.success(`${transaction?.type === 'EXPENSE' ? 'Despesa' : 'Receita'} foi deletada com sucesso!`);
    } catch {
      toast.error(`Ocorreu um erro ao deletar a ${transaction?.type === 'EXPENSE' ? 'despesa' : 'receita'}`);
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
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
  }
}