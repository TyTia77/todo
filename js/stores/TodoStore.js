import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.todos = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false,
        isEditing: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false,
        isEditing: false
      },
      
    ];
  }

  createTodo(text) {
    const id = Date.now();

    this.todos.push({
      id,
      text,
      complete: false,
      isEditing: false
    });
  }

  getAll() {
      return this.todos;
  }

  updateEditing(id){
    this.todos.forEach(function(x){
      if (x.id.toString() === id){
        x.isEditing = true;
      } else {
          x.isEditing = false;
        }
    });
  }

  modifyTodo(action){
    this.todos.forEach(function(item){
      if(action.id === item.id){
        item.complete = !item.complete;
      }
    })
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
        this.emit("change");
        break;
      }

      case "RECEIVE_TODOS": {
        this.todos = action.todos;
        this.emit("change");
        break;
      }

      case "MODIFY_TODO": {
        this.modifyTodo(action);
        this.emit("change");
        break;
      }

      case "REMOVE_TODO": {
        this.todos.forEach(function(item, index){
          if(action.id === item.id.toString()){
              this.todos.splice(index, 1);
          }
        }.bind(this));

        this.emit("change");
        break;
      }

      case "UPDATE_TODO": {
        this.todos.forEach(function(item, index){
          if(action.id === item.id.toString()){
              item.text = action.text;
              item.isEditing = false;
          }
        }.bind(this));

        this.emit("change");
        break;
      }

      case "UPDATE_EDIT":{
        this.updateEditing(action.id);
        this.emit("change");
        break;
      }


    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
