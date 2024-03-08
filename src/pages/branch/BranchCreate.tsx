import { FC } from 'react';
import BranchForm from "@/widgets/Branch/BranchForm";

const EnemyCreate: FC = () => {
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Привязка техники</h3>
      
      <BranchForm/>
    </div>
  );
};

export default EnemyCreate;