import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "./side-block.module.scss";
import {Container} from "@mui/material";

type TSideBlock = {
    title?: string,
    icon?: React.JSX.Element,
    children: React.JSX.Element[]
}
export const SideBlock: React.FC<TSideBlock> = ({title, children}) => {
    return (
        <Paper classes={{root: styles.root}}>
            <Typography variant="h6" classes={{root: styles.title}}>
                {title}
            </Typography>
            <Container className={styles.container}>
                {children}
            </Container>
        </Paper>
    );
};
