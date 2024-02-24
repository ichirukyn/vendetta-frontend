import React, { FC, useEffect, useState } from 'react';
import { TechniqueType } from "@/shared/types/technique";
import Table from "@/shared/ui/Table/Table";
import { TechniqueColumn } from "@/widgets/Technique/Technique.column";
import { Link } from "react-router-dom";
import { pathRoutes } from "@/app";
import { MenuItem, Select } from "@mui/material";
import { useRaceStore } from "@/shared/store/RaceStore";
import { useClassStore } from "@/shared/store/ClassStore";
import { useTechniqueFilter } from "@/shared/store/Technique";
import { useTechniqueStore } from "@/shared/store/TechniqueStore";
import { ClassType } from "@/shared/types";

const TechniqueList: FC = () => {
  const [filterList, setFilterList] = useState<TechniqueType[] | []>([])
  const [filterClassList, setFilterClassList] = useState<ClassType[]>([])
  
  
  const { raceList } = useRaceStore()
  const { classList } = useClassStore()
  const { techniqueList } = useTechniqueStore()
  const { filter, setFilter } = useTechniqueFilter()
  
  useEffect(() => {
    if (filter.class_id === 0 && filter.race_id === 0) {
      setFilterList(techniqueList)
    } else if (filter.class_id === 0 && filter.race_id !== 0) {
      setFilterList(techniqueList.filter((technique) => technique.race_id === filter.race_id))
    }
  }, [filter, techniqueList]);
  
  useEffect(() => {
    if (!filter.class_id) return
    
    setFilterList(techniqueList.filter((technique) => technique.class_id === filter.class_id))
  }, [filter.class_id]);
  
  useEffect(() => {
    if (!filter.race_id) return
    
    setFilterList(techniqueList.filter((technique) => technique.race_id === filter.race_id))
    setFilter({ ...filter, class_id: 0 })
    setFilterClassList(classList.filter(({ race_id }) => race_id === filter.race_id))
  }, [filter.race_id]);
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Список техник</h3>
      
      <div className='block_row w_100p'>
        <div className="block_column align-start w_100p">
          <label>Раса</label>
          <Select className='w_100p' value={ filter.race_id } onChange={ (e) => setFilter({ ...filter, race_id: Number(e.target.value) }) }>
            <MenuItem value={ 0 }>Любая раса</MenuItem>
            { raceList.map(({ id, name }) => (
              <MenuItem value={ id } key={ id }>{ name }</MenuItem>
            )) }
          </Select>
        </div>
        
        <div className="block_column align-start w_100p">
          <label>Класс</label>
          <Select className='w_100p' value={ filter.class_id }
                  onChange={ (e) => setFilter({ ...filter, class_id: Number(e.target.value) }) }>
            <MenuItem value={ 0 }>Любой класс</MenuItem>
            { filterClassList.map(({ id, name }) => (
              <MenuItem value={ id } key={ id }>{ name }</MenuItem>
            )) }
          </Select>
        </div>
      </div>
      
      <Table rows={ filterList } columns={ TechniqueColumn } style={ { isHeader: true } }/>
      
      <div className="block_row justify-end w_100p mt_10">
        <Link to={ pathRoutes.technique.create }>
          <button className='button'>Создать</button>
        </Link>
      </div>
    </div>
  );
};

export default TechniqueList;