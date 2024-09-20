import React from "react";
import {Container} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "./side-block.module.scss";

type TSideBlock = {
    title?: string,
    icon?: React.JSX.Element,
    children: React.JSX.Element[]
}
export const SideBlock: React.FC<TSideBlock> = ({title, icon, children}) => {
    return (
        <Paper classes={{root: styles.root}}>
            {icon}
            <Typography variant="h6" classes={{root: styles.title}}>
                {title}
            </Typography>
            <Container className={styles.container}>
                {children}
            </Container>
        </Paper>
    );
};
