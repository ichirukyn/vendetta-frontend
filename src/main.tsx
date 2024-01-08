import React from 'react'
import { createRoot } from 'react-dom/client'
import App from "@/app/App";

import '@/app/index.scss'
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={ theme }>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </ThemeProvider>
)
