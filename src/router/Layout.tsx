import SideBar from '../components/base/SideBar';

type Props = {
    children: React.ReactNode;
};

export default function Layout(props: Props) {
    return (
        <main className='flex dark text-foreground bg-background'>
            <SideBar />
            {props.children}
        </main>
    );
}
