export function TodoListNote({ title, info }) {
    var todoList=info.split(',')
    return (
      <div className="note-todos">
        <h4>{title}</h4>
        {todoList=todoList.map((todo,idx)=>{
            return <li key={idx}>{todo}</li> 
        })}
      </div>
    );
  }