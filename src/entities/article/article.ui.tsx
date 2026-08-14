import React, { FC, useState } from 'react';

import { DotsThreeIcon, TrashIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

import { ActionIcon, Badge, Button, Card, Group, Menu, Text } from '@mantine/core';

import { CustomCardActions } from 'widgets/article';

import { useAppDispatch } from 'shared/hook';
import { pathKeys } from 'shared/lib';
import { deletePost } from 'shared/model';
import { IPost } from 'shared/types';
import { UserButton } from 'shared/ui';

import classes from './ArticleCardFooter.module.css';
import styles from './article.module.scss';

type ArticleProps = {
  post: IPost;
  isEditable: boolean;
};

export const Article: FC<ArticleProps> = ({ post, isEditable }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    setOpenDialog(false);
    dispatch(deletePost({ payload: post }));
    navigate(pathKeys.article.root());
  };

  return (
    <>
      <Card withBorder padding='lg' radius='md'>
        {/* {image && ( */}
        {/*   <Card.Section mb='lg'> */}
        {/*     <Image src={image} alt={NO_AVATAR} height={180} /> */}
        {/*   </Card.Section> */}
        {/* )} */}
        <UserButton user={post.userId} created={moment(post.createdAt).locale('ru').fromNow()} />

        <Card.Section inheritPadding py='xs'>
          <Group justify='space-between'>
            <Text fw={500} className={classes.title} style={{ width: '80%' }}>
              {post.title}
            </Text>
            {isEditable && (
              <Menu withinPortal position='right-end' shadow='sm'>
                <Menu.Target>
                  <ActionIcon variant='subtle' color='gray'>
                    <DotsThreeIcon size={16} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  {/* <Menu.Item leftSection={<FileZipIcon size={14} />}>Download zip</Menu.Item> */}
                  {/* <Menu.Item leftSection={<EyeIcon size={14} />}>Preview all</Menu.Item> */}
                  <Menu.Item
                    onClick={handleDelete}
                    leftSection={<TrashIcon size={14} />}
                    color='red'
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Card.Section>

        <ReactMarkdown className={clsx(styles.text)}>{post.text}</ReactMarkdown>

        <Group>
          {post.tags?.map((tag) => (
            <Badge
              key={tag._id}
              variant={post.tags?.some((t) => t._id === tag._id) ? 'filled' : 'outline'}
            >
              {tag.value}
            </Badge>
          ))}
        </Group>

        <Card.Section className={classes.footer}>
          <CustomCardActions post={post} />
        </Card.Section>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Внимание</DialogTitle>
        <DialogContent>
          <DialogContentText>Вы уверены, что хотите удалить статью навсегда?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type='button'
            size='large'
            variant='outlined'
            onClick={() => setOpenDialog(false)}
          >
            Отмена
          </Button>
          <Button type='button' size='large' variant='contained' onClick={handleDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
