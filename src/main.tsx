// src/main.tsx
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'sweetalert2/src/sweetalert2.scss'
import './i18n'
import { AppKitProvider } from './components/AppKitProvider'

// NEW imports

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID as string

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AppKitProvider>
      <App />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AppKitProvider>
  </Provider>
)
