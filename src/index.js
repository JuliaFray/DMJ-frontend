import React from 'react';

import { createRoot } from 'react-dom/client';

import { AppProvider } from 'app/providers';

import './index.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
);
