import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SigninParams } from '../../../app/services/authService/signin';
import { AuthService } from '../../../app/services/authService';
import toast from 'react-hot-toast';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter ao menos 8 dígitos'),
})

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return AuthService.signin(data);
    }
  })

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch(err) {
      console.log(err);
      toast.error('Dados inválidos!');
    }
  })

  return { handleSubmit, register, errors, isLoading };
}
