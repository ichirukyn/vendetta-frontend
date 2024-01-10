import { FC } from 'react';
import TechniqueForm from "@/widgets/technique/techniqueForm";
import TechniqueTooltip from "@/widgets/technique/TechniqueTooltip";

const TechniqueCreate: FC = () => {
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Конструктор техник</h3>
      
      <div className="block_row gap_20 w_100p technique__wrap">
        <TechniqueForm/>
        <TechniqueTooltip/>
      </div>
    </div>
  );
};

export default TechniqueCreate;