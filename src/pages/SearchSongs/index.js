import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../Search';
import ListSong from '~/components/ListSong';
import * as actions from '~/redux/actions';

function SearchSongs() {
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(1);
    const { search } = useSelector((state) => state.music);
    useEffect(() => {
        dispatch(actions.getSearchSongs(search?.data?.top?.id, page));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    return (
        <div>
            <Search />
            <ListSong isHide />
        </div>
    );
}

export default SearchSongs;
