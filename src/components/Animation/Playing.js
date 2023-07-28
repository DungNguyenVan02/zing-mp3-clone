import { memo } from 'react';
import { Audio } from 'react-loader-spinner';

function Player({ height = 26, width = 26 }) {
    return (
        <Audio
            height={height}
            width={width}
            color="#fff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
}

export default memo(Player);
