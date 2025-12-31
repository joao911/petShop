'use client';
import { LoaderCircle } from 'lucide-react';
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
  loading: boolean;
}

export const ModalConfirm = ({
  children,
  description,
  title,
  handleCancel,
  handleConfirm,
  open,
  setOpen,
  loading,
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
          <AlertDialogCancel disabled={loading} onClick={handleCancel}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleConfirm}>
            {loading && <LoaderCircle className="animate-spin" />}
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
