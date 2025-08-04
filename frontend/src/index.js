import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Mantine setup
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <>
      <Notifications position="top-right" zIndex={9999} />
      <App />
    </>
  </MantineProvider>
);

// Optional performance monitoring
reportWebVitals();
