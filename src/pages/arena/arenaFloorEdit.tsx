import { FC } from "react";
import { useParams } from "react-router-dom";
import ArenaFloorForm from "@/widgets/Arena/ArenaFloorForm";

const ArenaFloorEdit: FC = () => {
  const { id } = useParams()
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Редактирование противнка для арены</h3>
      
      <div className="block_row gap_20 w_100p technique__wrap">
        <ArenaFloorForm id={ id ? Number(id) : undefined }/>
      </div>
    </div>
  );
};

export default ArenaFloorEdit;