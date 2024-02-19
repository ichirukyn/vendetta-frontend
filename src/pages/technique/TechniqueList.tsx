import { FC, useEffect, useState } from 'react';
import { fetchAllTechnique } from "@/shared/api/technique";
import { TechniqueType } from "@/shared/types/technique";
import Table from "@/shared/ui/Table/Table";
import { TechniqueColumn } from "@/widgets/Technique/Technique.column";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";

const TechniqueList: FC = () => {
  const [techniqueList, setTechniqueList] = useState<TechniqueType[] | []>([])
  
  useEffect(() => {
    fetchAllTechnique({ hidden: true }).then((res) => {
      setTechniqueList(res.data)
    })
  }, []);
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Список техник</h3>
      
      
      <Table rows={ techniqueList } columns={ TechniqueColumn } style={ { isHeader: true } }/>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ pathRoutes.technique.create }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
  );
};

export default TechniqueList;