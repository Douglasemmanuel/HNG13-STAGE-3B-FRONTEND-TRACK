import { Image } from 'expo-image';
import { Platform, StyleSheet , View } from 'react-native';
import { useColorMode } from '@/theme/colourModeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useMutation , useQuery} from 'convex/react' ;
import {api} from '../../convex/_generated/api' ;
export default function HomeScreen() {
   const { themeMode, toggleTheme, colors } = useColorMode();
    const isDarkMode = themeMode === 'dark';
        const createTodo = useMutation(api.todos.createTodo) ;
        const allTodo = useQuery(api.todos.getAllTodos);
        const activeTodo = useQuery(api.todos.getActiveTodos);
        const completedTodo = useQuery(api.todos.getCompletedTodos) ;
        const deleteAllTodo = useMutation(api.todos.deleteAllTodos);
        const deleteSingleTodo = useMutation(api.todos.deleteSingleTodo);
        const updateSingleTodo = useMutation(api.todos.updateTodo);
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
