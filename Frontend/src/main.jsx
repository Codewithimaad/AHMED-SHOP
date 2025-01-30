import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ShopContextProvider from './context/ShopContext.jsx';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <BrowserRouter>
    <ShopContextProvider >
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);