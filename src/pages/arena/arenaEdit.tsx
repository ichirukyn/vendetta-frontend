import { FC } from 'react';
import ItemForm from "@/widgets/Item/ItemForm";
import { useParams } from "react-router-dom";

const ArenaEdit: FC = () => {
  const { id } = useParams()
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Редактирование предмета</h3>
      
      <ItemForm id={ id ? Number(id) : undefined }/>
    </div>
  );
};

export default ArenaEdit;