import {CircularProgress} from '@mui/material';
import React from 'react';

const Loader = () => {
    return (
        <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress style={{height: '80px', width: '80px'}}/>
        </div>
    );
}

export default Loader;
