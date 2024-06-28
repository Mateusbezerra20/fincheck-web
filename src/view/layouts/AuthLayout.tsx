import { Outlet } from 'react-router-dom';
import illustration from '../../assets/illustration.png';
import { Logo } from '../components/Logo';

export function AuthLayout() {
  return (
    <div className="flex h-full w-full">
      <div className="h-full w-full flex flex-col justify-center items-center gap-16 lg:w-1/2" >
        <Logo className='h-6 text-gray-500' />

        <div className="w-full max-w-[504px] px-8" >
          <Outlet />
        </div>
      </div>

      <div className="h-full w-1/2 hidden justify-center items-center p-8 relative lg:flex">
        <img
          src={illustration}
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />

        <div className="bg-white max-w-[656px] mx-8 bottom-8 p-10 absolute rounded-b-[32px]">

          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
          </p>

        </div>
      </div>
    </div>
  )
}
