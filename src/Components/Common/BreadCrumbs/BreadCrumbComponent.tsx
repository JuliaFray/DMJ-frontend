import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {useNavigate} from 'react-router-dom';



type BreadCrumbComponentProps = {
    path: string
}

const variants = [
    {path: 'posts', name: 'Блог', redirectTo: '/posts'}
]

export const BreadCrumbComponent: React.FC<BreadCrumbComponentProps> = ({path}) => {

    const navigate = useNavigate();

    const to = variants.find(it => it.path === path)?.redirectTo || '/';

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate(to);
    }
    // const breadcrumbs = [
    //     <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
    //         MUI
    //     </Link>,
    //     <Link
    //         underline="hover"
    //         key="2"
    //         color="inherit"
    //         href="/material-ui/getting-started/installation/"
    //         onClick={handleClick}
    //     >
    //         Core
    //     </Link>,
    //     <Typography key="3" color="text.primary">
    //         Breadcrumb
    //     </Typography>,
    // ];

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            {path}
        </Link>
    ]

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small"/>}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
