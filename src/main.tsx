import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Layout from './router/Layout';
import { CookiesProvider } from 'react-cookie';
import AnalyticsProvider from './router/AnalyticsProvider.';
import ErrorBoundary from './components/atom/ErrorBoundary';
import { ErrorPage } from './pages';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorBoundary fallback={<ErrorPage />}>
        <CookiesProvider>
            <BrowserRouter>
                <AnalyticsProvider>
                    <Layout>
                        <App />
                    </Layout>
                </AnalyticsProvider>
            </BrowserRouter>
        </CookiesProvider>
    </ErrorBoundary>
);
