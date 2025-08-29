import React from 'react'
import {createRoot} from 'react-dom/client'
import App from "@/app/App";

import '@/app/index.scss'
import {ThemeProvider} from "@mui/material";
import {theme} from "@/theme";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </React.StrictMode>
  </ThemeProvider>
)
