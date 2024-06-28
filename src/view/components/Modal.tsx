import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../utils/cn';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  title: string;
  onClose?(): void;
}

export function Modal({ open, children, rightAction, title, onClose } : ModalProps) {
 return (
    <Dialog.Root open={ open } onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-30 bg-black/25 backdrop-blur-sm',
            'data-[state=open]:animate-overlay-show',
          )}
        />
        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 w-full max-w-[400px] bg-white rounded-2xl z-40 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none',
            'data-[state=open]:animate-content-show',
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button
              className="w-12 h-12 flex items-center justify-center outline-none"
              onClick={ onClose }
            >
              <Cross2Icon className='h-6 w-6'/>
            </button>

            <span className="text-lg font-bold tracking-[-1px]">
              {title}
            </span>

            <div className="w-12 h-12 flex items-center justify-center outline-none">
              {rightAction}
            </div>
          </header>

          <div className="space-y-10">
            { children }
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}