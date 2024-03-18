import { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/app/router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRaceStore } from '@/shared/store/RaceStore';
import { useClassStore } from '@/shared/store/ClassStore';
import { useTechniqueStore } from '@/shared/store/TechniqueStore';
import { useArenaStore } from '@/shared/store/ArenaStore';
import { useEnemyStore } from '@/shared/store/EnemyStore';
import { useTeamStore } from "@/shared/store/TeamStore";
import { useSpellStore } from "@/shared/store/SpellStore";

const App: FC = () => {
  const { getRaceList } = useRaceStore()
  const { getClassList } = useClassStore()
  const { getTechniqueList } = useTechniqueStore()
  const { getSpellList } = useSpellStore()
  const { getArenaList } = useArenaStore()
  const { getEnemyList } = useEnemyStore()
  const { getTeamList } = useTeamStore()
  
  useEffect(() => {
    getRaceList()
    getClassList()
    getTechniqueList()
    getSpellList()
    getArenaList()
    getEnemyList()
    getTeamList()
  }, []);
  
  return (
    <BrowserRouter>
      <ToastContainer draggable={ false }/>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default App;