import { notifications } from '@mantine/notifications';

// eslint-disable-next-line no-shadow
export enum ToastLevel {
  ERROR = 'red',
  INFO = 'indigo',
  SUCCESS = 'green',
}

interface useToastProps {
  level: ToastLevel;
  message: string;
  title?: string;
}

export const useToast = ({ level, title, message }: useToastProps) => {
  notifications.show({
    title,
    message,
    color: level,
  });
};
