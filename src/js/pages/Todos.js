import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";

export default class Todos extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
      view: "all"
    };
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  // fix memory leak issues
  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {

    let getList = TodoStore.getAll();
    let newList = getList;

    if(this.state.view === 'completed'){
        newList = getList.filter( item => {
          return item.complete;
        });
    } else if (this.state.view === 'pending'){
        newList = getList.filter( item => {
          return !item.complete;
        });
    } 

    this.setState({
        todos: newList
    })
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  modifyTodo(id){
    TodoActions.modifyTodo(id);
  }

  removeTodo(id){
    TodoActions.removeTodo(id);
  }

  updateTodo(id, text){
    TodoActions.updateTodo(id, text);
  }

  addTodo(){
    TodoActions.createTodo("new todo");
  }

  handleView(event){
    let target = event.target;
    let type = target.innerHTML.toLowerCase();
    let list = target.classList;

    let buttons = document.querySelectorAll('.view')

    buttons.forEach( btn => {
      btn.classList.remove('btn-info');
      btn.classList.add('btn-default');
    })

    list.remove('btn-default');
    list.add('btn-info');

    this.setState({
        view: type
    }, this.getTodos);
  }

  handleEditView(id){
    TodoActions.updateEdit(id);
  }

  render() {
    const { todos } = this.state;
    const TodoComponents = todos.map( todo => {
        return (
          <Todo 
            key={todo.id} 
            modify={this.modifyTodo}
            remove={this.removeTodo}
            update={this.updateTodo}
            isEditing={todo.isEditing}
            setEditView={this.handleEditView.bind(this)}
            {...todo}/>
    )});

    const addButton = function(){
      if (this.state.view !== 'completed'){
        return (
         <button class="btn btn-success btn-sm" onClick={this.addTodo.bind(this)}>Add</button>
        )
      }
    }.bind(this);

    return (
      <div>
        <button class="view btn btn-info btn-sm" onClick={this.handleView.bind(this)}>All</button> &nbsp;

        <button class="view btn btn-default btn-sm" onClick={this.handleView.bind(this)}>Completed</button> &nbsp;

        <button class="view btn btn-default btn-sm" onClick={this.handleView.bind(this)}>Pending</button>
        <br/>
        <br/>
        <ul>{TodoComponents}</ul>
        {addButton()}
      </div>
    );
  }
}
