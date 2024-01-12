import { FC } from 'react';
import ItemForm from "@/widgets/Item/ItemForm";

const ItemCreate: FC = () => {
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Создание предмета</h3>
      
      <ItemForm/>
    </div>
  );
};

export default ItemCreate;