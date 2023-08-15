import { useSelector, useDispatch } from 'react-redux';
import * as apis from '~/services';
import * as actions from '~/redux/actions';
import Search from '../Search';
import { useEffect, useState } from 'react';
import { Section } from '~/components/Section';

function SearchPlaylist() {
    const dispatch = useDispatch();
    const [playList, setPlayList] = useState([]);
    const { search } = useSelector((state) => state.music);

    useEffect(() => {
        dispatch(actions.setLoadingPage(true));
        const fetchApi = async () => {
            const response = await apis.getArtist(search?.data?.top?.alias);
            if (response?.err === 0) {
                setPlayList(response?.data?.sections[1]);
                dispatch(actions.setLoadingPage(false));
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Search />
            <Section data={playList} quantity={200} />
        </div>
    );
}

export default SearchPlaylist;
