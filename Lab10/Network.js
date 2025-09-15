import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState("Checking network...");
  let previousIsConnected = null;

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    const sendNotification = async (title, body) => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null,
      });
    };

    // Theo dõi thay đổi mạng
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected;
      const statusMessage = isConnected ? "You are online!" : "You are offline!";
      setNetworkStatus(statusMessage);

      // Gửi thông báo khi trạng thái thay đổi
      if (previousIsConnected !== null && previousIsConnected !== isConnected) {
        if (!isConnected) {
          sendNotification("📡 Mất kết nối mạng", "Bạn đang offline, hãy kiểm tra kết nối.");
        } else {
          sendNotification("✅ Đã kết nối lại", "Kết nối mạng đã được khôi phục.");
        }
      }

      previousIsConnected = isConnected;
    });

    // Khi app được mở lại từ background/foreground
    const appStateSubscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        NetInfo.fetch().then((state) => {
          const isConnected = state.isConnected;
          const statusMessage = isConnected ? "You are online!" : "You are offline!";
          setNetworkStatus(statusMessage);
        });
      }
    });

    return () => {
      unsubscribe();
      appStateSubscription.remove();
    };
  }, []);

  return { networkStatus };
};