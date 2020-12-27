export class TodoListNote extends React.Component {
  
  render() {
    let isDone = false
    let todoList = this.props.info.split(",");
    let underline;
    if (isDone) underline='underline'
    else underline='none'
    return (
      <div className="note-todos">
        <h4>{this.props.title}</h4>
          {(todoList = todoList.map((todo, idx) => {
            return (<li style={{textDecoration:underline}} onClick={() => {if(!isDone) {
                  isDone=true
                  }else{
                    isDone=false
                  }}}
                  key={idx}>{todo}</li>)}))}
      </div>
    );
  }
}
