import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useColorMode } from '@/theme/colourModeContext';
interface ContainerProps {
  text: string;
  stroke?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSource?: ImageSourcePropType; 
  onPressX?: () => void;
  onPressIcon?: () => void;
}

const Container: React.FC<ContainerProps> = ({
  text,
  stroke = false,
  iconName,
  iconSource,
  onPressX,
  onPressIcon,
}) => {
     const { themeMode, toggleTheme, colors } = useColorMode();
    const isDarkMode = themeMode === 'dark';
  return (
    <View style={[styles.container,{
        backgroundColor: isDarkMode ? '#25273D' : '#FFFFFF',
         borderBottomColor:  isDarkMode ?'#393A4B': ' #E3E4F1'  ,
    }]}>
      {/* Left Icon or Image */}
      <TouchableOpacity onPress={onPressIcon} style={styles.leftIcon}>
        {iconSource ? (
          <Image source={iconSource} style={styles.image} />
        ) : (
          iconName && <Ionicons name={iconName} size={20} color="#555" />
        )}
      </TouchableOpacity>

      {/* Text */}
      <Text style={[styles.text, stroke && styles.strike ,{
        color:isDarkMode ? '#C8CBE7' : 'black',
        fontFamily:"Josefin Sans",
        fontSize:14,
        fontWeight:500,
        letterSpacing:0.7,
        textAlignVertical: 'center', 
        paddingBottom:3,

      }]}>
        {text}
      </Text>

      {/* Right X Icon */}
      <TouchableOpacity onPress={onPressX} style={styles.rightIcon}>
        <Ionicons name="close" size={24} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    width: '100%',
    borderBottomWidth:0.45,
   

    
  },
  leftIcon: {
    marginRight: 10,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Josefin Sans',
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  rightIcon: {
    marginLeft: 10,
  },
});
