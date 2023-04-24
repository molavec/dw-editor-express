
export enum NOTIFICATION_STYLE {
  IS_PRIMARY = 'is-primary',
  IS_LINK = 'is-link',
  IS_INFO = 'is-info',
  IS_SUCCESS = 'is-success',
  IS_WARNING = 'is-warning',
  IS_DANGER   = 'is-danger  ',
  IS_PRIMARY_LIGHT = 'is-primary is-light',
  IS_LINK_LIGHT = 'is-link is-light',
  IS_INFO_LIGHT = 'is-info is-light',
  IS_SUCCESS_LIGHT = 'is-success is-light',
  IS_WARNING_LIGHT = 'is-warning is-light',
  IS_DANGER_LIGHT = 'is-danger is-light',
}

interface NotificationType {
  id: string;
  message: string;
  style?: string;
}

export default NotificationType;