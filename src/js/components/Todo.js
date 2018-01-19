import React from "react";

require("../../scss/todo.scss");

export default class Todo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      edit: props.isEditing,
      text: props.text
    }
  }

  componentWillUpdate(previousProp,currentState){
    if(previousProp.isEditing !== currentState.edit){
      this.setState({
        edit: previousProp.isEditing
      })
    }
  }

  handleTextClick(event){
    this.props.setEditView(event.target.id);
  }

  handleClick(){
    this.props.modify(this.props.id);
  }

  handleDelete(event){
    this.props.remove(event.target.id);
  }

  handleSave(event){
    let text = this.state.text;

    if (!text){
      alert('Cannot be blank!')
    } else {
      this.props.update(event.target.id, text);
    }
  }

  handleCancel(event){
    this.setState({
      text: this.props.text
    }, this.props.setEditView);
  }

  handleChange(event){
    this.setState({
      text: event.target.value
    })
  }

  render() {
    const { complete, edit, text, id } = this.props;
    const icon = complete ? "\u2714" : "\u2716";

    if (this.state.edit) {
      return (
        <li>
          <i 
            class="fa fa-trash" 
            id={id} 
            onClick={this.handleDelete.bind(this)}></i>&nbsp;&nbsp;
          <input 
            value={this.state.text} 
            focus="focused" 
            onChange={this.handleChange.bind(this)}/>&nbsp;&nbsp;
          <button
            id={id}
            class="btn btn-success btn-sm" 
            onClick={this.handleSave.bind(this)}>Save</button>
            &nbsp;
          <button 
            class="btn btn-danger btn-sm"
            onClick={this.handleCancel.bind(this)}>Cancel</button>
        </li>
      );
    }

    return (
      <li>
        <span onClick={this.handleClick.bind(this)}>{icon}</span>
        &nbsp;&nbsp;
        <span id={id} onClick={this.handleTextClick.bind(this)}>{text}</span> &nbsp;&nbsp;
      </li>
    );
  }
}
