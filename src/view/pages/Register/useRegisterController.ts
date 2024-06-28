import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../../app/services/authService";
import { SignupParams } from "../../../app/services/authService/signup";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter ao menos 8 dígitos'),
})

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return AuthService.signup(data);
    }
  })

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch {
      toast.error('Ocorreu um erro ao fazer o cadastro!')
    }
    
  })

  return { register, handleSubmit, errors, isLoading };
}