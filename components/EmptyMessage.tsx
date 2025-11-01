import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorMode } from '@/theme/colourModeContext';
import React from 'react';

interface EmptyMessageProps {
  text?: string;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ text = "No todos left!" }) => {
  const { themeMode } = useColorMode();
  const isDarkMode = themeMode === 'dark';

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom:10,
      }}
    >
      <Ionicons
        name="information-circle-outline"
        size={24}
        color={isDarkMode ? '#C8CBE7' : '#494C6B'}
        style={{ marginRight: 8 }}
      />
      <Text
        style={{
          color: isDarkMode ? '#C8CBE7' : '#494C6B',
          fontFamily: 'Josefin Sans',
          fontSize: 16,
          fontWeight: '500',
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default EmptyMessage;
