import { FC } from 'react';
import EventForm from "@/widgets/Event/EventForm";

const EventCreate: FC = () => {
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Создания события</h3>
      
      <EventForm/>
    </div>
  );
};

export default EventCreate;