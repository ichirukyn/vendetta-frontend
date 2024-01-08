// Layout
import Default from "@/processes/Layout/Default";

// Page
import Home from "@/pages/home/Home";

import { pathRoutes } from "@/app/router/RouterPaths";

export const publicRoutes = [
  {
    path: pathRoutes.home,
    Component: Home,
    Layout: Default,
  }
]