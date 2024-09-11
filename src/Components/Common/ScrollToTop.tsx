import React, {useEffect, useState} from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Fab} from '@mui/material';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if(window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);


    return <div>{isVisible && (<Fab onClick={scrollToTop}
                                    color='primary'
                                    aria-label='edit'
                                    style={{position: 'fixed', bottom: '20px', left: '20px'}}>
            <KeyboardArrowUpIcon/>
        </Fab>
    )}</div>;
}
