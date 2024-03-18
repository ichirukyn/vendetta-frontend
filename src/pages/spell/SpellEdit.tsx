import { FC } from 'react';
import { useParams } from "react-router-dom";
import SpellForm from "@/widgets/Spell/SpellForm";

const SpellEdit: FC = () => {
  const { id } = useParams()
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Редактирование заклинания</h3>
      
      <div className="block_row gap_20 w_100p technique__wrap">
        <SpellForm id={ id ? Number(id) : undefined }/>
      </div>
    </div>
  );
};

export default SpellEdit;