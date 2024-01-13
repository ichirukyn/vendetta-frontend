import { boolean, number, object, string } from "yup";

export const EventCreateScheme = object().shape({
  name: string().required('Введите название'),
  desc: string().required('Введите описание'),
  text: string().optional(),
  keyboard: string().nullable(),
  state: string().nullable(),
  type: string().required('Выберите тип'),
})

export const EventTriggerCreateScheme = object().shape({
  name: string().required('Введите название'),
  desc: string().required('Введите описание'),
  condition_attr: string().optional(),
  condition: string().optional(),
  condition_value: number().optional(),
  condition_item: number().optional(),
  chance: number().optional(),
  trigger_type: string().required('Выберите тип'),
  text: string().optional(),
  reward: string().optional(),
  mandatory: boolean().default(false),
  hidden: boolean().default(false),
})