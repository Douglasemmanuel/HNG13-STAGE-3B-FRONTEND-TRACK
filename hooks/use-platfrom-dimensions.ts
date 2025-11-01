import { useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';

interface DimensionOptions {
  useScreen?: boolean; // if true, return full screen dimensions
  customValues?: {
    ios?: { height?: number; width?: number };
    android?: { height?: number; width?: number };
    web?: { height?: number; width?: number };
    windows?: { height?: number; width?: number };
    macos?: { height?: number; width?: number };
  };
}

export function usePlatformDimensions(options: DimensionOptions = {}) {
  const { useScreen = false, customValues } = options;

  const dimensions = useMemo(() => {
    if (useScreen) {
      const { height, width } = Dimensions.get('window');
      return { height, width };
    }

    switch (Platform.OS) {
      case 'ios':
        return customValues?.ios ?? { height: 0, width: 0 };
      case 'android':
        return customValues?.android ?? { height: 0, width: 0 };
      case 'windows':
        return customValues?.windows ?? { height: 0, width: 0 };
      case 'macos':
        return customValues?.macos ?? { height: 0, width: 0 };
      default: // web
        return customValues?.web ?? { height: 0, width: 0 };
    }
  }, [useScreen, customValues]);

  return dimensions;
}
