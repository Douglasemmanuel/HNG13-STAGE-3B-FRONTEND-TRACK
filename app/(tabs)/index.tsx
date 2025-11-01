import { Image } from 'expo-image';
import { Platform, StyleSheet , View } from 'react-native';
import { Link } from 'expo-router';
import { useColorMode } from '@/theme/colourModeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
   const { themeMode, toggleTheme, colors } = useColorMode()
    const isDarkMode = themeMode === 'dark'
  return (
      <SafeAreaView style={{
        backgroundColor:colors.background
      }}>
        <View></View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
