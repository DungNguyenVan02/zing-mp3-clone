import classNames from 'classnames/bind';
import styles from './Radio.module.scss';
import Title from '../component/Title';
import RadioItem from './RadioItem';

const cx = classNames.bind(styles);

function Radio({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Title data={data} />
            <div className="grid row">
                {data?.items
                    ?.filter((item, index) => index <= 6)
                    .map((radio) => (
                        <div key={radio?.encodeId} className="col l-1-4">
                            <RadioItem radioData={radio} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Radio;
