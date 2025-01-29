import React, { SyntheticEvent, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CustomProvider, DatePicker, InlineEdit, Input } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import ruRu from "rsuite/locales/ru_RU";
import { convertBase64ToBlob, getFullName } from "shared/lib/helper";
import { v4 as uuidv4 } from "uuid";

import CelebrationIcon from "@mui/icons-material/Celebration";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Container, Typography } from "@mui/material";

import { saveUserProfile, TProfile, useAppDispatch } from "shared";

import { ProfileAvatar } from "./ProfileAvatar";
import styles from "./ProfileInfo.module.scss";

dayjs.extend(customParseFormat);

type IProfileData = {
  profile: TProfile;
  isOwner: boolean;
};

export const ProfileData: React.FC<IProfileData> = React.memo(
  ({ profile, isOwner }) => {
    const [initState, setInitState] = useState(profile);
    const dispatch = useAppDispatch();

    const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] =>
      obj[key];

    const handleSave = (
      event?: SyntheticEvent<Element, Event> | undefined,
      file?: File | string | null
    ) => {
      const formData = new FormData();

      for (let key in initState) {
        const val = getKeyValue<TProfile, keyof TProfile>(initState, key);
        formData.append(
          key,
          typeof val === "string" ? val : JSON.stringify(val)
        );
      }

      if (file) {
        if (file instanceof File) {
          formData.append("image", file);
        } else {
          formData.append("image", convertBase64ToBlob(file));
        }
      }

      dispatch(saveUserProfile({ profileId: profile._id, file: formData }));
    };

    const handleChange = (name: string, value: any) => {
      setInitState({ ...initState, [name]: value });
    };

    const image = initState?.avatar?.data
      ? typeof initState?.avatar?.data === "string"
        ? `data:image/jpeg;base64,${initState?.avatar?.data}`
        : URL.createObjectURL(initState?.avatar?.data)
      : "";

    return (
      <>
        <ProfileAvatar
          profile={profile}
          isOwner={isOwner}
          file={image}
          setFile={(file) => handleSave(undefined, file)}
        />

        <Container>
          <Typography className={styles.profileTitle} key={uuidv4()} noWrap>
            {getFullName(profile)}
          </Typography>

          <InlineEdit
            disabled={!isOwner}
            className={styles.profileDescription}
            size={"md"}
            stateOnBlur={"save"}
            onSave={handleSave}
            onChange={(value) => handleChange("description", value)}
            defaultValue={profile.description}
            style={{ width: "100%" }}
          >
            {
              // @ts-ignore
              (prop, ref) => {
                const { value, onChange, plaintext, ...rest } = prop;

                if (plaintext) {
                  return (
                    <Typography
                      variant={"subtitle2"}
                      sx={{ color: "grey" }}
                      paragraph
                      className={styles.profileStatus}
                      key={uuidv4()}
                      noWrap
                    >
                      {value}
                    </Typography>
                  );
                }

                return (
                  <Input
                    {...rest}
                    as="textarea"
                    rows={2}
                    ref={ref}
                    value={value}
                    onChange={(event) => {
                      // @ts-ignore
                      onChange(event, event);
                    }}
                  />
                );
              }
            }
          </InlineEdit>

          <Box className={styles.profileLocation}>
            <LocationOnIcon color="action" />
            <InlineEdit
              disabled={!isOwner}
              onSave={handleSave}
              size={"md"}
              stateOnBlur={"save"}
              defaultValue={profile.city || " "}
            />
          </Box>

          <Box className={styles.profileLocation}>
            <CustomProvider locale={ruRu}>
              <CelebrationIcon color="action" />
              {profile.age && (
                <InlineEdit
                  disabled={!isOwner}
                  size={"md"}
                  stateOnBlur={"save"}
                  onSave={handleSave}
                  defaultValue={
                    dayjs(profile.age, "DD.MM.YYYY").toDate() || null
                  }
                >
                  <DatePicker format="dd.MM.yyyy" cleanable plaintext />
                </InlineEdit>
              )}
            </CustomProvider>
          </Box>
        </Container>
      </>
    );
  }
);
