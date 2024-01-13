import { FC, useEffect, useState } from 'react';
import Table from "@/shared/ui/Table/Table";
import { EventColumn } from "@/widgets";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { EventType } from "@/shared/types";
import { fetchAllEvent } from "@/shared/api/event";

const EventList: FC = () => {
  const [eventList, setEventList] = useState<EventType[] | []>([])
  
  useEffect(() => {
    fetchAllEvent().then((res) => {
      setEventList(res.data)
    })
  }, []);
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Список событий</h3>
      <Table rows={ eventList } columns={ EventColumn } style={ { isHeader: true } }/>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ pathRoutes.event.create }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
  );
};

export default EventList;