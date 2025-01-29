import React from "react";

import { SideBlock } from "shared";
import { TComment, TCommentsBlock } from "shared";
import { v4 as uuidv4 } from "uuid";

import { Container } from "@mui/material";
import List from "@mui/material/List";

import { Comment } from "entities/comment";

export const CommentsBlock: React.FC<TCommentsBlock> = ({
  items,
  children,
  isLoading = true,
}) => {
  return (
    <SideBlock title="Комментарии">
      <List sx={{ width: "100%" }}>
        {(isLoading ? [...Array(5)] : items)?.map((obj: TComment) => (
          <Comment key={uuidv4()} item={obj} isLoading={isLoading} />
        ))}
      </List>
      <Container>{children}</Container>
    </SideBlock>
  );
};
