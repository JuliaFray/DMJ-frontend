import * as React from 'react';
import {ChangeEvent, useRef} from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type IInputFileUpload = {
    onClick: (event: ChangeEvent<HTMLInputElement>) => void,
    text: string
}

const InputFileUpload: React.FC<IInputFileUpload> = (props, context) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Button
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon/>}
            onClick={() => inputRef.current?.click()}
        >
            <input ref={inputRef} type='file' onChange={props.onClick} hidden/>
            {props.text}
            <VisuallyHiddenInput type='file'/>
        </Button>
    );
}

export default InputFileUpload;
