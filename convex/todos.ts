import {mutation,query} from './_generated/server' ;
import {v} from 'convex/values' ;

export const createTodo = mutation({
args:{
    title:v.string() ,
    completed :v.boolean() ,

},
handler:async (ctx, args) => {
    await ctx.db.insert("todo",{
        title:args.title,
        completed:args.completed,
    });
},

});


export const updateTodo = mutation({
    args:{
    id:v.id("todo") ,
    completed :v.boolean()  ,
    },
handler:async(ctx , args)=>{
    await ctx.db.patch(args.id,{
        completed:args.completed,
    });
},
});





export const getAllTodos = query({
    args :{},
    handler : async (ctx , args) =>{
     return await ctx.db.query("todo").collect();
    }
})




export const getActiveTodos = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db
      .query("todo")
      .filter((q) => q.eq(q.field("completed"), false))
      .collect();
  },
});


export const getCompletedTodos = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db
      .query("todo")
      .filter((q) => q.eq(q.field("completed"), true))
      .collect();
  },
});


export const deleteAllTodos = mutation({
    args:{},
    handler:async (ctx, args)=> {
        const todo = await ctx.db.query('todo').collect();

        await Promise.all(todo.map((todo)=> ctx.db.delete(todo._id)));
    },
});


export const deleteSingleTodo = mutation({
    args:{
        id:v.id('todo'),
    },

    handler:async(ctx, args) =>{
        await ctx.db.delete(args.id);
        
    },
})



export const DeleteAllCompletedTodo = mutation({
  args: {},
  handler: async (ctx) => {
    
    const completedTodos = await ctx.db.query("todo").filter((q) => q.eq(q.field("completed"), true)).collect();

    for (const todo of completedTodos) {
      await ctx.db.delete(todo._id);
    }

    return { success: true, deletedCount: completedTodos.length };
  },
});
