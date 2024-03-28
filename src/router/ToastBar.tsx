import { useEffect } from 'react';
import { ToastBar as OfficialToastBar, Toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';

type Props = {
    toast: Toast;
};

export default function ToastBar(props: Props) {
    useEffect(() => {
        confetti({
            particleCount: 500,
            spread: 400,
            origin: { y: 0 },
            angle: 270,
        });
    }, []);

    return <OfficialToastBar toast={props.toast} />;
}
