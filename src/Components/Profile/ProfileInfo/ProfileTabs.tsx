import {Box, Container, Tab, Tabs, Typography} from '@mui/material';
import React, {useState} from 'react';

export const ProfileTabs = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Container maxWidth="sm">
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label="О себе"/>
                <Tab label="Мои посты"/>
                <Tab label="Избранное"/>
                <Tab label="Друзья"/>
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                profile
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                Item Three
            </TabPanel>
        </Container>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
