'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';

import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import {
  Dog,
  User,
  Phone,
  CalendarIcon,
  ChevronDownIcon,
  Clock,
  Loader2,
} from 'lucide-react';
import { IMaskInput } from 'react-imask';
import { startOfToday, format, setMinutes, setHours } from 'date-fns';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';
import { createAppointment, updateAppointment } from '@/app/actions';
import { useEffect, useState } from 'react';
import { IAppointment } from '@/types/appointments';

interface AppointmentFormProps {
  appointment?: IAppointment;
  children?: React.ReactNode;
}

const appointmentsFormSchema = z
  .object({
    tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
    petName: z.string().min(3, 'O nome do pet é obrigatório'),
    phone: z.string().min(11, 'O telefone é obrigatório'),
    description: z.string().min(3, 'A descrição é obrigatória'),
    scheduleAt: z
      .date({
        error: 'A data é obrigatória',
      })
      .min(startOfToday(), {
        message: 'A data não pode ser no passado',
      }),
    time: z.string().min(1, 'A hora é obrigatória'),
  })
  .refine(
    (data) => {
      const [hour, minute] = data.time.split(':');
      const scheduleDateTime = setMinutes(
        setHours(data.scheduleAt, Number(hour)),
        Number(minute)
      );
      return scheduleDateTime > new Date();
    },
    {
      path: ['time'],
      error: 'O horário não pode ser no passado',
    }
  );

type AppointmentsFormSchemaType = z.infer<typeof appointmentsFormSchema>;

export const AppointmentForm = ({
  appointment,
  children,
}: AppointmentFormProps) => {
  const [openModal, setOpenModal] = useState(false);

  const form = useForm<AppointmentsFormSchemaType>({
    resolver: zodResolver(appointmentsFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
      scheduleAt: undefined,
      time: '',
    },
  });

  const onSubmit = async (data: AppointmentsFormSchemaType) => {
    const { tutorName, petName, phone, description, scheduleAt, time } = data;
    const [hour, minute] = time.split(':');

    const formatedScheduleAt = setMinutes(
      setHours(scheduleAt, Number(hour)),
      Number(minute)
    );
    const isEditAppointment = !!appointment;
    const result = isEditAppointment
      ? await updateAppointment(appointment.id, {
          tutorName,
          petName,
          phone,
          description,
          scheduleAt: formatedScheduleAt,
        })
      : await createAppointment({
          tutorName,
          petName,
          phone,
          description,
          scheduleAt: formatedScheduleAt,
        });

    if (result?.error) {
      toast.error(result?.error);
      return;
    }

    toast.success(
      isEditAppointment
        ? 'Agendamento atualizado com sucesso!'
        : 'Agendamento realizado com sucesso!'
    );
    form.reset();
    setOpenModal(false);
  };

  useEffect(() => {
    form.reset(appointment);
  }, []);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent
        variant="appointment"
        overlayVariant="blurred"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size="modal" className="text-center">
            Agende um atendimento
          </DialogTitle>
          <DialogDescription size="modal" className="text-center">
            Preencha os dados do cliente para realizar o agendamento:
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tutorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Tutor</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-content-brand"
                      />
                      <Input
                        {...field}
                        placeholder="Nome do tutor"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="petName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Pet</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Dog
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-content-brand"
                      />
                      <Input
                        {...field}
                        placeholder="Nome do pet"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-content-brand"
                      />
                      <IMaskInput
                        {...field}
                        placeholder="(99) 99999-9999"
                        mask="(00) 00000-0000"
                        className="pl-10 flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do serviço</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Descreva o serviço"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <FormField
                control={form.control}
                name="scheduleAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-label-medium-size text-content-primary">
                      Data
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                              !field.value && 'text-content-secondary'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <CalendarIcon
                                className=" text-content-brand"
                                size={20}
                              />
                              {field.value ? (
                                format(field.value, 'dd/MM/yyyy')
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                            </div>
                            <ChevronDownIcon className="opacity-50 h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < startOfToday()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-label-medium-size text-content-primary">
                      Hora
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-content-brand" />
                            <SelectValue placeholder="--:-- --" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex justify-end">
              <Button
                type="submit"
                variant="brand"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Agendar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const generateTimeOptions = () => {
  const timers = [];
  for (let hour = 9; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timesString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timers.push(timesString);
    }
  }
  return timers;
};

const TIME_OPTIONS = generateTimeOptions();
