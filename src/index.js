import React from 'react';
import {AppProvider} from 'app/providers';
import {createRoot} from 'react-dom/client';
import './index.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
        <AppProvider/>
    </React.StrictMode>
);
