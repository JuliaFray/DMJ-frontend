import React, {useEffect, useState} from 'react';
import {Article, Grade, People} from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {Container, Tab, Tabs} from '@mui/material';
import {HomePage} from "pages/home/home-page.ui";
import {UsersPage} from 'pages/users/users-page.ui';
import TabPanel from 'shared/ui/Tabs/TabPanel';
import {CommentsFeed} from 'widgets/comments-feed';


export type IProfileTabs = {
    isOwner: boolean,
    userId: string,
}

export const ProfileTabs: React.FC<IProfileTabs> = (props, context) => {

    useEffect(() => {
        setTabIndex(0)
    }, [])
    const [tabIndex, setTabIndex] = useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Container style={{margin: 0, padding: 0}} maxWidth="lg">
            <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
                <Tab iconPosition={'start'} icon={<People color={'disabled'}/>} label='Подписки' {...a11yProps(0)}/>
                <Tab iconPosition={'start'} icon={<Article color={'disabled'}/>} label={props.isOwner ? 'Мои статьи' : 'Статьи'} {...a11yProps(1)}/>
                <Tab iconPosition={'start'} icon={<CommentIcon color={'disabled'}/>} label={'Комментарии'} {...a11yProps(2)}/>
                {props.isOwner && <Tab iconPosition={'start'} icon={<Grade color={'disabled'}/>} label='Избранное' {...a11yProps(3)}/>}
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                <UsersPage isMainPage={false} isFollowers={true}/>
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
                <HomePage isOwner={true} isMainPage={false}
                          userId={props.userId} isFavorite={false} isLoad={true}/>
            </TabPanel>

            <TabPanel value={tabIndex} index={2}>
                <CommentsFeed userId={props.userId}/>
            </TabPanel>

            {props.isOwner && <TabPanel value={tabIndex} index={3}>
                <HomePage isOwner={props.isOwner} isMainPage={false}
                          userId={props.userId} isFavorite={true} isLoad={true}/>
            </TabPanel>}
        </Container>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
