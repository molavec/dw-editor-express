import { storeToRefs } from 'pinia';
import type NotificationType from '../types/NotificationType';
import { NOTIFICATION_STYLE } from '../types/NotificationType';
import { useNotificationStore } from '../stores/notificationStore';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_TIMEOUT = 10000;

export const useNotifications = () => {

  const { notifications } = storeToRefs(useNotificationStore());
  const { removeNotification } = useNotificationStore();

  const getNotificationsRef = () => notifications;

  const appendNotification = (
    message: string, 
    style: NOTIFICATION_STYLE = NOTIFICATION_STYLE.IS_PRIMARY,
  ) => {
    const uuid: string = uuidv4();
    //console.log('style', style)
    const notification: NotificationType = {
      id: uuid,
      message: message,
      style: style, 
    };
    notifications.value.unshift(notification);

    // Crear un Timeout para remover la notificación en caso de que el usuario no lo haya hecho.
    setTimeout(() => {
      removeNotification(uuid);
    }, DEFAULT_TIMEOUT);
  };

  return {
    getNotificationsRef,
    appendNotification,
    removeNotification,
  };

};