import * as React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import {styled} from '@mui/material/styles';

export const ImageButton = styled(ButtonBase)(({theme}) => ({
    position: 'relative',
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 100,
    },
    '& .MuiImage': {
        width: '100%', // Ensure image takes full width inside the button
        height: '100%', // Ensure image takes full height inside the button
        objectFit: 'cover', // Maintain aspect ratio and cover entire space
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

export const ImageSrc = styled('div')({
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundPosition: 'center 20%',
    width: '100%',
    height: '100%'
});

export const Image = styled('div')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

export const ImageBackdrop = styled('div')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

export const ImageMarked = styled('div')(({theme}) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));
