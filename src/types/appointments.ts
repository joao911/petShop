export type IAppointmentPeriodDay = 'morning' | 'afternoon' | 'evening';

export interface IAppointment {
  id: string;
  time: string;
  petName: string;
  tutorName: string;
  phone: string;
  description: string;
  scheduleAt: Date;
  period: IAppointmentPeriodDay;
}

export interface IAppointmentPeriod {
  title: string;
  type: IAppointmentPeriodDay;
  timeRange: string;
  appointments: IAppointment[];
}

export interface IAppointmentPrisma {
  id: string;
  tutorName: string;
  petName: string;
  phone: string;
  description?: string;
  scheduleAt: Date;
}
