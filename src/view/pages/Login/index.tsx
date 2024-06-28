import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors, isLoading } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span
            className="text-gray-700 tracking-[-0.5px]"
          >
            Novo por aqui?
          </span>

          <Link
            to="/register"
            className="text-teal-900 font-medium tranking-[-0.5px]"
          >
            Crie sua conta
          </Link>
        </p>
      </header>

      <form className="flex flex-col gap-4 mt-[60px]" onSubmit={handleSubmit}>
        <Input type="email" placeholder="E-Mail" error={errors.email?.message} {...register('email')} />
        <Input type="password" placeholder="Senha" error={errors.password?.message} {...register('password')} />
        <Button
          isLoading={isLoading}
          type="submit"
          className="mt-2"
        >
          Entrar
        </Button>
      </form>
    </>
  )
}
