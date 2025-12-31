'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

type IAppointment = z.infer<typeof appointmentSchema>;

export async function createAppointment(appointment: IAppointment) {
  try {
    const parseData = appointmentSchema.parse(appointment);
    const scheduleAt = parseData.scheduleAt;
    const hour = scheduleAt.getHours();
    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 18 && hour < 21;
    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error: 'Agendamentos so podem ser feitos entre 9h e 21h',
      };
    }

    const existingAppointments = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      },
    });
    if (existingAppointments) {
      return {
        error: 'Ja existe um agendamento para essa data',
      };
    }
    await prisma.appointment.create({
      data: {
        ...parseData,
      },
    });
    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return {
      error: 'Ocorreu um erro ao criar o agendamento',
    };
  }
}

export async function updateAppointment(id: string, appointment: IAppointment) {
  try {
    const parseData = appointmentSchema.parse(appointment);
    const scheduleAt = parseData.scheduleAt;
    const hour = scheduleAt.getHours();
    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 18 && hour < 21;
    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error: 'Agendamentos so podem ser feitos entre 9h e 21h',
      };
    }

    const existingAppointments = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      },
    });
    if (existingAppointments) {
      return {
        error: 'Ja existe um agendamento para essa data',
      };
    }
    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...parseData,
      },
    });
    revalidatePath('/');
  } catch (error) {
    console.log(error);
  }
  return {
    error: 'Nao foi possivel atualizar o agendamento',
  };
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: {
        id,
      },
    });
    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return {
      error: 'Nao foi possível deletar o agendamento',
    };
  }
}
