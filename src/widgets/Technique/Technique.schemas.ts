import { boolean, number, object, string } from "yup";

export const TechniqueCreateScheme = object().shape({
  name: string().required('Введите название'),
  desc: string().required('Введите описание'),
  desc_short: string().required('Введите описание или скопируйте из строки выше'),
  damage: number().optional(),
  type_damage: string(),
  distance: string(),
  race_id: number().nullable(),
  class_id: number().nullable(),
  type: string(),
  cooldown: number().optional(),
  is_stack: boolean().optional()
})