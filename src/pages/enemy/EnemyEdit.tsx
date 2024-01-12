import { FC } from 'react';
import EnemyForm from "@/widgets/Enemy/EnemyForm";
import { useParams } from "react-router-dom";

const EnemyEdit: FC = () => {
  const { id } = useParams()
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Редактирование противника</h3>
      
      <EnemyForm id={ id ? Number(id) : undefined }/>
    </div>
  );
};

export default EnemyEdit;