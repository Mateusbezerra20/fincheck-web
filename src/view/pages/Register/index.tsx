import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { register, handleSubmit, errors, isLoading } = useRegisterController();

  return (
    <>
    <header className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
        Crie uma conta
      </h1>

      <p className="space-x-2">
        <span
          className="text-gray-700 tracking-[-0.5px]"
        >
          Já possui uma conta?
        </span>

        <Link
          to="/login"
          className="text-teal-900 font-medium tranking-[-0.5px]"
        >
          Fazer login
        </Link>
      </p>
    </header>

    <form className="flex flex-col gap-4 mt-[60px]" onSubmit={handleSubmit}>

      <Input type="text" placeholder="Nome" {...register('name')} error={errors.name?.message} />
      <Input type="email" placeholder="E-Mail" {...register('email')} error={errors.email?.message} />
      <Input type="password" placeholder="Senha" {...register('password')} error={errors.password?.message} />

      <Button
        isLoading={isLoading}
        type="submit"
        className="mt-2"
      >
        Criar conta
      </Button>
    </form>
  </>
  )
}
