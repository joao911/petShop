import { AppointmentForm } from '@/components/AppointmentForm';
import { DatePicker } from '@/components/DatePicker';
import { PeriodSection } from '@/components/PeriodSection';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

import { groupAppointmentsByPeriod } from '@/utils/appointments-utils';
import { endOfDay, parseISO, startOfDay } from 'date-fns';

export default async function Home(searchParams: {
  searchParams: Promise<{ data?: string }>;
}) {
  const { date } = await searchParams;
  const selectedDate = date ? parseISO(date) : new Date();
  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      },
    },
    orderBy: {
      scheduleAt: 'asc',
    },
  });
  const periods = groupAppointmentsByPeriod(appointments);

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
        <div className="hidden md:flex items-center gap-4">
          <DatePicker />
        </div>
      </div>
      <div className="mt-3 mb-8 md:hidden">
        <DatePicker />
      </div>
      {periods.map((period, index) => (
        <PeriodSection period={period} key={index} />
      ))}
      <div className="fixed bottom-0 right-0 left-0 flex justify-center bg-background-tertiary py-18 px-6 md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm>
          <Button variant="brand">Novo agendamento</Button>
        </AppointmentForm>
      </div>
    </div>
  );
}
