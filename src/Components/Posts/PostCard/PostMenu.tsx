import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Menu, MenuItem} from '@mui/material';
import * as React from 'react';
import {useAppDispatch} from '../../../hook/hooks';

const ITEM_HEIGHT = 48;

type MenuItemType = {
    name: string,
    action: any,
    type: string
}

type MenuPropsType = {
    options: MenuItemType[],
    payload: any
}

export const MenuWithHeader: React.FC<MenuPropsType> = (props) => {

    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (action: MenuItemType) => {
        setAnchorEl(null);
        const payload = props.payload;
        if(action.type === 'thunk') {
            dispatch(action.action({payload}));
        } else {
            action.action(payload)
        }
    }

    return (
        <div>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {props.options.map((option) => (
                    <MenuItem key={option.name} onClick={() => handleItemClick(option)}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}
