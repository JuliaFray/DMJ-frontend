import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

type ISideBlock = {
    title: string,
    children: React.JSX.Element[]
}
export const SideBlock: React.FC<ISideBlock> = ({title, children}) => {
    return (
        <Paper classes={{root: styles.root}}>
            <Typography variant="h6" classes={{root: styles.title}}>
                {title}
            </Typography>
            {children}
        </Paper>
    );
};
