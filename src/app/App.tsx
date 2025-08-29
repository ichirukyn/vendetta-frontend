import {FC, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from '@/app/router/AppRouter';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRaceStore} from '@/shared/store/RaceStore';
import {useClassStore} from '@/shared/store/ClassStore';
import {useTechniqueStore} from '@/shared/store/TechniqueStore';
import {useEnemyStore} from '@/shared/store/EnemyStore';
import {useTeamStore} from "@/shared/store/TeamStore";
import {useSpellStore} from "@/shared/store/SpellStore";
import {useArenaQuery} from "@/shared/store/hooks";


const App: FC = () => {
  const {floorList} = useArenaQuery()

  useEffect(() => {
    if (floorList.isError) console.log('FloorListError')
  }, [floorList.isError]);

  const {getRaceList} = useRaceStore()
  const {getClassList} = useClassStore()
  const {getTechniqueList} = useTechniqueStore()
  const {getSpellList} = useSpellStore()
  const {getEnemyList} = useEnemyStore()
  const {getTeamList} = useTeamStore()

  useEffect(() => {
    getRaceList()
    getClassList()
    getTechniqueList()
    getSpellList()
    getEnemyList()
    getTeamList()
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer draggable={false}/>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default App;
