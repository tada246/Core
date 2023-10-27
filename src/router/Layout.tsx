import SideBar from '../components/base/SideBar';

type Props = {
    children: React.ReactNode;
};

export default function Layout(props: Props) {
    return (
        <main className='flex'>
            <SideBar />
            {props.children}
        </main>
    );
}
