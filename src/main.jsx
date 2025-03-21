import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ChakraProvider } from './components/ui/provider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
       <ChakraProvider>
       <App />
       </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
