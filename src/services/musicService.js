import request from '~/utils/request';

export const getInfo = async (id) => {
    try {
        const result = await request.get('/infosong', {
            params: {
                id: id,
            },
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSong = async (id) => {
    try {
        const result = await request.get('/song', {
            params: {
                id: id,
            },
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDetailPlayList = async (id) => {
    try {
        const result = await request.get('/detailplaylist', {
            params: {
                id: id,
            },
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
