'use client';

import { cn } from '@/lib/utils';
import { IAppointment } from '@/types/appointments';
import { AppointmentForm } from '../AppointmentForm';
import { Button } from '../ui/button';
import { Pen, Trash } from 'lucide-react';
import { deleteAppointment } from '@/app/actions';
import { ModalConfirm } from '../ModalConfirm';
import { useState } from 'react';

interface AppointmentCardProps {
  appointment: IAppointment;
  isFirstInSection?: boolean;
}

export const AppointmentCard = ({
  appointment,
  isFirstInSection,
}: AppointmentCardProps) => {
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    await deleteAppointment(appointment.id);
    setOpen(false);
  };
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-[15%_35%_30%_20%] items-center py-3',
        isFirstInSection && 'border-t border-border-divisor'
      )}
    >
      <div className="text-left pr-4 md:pr-0">
        <span className="text-label-small text-content-primary font-semibold">
          {appointment.time}
        </span>
      </div>

      <div className="text-right md:text-left md:pr-4">
        <div className="flex items-center justify-end md:justify-start gap-1">
          <span className=" text-label-small-size text-content-primary font-semibold">
            {appointment.petName}
          </span>
          <span className="text-paragraph-small-size text-content-secondary">
            /
          </span>
          <span className="text-paragraph-small-size text-content-secondary">
            {appointment.tutorName}
          </span>
        </div>
      </div>
      <div className="text-left pr-4  hidden md:block mt-1 md:mt-0 cols-span-2 md:col-span-1">
        <span className="text-paragraph-small-size text-content-secondary">
          {appointment.description}
        </span>
      </div>

      <div className="text-right mt-2 md:mt-0  col-span-2 md:col-span-1 flex justify-end items-center gap-2">
        <AppointmentForm appointment={appointment}>
          <Button variant="edit" size="icon">
            <Pen size={16} />
          </Button>
        </AppointmentForm>
        <ModalConfirm
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          open={open}
          setOpen={setOpen}
          title="Excluir agendamento"
          description="Tem certeza que deseja excluir esse agendamento? Esta ação nao pode ser desfeita."
        >
          <Button variant="remove" size="icon">
            <Trash size={16} />
          </Button>
        </ModalConfirm>
      </div>
    </div>
  );
};
