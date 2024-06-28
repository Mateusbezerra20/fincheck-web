import { useEffect, useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionsService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();
  const [filters, setFilters] = useState<TransactionsFilters>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);

  const { transactions, isFetching, isInitialLoading, refetch } = useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }))
    }
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setTransactionBeingEdited(null);
    setIsEditModalOpen(false);
  }

  function handleApplyFilters(bankAccountId: string | undefined, year: number) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading: isFetching,
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
  };
}