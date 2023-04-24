
export enum NOTIFICATION_STYLE {
  IS_PRIMARY = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
  IS_LINK = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
  IS_INFO = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
  IS_SUCCESS = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
  IS_WARNING = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
  IS_DANGER   = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
}

interface NotificationType {
  id: string;
  message: string;
  style: string;
}

export default NotificationType;