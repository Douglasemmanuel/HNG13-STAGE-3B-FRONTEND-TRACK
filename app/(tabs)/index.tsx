import { Image } from 'expo-image';
import { Platform, StyleSheet , View , ImageBackground , Dimensions , Text , TextInput  , TouchableOpacity, Pressable} from 'react-native';
import { useColorMode } from '@/theme/colourModeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons  , AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState , useEffect } from 'react';
import {useMutation , useQuery} from 'convex/react' ;
import {api} from '../../convex/_generated/api' ;
import { usePlatformDimensions } from '@/hooks/use-platfrom-dimensions';
import All from '../modules/All';
import Active from '../modules/Active';
import Completed from '../modules/Completed';
export default function HomeScreen() {
   const { themeMode, toggleTheme, colors } = useColorMode();
    const isDarkMode = themeMode === 'dark';
        const createTodo = useMutation(api.todos.createTodo) ;
        const deleteAllCompletedTodo = useMutation(api.todos.DeleteAllCompletedTodo);
        const deleteAllTodo = useMutation(api.todos.deleteAllTodos);
        const { height: screenHeight } = Dimensions.get('window');
          const todos = useQuery(api.todos.getAllTodos) ?? [];
          let backgroundHeight: number;

      if (Platform.OS === 'ios') {
        backgroundHeight = 200;
      } else if (Platform.OS === 'android') {
        backgroundHeight = 200;
      } else {
        
        backgroundHeight = 300;
      }
      const { height, width } = usePlatformDimensions({
    customValues: { ios: { height: 20, width: 325 }, android: { height: 20, width: 325 }, web: { height: 48, width: 541 } },
  });
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState<string>('');

   const handleAddTodo = async () => {
    if (!text.trim()) return;

    try {
      await createTodo({ title: text, completed: false }); 
      setText(''); // clear input after creation
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  return (
 
      <SafeAreaView style={{
        backgroundColor:colors.background , 
        flex:1,
      }}>
        <View>
          <ImageBackground
           source={isDarkMode ?  require('../../images/darkmodeimage.jpg') :require('../../images/header.jpg')} 
            style={[
              styles.background, 
              { 
                height: Platform.OS =='web' ?  300 : 200 ,
                position: 'relative',
              }]}
            resizeMode="cover" >
            <View style={{}}>
              <View
              style={{
                width:'100%' ,
                // alignItems:'center',
                justifyContent:'center'
              }}
              >
                          <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between' ,
    // height: height , 
    // width: width ,  
    // justifyContent:'center' ,
    paddingTop: Platform.OS === 'web' ?  70 : 48 ,
    paddingLeft: Platform.OS === 'web' ? 450 : 26  ,   
    paddingRight: Platform.OS === 'web' ?  450: 26 , 
  }}
>
  <Text
    style={{
      fontFamily: 'Josefin Sans',
      fontWeight: '700',
      lineHeight: 50, 
      letterSpacing: 15,
      fontSize: 40,
      color: '#FFFFFF',
    }}
  >
    TODO
  </Text>
  <TouchableOpacity  onPress={toggleTheme}>
    {isDarkMode ? (
      <AntDesign name="sun" size={32} color="#FFFFFF" />
    ) : (
      <Ionicons name="moon" size={32} color="#FFFFFF" />
    )}
  </TouchableOpacity>
</View>
              </View>
<View
  style={{
    width: '100%',
    alignItems: 'center', 
    paddingTop: Platform.OS === 'web' ? 70 : 10, 
  }}
>
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: isDarkMode ? '#25273D' :'#FFFFFF',
      width: Platform.OS === 'web' ? 540 : 327,
      height:  Platform.OS === 'web' ?  64:48,
     
    }}
  >
    <TouchableOpacity style={{paddingLeft:24}} onPress={handleAddTodo}>
       <Ionicons name="ellipse-outline" size={24}  style={{ color: colors.icon , borderColor:colors.border  }}/>
    </TouchableOpacity>
   <TextInput
  style={
    {
      color: isDarkMode ? '#767992' : '#9495A5',
      fontSize:15,
      fontWeight:'400',
      marginLeft: 8,
      fontFamily: 'Josefin Sans',
      letterSpacing: 2,
      flex: 1,
      height: 40,
       paddingTop: 6,
      paddingVertical: Platform.OS === 'web' ? 0 : undefined,
      ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}), 
    } as any
  }
  placeholder="Create a new todo..."
  placeholderTextColor={colors.text + '90'}
  value={text}
  onChangeText={setText}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
/>

  </View>
</View>

            </View>
            
          </ImageBackground>
            <View
            style={{
              alignItems:'center' ,
              justifyContent:"center",
              width:"100%" ,
              position:"absolute",
              top:Platform.OS === 'web' ? 280 :170,
              // bottom:0
            }}>
                <View
            style={{
              // alignItems:'center' ,
              width:Platform.OS === 'web' ? 540 : 327,
              paddingTop:10,
              paddingBottom:10,
              // height:Platform.OS === 'web' ? 439 : 368,
              borderRadius:5,
              backgroundColor: isDarkMode ? '#25273D' : '#FFFFFF',

            }}>
              <View>
                  {filter === 'all' && <All />}
                  {filter === 'active' && <Active />}
                  {filter === 'completed' && <Completed />}
              </View>
             {(Platform.OS === 'web')&&(
               <View style={{flexDirection:'row' , justifyContent:"space-between",padding:5}}>
                 <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
       {todos.length} items left
      </Text>
                 <View style={{flexDirection:'row'}}>
                  <Pressable style={{ paddingHorizontal: 10 }} onPress={() => setFilter('all')}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
        All
      </Text>
    </Pressable>

    <Pressable style={{ paddingHorizontal: 10 }} onPress={() => setFilter('active')}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
        Active
      </Text>
    </Pressable>

    <Pressable style={{ paddingHorizontal: 10 }} onPress={() => setFilter('completed')}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
        Completed
      </Text>
    </Pressable>
                 </View>
                      <Pressable    
                      style={{ paddingHorizontal: 10 }}  
                      onPress={ () => (deleteAllCompletedTodo())}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
        Clear Completed
      </Text>
    </Pressable>
              </View>
             )}
             {(Platform.OS === 'android' || Platform.OS === 'ios') && (
                <View style={{flexDirection:'row' , justifyContent:"space-between",padding:5}}>
                 <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
       {todos.length} items left
      </Text>
         <Pressable style={{ paddingHorizontal: 10 }}  onPress={ () => (deleteAllCompletedTodo())}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
        Clear Completed
      </Text>
    </Pressable>
              </View>
             )}
            </View>
                   {(Platform.OS === 'android' || Platform.OS === 'ios') && (
 <View
  style={{
    marginHorizontal: 26,
    backgroundColor: isDarkMode ? '#25273D' : '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, 
  }}
>
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center',
      paddingHorizontal: 10,
      width:327,
    height: 48,
    }}
  >
    <Pressable style={{ paddingHorizontal: 10 }} onPress={() => setFilter('all')}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
        All
      </Text>
    </Pressable>

    <Pressable style={{ paddingHorizontal: 10 }} onPress={() => setFilter('active')}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
        Active
      </Text>
    </Pressable>

    <Pressable style={{ paddingHorizontal: 10 }} onPress={() => setFilter('completed')}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Josefin Sans',
          color: isDarkMode ? '#5B5E7E' : '#9495A5',
        }}
      >
        Completed
      </Text>
    </Pressable>
  </View>
</View>

)}
            </View>
          

     
        </View>

      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
  },
});
