import { memo } from 'react';
import ArtistsItem from './ArtistsItem';

function Artists({ data }) {
    return (
        <div className="grid row">
            {data?.map((item) => {
                return (
                    <div key={item.id} className="col l-2-4 m-3 s-6">
                        <ArtistsItem data={item} />
                    </div>
                );
            })}
        </div>
    );
}

export default memo(Artists);
