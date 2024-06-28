import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/entities/BankAccount";

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: BankAccount | null;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  toggleValuesVisibility(): void;

  handleNewAccountModalOpen(): void;
  handleNewAccountModalClose(): void;

  handleNewTransactionModalOpen(type: 'INCOME' | 'EXPENSE'): void;
  handleNewTransactionModalClose(): void;

  handleEditAccountModalOpen(account: BankAccount): void;
  handleEditAccountModalClose(): void;
}

export const DashboardContext = createContext<DashboardContextValue>({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  function handleNewAccountModalOpen() {
    setIsNewAccountModalOpen(true);
  }

  function handleNewAccountModalClose() {
    setIsNewAccountModalOpen(false);
  }

  function handleNewTransactionModalOpen(type: 'INCOME' | 'EXPENSE') {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }

  function handleNewTransactionModalClose() {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }

  function handleEditAccountModalOpen(account: BankAccount) {
    setAccountBeingEdited(account);
    setIsEditAccountModalOpen(true);
  }

  function handleEditAccountModalClose() {
    setAccountBeingEdited(null);
    setIsEditAccountModalOpen(false);
  }
  
  return (
    <DashboardContext.Provider value={{
      areValuesVisible,
      isNewAccountModalOpen,
      isNewTransactionModalOpen,
      isEditAccountModalOpen,
      accountBeingEdited,
      newTransactionType,
      toggleValuesVisibility,
      handleNewAccountModalOpen,
      handleNewAccountModalClose,
      handleNewTransactionModalOpen,
      handleNewTransactionModalClose,
      handleEditAccountModalOpen,
      handleEditAccountModalClose,
    }}>
      { children }
    </DashboardContext.Provider>
  )
}