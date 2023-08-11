import classNames from 'classnames/bind';
import styles from './InfoArtists.module.scss';
import Title from '../component/Title';
import { LogoTagIcon } from '~/components/icons';

const cx = classNames.bind(styles);

function InfoArtists({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Title title={`Về ${data?.name}`} quantity={10} />
            <div className="grid row">
                <div className={cx('content-left', 'col l-5')}>
                    <img className={cx('img')} src={data?.thumbnailM} alt={data?.name} />
                </div>
                <div className={cx('content-right', 'col l-7')}>
                    <div className={cx('description')}>
                        <p className={cx('content')} dangerouslySetInnerHTML={{ __html: data?.biography }}></p>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('follower')}>
                            <span>{Number(data?.totalFollow.toFixed(1)).toLocaleString()}</span>
                            <p>Người quan tâm</p>
                        </div>
                        <div className={cx('awards')}>
                            <span>{data?.awards?.length || 0}</span>
                            <p>Giải thưởng</p>
                        </div>
                        <div style={{ marginLeft: 24 }}>
                            <LogoTagIcon width="3.8rem" height="4rem" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoArtists;
