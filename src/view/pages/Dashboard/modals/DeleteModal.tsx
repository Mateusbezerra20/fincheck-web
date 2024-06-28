import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { TrashIcon } from "../../../components/icons/TrashIcon";

interface DeleteModalProps {
  onClose?(): void;
  onConfirm?(): void;
  title: string;
  description?: string;
  isLoading?: boolean;
}

export function DeleteModal({ title, description, isLoading, onClose, onConfirm } : DeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose} >
      <div className="flex flex-col items-center justify-center gap-6">
        <TrashIcon className="w-[52px] h-[52px] p-[14px] bg-red-50 text-red-900 rounded-full"/>
        <p className="text-gray-800 font-bold tracking-[-0.5px] text-center max-w-[179px]">
          { title }
        </p>
        { description && (
          <p className="text-gray-800 tracking-[-0.5px] text-center">
            { description }
          </p>
        )}
      </div>
      <div className="space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir
        </Button>
        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}