import { FC, useEffect, useState } from 'react';
import Table from "@/shared/ui/Table/Table";
import { ArenaType } from "@/shared/types";
import { ArenaColumn } from "@/widgets/Arena";
import { useArenaStore } from "@/shared/store/ArenaStore";

type ArenaRow = ArenaType & {
  enemies_count?: number,
}

const ArenaList: FC = () => {
  const [itemList, setItemList] = useState<ArenaRow[] | []>([])
  
  const { floorList } = useArenaStore()
  
  useEffect(() => {
    if (floorList.length) {
      const list: ArenaRow[] = []
      
      floorList.forEach((floor) => {
        list.push({
          ...floor,
          enemies_count: floor.enemies.length,
        })
      })
      setItemList(list)
    }
  }, [floorList]);
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Этажи</h3>
      <Table rows={ itemList } columns={ ArenaColumn } style={ { isHeader: true } }/>
      
      {/*<div className={ "block_row justify-end w_100p mt_10" }>*/ }
      {/*  <Link to={ pathRoutes.arena.create }>*/ }
      {/*    <button className='button'>Создать</button>*/ }
      {/*  </Link>*/ }
      {/*</div>*/ }
    </div>
  );
};

export default ArenaList;