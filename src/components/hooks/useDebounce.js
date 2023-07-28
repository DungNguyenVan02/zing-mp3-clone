import { useState, useEffect } from 'react';
function useCurrentDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const idTime = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => clearTimeout(idTime);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}

export default useCurrentDebounce;
