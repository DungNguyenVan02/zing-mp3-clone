import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import SectionItem from './SectionItem';
import Title from './component/Title';
import Media from '../Media';
const cx = classNames.bind(styles);
function Section({ data, title, isAlbum, quantity = 5 }) {
    return (
        <div className={cx('wrapper')}>
            <Title data={data} title={title} quantity={quantity} link={data?.link && data?.link?.split('.')[0]} />
            <div className={cx('content', 'grid row')}>
                {title
                    ? data
                          ?.filter((item, index) => index < quantity)
                          ?.map((item) => {
                              return isAlbum ? (
                                  <SectionItem key={item?.encodeId} data={item} />
                              ) : (
                                  <div key={item?.encodeId} className="col l-6">
                                      <Media
                                          className={cx('wrap-item')}
                                          songData={item}
                                          width="40px"
                                          height="40px"
                                          showInfo
                                      />
                                  </div>
                              );
                          })
                    : data?.items
                          ?.filter((item, index) => index < quantity)
                          ?.map((item) => <SectionItem key={item?.encodeId} data={item} />)}
            </div>
        </div>
    );
}

export default memo(Section);
