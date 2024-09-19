import React from "react";
import List from "@mui/material/List";
import {Comment, TCommentsBlock, TComment} from "entities/comment";
import {SideBlock} from "shared/ui/side-block/side-block.ui";
import {v4 as uuidv4} from "uuid";
import {Container} from "@mui/material";

export const CommentsBlock: React.FC<TCommentsBlock> = ({items, children, isLoading = true}) => {

    return (
        <SideBlock title='Комментарии'>
            <List sx={{width: '100%'}}>
                {(isLoading ? [...Array(5)] : items)?.map((obj: TComment) => (
                    <Comment key={uuidv4()} item={obj} isLoading={isLoading}/>
                ))}
            </List>
            <Container>
                {children}
            </Container>

        </SideBlock>
    );
};
