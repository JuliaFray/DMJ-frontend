import React from 'react';
import {Box} from '@mui/material';

type ITabPanel = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<ITabPanel> = ({children, value, index, ...other}) => {

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (<Box style={{marginTop: '24px'}}>{children}</Box>)}
        </div>
    );
}

export default TabPanel;
