import { FC, useEffect, useState } from 'react';
import Table from "@/shared/ui/Table/Table";
import { HeroColumn } from "@/widgets/hero/hero.column";
import { HeroType } from "@/shared/types/hero";
import { fetchAllHero } from "@/shared/api/hero";

const HeroList: FC = () => {
  const [heroList, setHeroList] = useState<HeroType[] | []>([])
  
  useEffect(() => {
    fetchAllHero().then((res) => {
      setHeroList(res.data)
    })
  }, []);
  
  return (
    <div className='main__block block_column p_40 w_100p'>
      <h3 className='mb_30'>Игроки</h3>
      
      <Table rows={ heroList } columns={ HeroColumn } style={ { isHeader: true } }/>
    </div>
  );
};

export default HeroList;