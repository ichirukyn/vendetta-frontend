import { FC } from 'react';
import EventForm from "@/widgets/Event/EventForm";
import { useParams } from "react-router-dom";

const EventEdit: FC = () => {
  const { id } = useParams()
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Редактирование события</h3>
      
      <EventForm id={ id ? Number(id) : undefined }/>
    </div>
  );
};

export default EventEdit;