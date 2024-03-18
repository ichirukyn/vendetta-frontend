import { FC } from 'react';
import SpellForm from "@/widgets/Spell/SpellForm";

const SpellCreate: FC = () => {
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Конструктор заклинаний</h3>
      
      <div className="block_row gap_20 w_100p technique__wrap">
        <SpellForm/>
      </div>
    </div>
  );
};

export default SpellCreate;