import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Search from '../Search';
import styles from './SearchAll.module.scss';
import { useFormat } from '~/components/hooks';
import { PlayIcon, SearchIcon } from '~/components/icons';
import Media from '~/components/Media';
import { Section, Artists } from '~/components/Section';

const cx = classNames.bind(styles);
function SearchAll() {
    const { search } = useSelector((state) => state.music);
    let follower = useFormat(search && search?.data?.artists[0]?.totalFollow);

    return (
        <div className={cx('wrapper')}>
            <Search />
            <div className={cx('section-top')}>
                <h3 className={cx('section-top-head')}>Nổi bật</h3>
                <div className={cx('section-top-list', 'grid row')}>
                    {search?.data?.top && (
                        <div className="col l-4">
                            <div className={cx('section-top-item')}>
                                <div
                                    className={cx('section-top-left', {
                                        circle: search?.data?.top?.objectType === 'artist' ? true : false,
                                    })}
                                >
                                    <img className={cx('section-top-img')} src={search?.data?.top?.thumbnail} alt="" />
                                    <div className={cx('option')}>
                                        {search?.data?.top?.objectType === 'artist' ? (
                                            <SearchIcon width="3rem" height="3rem" />
                                        ) : (
                                            <PlayIcon />
                                        )}
                                    </div>
                                </div>
                                <div className={cx('section-top-right')}>
                                    <h3 className={cx('section-top-title')}>
                                        {search?.data?.top?.objectType === 'artist' ? 'Nghệ sĩ' : 'Bài hát'}
                                    </h3>
                                    <div className={cx('section-top-info')}>
                                        <h3>{search?.data?.top?.title || search?.data?.top?.name}</h3>
                                        {search?.data?.top?.objectType === 'artist' && (
                                            <span>{`${follower} quan tâm`}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {search?.data?.songs
                        ?.filter((x, index) => index < 2)
                        .map((item) => (
                            <div key={item.encodeId} className="col l-4">
                                <div className={cx('section-top-item')}>
                                    <Media songData={item} className={cx('songs-item')} width="84px" height="84px" />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <Section data={search?.data?.songs} title="Bài Hát" />
            <Section data={search?.data?.playlists} title="Playlist/Album" isAlbum />
            <Artists data={search?.data?.artists} />
        </div>
    );
}

export default SearchAll;
