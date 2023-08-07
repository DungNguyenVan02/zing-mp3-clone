import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import SectionItem from './SectionItem';
import Title from './component/Title';
import Media from '../Media';
const cx = classNames.bind(styles);
function Section({ data, title, isAlbum }) {
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <Title data={data} title={title} />
            <div className={cx('content', 'grid row')}>
                {title
                    ? data
                          ?.filter((item, index) => index < `${isAlbum ? 5 : 6}`)
                          ?.map((item) => (
                              <>
                                  {isAlbum ? (
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
                                  )}
                              </>
                          ))
                    : data?.items
                          ?.filter((item, index) => index < 5)
                          ?.map((item) => <SectionItem key={item?.encodeId} data={item} />)}
            </div>
        </div>
    );
}

export default memo(Section);
