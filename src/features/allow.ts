export function isEditor(user_authority: string) {
    return ['ADMIN', 'EDITOR'].some(
        (authority) => authority === user_authority
    );
}

export function isAdmin(user_authority: string) {
    return user_authority === 'ADMIN';
}
