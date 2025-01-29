import React from "react";

import { useSelector } from "react-redux";
import { getAuthId } from "shared";
import { TMessage } from "shared";
import { v4 as uuidv4 } from "uuid";

import { Avatar, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { getFullName, getImage } from "shared/lib/helper";

import styles from "./message.module.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: "95%",
}));

export const Message: React.FC<TMessage> = (props) => {
  const authId = useSelector(getAuthId);
  const user = props.from.userId === authId ? props.from : props.to;
  let sx: Record<string, any> = { my: 1 };
  sx =
    props.from._id === authId
      ? { ml: "55%", backgroundColor: `rgba(159, 237, 215, 0.2)`, ...sx }
      : { mr: "55%", backgroundColor: `rgba(2, 102, 112, 0.2)`, ...sx };

  return (
    <Stack direction="row" alignItems="start" columnGap={1}>
      <Typography sx={sx} className={styles.msgItem} key={uuidv4()} noWrap>
        {props.text}
      </Typography>
      <Avatar
        key={uuidv4()}
        alt={getFullName(user)}
        src={getImage(user.avatar, true)}
      />
    </Stack>
  );
};
