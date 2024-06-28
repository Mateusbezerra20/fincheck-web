import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório.'),
  name: z.string().min(1, 'É obrigatório informar o nome.'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], { required_error: 'É obrigatório informar o tipo' }),
  color: z.string().min(1, 'É obrigatório informar uma cor.'),
})

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const {
    isNewAccountModalOpen,
    handleNewAccountModalClose,
  } = useDashboard();

  const {
    register,
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const queryClient = useQueryClient();

  const {mutateAsync, isLoading } = useMutation(bankAccountService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      handleNewAccountModalClose();
      reset();
      toast.success('Conta foi cadastrada com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao tentar cadastrar a conta!')
    }
  })

  return {
    isNewAccountModalOpen,
    handleNewAccountModalClose,
    register,
    handleSubmit,
    errors,
    control,
    isLoading,
  }
}