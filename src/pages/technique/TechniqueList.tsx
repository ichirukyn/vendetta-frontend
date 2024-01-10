import { FC, useEffect, useState } from 'react';
import { fetchAllTechnique } from "@/shared/api/technique";
import { TechniqueType } from "@/shared/types/technique";
import Table from "@/shared/ui/Table/Table";
import { TechniqueColumn } from "@/widgets/technique/technique.column";

const TechniqueList: FC = () => {
  const [techniqueList, setTechniqueList] = useState<TechniqueType[] | []>([])
  
  useEffect(() => {
    fetchAllTechnique().then((res) => {
      setTechniqueList(res.data)
    })
  }, []);
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Список техник</h3>
      
      
      <Table rows={ techniqueList } columns={ TechniqueColumn } style={ { isHeader: true } }/>
    </div>
  );
};

export default TechniqueList;