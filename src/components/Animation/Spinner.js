import { memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';

function Spinner({ width = 20 }) {
    return <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width={width} visible={true} />;
}

export default memo(Spinner);
