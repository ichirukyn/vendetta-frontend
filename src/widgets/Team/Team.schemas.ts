import { boolean, number, object, string } from "yup";

export const TeamSchemas = object().shape({
  name: string().required('Введите название'),
  leader_id: number().required('Выберите лидера'),
  min_lvl: number().optional(),
  is_private: boolean().optional(),
  is_npc: boolean().optional(),
})