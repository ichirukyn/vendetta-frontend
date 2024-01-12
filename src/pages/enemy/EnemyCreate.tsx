import { FC } from 'react';
import EnemyForm from "@/widgets/Enemy/EnemyForm";

const EnemyCreate: FC = () => {
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Создание противника</h3>
      
      <EnemyForm/>
    </div>
  );
};

export default EnemyCreate;