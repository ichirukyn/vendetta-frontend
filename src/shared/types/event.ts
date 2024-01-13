export type EventType = {
  id?: number;
  name: string;
  desc: string;
  text?: string;
  keyboard?: string;
  state?: string;
  type: string;
}

export type EventTriggerType = {
  id?: number;
  event_id?: number;
  name: string;
  desc?: string;
  condition_attr?: string;
  condition?: string;
  condition_value?: number;
  condition_item?: number;
  chance?: number;
  trigger_type?: string;
  text?: string;
  reward?: string;
  mandatory?: boolean;
  hidden?: boolean;
}