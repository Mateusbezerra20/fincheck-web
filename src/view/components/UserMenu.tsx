import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../components/DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";

export function UserMenu() {
  const { signout, user } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="bg-teal-50 rounded-full w-12 h-12 flex justify-center items-center border border-teal-100">
          <span className="text-sm tracking-[-0.5px] font-medium text-teal-900">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32" align="end">
        <DropdownMenu.Item
          onSelect={signout}
          className="flex items-center justify-between"
        >
          Sair
          <ExitIcon className="w-4 h-4"/>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
