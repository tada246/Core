import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../features/firebase';
import toast from 'react-hot-toast';
import FinalCheckModal from '../../components/ui/FinalCheckModal';
import { IoTrash } from 'react-icons/io5';

type DeleteFormProps = {
    eventId: string;
    formId: string;
};

export default function DeleteForm(props: DeleteFormProps) {
    async function deleteForm() {
        await deleteDoc(doc(db, 'events', props.eventId, 'forms', props.formId))
            .then(() => {
                toast.success('削除に成功');
            })
            .catch(() => {
                toast.error('削除に失敗');
            });
    }

    return (
        <FinalCheckModal
            onPress={() => deleteForm()}
            isIconOnly
            size='sm'
            variant='flat'
            message='このアンケートを削除しますか？'
        >
            <IoTrash size={16} />
        </FinalCheckModal>
    );
}
