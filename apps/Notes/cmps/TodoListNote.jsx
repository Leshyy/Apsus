export function TodoListNote({ title, info}) {
    let isDone=false
    let todoList=info.split(',')
    
    return (
      <div className="note-todos">
        <h4>{title}</h4>
        {todoList=todoList.map((todo,idx)=>{
            return <li className={(isDone)? "todo-done":"todo-waiting"} key={idx}>{todo}</li> 
        })}
      </div>
    );
  }