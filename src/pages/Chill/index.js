import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '~/services';
import { useDispatch } from 'react-redux';
import * as actions from '~/redux/actions';

function Chill() {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        // dispatch(actions.setLoadingPage(true));
        const fetchApi = async () => {
            const response = await apis.getDetailPlayList(id);
            console.log(response);
            // dispatch(actions.setLoadingPage(true));
        };
        fetchApi();
    }, [id]);
    return <div>Chill</div>;
}

export default Chill;
