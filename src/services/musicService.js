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

export const search = async (keyword) => {
    try {
        const result = await request.get('/search', {
            params: {
                keyword: keyword,
            },
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

export const getArtistSongs = async (singerId, page) => {
    try {
        const result = await request.get('/artistsong', {
            params: {
                id: singerId,
                page: page,
                count: 50,
            },
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

export const getArtist = async (alias) => {
    try {
        const result = await request.get('/artist', {
            params: {
                name: alias,
            },
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

export const getChart = async () => {
    try {
        const result = await request.get('/charthome', {});
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
