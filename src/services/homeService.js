import request from '~/utils/request';
export const homeService = async () => {
    try {
        const result = await request.get('/home');
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
