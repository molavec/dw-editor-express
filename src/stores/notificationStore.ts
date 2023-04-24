import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';
import type NotificationType from '../types/NotificationType';

export const useNotificationStore = defineStore('notifications', () => {
  
  const notifications: Ref<NotificationType[]> = ref([]);
  
  const updateNotificationList = (notificationArray: NotificationType[]) => {
    notifications.value = notificationArray;
  };

  const removeNotification = (notificationId: string) => {
    const index = notifications.value.findIndex(
      (notification) => {
        notification.id === notificationId;
      },
    );
    notifications.value.splice(index, 1);
  };

  return {
    notifications,
    updateNotificationList,
    removeNotification,
  };
});
