import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/user/UserContext.jsx'
import { NgoProvider } from './context/ngo/NgoContext.jsx'
import { EventProvider } from './context/event/EventContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <NgoProvider>
          <EventProvider>
            <App />
          </EventProvider>
        </NgoProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
