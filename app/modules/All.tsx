import { StyleSheet, Text, View , FlatList } from 'react-native'
import React from 'react'
import Container from '@/components/container';
import EmptyMessage from '@/components/EmptyMessage';
import {useMutation , useQuery} from 'convex/react' ;
import {api} from '../../convex/_generated/api' ;

const All:React.FC = () => {
   const todos = useQuery(api.todos.getAllTodos) ?? [];
    const deleteSingleTodo = useMutation(api.todos.deleteSingleTodo);
    const updateSingleTodo = useMutation(api.todos.updateTodo);

  return (
  <View style={{ flex: 1 }}>
    {todos.length ===  0 ?(
       <EmptyMessage text="No todos left!" />
    ):(
  <FlatList
      data={todos} 
      keyExtractor={(item) => item._id.toString()} 
      renderItem={({ item }) => (
        <Container
          text={item.title}
          stroke={item.completed  ? true :false} 
          iconSource={item.completed ? require('../../images/checked.png') : undefined} 
          iconName={item.completed ? undefined : 'ellipse-outline'}
          onPressIcon={() => void updateSingleTodo({id:item._id, completed:!item.completed})}
          onPressX={()=>void deleteSingleTodo({id:item._id})}
        />
      )}
      
    />
    )}
    
  </View>

  )
}

export default All

const styles = StyleSheet.create({})