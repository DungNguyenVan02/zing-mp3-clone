import { memo } from 'react';
import { Audio } from 'react-loader-spinner';

function Player() {
    return (
        <Audio
            height="26"
            width="26"
            color="#fff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
}

export default memo(Player);
