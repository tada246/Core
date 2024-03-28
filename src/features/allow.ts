export function isEditor(user_authority: string) {
    return ['ADMIN', 'EDITOR'].some(
        (authority) => authority === user_authority
    );
}
