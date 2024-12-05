import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './Layout';
import AppRouter from './AppRouter';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(
    <Layout>
        <AppRouter />
    </Layout>
);
