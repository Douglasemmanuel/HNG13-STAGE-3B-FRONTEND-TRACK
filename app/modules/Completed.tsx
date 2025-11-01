import { StyleSheet, Text, View , FlatList } from 'react-native'
import React from 'react'
import Container from '@/components/container'
import EmptyMessage from '@/components/EmptyMessage';
import {useMutation , useQuery} from 'convex/react' ;
import {api} from '../../convex/_generated/api' ;
const Completed:React.FC = () => {
   const todos = useQuery(api.todos.getCompletedTodos) ?? [];
       const deleteSingleTodo = useMutation(api.todos.deleteSingleTodo);
  return (
      <View style={{ flex: 1 }}>
        {todos.length ===  0 ?(
       <EmptyMessage text="No Completed todos " />
    ):(
  <FlatList
      data={todos} 
      keyExtractor={(item) => item._id.toString()} 
      renderItem={({ item }) => (
        <Container
          text={item.title}
          stroke={item.completed  ? true :false} 
          iconSource={item.completed ? require('../../images/checked.png') : undefined} 
          onPressX={()=>void deleteSingleTodo({id:item._id})}
        />
      )}
      
    />
    )}
    
  </View>
  )
}

export default Completed

const styles = StyleSheet.create({})