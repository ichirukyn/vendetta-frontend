import { number, object, string } from "yup";

export const ItemCreateScheme = object().shape({
  name: string().required('Введите название'),
  desc: string().required('Введите описание'),
  value: number().nullable(),
  type: string(),
  modify: number().nullable(),
  class_type: string().nullable(),
  class_id: number().nullable(),
  race_id: number().nullable(),
})