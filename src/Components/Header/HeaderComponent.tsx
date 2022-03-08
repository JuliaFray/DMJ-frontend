import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAvatar, getIsAuth, getLogin} from '../../redux/auth-selectors';
import {logout} from '../../redux/auth-reducer';
import {Avatar, Button, Col, Image, Menu, Row, Tooltip} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import logo from '../../assets/Logo.png';
import {Header} from 'antd/es/layout/layout';
import '../../styles/main.less';
import {LogoutIcon} from '../Common/CustomIcon';
import s from './Header.module.css';

const HeaderComponent: React.FC = () => {

    const isAuth = useSelector(getIsAuth);
    const login = useSelector(getLogin);
    const dispatch = useDispatch();
    const avatar = useSelector(getAvatar);

    const onLogout = () => {
        dispatch(logout())
    };

    return (
        <Header className={'header'}>
            <Row>
                <Col span={4}>
                    <span className={'logo'}><Image width={50} src={logo}/></span>
                </Col>
                <Col span={17}>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1"><Link to='/notifications'>Notifications</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/news'>News</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/settings'>Settings</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col span={3} className={s.loginBlock} flex={'auto'}>
                    {isAuth
                        ? <span >
                            {avatar
                                ? <Tooltip placement="bottom" title={login}>
                                    <Avatar src={<Image src={avatar} style={{width: 32}}/>}/>
                                </Tooltip>
                                : <Avatar icon={<UserOutlined/>}/>
                            }
                            <Button className={s.logout} type={'link'} icon={<LogoutIcon onClick={() => onLogout()}/>} size={'middle'}/>
                                </span>
                        : null}
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderComponent;

// lessc "./src/styles/main.less ./src/styles/css/antd.css"
