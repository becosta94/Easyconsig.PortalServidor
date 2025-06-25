import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { getToken } from "../services/authStorageService";
import { useColorScheme } from '@/components/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await getToken();
        const isValid = !!token;
        setIsLoggedIn(isValid);
        if (!isValid) {
          setTimeout(() => {
            router.replace("/auth/login");
          }, 0);
        }
      } catch (error) {
        console.error("Erro ao verificar o status de login:", error);
        setIsLoggedIn(false);
        setTimeout(() => {
          router.replace("/auth/login");
        }, 0);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (isLoggedIn !== null) {
      SplashScreen.hideAsync();
    }
  }, [isLoggedIn]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <GestureHandlerRootView style={{ flex: 1 }}>
        {isLoggedIn ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          </Stack>
        )}
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}


