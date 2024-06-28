import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { MONTHS } from "../../../../../app/config/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../../../../utils/cn";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../utils/formatCurrency";
import { useTransactionsController } from "./useTransactionsController";
import { Spinner } from "../../../../components/Spinner";

import emptyState from '../../../../../assets/empty-state.svg';
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../utils/formatDate";
import { bankAccountService } from "../../../../../app/services/bankAccountsService";
import { EditTransactionModal } from "../../modals/EditTransactionModal";

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    filters,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleChangeFilters,
    handleApplyFilters,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="rounded-2xl p-10 bg-gray-100 h-full w-full px-4 py-8 md:p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10"/>
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            onClose={handleCloseFiltersModal}
            open={isFiltersModalOpen}
            onApply={handleApplyFilters}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="relative mt-6">
              <Swiper
                slidesPerView={3}
                spaceBetween={16}
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
                centeredSlides
              >

                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={ month }>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={ isActive }
                        month={ month }
                        index={ index }
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          {isLoading && (
            <div className="w-full h-full mt-14 flex items-center justify-center gap-4">
              <Spinner className="w-10 h-10"/>
            </div>
          )}

          {(!hasTransactions && !isLoading ) && (
            <div className="w-full h-full mt-14 flex flex-col items-center justify-center gap-4">
              <img src={ emptyState } alt="Empty" />
              <span className="text-gray-700">Não encontramos nenhuma transação!</span>
            </div>
          )}

          {(hasTransactions && !isLoading) && (
            <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
              {transactionBeingEdited && (
                <EditTransactionModal
                  open={isEditModalOpen}
                  onClose={handleCloseEditModal}
                  transaction={transactionBeingEdited}
                />
              )}

              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                  role="button"
                  onClick={() => handleOpenEditModal(transaction)}
                >
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon
                      type={transaction.type === 'EXPENSE' ? 'expense' : 'income' }
                      category={transaction.category?.icon}
                    />

                    <div>
                      <strong className="block font-bold text-gray-800 tracking-[-0.5px]">
                        { transaction.name }
                      </strong>
                      <small className="text-gray-600 text-sm">
                        { formatDate(new Date(transaction.date)) }
                      </small>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'font-medium tracking-[-0.5px]',
                      transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                      !areValuesVisible && 'blur-sm',
                    )}
                  >
                    {`${transaction.type === 'EXPENSE' ? '-' : '+'} ${formatCurrency(transaction.value)}`}
                  </span>
                </div>
              ))}

            </div>
          )}
        </>
      )}
    </div>
  )
}
