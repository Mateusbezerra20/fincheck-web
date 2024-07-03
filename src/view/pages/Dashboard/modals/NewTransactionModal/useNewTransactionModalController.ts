import { useForm } from "react-hook-form";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.string().min(1, 'Valor é obrigatório'),
  name: z.string().min(1, 'Descrição é obrigatória!'),
  categoryId: z.string().min(1, 'Categoria é obrigatória!'),
  bankAccountId: z.string().min(1, 'Informe a conta!'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    handleNewTransactionModalClose,
  } = useDashboard();

  const queryClient = useQueryClient();

  const {
    handleSubmit: hookFormSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const { mutateAsync, isLoading } = useMutation(transactionsService.create);

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        date: data.date.toISOString(),
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      handleNewTransactionModalClose();
      reset();
      toast.success(newTransactionType === 'EXPENSE'
        ? 'Despesa registrada com sucesso!'
        : 'Receita registrada com sucesso!');
    } catch {
      toast.error(newTransactionType === 'EXPENSE'
      ? 'Falha ao registrar a despesa!'
      : 'Falha ao registrar a receita!');
    }
  })

  return {
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
  }
}
