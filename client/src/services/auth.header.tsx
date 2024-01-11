export const authHeader = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return {Authorizationn: `Bearer ${accessToken}`};
    }else {
        return {Authorization: ''}
    }
}