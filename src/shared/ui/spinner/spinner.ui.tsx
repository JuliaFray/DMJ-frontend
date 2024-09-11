import React from "react";
import {CircularProgress} from "@mui/material";

type TSpinner = {
    display?: boolean;
    position?: string;
}
export const Spinner: React.FC<TSpinner> = ({display}) => {
    return (
        display ?
            <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress style={{height: '80px', width: '80px'}}/>
            </div> : null
    );
}
