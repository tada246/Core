import toast from 'react-hot-toast';

export function copyText(text: string) {
    try {
        navigator.clipboard.writeText(text);
        toast('コピーに成功');
    } catch (err) {
        toast.error('コピー失敗');
    }
}
