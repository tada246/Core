import { authority } from '../store/authority';

export function getAuthority(user_authority: string) {
    return authority.filter((item) => item.id === user_authority)[0];
}
