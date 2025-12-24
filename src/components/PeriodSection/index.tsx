import { Sun, Cloudy, Moon } from 'lucide-react';
import { IAppointmentPeriod } from '@/types/appointments';

interface PeriodSectionProps {
  period: IAppointmentPeriod;
}

export const PeriodSection = ({ period }: PeriodSectionProps) => {
  console.log('period', period);

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
    </section>
  );
};
