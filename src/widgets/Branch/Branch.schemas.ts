import { boolean, number, object, string } from "yup";

export const BranchCreateScheme = object().shape({
  emoji: string().optional(),
  parent_id: number().required(),
  technique_id: number().required(),
  is_hidden: boolean().optional(),
  condition_attribute: string().optional(),
  condition: string().optional(),
  condition_value: number().optional(),
})