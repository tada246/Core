import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Layout from './router/Layout';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CookiesProvider>
        <BrowserRouter>
            <Layout>
                <App />
            </Layout>
        </BrowserRouter>
    </CookiesProvider>
);
