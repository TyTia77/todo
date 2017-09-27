import dispatcher from "../dispatcher";

export function createTodo(text) {
  dispatcher.dispatch({
    type: "CREATE_TODO",
    text,
  });
}

export function removeTodo(id) {
  dispatcher.dispatch({
    type: "REMOVE_TODO",
    id,
  });
}

export function modifyTodo(id){
  dispatcher.dispatch({
    type: "MODIFY_TODO",
    id
  });
}

export function updateTodo(id, text){
  dispatcher.dispatch({
    type: "UPDATE_TODO",
    id,
    text
  });
}

export function updateEdit(id){
  dispatcher.dispatch({
    type: "UPDATE_EDIT",
    id
  });
}
