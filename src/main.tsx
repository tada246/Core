import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Layout from './router/Layout';
import { CookiesProvider } from 'react-cookie';
import ShowLogo from './router/ShowLogo';
import AnalyticsProvider from './router/AnalyticsProvider.';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CookiesProvider>
        <BrowserRouter>
            <AnalyticsProvider>
                <ShowLogo>
                    <Layout>
                        <App />
                    </Layout>
                </ShowLogo>
            </AnalyticsProvider>
        </BrowserRouter>
    </CookiesProvider>
);
