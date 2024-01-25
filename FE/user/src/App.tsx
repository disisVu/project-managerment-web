import { ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RouterProvider } from 'react-router-dom'
import { AlertDialogSlide, AuthProvider, LoadingComponent, ToastProvider } from './components'
import { router } from './routes/route'
import './styles/App.scss'
import theme from './styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DndProvider backend={HTML5Backend}>
              <RouterProvider router={router} />
              <LoadingComponent />
              <AlertDialogSlide />
            </DndProvider>
          </LocalizationProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
