import { FC, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import { Routers } from "@/app/router";

const AppRouter: FC = () => {
  return (
    <Routes>
      { Routers.map(({ path, Component, Layout }) => (
        <Route
          key={ path }
          path={ path }
          element={
            <Suspense>
              <Layout>
                <Component/>
              </Layout>
            </Suspense>
          }
        />
      )) }
    </Routes>
  );
};

export default AppRouter;
