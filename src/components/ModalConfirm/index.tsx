'use client';

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogDescription,
} from '../ui/alert-dialog';

interface ModalConfirmProps {
  children: React.ReactNode;
  title: string;
  description: string;
  handleConfirm: () => void;
  handleCancel: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ModalConfirm = ({
  children,
  description,
  title,
  handleCancel,
  handleConfirm,
  open,
  setOpen,
}: ModalConfirmProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
