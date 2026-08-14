const avatarUrl =
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-__INDEX__.png';

export const getAvatarSrc = (avatarId?: string | number) => {
  return avatarId ? avatarUrl?.replace('__INDEX__', avatarId.toString()) : '';
};
