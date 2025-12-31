import { AppointmentForm } from '@/components/AppointmentForm';
import { PeriodSection } from '@/components/PeriodSection';
import { prisma } from '@/lib/prisma';

import {
  groupAppointmentsByPeriod,
  mockAppointments,
} from '@/utils/appointments-utils';

export default async function Home() {
  const appointment = await prisma.appointment.findMany();
  console.log('appointment', appointment);
  const periods = groupAppointmentsByPeriod(appointment);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">
            Sua agenda
          </h1>
          <p className="text-paragraph-medium text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para você
          </p>
        </div>
      </div>
      {periods.map((period, index) => (
        <PeriodSection period={period} key={index} />
      ))}
      <div className="fixed bottom-0 right-0 left-0 flex justify-center bg-background-tertiary py-18 px-6 md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm />
      </div>
    </div>
  );
}
