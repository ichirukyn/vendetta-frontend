import { pathRoutes } from "@/app/router/RouterPaths";

// Layout
import Default from "@/processes/Layout/Default";

// Page
import Home from "@/pages/home/Home";
import TechniqueList from "@/pages/technique/TechniqueList";
import TechniqueCreate from "@/pages/technique/TechniqueCreate";
import TechniqueEdit from "@/pages/technique/TechniqueEdit";
import EnemyList from "@/pages/enemy/EnemyList";
import HeroList from "@/pages/hero/HeroList";
import ItemList from "@/pages/item/ItemList";
import MapList from "@/pages/map/MapList";
import ItemCreate from "@/pages/item/ItemCreate";
import ItemEdit from "@/pages/item/ItemEdit";
import EnemyCreate from "@/pages/enemy/EnemyCreate";
import EnemyEdit from "@/pages/enemy/EnemyEdit";


export const Routers = [
  {
    path: pathRoutes.home,
    Component: Home,
    Layout: Default,
  },
  // Technique
  {
    path: pathRoutes.technique.base,
    Component: TechniqueList,
    Layout: Default,
  },
  {
    path: pathRoutes.technique.create,
    Component: TechniqueCreate,
    Layout: Default,
  },
  {
    path: `${ pathRoutes.technique.edit }/:id`,
    Component: TechniqueEdit,
    Layout: Default,
  },
  
  // Enemy
  {
    path: pathRoutes.enemy.base,
    Component: EnemyList,
    Layout: Default,
  },
  {
    path: pathRoutes.enemy.create,
    Component: EnemyCreate,
    Layout: Default,
  },
  {
    path: `${ pathRoutes.enemy.edit }/:id`,
    Component: EnemyEdit,
    Layout: Default,
  },
  // Hero
  {
    path: pathRoutes.hero.base,
    Component: HeroList,
    Layout: Default,
  },
  
  // Item
  {
    path: pathRoutes.item.base,
    Component: ItemList,
    Layout: Default,
  },
  {
    path: pathRoutes.item.create,
    Component: ItemCreate,
    Layout: Default,
  },
  {
    path: `${ pathRoutes.item.edit }/:id`,
    Component: ItemEdit,
    Layout: Default,
  },
  
  // Map
  {
    path: pathRoutes.map.base,
    Component: MapList,
    Layout: Default,
  },
]