import * as React from 'react';
import {styled} from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

export const ImageButton = styled(ButtonBase)(({theme}) => ({
    position: 'relative',
    height: 250,
    width: 200,
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

export const ImageSrc = styled('span')({
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    width: '200px',
    height: '250px'
});

export const Image = styled('span')(({theme}) => ({
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

export const ImageBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

export const ImageMarked = styled('span')(({theme}) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));
