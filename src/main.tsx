import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { ThemeContextProvider } from '~contexts/ThemeContextProvider.tsx';
import store from '~store/store.ts';

import App from './App.tsx';

import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeContextProvider>
  </StrictMode>
);
