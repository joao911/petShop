import { Sun, Cloudy, Moon } from 'lucide-react';
import { IAppointmentPeriod } from '@/types/appointments';
import { AppointmentCard } from '../AppointmentCard';

interface PeriodSectionProps {
  period: IAppointmentPeriod;
}

export const PeriodSection = ({ period }: PeriodSectionProps) => {
  const periodIcons = {
    morning: <Sun className="text-accent-blue" />,
    afternoon: <Cloudy className="text-accent-orange" />,
    evening: <Moon className="text-accent-yellow" />,
  };
  return (
    <section className="m-8 bg-background-tertiary rounded-xl ">
      <div className="flex items-center px-5 py-3 justify-between border-b border-[#2e2c30]">
        <div className="flex items-center gap-2">
          {periodIcons[period.type]}
          <h2 className="text-label-large-size text-border-secondary">
            {period.title}
          </h2>
        </div>
        <span>{period.timeRange}</span>
      </div>

      {period.appointments.length > 0 ? (
        <div className="px-5">
          <div>
            {period.appointments.map((item, index) => (
              <AppointmentCard
                key={index}
                appointment={item}
                isFirstInSection={index === 0}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-paragraph-small-size text-content-secondary p-5">
          Nenhum agendamento para esse horário
        </p>
      )}
    </section>
  );
};
