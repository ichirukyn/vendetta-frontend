import { FC, useEffect, useState } from 'react';
import Table from "@/shared/ui/Table/Table";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { ItemType } from "@/shared/types";
import { fetchAllItem } from "@/shared/api/item";
import { ItemColumn } from "@/widgets";

const ItemList: FC = () => {
  const [itemList, setItemList] = useState<ItemType[] | []>([])
  
  useEffect(() => {
    fetchAllItem().then((res) => {
      setItemList(res.data)
    })
  }, []);
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Предметы</h3>
      <Table rows={ itemList } columns={ ItemColumn } style={ { isHeader: true } }/>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ pathRoutes.item.create }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
  );
};

export default ItemList;