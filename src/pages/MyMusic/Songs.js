import { useEffect, useState } from 'react';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { db } from '~/firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Media from '~/components/Media/Media';

function Song() {
    const {
        user: { uid },
    } = useSelector((state) => state.home);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'songs'), where('uid', '==', uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const songs = [];
            querySnapshot.forEach((doc) => {
                songs.push(doc.data());
            });
            setSongs(songs);
        });
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);
    console.log(songs);
    return (
        <div>
            <Header />
            {(songs[0]?.myFavorites?.songData || songs[0]?.myFavorites)?.map((item) => {
                return <Media key={item.encodeId} songData={item} small width="40px" height="40px" />;
            })}
        </div>
    );
}

export default Song;
