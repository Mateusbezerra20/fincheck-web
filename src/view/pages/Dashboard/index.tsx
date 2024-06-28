import { useAuth } from "../../../app/hooks/useAuth"
import { Logo } from "../../components/Logo";
import { UserMenu } from "../../components/UserMenu";
import { Accounts } from "./components/Accounts";
import { DashboardContext, DashboardProvider } from "./components/DashboardContext";
import { Fab } from "./components/Fab";
import { Transactions } from "./components/Transactions";
import { EditAccountModal } from "./modals/EditAccountModal";
import { NewAccountModal } from "./modals/NewAccountModal";
import { NewTransactionModal } from "./modals/NewTransactionModal";

export function Dashboard() {

  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="flex flex-col gap-4 h-full w-full p-4 md:px-8 md:pt-6 md:pb-8">
            <header className="h-12 flex justify-between items-center">
              <Logo className="h-6 text-teal-900" />
              <UserMenu />
            </header>
    
            <main className="flex flex-col md:flex-row flex-1 gap-4 max-h-full">
              <div className="w-full md:w-1/2">
                <Accounts />
              </div>
              <div className="w-full md:w-1/2">
                <Transactions />
              </div>
            </main>
            
            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  )
}
