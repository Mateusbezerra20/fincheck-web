import { useMemo, useState } from "react"
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountsController() {
  const {
    areValuesVisible,
    handleNewAccountModalOpen,
    toggleValuesVisibility,
  } = useDashboard();
  const windowWidth = useWindowWidth();
  const [ sliderState, setSliderState ] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, accounts) => total + accounts.currentBalance, 0)
  }, [accounts])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    handleNewAccountModalOpen,
    isLoading: isFetching,
    accounts,
    currentBalance,
  };
}