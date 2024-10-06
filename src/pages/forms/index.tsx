import { useParams } from 'react-router-dom';
import { Form } from '../../types/firebase';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../features/firebase';
import toast from 'react-hot-toast';
import { Link as NextUILink } from '@nextui-org/react';
import OnlyEditors from '../../components/ui/OnlyEditors';
import SmallEventInfo from '../../components/ui/SmallEventInfo';
import { AddNewForm } from './addModal';
import UpdateForm from './updateModal';
import DeleteForm from './deleteModal';

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const [forms, setForms] = useState<Form[]>([]);

    async function getForm() {
        if (id) {
            onSnapshot(
                query(
                    collection(db, 'events', id, 'forms'),
                    orderBy('order', 'asc')
                ),
                (doc) => {
                    const _forms: Form[] = [];
                    doc.forEach((item) => {
                        _forms.push(item.data() as Form);
                    });
                    setForms(_forms);
                }
            );
        }
    }

    useEffect(() => {
        getForm().catch(() => {
            toast.error('フォームの取得に失敗');
        });
    }, []);

    if (!id) return <div>イベントが選択されていません</div>;

    return (
        <div>
            <SmallEventInfo
                smallText='アンケートの編集'
                tags={[`アンケート数: ${forms.length}`]}
            />
            <div className='flex flex-col gap-8 mt-8'>
                {forms.map((form) => (
                    <div
                        key={form.id}
                        className='flex justify-between items-start p-6 gap-6 bg-white shadow-medium rounded-large'
                    >
                        <div className='flex flex-col gap-3'>
                            <div className='w-8 h-8 flex items-center justify-center bg-primary-400 text-white rounded-small'>
                                <p className='text-sm'>{form.order}</p>
                            </div>
                            <OnlyEditors>
                                <UpdateForm form={form} id={id} />
                            </OnlyEditors>
                            <OnlyEditors>
                                <DeleteForm eventId={id} formId={form.id} />
                            </OnlyEditors>
                        </div>
                        <div className='flex-1 w-full'>
                            <p className='text-xl font-bold'>{form.name}</p>
                            <NextUILink
                                isExternal
                                className='mt-0 w-full line-clamp-1 break-all'
                                size='sm'
                                href={form.url}
                            >
                                {form.url}
                            </NextUILink>
                            <div className='mt-3 bg-white rounded-lg w-full'>
                                {form.content.split('\n').map((line) => (
                                    <p
                                        key={line}
                                        className='text-sm w-full break-all'
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <OnlyEditors>
                    <AddNewForm id={id} />
                </OnlyEditors>
            </div>
        </div>
    );
}
export type FormEditProps = {
    id: string;
};

export type FormEditState = {
    name: string;
    url: string;
    content: string;
    order: number;
};
