import React, { ChangeEvent, useRef } from "react";

import Avatar from "@mui/material/Avatar";

import { ImageButton, TProfile } from "shared";

import styles from "./ProfileInfo.module.scss";

type IProfileAvatar = {
  profile: TProfile;
  isOwner: boolean;
  file: string;
  setFile: (file: File | string | null) => void;
};

export const ProfileAvatar: React.FC<IProfileAvatar> = (props, context) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = (event.target as HTMLInputElement).files;
    if (files?.length) {
      props.setFile(files[0]);
    }
  };

  return (
    <div className={styles.avatar}>
      {props.isOwner && (
        <>
          <input
            ref={inputRef}
            type="file"
            onChange={handleChangeFile}
            hidden
          />

          <ImageButton
            focusRipple
            key={props.profile.firstName}
            onClick={() => inputRef.current?.click()}
          >
            <Avatar
              variant="rounded"
              className={styles.photo}
              src={props.file}
              alt={props.profile.firstName}
            />
          </ImageButton>
        </>
      )}
      {!props.isOwner && (
        <Avatar
          variant="rounded"
          className={styles.photo}
          src={props.file}
          alt={props.profile.firstName}
        />
      )}
    </div>
  );
};
