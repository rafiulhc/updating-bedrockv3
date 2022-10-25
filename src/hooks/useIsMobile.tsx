import React from 'react';
import useWindowSize from './useWindowSize';

export const useIsMobile = () => {
    const { width } = useWindowSize();
    const [isMobile, setIsMobile] = React.useState<boolean>(!(width >= 768));

    React.useLayoutEffect(() => {
        if (width < 768) {
            if (isMobile === false) {
                setIsMobile(true)
            }
        } else {
            if (isMobile === true) {
                setIsMobile(false);
            }
        }
    }, [width]);

    return {isMobile, setIsMobile}
}