import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { SliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../utils/formatCurrency';
import { cn } from '../../../../../utils/cn';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';


export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    handleNewAccountModalOpen,
    isLoading,
    accounts,
    currentBalance,
  } = useAccountsController();

  return (
    <div className="rounded-2xl bg-teal-900 h-full w-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white w-10 h-10"/>
        </div>
      )}


      {!isLoading && (
        <>
          <div>
            <span className="text-white tracking-[-0.5px] block">Saldo total</span>
            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl text-white tracking-[-1px]",
                  !areValuesVisible && "blur-md"
                )}
              >
                { formatCurrency(currentBalance) }
              </strong>
              
              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4">
                  <strong className="text-white font-bold text-lg tracking-[-1px]">
                    Minhas Contas
                  </strong>
                </div>

                <button
                  onClick={handleNewAccountModalOpen}
                  className="h-52 w-full flex flex-col items-center justify-center gap-4 border-2 rounded-2xl border-dashed border-teal-600 text-white"
                >
                  <div className="w-11 h-11 border-2 border-dashed border-white flex items-center justify-center rounded-full">
                    <PlusIcon className="w-6 h-6"/>
                  </div>

                  <span className="font-medium tracking-[-0.5px] text-center">
                    Cadastre uma<br />
                    nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={ 16 }
                  slidesPerView={ windowWidth >= 500 ? 2.1 : 1.2 }
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                >
                  <div className="flex justify-between items-center mb-4" slot="container-start">
                    <strong className="text-white font-bold text-lg tracking-[-1px]">
                      Minhas contas
                    </strong>

                    <SliderNavigation isBeginning={ sliderState.isBeginning } isEnd={ sliderState.isEnd } />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}