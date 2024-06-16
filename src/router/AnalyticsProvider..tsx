import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

export default function AnalyticsProvider(props: {
    children: React.ReactNode;
}) {
    const { children } = props;
    const location = useLocation();

    useEffect(() => {
        if (import.meta.env.DEV || !import.meta.env.VITE_ANALYTICS_ID) {
            return;
        }

        ReactGA.initialize(import.meta.env.VITE_ANALYTICS_ID || '');
        ReactGA.send({
            hitType: 'pageview',
            page: location.pathname + location.search,
        });
    }, [location]);

    return children;
}
