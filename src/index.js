import { createRoot } from 'react-dom/client';
import { ContextProvider } from './Context';
import App from './App';
import './index.css';

createRoot(document.querySelector('#root')).render(
  <ContextProvider>
      <App />
  </ContextProvider>
);