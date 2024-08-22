import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import AuthProvider from '@/providers/AuthProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import ScheduleTimesProvider from '@/providers/SchdeuleProvider';
import ProfileProvider from '@/providers/ProfileProvider';
import LoginProvider from '@/providers/LoginProvider';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <MenuProvider>
        <LoginProvider>
        <ProfileProvider>
            <ScheduleTimesProvider>
              <PaperProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                  <Stack>
                    <Stack.Screen name="(user)" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)"  options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </ThemeProvider>
              </PaperProvider>
            </ScheduleTimesProvider>
          </ProfileProvider>
        </LoginProvider>
      </MenuProvider>
    </AuthProvider>
  );
}
